"use client";

import { motion } from "framer-motion";
import * as Silvana from "@silvana-one/api";

export function RulesModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", duration: 0.4, bounce: 0 }}
      className={
        "fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center backdrop-blur-md p-[10vw] lg:!p-0"
      }
      onClick={onClose}
    >
      <div
        className={
          "min-h-[20.833vw] relative flex flex-col rounded-[0.781vw] bg-bg-dark p-[1.563vw]"
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={
            "absolute cursor-pointer top-[0.26vw] hover:opacity-80 -right-[1.563vw] flex flex-col justify-center items-center"
          }
          onClick={onClose}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={"w-[1.042vw] h-[1.042vw]"}
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.8174 10.0043L20 1.81818L18.1826 0L9.99994 8.18609L1.81742 0.000150223L0 1.81833L8.18252 10.0043L0.00836661 18.1818L1.82579 20L9.99994 11.8225L18.1742 20.0002L19.9917 18.182L11.8174 10.0043Z"
              fill="#141414"
            />
          </svg>
        </div>
        <div className={"flex flex-col gap-[0.521vw] w-full"}>
          <span
            className={"text-[1.667vw] font-museo font-bold text-foreground"}
          >
            How to take a part in competition?
          </span>
          <span
            className={"text-[1.042vw] font-museo font-bold text-foreground"}
          >
            Rules
          </span>
          <span
            className={
              "text-[0.833vw] font-plexsans leading-[110%] text-foreground"
            }
          >
            [rules]
          </span>
        </div>
        <div className={"mt-auto flex flex-col gap-[0.521vw]"}>
          <span
            className={"text-[1.042vw] font-museo font-bold text-foreground"}
          >
            Rewards
          </span>
          <div className={"flex flex-row w-full gap-[0.521vw] items-center"}>
            <span
              className={
                "text-[0.833vw] font-plexsans leading-[110%] text-foreground"
              }
            >
              1
            </span>
            <div
              className={
                "rounded-[0.26vw] bg-[#252525] text-[0.833vw] font-plexsans leading-[110%] text-foreground p-[0.26vw]"
              }
            >
              Golden ZkNoid NFT
            </div>
            <div
              className={
                "rounded-[0.26vw] bg-[#252525] text-[0.833vw] font-plexsans leading-[110%] text-foreground p-[0.26vw]"
              }
            >
              10 Gift codes for Lottery game
            </div>
            <div
              className={
                "rounded-[0.26vw] bg-[#252525] text-[0.833vw] font-plexsans leading-[110%] text-foreground p-[0.26vw]"
              }
            >
              100 $MINA
            </div>
          </div>
          <div className={"flex flex-row w-full gap-[0.521vw] items-center"}>
            <span
              className={
                "text-[0.833vw] font-plexsans leading-[110%] text-foreground"
              }
            >
              2
            </span>
            <div
              className={
                "rounded-[0.26vw] bg-[#252525] text-[0.833vw] font-plexsans leading-[110%] text-foreground p-[0.26vw]"
              }
            >
              Silver ZkNoid NFT
            </div>
            <div
              className={
                "rounded-[0.26vw] bg-[#252525] text-[0.833vw] font-plexsans leading-[110%] text-foreground p-[0.26vw]"
              }
            >
              5 Gift codes for Lottery game
            </div>
            <div
              className={
                "rounded-[0.26vw] bg-[#252525] text-[0.833vw] font-plexsans leading-[110%] text-foreground p-[0.26vw]"
              }
            >
              50 $MINA
            </div>
          </div>
          <div className={"flex flex-row w-full gap-[0.521vw] items-center"}>
            <span
              className={
                "text-[0.833vw] font-plexsans leading-[110%] text-foreground"
              }
            >
              3
            </span>
            <div
              className={
                "rounded-[0.26vw] bg-[#252525] text-[0.833vw] font-plexsans leading-[110%] text-foreground p-[0.26vw]"
              }
            >
              Bronze ZkNoid NFT
            </div>
            <div
              className={
                "rounded-[0.26vw] bg-[#252525] text-[0.833vw] font-plexsans leading-[110%] text-foreground p-[0.26vw]"
              }
            >
              3 Gift codes for Lottery game
            </div>
            <div
              className={
                "rounded-[0.26vw] bg-[#252525] text-[0.833vw] font-plexsans leading-[110%] text-foreground p-[0.26vw]"
              }
            >
              30 $MINA
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
