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
import { useState } from "react";
import { useNetworkStore } from "@zknoid/sdk/lib/stores/network";
import { useWorkerClientStore } from "../../../../workers/workerClientStore";
import { useNotificationStore } from "@zknoid/sdk/components/shared/Notification/lib/notificationStore";
import Link from "next/link";
import { NetworkIds, NETWORKS } from "@zknoid/sdk/constants/networks";

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
                  "lg:!h-[8vw] w-full lg:!w-[90%] flex-col-reverse justify-between text-right lg:!text-left"
                }
              >
                <span
                  className={
                    "w-full lg:!rotate-180 font-plexsans text-[4.651vw] lg:!text-[1vw] font-medium uppercase text-middle-accent lg:![writing-mode:vertical-rl]"
                  }
                >
                  {claimed ? "Claimed" : "Claim rewards"}
                </span>
              </div>
            </div>
          )}
        </div>
        <div
          className={
            "flex w-full items-center justify-start lg:!justify-center lg:!p-1"
          }
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
}) {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const workerStore = useWorkerClientStore();
  const networkStore = useNetworkStore();
  const notificationStore = useNotificationStore();
  const [isPending, setIsPending] = useState<boolean>(false);

  // console.log('PENDING::::', isPending);

  // const getPendingState = () => {
  //   isPendingTicket(hash).then((isPending) => setIsPending(isPending));
  // };
  //
  // useEffect(() => {
  //   getPendingState();
  // }, []);

  const claimTicket = async (numbers: number[], amount: number) => {
    let txJson = await workerStore.getReward(
      plotteryAddress,
      networkStore.address!,
      networkStore.minaNetwork!.networkID,
      roundId,
      numbers,
      amount,
    );

    console.log("txJson", txJson);
    await sendTransaction(JSON.stringify(txJson))
      .then(() => {
        notificationStore.create({
          type: "success",
          message: "Transaction sent",
          isDismissible: true,
          dismissAfterDelay: true,
        });
      })
      .catch((error) => {
        console.log("Error while sending transaction", error);
        notificationStore.create({
          type: "error",
          message: "Error while sending transaction",
          isDismissible: true,
          dismissAfterDelay: true,
          dismissDelay: 10000,
        });
      });
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <div
          className={cn("relative flex flex-row", {
            "cursor-progress hover:opacity-80":
              !!funds && !claimed && !workerStore.lotteryCompiled,
          })}
          onClick={() => (!funds ? onClick() : undefined)}
          onMouseEnter={() =>
            !!funds && !claimed ? setIsHovered(true) : undefined
          }
          onMouseLeave={() =>
            !!funds && !claimed ? setIsHovered(false) : undefined
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
          {isHovered && !claimed && workerStore.lotteryCompiled && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                const id = notificationStore.create({
                  type: "loader",
                  message: "Generating transaction...",
                  isDismissible: false,
                  dismissAfterDelay: false,
                });
                claimTicket(combination, amount).then(() =>
                  notificationStore.remove(id),
                );
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
