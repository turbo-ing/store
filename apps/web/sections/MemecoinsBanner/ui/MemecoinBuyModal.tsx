"use client";

import Image from "next/image";
import minaICON from "@/public/image/memecoins/mina.svg";
import dragonICON from "@/public/image/memecoins/dragon.svg";
import frogICON from "@/public/image/memecoins/frog.svg";
import { ChangeEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@zknoid/sdk/lib/helpers";
import { useNetworkStore } from "@zknoid/sdk/lib/stores/network";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTriggerChevron,
  SelectValue,
} from "../../../../../packages/sdk/components/shared/Select/Select";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNotificationStore } from "@zknoid/sdk/components/shared/Notification/lib/notificationStore";
import { api } from "../../../trpc/react";
import { NetworkIds, NETWORKS } from "@zknoid/sdk/constants/networks";
import NetworkValidator from "@zknoid/sdk/components/widgets/NetworkValidator";

const frogTokenAddress = process.env.NEXT_PUBLIC_FROG_TOKEN_ADDRESS!;
const dragonTokenAddress = process.env.NEXT_PUBLIC_DRAGON_TOKEN_ADDRESS!;

export function MemecoinBuyModal({
  token,
  onClose,
  frogPrice,
  dragonPrice,
}: {
  token: "frog" | "dragon";
  onClose: () => void;
  frogPrice: number;
  dragonPrice: number;
}) {
  const networkStore = useNetworkStore();

  const mintTokensMutation = api.http.memetokens.mintTokens.useMutation({
    retry: 3,
    retryDelay: 3000, // 3 sec
  });
  const proveTxMutation = api.http.memetokens.proveTx.useMutation();
  const checkProofStatusMutation =
    api.http.memetokens.checkProofStatus.useMutation();
  const checkTransactionStatusMutation =
    api.http.memetokens.checkTransactionStatus.useMutation();
  const addUserTransactionMutation =
    api.http.txStore.addTransaction.useMutation();

  const notificationStore = useNotificationStore();
  const [chosenCoin, setChosenCoin] = useState<"frog" | "dragon">(token);
  const [buyAmount, setBuyAmount] = useState<number>(
    Number((1 / (token === "frog" ? frogPrice : dragonPrice)).toFixed(4))
  );
  const [minaAmount, setMinaAmount] = useState<number>(1);

  const [price, setPrice] = useState<number>(
    token === "frog" ? frogPrice : dragonPrice
  );

  const [statusArray, setStatusArray] = useState<string[]>([]);
  const [txStatus, setTxStatus] = useState<string | null>(null);
  const [canCloseWindow, setCanCloseWindow] = useState<boolean>(true);

  const mintTokens = async (amount: number) => {
    const tokenAddress =
      chosenCoin === "frog" ? frogTokenAddress : dragonTokenAddress;
    const sender = networkStore.address!;
    const adaptiveAmount = Math.floor(amount * 1e9);
    const adaptivePrice = Math.floor(price * 1e9);

    setTxStatus("Generating transaction...");
    setStatusArray((old) => [...old, "Generating transaction..."]);

    const txData = await mintTokensMutation.mutateAsync({
      sender,
      tokenAddress,
      to: sender,
      amount: adaptiveAmount,
      price: adaptivePrice,
    });
    if (!txData) throw new Error("No tx data returned from server");

    setTxStatus("Waiting for user to sign transaction...");
    setStatusArray((old) => [
      ...old,
      "Waiting for user to sign transaction...",
    ]);

    const txResult = await (window as any).mina?.sendTransaction(
      txData.walletPayload
    );

    setTxStatus("Waiting for transaction to be proved on server...");
    setStatusArray((old) => [
      ...old,
      "Waiting for transaction to be proved on server...",
    ]);
    setCanCloseWindow(true);

    const serverProvingNotificationID = notificationStore.create({
      type: "loader",
      message: "Memecoin mint: Server proving",
      dismissAfterDelay: false,
    });

    const proveData = await proveTxMutation.mutateAsync({
      tx: txData,
      signedData: txResult.signedData,
    });
    if (!proveData?.jobId) {
      notificationStore.remove(serverProvingNotificationID);
      notificationStore.create({
        type: "error",
        message: "Memecoin mint: Error while server proving",
      });
      throw new Error("No jobId returned from server");
    }

    let foundProof = false;
    let numOfAttempts = 0;
    const MAX_NUM_OF_ATTEMPTS = 100;

    let proofs;

    while (!foundProof && numOfAttempts < MAX_NUM_OF_ATTEMPTS) {
      try {
        proofs = (
          await checkProofStatusMutation.mutateAsync({
            jobId: proveData.jobId,
          })
        ).data;

        if (
          proofs?.success === true &&
          (proofs?.jobStatus === "finished" || proofs.jobStatus === "used")
        ) {
          foundProof = true;
        } else {
          numOfAttempts++;
          await new Promise((resolve) => setTimeout(resolve, 10000));
        }
      } catch (e) {
        console.log(`Error checking proof status: ${e}`);
        numOfAttempts++;
        await new Promise((resolve) => setTimeout(resolve, 10000));
      }
    }

    if (!foundProof) {
      notificationStore.remove(serverProvingNotificationID);
      notificationStore.create({
        type: "error",
        message: "Memecoin mint: Error while server proving",
      });
      throw new Error("Proof not found");
    }

    if (!proofs || proofs.results?.length === 0) {
      notificationStore.remove(serverProvingNotificationID);
      notificationStore.create({
        type: "error",
        message: "Memecoin mint: Error while server proving",
      });
      throw new Error("No proofs returned");
    }

    const hash = proofs.results![0].hash;

    setTxStatus("Proof generated. Waiting for transaction to be mined");
    setStatusArray((old) => [
      ...old,
      `Proof generated. Waiting for transaction (${hash}) to be mined`,
    ]);
    notificationStore.remove(serverProvingNotificationID);
    const mintNotificationID = notificationStore.create({
      type: "loader",
      message: "Memecoin mint: Proof generated. Waiting to mint",
      dismissAfterDelay: false,
    });

    if (!hash) {
      notificationStore.remove(mintNotificationID);
      notificationStore.create({
        type: "error",
        message: "Memecoin mint: Error while minting, no hash",
      });
      return;
    }

    let txFound = false;
    let txNumOfAttempts = 0;

    // Add tx to txStore
    addUserTransactionMutation.mutate({
      userAddress: sender,
      txHash: hash,
      type: "Memecoins mint",
    });

    while (!txFound && txNumOfAttempts < MAX_NUM_OF_ATTEMPTS) {
      try {
        const txStatus = await checkTransactionStatusMutation.mutateAsync({
          txHash: hash,
        });

        if (txStatus.success && !txStatus.pending) {
          txFound = true;
        } else {
          txNumOfAttempts++;
          await new Promise((resolve) => setTimeout(resolve, 20000));
        }
      } catch (e) {
        console.log(`Error checking transaction status: ${e}`);
        numOfAttempts++;
        await new Promise((resolve) => setTimeout(resolve, 20000));
      }
    }

    if (!txFound) {
      notificationStore.remove(mintNotificationID);
      notificationStore.create({
        type: "error",
        message: "Memecoin mint: Error while minting, no tx found",
      });
      throw new Error("Tx not found");
    }

    setTxStatus("Mined");
    setStatusArray((old) => [...old, `Tx ${hash} mined`]);
    notificationStore.remove(mintNotificationID);
    notificationStore.create({
      type: "success",
      message: "Memecoin mint: Successfully mined!",
    });
  };

  const validationSchema = Yup.object().shape({
    amount: Yup.number().min(1, "Min amount: 1").required("Amount is required"),
    minaAmount: Yup.number()
      .min(
        chosenCoin === "frog" ? frogPrice : dragonPrice,
        `Min amount: ${chosenCoin === "frog" ? frogPrice : dragonPrice}`
      )
      .required("Amount is required"),
  });

  const onFormSubmit = async () => {
    setStatusArray([]);
    setCanCloseWindow(false);
    await mintTokens(buyAmount).catch((e) => {
      console.error(e);
      onClose();
      if (e?.code == 1002) {
        notificationStore.create({
          type: "error",
          message: "User rejected transaction...",
        });
      } else {
        notificationStore.create({
          type: "error",
          message: "Error while minting NFT",
        });
      }
    });
  };

  useEffect(() => {
    setPrice(chosenCoin === "frog" ? frogPrice : dragonPrice);
  }, [chosenCoin, frogPrice, dragonPrice]);

  const removeLeadingZero = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const num = parseFloat(value);

    if (value.startsWith("0") && !value.startsWith("0.")) {
      event.target.value = num.toString();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", duration: 0.4, bounce: 0 }}
      className={
        "fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center backdrop-blur-md p-[10vw] lg:!p-0"
      }
      onClick={canCloseWindow ? onClose : undefined}
    >
      <div
        className={
          "min-h-[20.833vw] min-w-[28.646vw] relative flex flex-col rounded-[0.781vw] bg-bg-dark p-[1.563vw]"
        }
        onClick={(e) => e.stopPropagation()}
      >
        <Formik
          initialValues={{ amount: buyAmount, minaAmount: minaAmount }}
          validationSchema={validationSchema}
          onSubmit={() => onFormSubmit()}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className={"flex flex-col"}>
              <div
                className={
                  "w-full text-center mb-[0.521vw] text-[1.667vw] font-museo font-bold text-foreground"
                }
              >
                Mint {chosenCoin == "frog" ? "Frozen Frog" : "Fire Dragon"}{" "}
                Token
              </div>
              <div className={"flex flex-col gap-[0.26vw] mb-[1.042vw]"}>
                <div
                  className={
                    "flex flex-row items-center justify-between w-full"
                  }
                >
                  <span
                    className={
                      "text-[0.833vw] font-plexsans text-foreground leading-[110%]"
                    }
                  >
                    From
                  </span>
                  {touched.minaAmount && errors.minaAmount && (
                    <span
                      className={
                        "text-[0.833vw] font-plexsans text-[#FF5B23] leading-[110%]"
                      }
                    >
                      {errors.minaAmount}
                    </span>
                  )}
                </div>
                <div
                  className={
                    "rounded-[0.521vw] bg-[#252525] p-[0.781vw] flex flex-row items-center"
                  }
                >
                  <Image
                    src={minaICON}
                    alt={"Mina icon"}
                    className={"w-[1.771vw] h-[1.771vw]"}
                  />
                  <span
                    className={
                      "ml-[0.521vw] text-foreground text-[1.042vw] font-medium font-plexsans leading-[110%] uppercase"
                    }
                  >
                    MINA
                  </span>
                  <Field
                    name={"minaAmount"}
                    type={"number"}
                    onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                      removeLeadingZero(e);
                      const value = Number(e.target.value);
                      const tokenAmount = Number((value / price).toFixed(4));

                      await setFieldValue("minaAmount", value);
                      await setFieldValue("amount", tokenAmount);
                      setMinaAmount(value);
                      setBuyAmount(tokenAmount);
                    }}
                    className={
                      "w-full text-right ml-[1vw] outline-none appearance-none focus:outline-none bg-[#252525] mr-[0.521vw] text-foreground text-[1.042vw] font-medium font-plexsans leading-[110%] uppercase"
                    }
                  />
                </div>
                <div className={"w-full h-px my-[1.042vw] bg-[#252525]"} />
                <div
                  className={
                    "flex flex-row items-center justify-between w-full"
                  }
                >
                  <span
                    className={
                      "text-[0.833vw] font-plexsans text-foreground leading-[110%]"
                    }
                  >
                    To
                  </span>
                  {touched.amount && errors.amount && (
                    <span
                      className={
                        "text-[0.833vw] font-plexsans text-[#FF5B23] leading-[110%]"
                      }
                    >
                      {errors.amount}
                    </span>
                  )}
                </div>
                <div
                  className={
                    "rounded-[0.521vw] bg-[#252525] p-[0.781vw] flex flex-row items-center"
                  }
                >
                  <Image
                    src={chosenCoin === "frog" ? frogICON : dragonICON}
                    alt={"Coin icon"}
                    className={"w-[1.771vw] h-[1.771vw]"}
                  />
                  <Select
                    value={chosenCoin}
                    onValueChange={async (value: "frog" | "dragon") => {
                      setChosenCoin(value);
                      const currentPrice = Number(
                        (
                          1 / (value === "frog" ? frogPrice : dragonPrice)
                        ).toFixed(4)
                      );
                      await setFieldValue("amount", currentPrice);
                      await setFieldValue("minaAmount", 1);
                      setBuyAmount(currentPrice);
                      setMinaAmount(1);
                    }}
                  >
                    <SelectTriggerChevron className="ml-[0.521vw] text-foreground text-[1.042vw] font-medium font-plexsans leading-[110%] uppercase">
                      <SelectValue />
                    </SelectTriggerChevron>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={"frog"}>Frog</SelectItem>
                        <SelectItem value={"dragon"}>Dragon</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <Field
                    name={"amount"}
                    type={"number"}
                    onChange={async (e: ChangeEvent<HTMLInputElement>) => {
                      removeLeadingZero(e);
                      const value = Number(e.target.value);
                      const mintPrice = Number(value * price);

                      await setFieldValue("amount", value);
                      await setFieldValue("minaAmount", mintPrice);
                      setBuyAmount(value);
                      setMinaAmount(mintPrice);
                    }}
                    className={
                      "w-full text-right ml-[1vw] outline-none appearance-none focus:outline-none bg-[#252525] mr-[0.521vw] text-foreground text-[1.042vw] font-medium font-plexsans leading-[110%] uppercase"
                    }
                  />
                </div>
              </div>
              {networkStore.address &&
              networkStore.walletConnected &&
              networkStore.minaNetwork?.networkID == NetworkIds.MINA_MAINNET ? (
                <button
                  type={"submit"}
                  disabled={
                    !canCloseWindow || !!errors.amount || !!errors.minaAmount
                  }
                  className={cn(
                    "disabled:opacity-60 rounded-[0.26vw] py-[0.521vw] flex flex-col justify-center items-center w-full",
                    chosenCoin == "frog" ? "bg-[#3A39FF]" : "bg-[#FF5B23]",
                    !canCloseWindow
                      ? "disabled:cursor-progress"
                      : !!errors.amount || !!errors.minaAmount
                        ? "disabled:cursor-not-allowed"
                        : ""
                  )}
                >
                  <span
                    className={
                      "text-[1.25vw] font-museo font-medium text-foreground"
                    }
                  >
                    Mint {chosenCoin == "frog" ? "Frozen Frog" : "Fire Dragon"}
                  </span>
                </button>
              ) : (
                <button
                  type={"button"}
                  disabled={true}
                  className={cn(
                    "disabled:opacity-60 disabled:cursor-not-allowed rounded-[0.26vw] py-[0.521vw] flex flex-col justify-center items-center w-full",
                    chosenCoin == "frog" ? "bg-[#3A39FF]" : "bg-[#FF5B23]"
                  )}
                >
                  <span
                    className={
                      "text-[1.25vw] font-museo font-medium text-foreground"
                    }
                  >
                    Wrong network
                  </span>
                </button>
              )}

              {statusArray.length != 0 ? (
                <div className={"mt-[1.042vw] gap-[0.508vw] flex flex-col"}>
                  {statusArray.map((status) => {
                    return (
                      <span
                        className={
                          "text-[0.833vw] font-plexsans text-foreground leading-[110%]"
                        }
                      >
                        {status}
                      </span>
                    );
                  })}
                  {canCloseWindow && (
                    <>
                      <span
                        className={
                          "text-[0.833vw] font-plexsans text-foreground leading-[110%]"
                        }
                      >
                        Tokens soon will appear in your wallet and leaderboard
                        (~10 minutes)
                      </span>
                      <span
                        className={
                          "text-[0.833vw] font-plexsans text-green-500 leading-[110%]"
                        }
                      >
                        You can close this window!
                      </span>
                    </>
                  )}
                </div>
              ) : (
                <div
                  className={
                    "flex flex-row gap-[0.26vw] mt-[0.781vw] max-w-[20.833vw]"
                  }
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={"w-[0.833vw] h-[0.833vw]"}
                  >
                    <circle
                      cx="7"
                      cy="7"
                      r="6"
                      fill="#8F8E8C"
                      stroke="#8F8E8C"
                      stroke-width="0.500035"
                    />
                    <path
                      d="M6.71907 8.69084L6.29907 5.10284V2.71484H7.71507V5.10284L7.31907 8.69084H6.71907ZM7.01907 11.2348C6.71507 11.2348 6.49107 11.1628 6.34707 11.0188C6.21107 10.8668 6.14307 10.6748 6.14307 10.4428V10.2388C6.14307 10.0068 6.21107 9.81884 6.34707 9.67484C6.49107 9.52284 6.71507 9.44684 7.01907 9.44684C7.32307 9.44684 7.54307 9.52284 7.67907 9.67484C7.82307 9.81884 7.89507 10.0068 7.89507 10.2388V10.4428C7.89507 10.6748 7.82307 10.8668 7.67907 11.0188C7.54307 11.1628 7.32307 11.2348 7.01907 11.2348Z"
                      fill="#252525"
                    />
                  </svg>
                  <span
                    className={
                      "text-[0.729vw] text-foreground font-plexsans leading-[110%] w-fit"
                    }
                  >
                    The Mina blockchain will burn 1 MINA for your first memecoin
                    mint to activate the new address. No fees will be charged
                    for subsequent mints.
                  </span>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
      <NetworkValidator
        expectedNetwork={
          NETWORKS[
            process.env.NEXT_PUBLIC_NETWORK_ID || NetworkIds.MINA_MAINNET
          ]
        }
      />
    </motion.div>
  );
}
