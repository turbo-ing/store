import { cn } from "@zknoid/sdk/lib/helpers";
import TicketCard from "./ui/TicketCard";
import BuyInfoCard from "./ui/BuyInfoCard";
import { use, useEffect, useState } from "react";
import OwnedTickets from "./OwnedTickets";
import { useWorkerClientStore } from "../../workers/workerClientStore";
import { AnimatePresence } from "framer-motion";
import PreviousRounds from "./PreviousRounds";
import { useNotificationStore } from "@zknoid/sdk/components/shared/Notification/lib/notificationStore";
import { useRoundsStore } from "../../lib/roundsStore";
import BoughtGiftCodes from "./GiftCodes/BoughtGiftCodes";
import UseGiftCodeForm from "./GiftCodes/UseGiftCodeForm";
import ValidGiftCode from "./GiftCodes/ValidGiftCode";
import BuyGiftCodesCounter from "./GiftCodes/BuyGiftCodesCounter";
import { VoucherMode } from "./lib/voucherMode";
import Image from "next/image";
import noCodesImg from "../../images/no-gift-codes.svg";
import { useGiftCodes } from "../../stores/giftCodes";
import { LOTTERY_ROUND_OFFSET } from "./OwnedTickets/lib/constant";

interface TicketInfo {
  amount: number;
  numbers: number[];
}

export default function TicketsSection() {
  const workerClientStore = useWorkerClientStore();
  const lotteryStore = useWorkerClientStore();
  const roundsStore = useRoundsStore();
  const notificationStore = useNotificationStore();
  const { giftCodes } = useGiftCodes();

  const [tickets, setTickets] = useState<TicketInfo[]>([]);
  const [blankTicket, setBlankTicket] = useState<boolean>(true);
  const [voucherMode, setVoucherMode] = useState<VoucherMode>(
    VoucherMode.Closed
  );
  const [giftCode, setGiftCode] = useState<string>("");
  const [giftCodeToBuyAmount, setGiftCodeToBuyAmount] = useState<number>(1);
  const [hasOwnedTickets, setHasOwnedTickets] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    setTickets([]);
  }, [roundsStore.roundToShowId]);

  useEffect(() => {
    if (tickets.length == 0 && !blankTicket) setBlankTicket(true);
  }, [tickets.length]);

  const renderTickets = blankTicket ? [...tickets, blankTicket] : tickets;

  const submitForm = (giftCode: string) => {
    setGiftCode(giftCode);
    setVoucherMode(VoucherMode.UseValid);
  };

  useEffect(() => {
    const checkWidth = () => {
      if (window.innerWidth <= 1024) setIsMobile(true);
      else setIsMobile(false);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);

    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  useEffect(() => {
    console.log("Compare effect");
    console.log(roundsStore.roundToShowId, lotteryStore.lotteryRoundId);
  }, [lotteryStore.lotteryRoundId]);

  return (
    <div
      className={cn(
        "mt-[12.791vw] lg:!mt-0 relative flex flex-col rounded-[0.67vw] lg:!border border-left-accent lg:!bg-bg-grey lg:!px-[2vw] lg:!py-[2.67vw]",
        {
          "gap-[2.604vw]":
            hasOwnedTickets ||
            roundsStore.roundToShowId == lotteryStore.lotteryRoundId,
        }
      )}
    >
      <div className="">
        <div
          className={cn("flex flex-col lg:!grid gap-[16.279vw] lg:!gap-[2vw]", {
            "grid-cols-2":
              roundsStore.roundToShowId == lotteryStore.lotteryRoundId,
            "grid-cols-1":
              roundsStore.roundToShowId != lotteryStore.lotteryRoundId,
          })}
        >
          <OwnedTickets
            hasOwnedTickets={hasOwnedTickets}
            setHasOwnedTickets={setHasOwnedTickets}
          />
          {roundsStore.roundToShowId == lotteryStore.lotteryRoundId && (
            <div className={"flex flex-col"}>
              <div className="mb-[1.33vw] text-[7.442vw] lg:!text-[2.13vw]">
                Buy tickets
              </div>
              <div className={"flex flex-col lg:!flex-row gap-[1.33vw]"}>
                <div className={"flex flex-col gap-[0.521vw]"}>
                  {voucherMode != VoucherMode.Closed && (
                    <button
                      className={
                        "mb-[2.326vw] lg:!mb-[0.521vw] flex lg:!hidden h-[6.047vw] lg:!h-[1.354vw] w-[16.279vw] lg:!w-[3.802vw] flex-row items-center justify-center rounded-[1.163vw] lg:!rounded-[0.144vw] border border-foreground hover:opacity-80"
                      }
                      onClick={() => setVoucherMode(VoucherMode.Closed)}
                    >
                      <svg
                        width="0.378vw"
                        height="0.781vw"
                        viewBox="0 0 9 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={
                          "mr-[1.163vw] lg:!mr-[0.26vw] h-[3.488vw] lg:!h-[0.781vw] w-[1.628vw] lg:!w-[0.378vw]"
                        }
                      >
                        <path
                          d="M8.36328 0.5L1.10522 8L8.36328 15.5"
                          stroke="#F9F8F4"
                        />
                      </svg>
                      <span
                        className={
                          "pt-px font-museo text-[3.256vw] lg:!text-[0.729vw] font-medium text-foreground"
                        }
                      >
                        Back
                      </span>
                    </button>
                  )}
                  {(voucherMode == VoucherMode.Closed ||
                    voucherMode == VoucherMode.Use ||
                    voucherMode == VoucherMode.UseValid) && (
                    <div
                      className={cn(
                        "flex flex-col",
                        voucherMode == VoucherMode.Closed
                          ? "gap-[2.326vw] lg:!gap-0"
                          : "gap-0"
                      )}
                    >
                      <button
                        className={cn(
                          "flex w-full lg:!w-[22.5vw] cursor-pointer flex-row items-center justify-center gap-[4.651vw] lg:!gap-[0.781vw] rounded-[2.326vw] lg:!rounded-[0.521vw] bg-right-accent py-[1.628vw] lg:!py-[0.365vw] hover:opacity-80 disabled:cursor-default disabled:hover:opacity-100",
                          {
                            "rounded-b-none": voucherMode != VoucherMode.Closed,
                          }
                        )}
                        onClick={() => setVoucherMode(VoucherMode.Use)}
                        disabled={voucherMode != VoucherMode.Closed}
                      >
                        <svg
                          width="25"
                          height="25"
                          viewBox="0 0 25 25"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className={
                            "my-[0.208vw] h-[5.581vw] lg:!h-[1.302vw] w-[5.581vw] lg:!w-[1.302vw]"
                          }
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M6.75 5.99952C6.74993 5.33115 6.95593 4.67901 7.33993 4.13196C7.72393 3.58491 8.26725 3.16955 8.89587 2.94248C9.52449 2.71541 10.2078 2.68768 10.8528 2.86305C11.4977 3.03843 12.0729 3.40839 12.5 3.92252C13.0438 3.26102 13.8267 2.84085 14.6785 2.75335C15.5303 2.66585 16.3823 2.91807 17.0492 3.45521C17.7161 3.99235 18.1441 4.77099 18.2401 5.62191C18.3361 6.47284 18.0924 7.32727 17.562 7.99952H18.5C18.8283 7.99952 19.1534 8.06419 19.4567 8.18982C19.76 8.31546 20.0356 8.49961 20.2678 8.73175C20.4999 8.9639 20.6841 9.2395 20.8097 9.54281C20.9353 9.84613 21 10.1712 21 10.4995V11.7495C21 11.9484 20.921 12.1392 20.7803 12.2799C20.6397 12.4205 20.4489 12.4995 20.25 12.4995H13.55C13.5106 12.4995 13.4716 12.4918 13.4352 12.4767C13.3988 12.4616 13.3657 12.4395 13.3379 12.4117C13.31 12.3838 13.2879 12.3507 13.2728 12.3143C13.2578 12.2779 13.25 12.2389 13.25 12.1995V8.73952C12.9674 8.55836 12.7145 8.33474 12.5 8.07652C12.2855 8.33438 12.0325 8.55767 11.75 8.73852V12.1995C11.75 12.2791 11.7184 12.3554 11.6621 12.4117C11.6059 12.4679 11.5296 12.4995 11.45 12.4995H4.75C4.55109 12.4995 4.36032 12.4205 4.21967 12.2799C4.07902 12.1392 4 11.9484 4 11.7495V10.4995C4 10.1712 4.06466 9.84613 4.1903 9.54281C4.31594 9.2395 4.50009 8.9639 4.73223 8.73175C4.96438 8.49961 5.23998 8.31546 5.54329 8.18982C5.84661 8.06419 6.1717 7.99952 6.5 7.99952H7.438C6.99113 7.42873 6.74885 6.72443 6.75 5.99952ZM11.75 5.99952C11.75 5.53539 11.5656 5.09027 11.2374 4.76208C10.9092 4.4339 10.4641 4.24952 10 4.24952C9.53587 4.24952 9.09075 4.4339 8.76256 4.76208C8.43437 5.09027 8.25 5.53539 8.25 5.99952C8.25 6.46365 8.43437 6.90877 8.76256 7.23696C9.09075 7.56515 9.53587 7.74952 10 7.74952C10.4641 7.74952 10.9092 7.56515 11.2374 7.23696C11.5656 6.90877 11.75 6.46365 11.75 5.99952ZM13.25 5.99952C13.25 6.22933 13.2953 6.4569 13.3832 6.66922C13.4712 6.88154 13.6001 7.07446 13.7626 7.23696C13.9251 7.39946 14.118 7.52836 14.3303 7.61631C14.5426 7.70426 14.7702 7.74952 15 7.74952C15.2298 7.74952 15.4574 7.70426 15.6697 7.61631C15.882 7.52836 16.0749 7.39946 16.2374 7.23696C16.3999 7.07446 16.5288 6.88154 16.6168 6.66922C16.7047 6.4569 16.75 6.22933 16.75 5.99952C16.75 5.53539 16.5656 5.09027 16.2374 4.76208C15.9092 4.4339 15.4641 4.24952 15 4.24952C14.5359 4.24952 14.0908 4.4339 13.7626 4.76208C13.4344 5.09027 13.25 5.53539 13.25 5.99952Z"
                            fill="#252525"
                          />
                          <path
                            d="M11.7516 14.1496C11.7516 14.07 11.72 13.9937 11.6638 13.9375C11.6075 13.8812 11.5312 13.8496 11.4516 13.8496H6.15062C5.95431 13.8498 5.76439 13.9194 5.61437 14.046C5.46434 14.1726 5.36385 14.3481 5.33062 14.5416C5.10854 15.8375 5.10854 17.1617 5.33062 18.4576L5.55462 19.7666C5.62819 20.1955 5.83912 20.589 6.15564 20.8876C6.47216 21.1863 6.87715 21.374 7.30962 21.4226L8.37462 21.5416C9.39488 21.6557 10.4194 21.7274 11.4456 21.7566C11.4855 21.7577 11.5252 21.7507 11.5624 21.7362C11.5995 21.7216 11.6334 21.6997 11.6619 21.6719C11.6904 21.644 11.7131 21.6106 11.7285 21.5738C11.7439 21.537 11.7518 21.4975 11.7516 21.4576V14.1496ZM13.5576 21.7566C13.5177 21.7577 13.478 21.7507 13.4409 21.7362C13.4037 21.7216 13.3699 21.6997 13.3414 21.6719C13.3128 21.644 13.2902 21.6106 13.2748 21.5738C13.2593 21.537 13.2515 21.4975 13.2516 21.4576V14.1496C13.2516 14.07 13.2832 13.9937 13.3395 13.9375C13.3958 13.8812 13.4721 13.8496 13.5516 13.8496H18.8526C19.2586 13.8496 19.6046 14.1416 19.6726 14.5416C19.8956 15.8376 19.8956 17.1616 19.6726 18.4576L19.4496 19.7666C19.376 20.1957 19.1649 20.5892 18.8482 20.8879C18.5315 21.1866 18.1263 21.3742 17.6936 21.4226L16.6286 21.5416C15.6084 21.6556 14.5838 21.7274 13.5576 21.7566Z"
                            fill="#252525"
                          />
                        </svg>
                        <span
                          className={
                            "mt-[0.208vw] font-museo text-[3.256vw] lg:!text-[0.833vw] font-medium text-bg-dark"
                          }
                        >
                          Use gift access code
                        </span>
                      </button>
                      {voucherMode == VoucherMode.Closed && (
                        <button
                          className={
                            "lg:!hidden w-full cursor-pointer flex flex-row items-center justify-center gap-[4.651vw] lg:!gap-[0.781vw] rounded-[2.326vw] lg:!rounded-[0.521vw] bg-[#252525] py-[1.628vw] lg:!py-[0.365vw] hover:opacity-80"
                          }
                          onClick={() => {
                            isMobile
                              ? notificationStore.create({
                                  type: "error",
                                  message:
                                    "Gift code generation currently supported only on desktop",
                                })
                              : setVoucherMode(VoucherMode.List);
                          }}
                        >
                          <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={
                              "my-[0.208vw] h-[5.581vw] lg:!h-[1.302vw] w-[5.581vw] lg:!w-[1.302vw]"
                            }
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M6.75 5.99952C6.74993 5.33115 6.95593 4.67901 7.33993 4.13196C7.72393 3.58491 8.26725 3.16955 8.89587 2.94248C9.52449 2.71541 10.2078 2.68768 10.8528 2.86305C11.4977 3.03843 12.0729 3.40839 12.5 3.92252C13.0438 3.26102 13.8267 2.84085 14.6785 2.75335C15.5303 2.66585 16.3823 2.91807 17.0492 3.45521C17.7161 3.99235 18.1441 4.77099 18.2401 5.62191C18.3361 6.47284 18.0924 7.32727 17.562 7.99952H18.5C18.8283 7.99952 19.1534 8.06419 19.4567 8.18982C19.76 8.31546 20.0356 8.49961 20.2678 8.73175C20.4999 8.9639 20.6841 9.2395 20.8097 9.54281C20.9353 9.84613 21 10.1712 21 10.4995V11.7495C21 11.9484 20.921 12.1392 20.7803 12.2799C20.6397 12.4205 20.4489 12.4995 20.25 12.4995H13.55C13.5106 12.4995 13.4716 12.4918 13.4352 12.4767C13.3988 12.4616 13.3657 12.4395 13.3379 12.4117C13.31 12.3838 13.2879 12.3507 13.2728 12.3143C13.2578 12.2779 13.25 12.2389 13.25 12.1995V8.73952C12.9674 8.55836 12.7145 8.33474 12.5 8.07652C12.2855 8.33438 12.0325 8.55767 11.75 8.73852V12.1995C11.75 12.2791 11.7184 12.3554 11.6621 12.4117C11.6059 12.4679 11.5296 12.4995 11.45 12.4995H4.75C4.55109 12.4995 4.36032 12.4205 4.21967 12.2799C4.07902 12.1392 4 11.9484 4 11.7495V10.4995C4 10.1712 4.06466 9.84613 4.1903 9.54281C4.31594 9.2395 4.50009 8.9639 4.73223 8.73175C4.96438 8.49961 5.23998 8.31546 5.54329 8.18982C5.84661 8.06419 6.1717 7.99952 6.5 7.99952H7.438C6.99113 7.42873 6.74885 6.72443 6.75 5.99952ZM11.75 5.99952C11.75 5.53539 11.5656 5.09027 11.2374 4.76208C10.9092 4.4339 10.4641 4.24952 10 4.24952C9.53587 4.24952 9.09075 4.4339 8.76256 4.76208C8.43437 5.09027 8.25 5.53539 8.25 5.99952C8.25 6.46365 8.43437 6.90877 8.76256 7.23696C9.09075 7.56515 9.53587 7.74952 10 7.74952C10.4641 7.74952 10.9092 7.56515 11.2374 7.23696C11.5656 6.90877 11.75 6.46365 11.75 5.99952ZM13.25 5.99952C13.25 6.22933 13.2953 6.4569 13.3832 6.66922C13.4712 6.88154 13.6001 7.07446 13.7626 7.23696C13.9251 7.39946 14.118 7.52836 14.3303 7.61631C14.5426 7.70426 14.7702 7.74952 15 7.74952C15.2298 7.74952 15.4574 7.70426 15.6697 7.61631C15.882 7.52836 16.0749 7.39946 16.2374 7.23696C16.3999 7.07446 16.5288 6.88154 16.6168 6.66922C16.7047 6.4569 16.75 6.22933 16.75 5.99952C16.75 5.53539 16.5656 5.09027 16.2374 4.76208C15.9092 4.4339 15.4641 4.24952 15 4.24952C14.5359 4.24952 14.0908 4.4339 13.7626 4.76208C13.4344 5.09027 13.25 5.53539 13.25 5.99952Z"
                              fill="#F9F8F4"
                            />
                            <path
                              d="M11.7516 14.1496C11.7516 14.07 11.72 13.9937 11.6638 13.9375C11.6075 13.8812 11.5312 13.8496 11.4516 13.8496H6.15062C5.95431 13.8498 5.76439 13.9194 5.61437 14.046C5.46434 14.1726 5.36385 14.3481 5.33062 14.5416C5.10854 15.8375 5.10854 17.1617 5.33062 18.4576L5.55462 19.7666C5.62819 20.1955 5.83912 20.589 6.15564 20.8876C6.47216 21.1863 6.87715 21.374 7.30962 21.4226L8.37462 21.5416C9.39488 21.6557 10.4194 21.7274 11.4456 21.7566C11.4855 21.7577 11.5252 21.7507 11.5624 21.7362C11.5995 21.7216 11.6334 21.6997 11.6619 21.6719C11.6904 21.644 11.7131 21.6106 11.7285 21.5738C11.7439 21.537 11.7518 21.4975 11.7516 21.4576V14.1496ZM13.5576 21.7566C13.5177 21.7577 13.478 21.7507 13.4409 21.7362C13.4037 21.7216 13.3699 21.6997 13.3414 21.6719C13.3128 21.644 13.2902 21.6106 13.2748 21.5738C13.2593 21.537 13.2515 21.4975 13.2516 21.4576V14.1496C13.2516 14.07 13.2832 13.9937 13.3395 13.9375C13.3958 13.8812 13.4721 13.8496 13.5516 13.8496H18.8526C19.2586 13.8496 19.6046 14.1416 19.6726 14.5416C19.8956 15.8376 19.8956 17.1616 19.6726 18.4576L19.4496 19.7666C19.376 20.1957 19.1649 20.5892 18.8482 20.8879C18.5315 21.1866 18.1263 21.3742 17.6936 21.4226L16.6286 21.5416C15.6084 21.6556 14.5838 21.7274 13.5576 21.7566Z"
                              fill="#F9F8F4"
                            />
                          </svg>
                          <span
                            className={
                              "mt-[0.208vw] font-museo text-[3.256vw] lg:!text-[0.833vw] font-medium text-foreground"
                            }
                          >
                            Generate gift access code
                          </span>
                        </button>
                      )}
                      {voucherMode == VoucherMode.Use && (
                        <UseGiftCodeForm submitForm={submitForm} />
                      )}
                      {voucherMode == VoucherMode.UseValid && (
                        <ValidGiftCode giftCode={giftCode} />
                      )}
                    </div>
                  )}
                  {voucherMode == VoucherMode.List && (
                    <div
                      className={
                        "flex h-full w-full lg:!w-[22.5vw] flex-col gap-0 rounded-b-[4.651vw] lg:!rounded-b-[0.521vw] bg-[#252525]"
                      }
                    >
                      <div
                        className={"flex w-full justify-center items-center"}
                      >
                        <span
                          className={
                            "rounded-t-[1.163vw] lg:!rounded-t-[0.26vw] w-full text-center font-plexsans text-[3.721vw] lg:!text-[0.833vw] font-medium uppercase bg-right-accent text-bg-dark"
                          }
                        >
                          Access codes payment & Using
                        </span>
                      </div>
                      <BuyGiftCodesCounter
                        giftCodeToBuyAmount={giftCodeToBuyAmount}
                        setGiftCodeToBuyAmount={setGiftCodeToBuyAmount}
                      />
                      {giftCodes.length > 0 ? (
                        <BoughtGiftCodes />
                      ) : (
                        <div
                          className={
                            "w-full h-full flex flex-col justify-center items-center mb-[3.488vw] lg:!mb-0"
                          }
                        >
                          <Image
                            src={noCodesImg}
                            alt={"noGiftCodes img"}
                            className={"w-[30.93vw] lg:!w-[6.25vw]"}
                          />
                        </div>
                      )}
                    </div>
                  )}
                  {(voucherMode == VoucherMode.Closed ||
                    voucherMode == VoucherMode.UseValid) && (
                    <div
                      className={"flex flex-col gap-0 mt-[2.326vw] lg:!mt-0"}
                    >
                      <AnimatePresence>
                        {renderTickets.map((_, index) => (
                          <TicketCard
                            key={index}
                            index={index}
                            ticketsAmount={tickets.length}
                            voucherMode={voucherMode}
                            addTicket={(ticket) => {
                              if (tickets.length == index) {
                                setTickets([...tickets, ticket]);
                              } else {
                                tickets[index] = ticket;
                              }
                              setBlankTicket(false);
                              notificationStore.create({
                                type: "success",
                                message: `Ticket ${ticket.numbers.toString().replaceAll(",", "")} submitted`,
                                isDismissible: true,
                                dismissAfterDelay: true,
                              });
                            }}
                            removeTicketByIdx={(index: number) => {
                              if (tickets.length != 0) {
                                if (index == tickets.length) {
                                  setBlankTicket(false);
                                } else {
                                  tickets.splice(index, 1);
                                }
                                notificationStore.create({
                                  type: "success",
                                  message: "Ticket removed",
                                  isDismissible: true,
                                  dismissAfterDelay: true,
                                });
                              }
                            }}
                          />
                        ))}
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                <div className={"flex flex-col gap-[0.521vw]"}>
                  {voucherMode == VoucherMode.Closed ? (
                    <button
                      className={
                        "hidden lg:!flex w-full cursor-pointer flex-row items-center justify-center gap-[0.781vw] rounded-[0.521vw] bg-[#252525] py-[0.365vw] hover:opacity-80"
                      }
                      onClick={() => {
                        isMobile
                          ? notificationStore.create({
                              type: "error",
                              message:
                                "Gift code generation currently supported only on desktop",
                            })
                          : setVoucherMode(VoucherMode.List);
                      }}
                    >
                      <svg
                        width="25"
                        height="25"
                        viewBox="0 0 25 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={"my-[0.208vw] h-[1.302vw] w-[1.302vw]"}
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M6.75 5.99952C6.74993 5.33115 6.95593 4.67901 7.33993 4.13196C7.72393 3.58491 8.26725 3.16955 8.89587 2.94248C9.52449 2.71541 10.2078 2.68768 10.8528 2.86305C11.4977 3.03843 12.0729 3.40839 12.5 3.92252C13.0438 3.26102 13.8267 2.84085 14.6785 2.75335C15.5303 2.66585 16.3823 2.91807 17.0492 3.45521C17.7161 3.99235 18.1441 4.77099 18.2401 5.62191C18.3361 6.47284 18.0924 7.32727 17.562 7.99952H18.5C18.8283 7.99952 19.1534 8.06419 19.4567 8.18982C19.76 8.31546 20.0356 8.49961 20.2678 8.73175C20.4999 8.9639 20.6841 9.2395 20.8097 9.54281C20.9353 9.84613 21 10.1712 21 10.4995V11.7495C21 11.9484 20.921 12.1392 20.7803 12.2799C20.6397 12.4205 20.4489 12.4995 20.25 12.4995H13.55C13.5106 12.4995 13.4716 12.4918 13.4352 12.4767C13.3988 12.4616 13.3657 12.4395 13.3379 12.4117C13.31 12.3838 13.2879 12.3507 13.2728 12.3143C13.2578 12.2779 13.25 12.2389 13.25 12.1995V8.73952C12.9674 8.55836 12.7145 8.33474 12.5 8.07652C12.2855 8.33438 12.0325 8.55767 11.75 8.73852V12.1995C11.75 12.2791 11.7184 12.3554 11.6621 12.4117C11.6059 12.4679 11.5296 12.4995 11.45 12.4995H4.75C4.55109 12.4995 4.36032 12.4205 4.21967 12.2799C4.07902 12.1392 4 11.9484 4 11.7495V10.4995C4 10.1712 4.06466 9.84613 4.1903 9.54281C4.31594 9.2395 4.50009 8.9639 4.73223 8.73175C4.96438 8.49961 5.23998 8.31546 5.54329 8.18982C5.84661 8.06419 6.1717 7.99952 6.5 7.99952H7.438C6.99113 7.42873 6.74885 6.72443 6.75 5.99952ZM11.75 5.99952C11.75 5.53539 11.5656 5.09027 11.2374 4.76208C10.9092 4.4339 10.4641 4.24952 10 4.24952C9.53587 4.24952 9.09075 4.4339 8.76256 4.76208C8.43437 5.09027 8.25 5.53539 8.25 5.99952C8.25 6.46365 8.43437 6.90877 8.76256 7.23696C9.09075 7.56515 9.53587 7.74952 10 7.74952C10.4641 7.74952 10.9092 7.56515 11.2374 7.23696C11.5656 6.90877 11.75 6.46365 11.75 5.99952ZM13.25 5.99952C13.25 6.22933 13.2953 6.4569 13.3832 6.66922C13.4712 6.88154 13.6001 7.07446 13.7626 7.23696C13.9251 7.39946 14.118 7.52836 14.3303 7.61631C14.5426 7.70426 14.7702 7.74952 15 7.74952C15.2298 7.74952 15.4574 7.70426 15.6697 7.61631C15.882 7.52836 16.0749 7.39946 16.2374 7.23696C16.3999 7.07446 16.5288 6.88154 16.6168 6.66922C16.7047 6.4569 16.75 6.22933 16.75 5.99952C16.75 5.53539 16.5656 5.09027 16.2374 4.76208C15.9092 4.4339 15.4641 4.24952 15 4.24952C14.5359 4.24952 14.0908 4.4339 13.7626 4.76208C13.4344 5.09027 13.25 5.53539 13.25 5.99952Z"
                          fill="#F9F8F4"
                        />
                        <path
                          d="M11.7516 14.1496C11.7516 14.07 11.72 13.9937 11.6638 13.9375C11.6075 13.8812 11.5312 13.8496 11.4516 13.8496H6.15062C5.95431 13.8498 5.76439 13.9194 5.61437 14.046C5.46434 14.1726 5.36385 14.3481 5.33062 14.5416C5.10854 15.8375 5.10854 17.1617 5.33062 18.4576L5.55462 19.7666C5.62819 20.1955 5.83912 20.589 6.15564 20.8876C6.47216 21.1863 6.87715 21.374 7.30962 21.4226L8.37462 21.5416C9.39488 21.6557 10.4194 21.7274 11.4456 21.7566C11.4855 21.7577 11.5252 21.7507 11.5624 21.7362C11.5995 21.7216 11.6334 21.6997 11.6619 21.6719C11.6904 21.644 11.7131 21.6106 11.7285 21.5738C11.7439 21.537 11.7518 21.4975 11.7516 21.4576V14.1496ZM13.5576 21.7566C13.5177 21.7577 13.478 21.7507 13.4409 21.7362C13.4037 21.7216 13.3699 21.6997 13.3414 21.6719C13.3128 21.644 13.2902 21.6106 13.2748 21.5738C13.2593 21.537 13.2515 21.4975 13.2516 21.4576V14.1496C13.2516 14.07 13.2832 13.9937 13.3395 13.9375C13.3958 13.8812 13.4721 13.8496 13.5516 13.8496H18.8526C19.2586 13.8496 19.6046 14.1416 19.6726 14.5416C19.8956 15.8376 19.8956 17.1616 19.6726 18.4576L19.4496 19.7666C19.376 20.1957 19.1649 20.5892 18.8482 20.8879C18.5315 21.1866 18.1263 21.3742 17.6936 21.4226L16.6286 21.5416C15.6084 21.6556 14.5838 21.7274 13.5576 21.7566Z"
                          fill="#F9F8F4"
                        />
                      </svg>
                      <span
                        className={
                          "mt-[0.208vw] font-museo text-[0.833vw] font-medium text-foreground"
                        }
                      >
                        Generate gift access code
                      </span>
                    </button>
                  ) : (
                    <button
                      className={
                        "mb-[0.521vw] hidden lg:!flex h-[1.354vw] w-[3.802vw] flex-row items-center justify-center rounded-[0.144vw] border border-foreground hover:opacity-80"
                      }
                      onClick={() => setVoucherMode(VoucherMode.Closed)}
                    >
                      <svg
                        width="0.378vw"
                        height="0.781vw"
                        viewBox="0 0 9 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={"mr-[0.26vw] h-[0.781vw] w-[0.378vw]"}
                      >
                        <path
                          d="M8.36328 0.5L1.10522 8L8.36328 15.5"
                          stroke="#F9F8F4"
                        />
                      </svg>
                      <span
                        className={
                          "pt-px font-museo text-[0.729vw] font-medium text-foreground"
                        }
                      >
                        Back
                      </span>
                    </button>
                  )}
                  <div
                    className={
                      "flex flex-col gap-[1.33vw] mt-[3.488vw] lg:!mt-0"
                    }
                    id={"ticketsToBuy"}
                  >
                    <BuyInfoCard
                      buttonActive={
                        (workerClientStore.lotteryCompiled ||
                          !workerClientStore.isLocalProving) &&
                        !workerClientStore.isActiveTx &&
                        ((tickets.length > 0 && tickets[0].amount != 0) ||
                          voucherMode == VoucherMode.List)
                      }
                      ticketsInfo={tickets}
                      loaderActive={
                        (workerClientStore.lotteryCompiled ||
                          !workerClientStore.isLocalProving) &&
                        workerClientStore.isActiveTx
                      }
                      clearTickets={() => {
                        setTickets([]);
                      }}
                      voucherMode={voucherMode}
                      setVoucherMode={setVoucherMode}
                      giftCodeToBuyAmount={giftCodeToBuyAmount}
                      setGiftCodeToBuyAmount={setGiftCodeToBuyAmount}
                      giftCode={giftCode}
                    />
                    {/*<GetMoreTicketsButton*/}
                    {/*  disabled={blankTicket}*/}
                    {/*  onClick={() => {*/}
                    {/*    setBlankTicket(true);*/}
                    {/*  }}*/}
                    {/*/>*/}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <PreviousRounds />
    </div>
  );
}
