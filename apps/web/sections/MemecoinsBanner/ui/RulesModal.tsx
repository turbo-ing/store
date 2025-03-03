"use client";

import { motion } from "framer-motion";
import Link from "next/link";

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
          "min-h-[40.104vw] w-[34.375vw] relative flex flex-col rounded-[0.781vw] bg-bg-dark p-[1.563vw]"
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className={"flex flex-col gap-[0.781vw] w-full"}>
          <span
            className={"text-[1.667vw] font-museo font-bold text-foreground"}
          >
            Meme token competition rules
          </span>
          <span
            className={"text-[1.042vw] font-museo font-bold text-foreground"}
          >
            Overview
          </span>
          <span
            className={
              "text-[0.833vw] font-plexsans leading-[110%] text-foreground"
            }
          >
            Choose your side—Frozen Frogs or Fire Dragons—and buy tokens to
            support your team!
          </span>
          <span
            className={
              "text-[0.833vw] font-plexsans leading-[110%] text-foreground"
            }
          >
            The token price increases over time: the more tokens are sold, the
            higher the price. Tokens can later be sold on the MinaTokens
            platform.
          </span>
          <Link
            href={"https://minatokens.com/"}
            target={"_blank"}
            rel={"noopener noreferrer"}
            className={
              "bg-foreground w-fit hover:opacity-80 rounded-[0.26vw] flex flex-col items-center justify-center py-[0.417vw] px-[2.083vw]"
            }
          >
            <span
              className={"text-[0.833vw] font-museo font-medium text-[#212121]"}
            >
              MinaTokens Platform
            </span>
          </Link>
          <span
            className={
              "mt-[0.781vw] text-[1.042vw] font-museo font-bold text-foreground"
            }
          >
            Rewards
          </span>
          <span
            className={"text-[0.833vw] font-museo font-bold text-foreground"}
          >
            Winning Team
          </span>
          <span
            className={
              "text-[0.833vw] font-plexsans leading-[110%] text-foreground"
            }
          >
            At the end of the event, 10 random participants from the winning
            team will be chosen based on their acquired meme tokens. Each of
            them will receive 30 MINA and 2 pre-paid tickets for the ZkNoid
            Lottery L1 game.
          </span>
          <span
            className={"text-[0.833vw] font-museo font-bold text-foreground"}
          >
            Top 5 Holders
          </span>
          <span
            className={
              "text-[0.833vw] font-plexsans leading-[110%] text-foreground"
            }
          >
            Plus, the top 5 holders of each token will receive a unique NFT
            based on their ranking:
          </span>
          <div className={"flex flex-col gap-[0.521vw]"}>
            <div className={"flex flex-row w-full gap-[0.521vw] items-center"}>
              <circle
                className={
                  "rounded-full w-[1.042vw] h-[1.042vw] bg-gradient-to-l from-[#FFE75E] to-[#AD6B00]"
                }
              />
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
              <circle
                className={
                  "rounded-full w-[1.042vw] h-[1.042vw] bg-gradient-to-l from-[#A7A6A6] to-[#5E5E5E]"
                }
              />
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
              <circle
                className={
                  "rounded-full w-[1.042vw] h-[1.042vw] bg-gradient-to-l from-[#E3A54E] to-[#AD6B00]"
                }
              />
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
          <span
            className={
              "mt-auto text-[1.042vw] font-museo font-bold text-foreground"
            }
          >
            Disclaimer
          </span>
          <span
            className={
              "mb-[0.781vw] text-[0.833vw] font-plexsans leading-[110%] text-foreground"
            }
          >
            This is purely a meme token contest. Do not invest anything you are
            not willing to lose!
          </span>
        </div>
      </div>
    </motion.div>
  );
}
