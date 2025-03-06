import { ReactNode, useContext } from "react";
import { cn, requestAccounts, sendTransaction } from "@zknoid/sdk/lib/helpers";
import { useWorkerClientStore } from "../../../workers/workerClientStore";
import { useNetworkStore } from "@zknoid/sdk/lib/stores/network";
import { useChainStore } from "@zknoid/sdk/lib/stores/minaChain";
import { TICKET_PRICE } from "l1-lottery-contracts";
import { formatUnits } from "@zknoid/sdk/lib/unit";
import Loader from "@zknoid/sdk/components/shared/Loader";
import { Currency } from "@zknoid/sdk/constants/currency";
import { useNotificationStore } from "@zknoid/sdk/components/shared/Notification/lib/notificationStore";
import { useMinaBalancesStore } from "@zknoid/sdk/lib/stores/minaBalances";
import { VoucherMode } from "../../../ui/TicketsSection/lib/voucherMode";
// import { BRIDGE_ADDR } from '@zknoid/sdk/constants';
import * as crypto from "crypto";
import { Poseidon, PublicKey, CircuitString } from "o1js";
import LotteryContext from "../../../lib/contexts/LotteryContext";
import { useGiftCodes } from "../../../stores/giftCodes";
import BoughtModal from "../../Modals/BoughtModal";
import { useBoughtModalStore } from "@zknoid/sdk/lib/stores/boughtModalStore";
import { api } from "../../../../../../apps/web/trpc/react";

enum BoughtModalsVariants {
  ticket = "ticket",
  codeBuy = "codeBuy",
  codeUse = "codeUse",
}

export default function BuyInfoCard({
  buttonActive,
  loaderActive,
  ticketsInfo,
  clearTickets,
  voucherMode,
  setVoucherMode,
  giftCodeToBuyAmount,
  setGiftCodeToBuyAmount,
  giftCode,
}: {
  buttonActive: ReactNode;
  loaderActive: boolean;
  ticketsInfo: {
    amount: number;
    numbers: number[];
  }[];
  clearTickets: () => void;
  voucherMode: VoucherMode;
  setVoucherMode: (mode: VoucherMode) => void;
  giftCodeToBuyAmount: number;
  setGiftCodeToBuyAmount: (amount: number) => void;
  giftCode: string;
}) {
  const workerStore = useWorkerClientStore();
  const networkStore = useNetworkStore();
  const notificationStore = useNotificationStore();
  const boughtModalStore = useBoughtModalStore();

  const { addGiftCodesMutation, sendTicketQueueMutation, roundInfo } =
    useContext(LotteryContext);

  const addUserTransactionMutation =
    api.http.txStore.addTransaction.useMutation();

  const numberOfTickets =
    voucherMode == VoucherMode.List
      ? giftCodeToBuyAmount
      : ticketsInfo.map((x) => x.amount).reduce((x, y) => x + y, 0);
  const cost = +TICKET_PRICE;
  const totalPrice =
    voucherMode == VoucherMode.List
      ? giftCodeToBuyAmount * cost
      : numberOfTickets * cost;

  const minaBalancesStore = useMinaBalancesStore();
  const balance = (
    Number(minaBalancesStore.balances[networkStore.address!] ?? 0n) /
    10 ** 9
  ).toFixed(2);
  const giftCodesStore = useGiftCodes();

  const buyTicket = async () => {
    const txJson = await workerStore.buyTicket(
      roundInfo!.plotteryAddress,
      networkStore.address!,
      ticketsInfo[0].numbers,
      numberOfTickets
    );
    console.log("txJson", txJson);
    await sendTransaction(JSON.stringify(txJson))
      .then((transaction: string | undefined) => {
        if (transaction) {
          clearTickets();
          boughtModalStore.open(BoughtModalsVariants.ticket);
          notificationStore.create({
            type: "success",
            message: "Transaction sent",
          });

          addUserTransactionMutation.mutate({
            userAddress: networkStore.address!,
            txHash: transaction,
            type: "Lottery ticket purchase",
          });
        } else {
          notificationStore.create({
            type: "error",
            message: "Transaction rejected by user",
          });
        }
      })
      .catch((error) => {
        console.log("Error while sending transaction", error);
        notificationStore.create({
          type: "error",
          message: "Error while sending transaction",
          dismissDelay: 10000,
        });
      });
  };

  const buyVoucher = async () => {
    if (!networkStore.address) return;

    try {
      const codes = [];

      for (let i = 0; i < numberOfTickets; i++) {
        codes.push(crypto.randomBytes(8).toString("hex"));
      }

      const addedCodes = {
        userAddress: networkStore.address,
        paymentHash: "",
        signature: "",
        codes,
      };

      const dataToSign = codes
        .map((x) =>
          Poseidon.hashPacked(CircuitString, CircuitString.fromString(x))
        )
        .flatMap((x) => x.toFields());

      const response = await (window as any).mina.signFields({
        message: dataToSign.map((field) => field.toString()),
      });

      addedCodes.signature = response.signature;

      console.log("Added codes", addedCodes);

      const tx = await (window as any).mina.sendPayment({
        memo: `zknoid.io lottery gift code`,
        to:
          process.env.NEXT_PUBLIC_GIFT_CODES_TREASURY ||
          PublicKey.empty().toBase58(),
        amount: parseFloat(formatUnits(totalPrice)),
      });

      addedCodes.paymentHash = tx.hash;

      addGiftCodesMutation(addedCodes);
      giftCodesStore.addGiftCodes(
        addedCodes.codes.map((x) => ({
          code: x,
          used: false,
          approved: false,
          deleted: false,
          createdAt: Date.now(),
        }))
      );

      setGiftCodeToBuyAmount(1);
      setVoucherMode(VoucherMode.List);
      boughtModalStore.open(BoughtModalsVariants.codeBuy);
      notificationStore.create({
        type: "success",
        message: "Gift codes successfully bought",
      });
    } catch (error: any) {
      if (error.code == 1001) {
        await requestAccounts();
        // await bridge(totalPrice);
        return;
      }
      console.log(error);
      notificationStore.create({
        type: "error",
        message: "Error while buying gift code",
      });
    }
  };

  const sendTicketQueue = async () => {
    const dataToSign = Poseidon.hashPacked(
      CircuitString,
      CircuitString.fromString(giftCode)
    );
    let response;

    try {
      response = await (window as any).mina.signFields({
        message: [dataToSign.toString()],
      });
    } catch (e: any) {
      if (e?.code == 1001) {
        await requestAccounts();
        return await sendTicketQueue();
      }
    }

    sendTicketQueueMutation({
      userAddress: networkStore.address || "",
      giftCode: giftCode,
      roundId: workerStore.lotteryRoundId,
      ticket: { numbers: ticketsInfo[0].numbers },
      signature: response.signature,
    });
    setVoucherMode(VoucherMode.Closed);
    clearTickets();
    boughtModalStore.open(BoughtModalsVariants.codeUse);
    notificationStore.create({
      type: "success",
      message: "Transaction sent",
    });
  };
  return (
    <div className="relative flex h-[46.512vw] lg:!h-[13.53vw] w-full lg:!w-[20vw] flex-col rounded-[2.326vw] lg:!rounded-[0.67vw] bg-[#252525] p-[4.651vw] lg:!p-[1.33vw] font-plexsans text-[3.721vw] lg:!text-[0.833vw] shadow-2xl">
      <div className="flex flex-row">
        <div className="text-nowrap">
          Number of {voucherMode == VoucherMode.List ? "codes" : "tickets"}
        </div>
        <div className="mx-1 mb-[0.3vw] w-full border-spacing-6 border-b border-dotted border-[#F9F8F4] opacity-50"></div>
        <div className="">
          {voucherMode == VoucherMode.UseValid ? "1" : numberOfTickets}
        </div>
      </div>
      <div className="flex flex-row">
        <div className="text-nowrap">
          Cost per {voucherMode == VoucherMode.List ? "code" : "ticket"}
        </div>
        <div className="mx-1 mb-[0.3vw] w-full border-spacing-6 border-b border-dotted border-[#F9F8F4] opacity-50"></div>
        <div className="">
          {formatUnits(cost)}
          {Currency.MINA}
        </div>
      </div>
      {voucherMode == VoucherMode.UseValid && (
        <div className="flex flex-row">
          <div className="text-nowrap">Discount</div>
          <div className="mx-1 mb-[0.3vw] w-full border-spacing-6 border-b border-dotted border-[#F9F8F4] opacity-50"></div>
          <div className="">
            -{formatUnits(cost)}
            {Currency.MINA}
          </div>
        </div>
      )}
      <div className="mt-auto flex flex-row">
        <div className="text-nowrap font-medium">TOTAL AMOUNT</div>
        <div className="mx-1 mb-[0.3vw] w-full border-spacing-6 border-b border-dotted border-[#F9F8F4] opacity-50"></div>
        <div className="">
          {voucherMode == VoucherMode.UseValid ? "0" : formatUnits(totalPrice)}
          {Currency.MINA}
        </div>
      </div>
      {voucherMode != VoucherMode.UseValid &&
        Number(balance) < Number(formatUnits(totalPrice)) && (
          <div
            className={
              "mt-[1vw] flex w-full flex-row items-center gap-[0.26vw]"
            }
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={"h-[0.729vw] w-[0.729vw]"}
            >
              <circle
                cx="7"
                cy="7"
                r="6"
                fill="#FF0000"
                stroke="#FF0000"
                strokeWidth="0.500035"
              />
              <path
                d="M6.72053 8.68987L6.30053 5.10187V2.71387H7.71653V5.10187L7.32053 8.68987H6.72053ZM7.02053 11.2339C6.71653 11.2339 6.49253 11.1619 6.34853 11.0179C6.21253 10.8659 6.14453 10.6739 6.14453 10.4419V10.2379C6.14453 10.0059 6.21253 9.81787 6.34853 9.67387C6.49253 9.52187 6.71653 9.44587 7.02053 9.44587C7.32453 9.44587 7.54453 9.52187 7.68053 9.67387C7.82453 9.81787 7.89653 10.0059 7.89653 10.2379V10.4419C7.89653 10.6739 7.82453 10.8659 7.68053 11.0179C7.54453 11.1619 7.32453 11.2339 7.02053 11.2339Z"
                fill="#F9F8F4"
              />
            </svg>
            <span className={"font-plexsans text-[0.625vw] text-[#FF0000]"}>
              There are not enough funds in your wallet
            </span>
          </div>
        )}
      <button
        className={cn(
          "mb-0 mt-auto flex lg:!h-[2.13vw] cursor-pointer items-center justify-center rounded-[1.163vw] lg:!rounded-[0.33vw] border-bg-dark bg-right-accent px-[1vw] py-[1.86vw] lg:!py-0 text-[3.721vw] lg:!text-[1.07vw] text-bg-dark hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:opacity-60",
          {
            "cursor-progress": loaderActive,
            "mt-[9.302vw] lg:!mt-[0.25vw]":
              Number(balance) < Number(formatUnits(totalPrice)),
            "mt-[9.302vw] lg:!mt-[1vw]":
              Number(balance) > Number(formatUnits(totalPrice)),
          }
        )}
        disabled={
          voucherMode != VoucherMode.UseValid
            ? Number(balance) < Number(formatUnits(totalPrice)) ||
              !buttonActive ||
              (voucherMode != VoucherMode.List && !ticketsInfo.length)
            : !ticketsInfo.length && !buttonActive
        }
        onClick={async () => {
          voucherMode == VoucherMode.UseValid
            ? sendTicketQueue()
            : voucherMode == VoucherMode.List
              ? await buyVoucher()
              : await buyTicket();
        }}
      >
        <div className={"flex flex-row items-center gap-[10%]"}>
          {loaderActive && <Loader size={19} color={"#212121"} />}
          <span>
            {voucherMode == VoucherMode.UseValid
              ? "Receive ticket"
              : Number(balance) < Number(formatUnits(totalPrice))
                ? "Not enough funds"
                : "Pay"}
          </span>
        </div>
      </button>

      {boughtModalStore.openModalId === BoughtModalsVariants.ticket &&
        !boughtModalStore.notShow.includes(BoughtModalsVariants.ticket) && (
          <BoughtModal
            title={"Ticket purchased"}
            text={`You have successfully purchased a ticket! It may take from 2 to 15 minutes for your ticket to appear in your wallet, please wait`}
            icon={"ok"}
            onClose={({ isChecked }) => {
              isChecked
                ? boughtModalStore.addNotShow(BoughtModalsVariants.ticket)
                : undefined;
              boughtModalStore.close();
            }}
          />
        )}
      {boughtModalStore.openModalId === BoughtModalsVariants.codeBuy &&
        !boughtModalStore.notShow.includes(BoughtModalsVariants.codeBuy) && (
          <BoughtModal
            title={"Access code purchased"}
            text={
              "You have successfully purchased the access code! Please wait until it becomes available for use. It may take from 2 to 15 minutes."
            }
            icon={"ok"}
            onClose={({ isChecked }) => {
              isChecked
                ? boughtModalStore.addNotShow(BoughtModalsVariants.codeBuy)
                : undefined;
              boughtModalStore.close();
            }}
          />
        )}
      {boughtModalStore.openModalId === BoughtModalsVariants.codeUse &&
        !boughtModalStore.notShow.includes(BoughtModalsVariants.codeUse) && (
          <BoughtModal
            title={"Access code used"}
            text={
              "You have successfully activate the access code. Soon it become available in your wallet. It may take from 2 to 15 minutes."
            }
            icon={"ticket"}
            onClose={({ isChecked }) => {
              isChecked
                ? boughtModalStore.addNotShow(BoughtModalsVariants.codeUse)
                : undefined;
              boughtModalStore.close();
            }}
          />
        )}
    </div>
  );
}
