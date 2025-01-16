"use client";

import { cn, sendTransaction } from "@zknoid/sdk/lib/helpers";
import Image from "next/image";
import TicketBG1 from "../assets/ticket-bg-1.svg";
import TicketBG2 from "../assets/ticket-bg-2.svg";
import TicketBG3 from "../assets/ticket-bg-3.svg";
import TicketBG4 from "../assets/ticket-bg-4.svg";
import TicketBG5 from "../assets/ticket-bg-5.svg";
import TicketBG6 from "../assets/ticket-bg-6.svg";
import TicketBG7 from "../assets/ticket-bg-7.svg";
import TicketBG8 from "../assets/ticket-bg-8.svg";
import TicketBG9 from "../assets/ticket-bg-9.svg";
import TicketBG10 from "../assets/ticket-bg-10.svg";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { useNetworkStore } from "@zknoid/sdk/lib/stores/network";
import { useWorkerClientStore } from "../../../../workers/workerClientStore";
import { useNotificationStore } from "@zknoid/sdk/components/shared/Notification/lib/notificationStore";
import Link from "next/link";
import { NetworkIds, NETWORKS } from "@zknoid/sdk/constants/networks";
import { formatUnits } from "@zknoid/sdk/lib/unit";
import LotteryContext from "@/lottery/lib/contexts/LotteryContext";

const network =
  NETWORKS[process.env.NEXT_PUBLIC_NETWORK_ID || NetworkIds.MINA_DEVNET];

const ticketsImages = [
  TicketBG1,
  TicketBG2,
  TicketBG3,
  TicketBG4,
  TicketBG5,
  TicketBG6,
  TicketBG7,
  TicketBG8,
  TicketBG9,
  TicketBG10,
];

const ClosedTicket = ({
  combination,
  index,
  rounded,
  className,
  onClick,
  funds,
  claimed,
}: {
  combination: number[];
  index: number;
  rounded: "full" | "right";
  className?: string;
  onClick?: () => void;
  funds: bigint | undefined;
  claimed: boolean;
}) => {
  const color =
    rounded == "right"
      ? "bg-middle-accent"
      : index % 2 === 0
        ? "bg-[#FF8961]"
        : "bg-middle-accent";

  return (
    <motion.div
      onClick={onClick ?? onClick}
      className={cn(
        "relative flex h-[11.628vw] lg:!h-[13.53vw] flex-row p-[1.163vw] lg:!p-[0.33vw]",
        !funds && color,
        {
          "rounded-r-[1.33vw]": rounded == "right",
          "rounded-[23.256vw] lg:!rounded-[2.604vw]": rounded == "full",
          "cursor-pointer": onClick,
          "bg-foreground": !!funds,
        },
        className,
      )}
      whileHover={onClick && { scale: 1.05 }}
    >
      <div
        className={cn(
          "flex flex-row-reverse lg:!w-auto w-full lg:!flex-col justify-between rounded-[23.256vw] lg:!rounded-[2.604vw] border p-[1.163vw] lg:!p-1",
          { "border-middle-accent": !!funds },
        )}
      >
        <div
          className={
            "my-auto flex lg:!h-[8vw] w-full flex-col lg:!flex-row items-center justify-center gap-1"
          }
        >
          {!funds ? (
            <>
              <div
                className={
                  "flex lg:!h-[8vw] w-[70%] lg:!w-[65%] flex-row lg:!flex-col-reverse justify-between pr-[3.488vw] lg:!pr-0 ml-auto lg:!ml-0"
                }
              >
                {combination.map((item, index) => (
                  <span
                    key={index}
                    className={
                      "lg:!rotate-180 font-plexsans text-[4.651vw] lg:!text-[0.9vw] font-medium lg:![writing-mode:vertical-rl]"
                    }
                  >
                    {item}
                  </span>
                ))}
              </div>
              <span className={"lg:!inline-block hidden h-full w-[55%]"}>
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 10 109"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={"h-full w-full rotate-180"}
                >
                  <rect y="106" width="10" height="3" fill="#F9F8F4" />
                  <rect y="95" width="10" height="3" fill="#F9F8F4" />
                  <rect y="8" width="10" height="3" fill="#F9F8F4" />
                  <rect y="40" width="10" height="3" fill="#F9F8F4" />
                  <rect y="68" width="10" height="3" fill="#F9F8F4" />
                  <rect y="82" width="10" height="4" fill="#F9F8F4" />
                  <rect y="17" width="10" height="4" fill="#F9F8F4" />
                  <rect y="63" width="10" height="4" fill="#F9F8F4" />
                  <rect y="104" width="10" height="0.999999" fill="#F9F8F4" />
                  <rect y="54" width="10" height="0.999999" fill="#F9F8F4" />
                  <rect y="25" width="10" height="0.999999" fill="#F9F8F4" />
                  <rect y="101" width="10" height="2" fill="#F9F8F4" />
                  <rect y="14" width="10" height="2" fill="#F9F8F4" />
                  <rect y="46" width="10" height="2" fill="#F9F8F4" />
                  <rect y="51" width="10" height="2" fill="#F9F8F4" />
                  <rect y="22" width="10" height="2" fill="#F9F8F4" />
                  <rect y="92" width="10" height="2" fill="#F9F8F4" />
                  <rect y="5" width="10" height="2" fill="#F9F8F4" />
                  <rect y="2" width="10" height="2" fill="#F9F8F4" />
                  <rect y="37" width="10" height="2" fill="#F9F8F4" />
                  <rect y="89" width="10" height="2" fill="#F9F8F4" />
                  <rect y="34" width="10" height="2" fill="#F9F8F4" />
                  <rect y="79" width="10" height="2" fill="#F9F8F4" />
                  <rect y="76" width="10" height="2" fill="#F9F8F4" />
                  <rect y="58" width="10" height="2" fill="#F9F8F4" />
                  <rect y="29" width="10" height="2" fill="#F9F8F4" />
                  <rect y="99" width="10" height="0.999999" fill="#F9F8F4" />
                  <rect y="12" width="10" height="0.999999" fill="#F9F8F4" />
                  <rect width="10" height="0.999999" fill="#F9F8F4" />
                  <rect y="44" width="10" height="0.999999" fill="#F9F8F4" />
                  <rect y="49" width="10" height="0.999999" fill="#F9F8F4" />
                  <rect y="61" width="10" height="0.999999" fill="#F9F8F4" />
                  <rect y="87" width="10" height="0.999999" fill="#F9F8F4" />
                  <rect y="32" width="10" height="0.999999" fill="#F9F8F4" />
                  <rect y="74" width="10" height="0.999999" fill="#F9F8F4" />
                  <rect y="56" width="10" height="0.999999" fill="#F9F8F4" />
                  <rect y="27" width="10" height="0.999999" fill="#F9F8F4" />
                  <rect y="72" width="10" height="0.999999" fill="#F9F8F4" />
                </svg>
              </span>
            </>
          ) : (
            <div
              className={
                "my-auto flex lg:!h-[8vw] w-full flex-row items-center justify-center lg:!gap-1 pr-[3.488vw] lg:!pr-0"
              }
            >
              <div
                className={
                  "lg:!h-[8vw] w-full lg:!w-[90%] flex flex-row lg:!flex-col-reverse justify-between text-right lg:!text-left"
                }
              >
                <span
                  className={
                    "hidden lg:!inline-block w-full lg:!rotate-180 font-plexsans text-[4.651vw] lg:!text-[1vw] font-medium uppercase text-middle-accent lg:![writing-mode:vertical-rl]"
                  }
                >
                  {claimed ? "Claimed" : "Claim rewards"}
                </span>
                <span
                  className={
                    "lg:!hidden text-left w-full lg:!rotate-180 font-plexsans text-[4.651vw] lg:!text-[1vw] font-medium uppercase text-middle-accent lg:![writing-mode:vertical-rl]"
                  }
                >
                  {claimed ? "Claimed" : `${formatUnits(funds)} MINA`}
                </span>

                <div
                  className={
                    "lg:!hidden flex flex-row items-center justify-center w-full"
                  }
                >
                  {combination.map((item, index) => (
                    <span
                      key={index}
                      className={
                        "w-full font-plexsans text-[4.651vw] font-medium text-middle-accent"
                      }
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className={cn(
            "flex items-center justify-start lg:!justify-center lg:!p-1",
            funds ? "w-[13%] lg:!w-full" : "w-[70%] lg:!w-full",
          )}
        >
          <div
            className={cn(
              "flex min-h-[7.209vw] lg:!min-h-[1.41vw] min-w-[7.209vw] lg:!min-w-[1.41vw] items-center justify-center rounded-full text-[3.721vw] lg:!text-[0.625vw] ",
              {
                "bg-middle-accent/70 text-foreground": !!funds,
                "bg-[#F9F8F4] text-black": !funds,
              },
            )}
          >
            {index.toString().length == 1 ? "0" + index : index}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function MyTicket({
  plotteryAddress,
  combination,
  amount,
  index,
  isOpen,
  onClick,
  tags,
  funds,
  claimed,
  roundId,
  hash,
  ticketId
}: {
  plotteryAddress: string;
  isOpen: boolean;
  combination: number[];
  amount: number;
  index: number;
  onClick: () => void;
  tags?: string[];
  funds: bigint | undefined;
  claimed: boolean;
  roundId: number;
  hash: string;
  ticketId: number;
}) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const workerStore = useWorkerClientStore();
  const networkStore = useNetworkStore();
  const notificationStore = useNotificationStore();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isMobile, setMobile] = useState(false);

  const { addClaimRequestMutation } = useContext(LotteryContext);

  // console.log('PENDING::::', isPending);

  // const getPendingState = () => {
  //   isPendingTicket(hash).then((isPending) => setIsPending(isPending));
  // };
  //
  // useEffect(() => {
  //   getPendingState();
  // }, []);

  // const claimTicket = async (numbers: number[], amount: number) => {
  //   let txJson = await workerStore.getReward(
  //     plotteryAddress,
  //     networkStore.address!,
  //     networkStore.minaNetwork!.networkID,
  //     roundId,
  //     numbers,
  //     amount,
  //   );

  //   console.log("txJson", txJson);
  //   await sendTransaction(JSON.stringify(txJson))
  //     .then(() => {
  //       notificationStore.create({
  //         type: "success",
  //         message: "Transaction sent",
  //         isDismissible: true,
  //         dismissAfterDelay: true,
  //       });
  //     })
  //     .catch((error) => {
  //       console.log("Error while sending transaction", error);
  //       notificationStore.create({
  //         type: "error",
  //         message: "Error while sending transaction",
  //         isDismissible: true,
  //         dismissAfterDelay: true,
  //         dismissDelay: 10000,
  //       });
  //     });
  // };

  useEffect(() => {
    const checkWidth = () => {
      if (window.innerWidth <= 1024) setMobile(true);
      else setMobile(false);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);

    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOpen ? (
        <div
          className={cn("relative flex flex-row", {
            "cursor-progress lg:!hover:opacity-80":
              !!funds && !claimed && (!workerStore.lotteryCompiled && workerStore.isLocalProving),
          })}
          onClick={() => (!funds ? onClick() : undefined)}
          onMouseEnter={() =>
            !!funds && !claimed && !isMobile ? setIsHovered(true) : undefined
          }
          onMouseLeave={() =>
            !!funds && !claimed && !isMobile ? setIsHovered(false) : undefined
          }
        >
          {claimed && (
            <div
              className={
                "absolute z-[1] flex h-full w-full flex-col items-center justify-center rounded-[1.042vw] bg-bg-grey/80"
              }
            >
              <span
                className={
                  "font-museo text-[5.581vw] lg:!text-[1.667vw] font-bold uppercase text-middle-accent"
                }
              >
                Claimed
              </span>
            </div>
          )}
          {isMobile && !!funds && !claimed && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                // if (!workerStore.lotteryCompiled) {
                //   notificationStore.create({
                //     type: "error",
                //     message:
                //       "Lottery is not compiled yet, please wait a few seconds",
                //   });
                //   return;
                // }
                // const id = notificationStore.create({
                //   type: "loader",
                //   message: "Generating transaction...",
                //   isDismissible: false,
                //   dismissAfterDelay: false,
                // });
                // claimTicket(combination, amount).then(() =>
                //   notificationStore.remove(id),
                // );

                const claimRequest = {
                  userAddress: networkStore.address!,
                  roundId,
                  ticketId,
                };
                addClaimRequestMutation(claimRequest);

                notificationStore.create({
                  type: "success",
                  message: "Claim request sent",
                  isDismissible: true,
                  dismissAfterDelay: true,
                });
              }}
              disabled={workerStore.isActiveTx}
              className={
                "absolute w-full h-full left-0 top-0 z-[1] flex flex-row justify-end items-start"
              }
            >
              <svg
                width="64"
                height="81"
                viewBox="0 0 64 81"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={"w-[15.059vw] mr-[4.706vw]"}
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M59 0H5V50V80.5L32.5 51.5L59 81V50V0Z"
                  fill="#3A3A3A"
                />
                <path
                  d="M15.7619 26.144C14.6659 26.144 13.8059 25.776 13.1819 25.04C12.5579 24.296 12.2459 23.22 12.2459 21.812C12.2459 21.108 12.3259 20.488 12.4859 19.952C12.6459 19.416 12.8779 18.964 13.1819 18.596C13.4859 18.228 13.8539 17.952 14.2859 17.768C14.7259 17.576 15.2179 17.48 15.7619 17.48C16.4899 17.48 17.0979 17.64 17.5859 17.96C18.0819 18.28 18.4699 18.752 18.7499 19.376L17.6099 20C17.4659 19.6 17.2419 19.284 16.9379 19.052C16.6419 18.812 16.2499 18.692 15.7619 18.692C15.1139 18.692 14.6059 18.912 14.2379 19.352C13.8699 19.792 13.6859 20.4 13.6859 21.176V22.448C13.6859 23.224 13.8699 23.832 14.2379 24.272C14.6059 24.712 15.1139 24.932 15.7619 24.932C16.2659 24.932 16.6739 24.804 16.9859 24.548C17.3059 24.284 17.5419 23.948 17.6939 23.54L18.7859 24.2C18.5059 24.808 18.1139 25.284 17.6099 25.628C17.1059 25.972 16.4899 26.144 15.7619 26.144ZM21.4594 26C21.0114 26 20.6754 25.888 20.4514 25.664C20.2354 25.432 20.1274 25.112 20.1274 24.704V17.12H21.4354V24.932H22.2994V26H21.4594ZM24.2093 18.644C23.9373 18.644 23.7373 18.58 23.6093 18.452C23.4893 18.324 23.4293 18.16 23.4293 17.96V17.756C23.4293 17.556 23.4893 17.392 23.6093 17.264C23.7373 17.136 23.9373 17.072 24.2093 17.072C24.4813 17.072 24.6773 17.136 24.7973 17.264C24.9173 17.392 24.9773 17.556 24.9773 17.756V17.96C24.9773 18.16 24.9173 18.324 24.7973 18.452C24.6773 18.58 24.4813 18.644 24.2093 18.644ZM23.5493 19.76H24.8573V26H23.5493V19.76ZM29.1371 26.144C28.6891 26.144 28.2891 26.068 27.9371 25.916C27.5851 25.764 27.2891 25.548 27.0491 25.268C26.8091 24.98 26.6251 24.636 26.4971 24.236C26.3691 23.828 26.3051 23.376 26.3051 22.88C26.3051 22.384 26.3691 21.936 26.4971 21.536C26.6251 21.128 26.8091 20.784 27.0491 20.504C27.2891 20.216 27.5851 19.996 27.9371 19.844C28.2891 19.692 28.6891 19.616 29.1371 19.616C29.7611 19.616 30.2731 19.756 30.6731 20.036C31.0731 20.316 31.3651 20.688 31.5491 21.152L30.4691 21.656C30.3811 21.368 30.2251 21.14 30.0011 20.972C29.7851 20.796 29.4971 20.708 29.1371 20.708C28.6571 20.708 28.2931 20.86 28.0451 21.164C27.8051 21.46 27.6851 21.848 27.6851 22.328V23.444C27.6851 23.924 27.8051 24.316 28.0451 24.62C28.2931 24.916 28.6571 25.064 29.1371 25.064C29.5211 25.064 29.8251 24.972 30.0491 24.788C30.2811 24.596 30.4651 24.344 30.6011 24.032L31.5971 24.56C31.3891 25.072 31.0771 25.464 30.6611 25.736C30.2451 26.008 29.7371 26.144 29.1371 26.144ZM32.8423 17.12H34.1503V22.568H34.2103L35.0742 21.452L36.5743 19.76H38.0983L35.9143 22.172L38.3623 26H36.8023L35.0143 23.024L34.1503 23.96V26H32.8423V17.12ZM43.9687 26C43.5127 26 43.1687 25.884 42.9367 25.652C42.7047 25.412 42.5887 25.076 42.5887 24.644V20.828H41.6167V19.76H42.1447C42.3607 19.76 42.5087 19.712 42.5887 19.616C42.6767 19.52 42.7207 19.364 42.7207 19.148V18.056H43.8967V19.76H45.2047V20.828H43.8967V24.932H45.1087V26H43.9687ZM49.0246 26.144C48.5926 26.144 48.1966 26.068 47.8366 25.916C47.4846 25.764 47.1846 25.548 46.9366 25.268C46.6886 24.98 46.4966 24.636 46.3606 24.236C46.2246 23.828 46.1566 23.376 46.1566 22.88C46.1566 22.384 46.2246 21.936 46.3606 21.536C46.4966 21.128 46.6886 20.784 46.9366 20.504C47.1846 20.216 47.4846 19.996 47.8366 19.844C48.1966 19.692 48.5926 19.616 49.0246 19.616C49.4566 19.616 49.8486 19.692 50.2006 19.844C50.5606 19.996 50.8646 20.216 51.1126 20.504C51.3606 20.784 51.5526 21.128 51.6886 21.536C51.8246 21.936 51.8926 22.384 51.8926 22.88C51.8926 23.376 51.8246 23.828 51.6886 24.236C51.5526 24.636 51.3606 24.98 51.1126 25.268C50.8646 25.548 50.5606 25.764 50.2006 25.916C49.8486 26.068 49.4566 26.144 49.0246 26.144ZM49.0246 25.064C49.4726 25.064 49.8326 24.928 50.1046 24.656C50.3766 24.376 50.5126 23.96 50.5126 23.408V22.352C50.5126 21.8 50.3766 21.388 50.1046 21.116C49.8326 20.836 49.4726 20.696 49.0246 20.696C48.5766 20.696 48.2166 20.836 47.9446 21.116C47.6726 21.388 47.5366 21.8 47.5366 22.352V23.408C47.5366 23.96 47.6726 24.376 47.9446 24.656C48.2166 24.928 48.5766 25.064 49.0246 25.064ZM20.4066 38.144C19.9586 38.144 19.5586 38.068 19.2066 37.916C18.8546 37.764 18.5586 37.548 18.3186 37.268C18.0786 36.98 17.8946 36.636 17.7666 36.236C17.6386 35.828 17.5746 35.376 17.5746 34.88C17.5746 34.384 17.6386 33.936 17.7666 33.536C17.8946 33.128 18.0786 32.784 18.3186 32.504C18.5586 32.216 18.8546 31.996 19.2066 31.844C19.5586 31.692 19.9586 31.616 20.4066 31.616C21.0306 31.616 21.5426 31.756 21.9426 32.036C22.3426 32.316 22.6346 32.688 22.8186 33.152L21.7386 33.656C21.6506 33.368 21.4946 33.14 21.2706 32.972C21.0546 32.796 20.7666 32.708 20.4066 32.708C19.9266 32.708 19.5626 32.86 19.3146 33.164C19.0746 33.46 18.9546 33.848 18.9546 34.328V35.444C18.9546 35.924 19.0746 36.316 19.3146 36.62C19.5626 36.916 19.9266 37.064 20.4066 37.064C20.7906 37.064 21.0946 36.972 21.3186 36.788C21.5506 36.596 21.7346 36.344 21.8706 36.032L22.8666 36.56C22.6586 37.072 22.3466 37.464 21.9306 37.736C21.5146 38.008 21.0066 38.144 20.4066 38.144ZM25.4438 38C24.9958 38 24.6598 37.888 24.4358 37.664C24.2198 37.432 24.1118 37.112 24.1118 36.704V29.12H25.4198V36.932H26.2838V38H25.4438ZM32.1057 38C31.7617 38 31.4977 37.904 31.3137 37.712C31.1297 37.512 31.0177 37.26 30.9777 36.956H30.9177C30.7977 37.348 30.5777 37.644 30.2577 37.844C29.9377 38.044 29.5497 38.144 29.0937 38.144C28.4457 38.144 27.9457 37.976 27.5937 37.64C27.2497 37.304 27.0777 36.852 27.0777 36.284C27.0777 35.66 27.3017 35.192 27.7497 34.88C28.2057 34.568 28.8697 34.412 29.7417 34.412H30.8697V33.884C30.8697 33.5 30.7657 33.204 30.5577 32.996C30.3497 32.788 30.0257 32.684 29.5857 32.684C29.2177 32.684 28.9177 32.764 28.6857 32.924C28.4537 33.084 28.2577 33.288 28.0977 33.536L27.3177 32.828C27.5257 32.476 27.8177 32.188 28.1937 31.964C28.5697 31.732 29.0617 31.616 29.6697 31.616C30.4777 31.616 31.0977 31.804 31.5297 32.18C31.9617 32.556 32.1777 33.096 32.1777 33.8V36.932H32.8377V38H32.1057ZM29.4657 37.148C29.8737 37.148 30.2097 37.06 30.4737 36.884C30.7377 36.7 30.8697 36.456 30.8697 36.152V35.252H29.7657C28.8617 35.252 28.4097 35.532 28.4097 36.092V36.308C28.4097 36.588 28.5017 36.8 28.6857 36.944C28.8777 37.08 29.1377 37.148 29.4657 37.148ZM34.7796 30.644C34.5076 30.644 34.3076 30.58 34.1796 30.452C34.0596 30.324 33.9996 30.16 33.9996 29.96V29.756C33.9996 29.556 34.0596 29.392 34.1796 29.264C34.3076 29.136 34.5076 29.072 34.7796 29.072C35.0516 29.072 35.2476 29.136 35.3676 29.264C35.4876 29.392 35.5476 29.556 35.5476 29.756V29.96C35.5476 30.16 35.4876 30.324 35.3676 30.452C35.2476 30.58 35.0516 30.644 34.7796 30.644ZM34.1196 31.76H35.4276V38H34.1196V31.76ZM37.2954 38V31.76H38.6034V32.792H38.6634C38.7274 32.632 38.8034 32.48 38.8914 32.336C38.9874 32.192 39.0994 32.068 39.2274 31.964C39.3634 31.852 39.5194 31.768 39.6954 31.712C39.8794 31.648 40.0914 31.616 40.3314 31.616C40.7554 31.616 41.1314 31.72 41.4594 31.928C41.7874 32.136 42.0274 32.456 42.1794 32.888H42.2154C42.3274 32.536 42.5434 32.236 42.8634 31.988C43.1834 31.74 43.5954 31.616 44.0994 31.616C44.7234 31.616 45.2074 31.828 45.5514 32.252C45.8954 32.668 46.0674 33.264 46.0674 34.04V38H44.7594V34.196C44.7594 33.716 44.6674 33.356 44.4834 33.116C44.2994 32.868 44.0074 32.744 43.6074 32.744C43.4394 32.744 43.2794 32.768 43.1274 32.816C42.9754 32.856 42.8394 32.92 42.7194 33.008C42.6074 33.096 42.5154 33.208 42.4434 33.344C42.3714 33.48 42.3354 33.636 42.3354 33.812V38H41.0274V34.196C41.0274 33.228 40.6474 32.744 39.8874 32.744C39.7274 32.744 39.5674 32.768 39.4074 32.816C39.2554 32.856 39.1194 32.92 38.9994 33.008C38.8794 33.096 38.7834 33.208 38.7114 33.344C38.6394 33.48 38.6034 33.636 38.6034 33.812V38H37.2954Z"
                  fill="#FF5B23"
                />
              </svg>
            </motion.button>
          )}
          {isHovered && !claimed && (workerStore.lotteryCompiled || !workerStore.isLocalProving) && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                // const id = notificationStore.create({
                //   type: "loader",
                //   message: "Generating transaction...",
                //   isDismissible: false,
                //   dismissAfterDelay: false,
                // });
                // claimTicket(combination, amount).then(() =>
                //   notificationStore.remove(id),
                // );
                const claimRequest = {
                  userAddress: networkStore.address!,
                  roundId,
                  ticketId,
                };
                addClaimRequestMutation(claimRequest);

                notificationStore.create({
                  type: "success",
                  message: "Claim request sent",
                  isDismissible: true,
                  dismissAfterDelay: true,
                });
              }}
              disabled={workerStore.isActiveTx}
              className={
                "absolute z-[1] flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-[1.042vw] bg-bg-grey/80"
              }
            >
              <span
                className={
                  "font-museo text-[1.667vw] font-bold uppercase text-middle-accent"
                }
              >
                Click to claim ticket
              </span>
            </motion.button>
          )}
          <div
            className={cn(
              "relative h-[46.512vw] lg:!h-[13.53vw] w-full lg:!w-[24vw] rounded-[4.651vw] lg:!rounded-[1.33vw] lg:!rounded-r-none p-[1.163vw] lg:!p-[0.33vw]",
              {
                "bg-middle-accent": !funds,
                "bg-foreground": !!funds,
              },
            )}
          >
            <div
              className={cn(
                "hidden lg:!block pointer-events-none absolute h-[44.5vw] lg:!h-[12.87vw] w-[98%] lg:!w-[23.33vw] overflow-hidden rounded-[4.651vw] lg:!rounded-[1vw]",
                { border: !funds },
              )}
            />
            <div className="relative z-0 flex h-full w-full flex-col p-[3.488vw] lg:!p-[1.33vw]">
              <div className="flex flex-row">
                <div
                  className={cn("text-[5.581vw] lg:!text-[1.6vw] uppercase", {
                    "text-foreground": !funds,
                    "text-middle-accent": !!funds,
                  })}
                >
                  Ticket {index}
                </div>
              </div>
              <div className="flex flex-row gap-[1.163vw] lg:!gap-[0.33vw]">
                {combination.map((fieldId, index) => (
                  <div
                    key={index}
                    className={cn(
                      "h-[9.302vw] lg:!h-[2.67vw] w-[9.302vw] lg:!w-[2.67vw] rounded-[1.163vw] lg:!rounded-[0.33vw] border-[0.07vw] border-foreground shadow-[inset_5px_5px_5px_#CF3500,inset_-5px_-5px_5px_rgba(255,91,35,0.5)]",
                      "z-[1] flex items-center justify-center bg-middle-accent font-museo text-[7.442vw] lg:!text-[2.13vw] font-bold text-foreground",
                    )}
                  >
                    {fieldId}
                  </div>
                ))}
              </div>
              <div className={"mt-auto flex flex-row gap-[0.33vw]"}>
                <div
                  className={
                    "flex items-center justify-center rounded-[1.163vw] lg:!rounded-[0.33vw] border-[0.07vw] bg-middle-accent px-[0.93vw] lg:!px-[0.3vw] py-[1.047vw] lg:!py-[0.15vw] font-plexsans text-[3.721vw] lg:!text-[0.8vw] font-medium"
                  }
                >
                  {amount} {amount > 1 ? "Tickets" : "Ticket"}
                </div>
                {isPending && (
                  <div
                    className={
                      "flex items-center justify-center rounded-[1.163vw] lg:!rounded-[0.33vw] border-[0.07vw] bg-middle-accent px-[0.93vw] lg:!px-[0.3vw] py-[1.047vw] lg:!py-[0.15vw] font-plexsans text-[3.721vw] lg:!text-[0.8vw] font-medium"
                    }
                  >
                    Pending
                  </div>
                )}
                {tags &&
                  tags.map((item, index) => (
                    <div
                      key={index}
                      className={
                        "flex items-center justify-center rounded-[1.163vw] lg:!rounded-[0.33vw] border-[0.07vw] bg-middle-accent px-[0.93vw] lg:!px-[0.3vw] py-[1.047vw] lg:!py-[0.15vw] font-plexsans text-[3.721vw] lg:!text-[0.8vw] font-medium"
                      }
                    >
                      {item}
                    </div>
                  ))}
                <Link
                  href={`${network.minscanUrl}/tx/${hash}?type=zk-tx`}
                  target={"_blank"}
                  rel={"noopener noreferrer"}
                  className={
                    "flex cursor-pointer items-center justify-center rounded-[1.163vw] lg:!rounded-[0.33vw] border-[0.07vw] bg-middle-accent px-[0.93vw] lg:!px-[0.3vw] py-[1.047vw] lg:!py-[0.15vw] font-plexsans text-[3.721vw] lg:!text-[0.8vw] font-medium hover:bg-[#FF6B38]"
                  }
                >
                  Transaction link
                </Link>
              </div>
              <Image
                src={ticketsImages[combination[0] - 1]}
                alt={"Lottery Ticket"}
                className={
                  "absolute left-0 top-0 -z-[1] h-full w-full rounded-[3.488vw] lg:!rounded-[1vw] object-cover object-center p-[0.233vw] lg:!p-px border-[0.07vw] border-foreground"
                }
              />
            </div>
          </div>
          <div className={"lg:!flex hidden flex-row"}>
            <div
              className={cn("flex flex-col items-center justify-between", {
                "bg-middle-accent": !funds,
                "bg-foreground": !!funds,
              })}
            >
              <div
                className={
                  "-mt-[0.57vw] h-[1.15vw] w-[1.15vw] rounded-full bg-bg-grey"
                }
              />
              {[...Array(16)].map((_, index) => (
                <div
                  key={index}
                  className={"h-[0.31vw] w-[0.31vw] rounded-full bg-bg-grey"}
                />
              ))}
              <div
                className={
                  "-mb-[0.57vw] h-[1.15vw] w-[1.15vw] rounded-full bg-bg-grey"
                }
              />
            </div>
            <ClosedTicket
              combination={combination}
              index={index}
              rounded={"right"}
              funds={funds}
              claimed={claimed}
            />
          </div>
        </div>
      ) : (
        <ClosedTicket
          combination={combination}
          index={index}
          rounded={"full"}
          onClick={onClick}
          funds={funds}
          claimed={claimed}
        />
      )}
    </AnimatePresence>
  );
}
