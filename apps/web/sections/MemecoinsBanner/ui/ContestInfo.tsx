"use client";

import Image from "next/image";
import minanftIMG from "@/public/image/partners/minanft.svg";
import { DurationObjectUnits } from "luxon";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { abbreviateNumber, cn, formatAddress } from "@zknoid/sdk/lib/helpers";
import { useNetworkStore } from "@zknoid/sdk/lib/stores/network";
import Link from "next/link";
import { priceFormatDecimals } from "../constants";
import Skeleton from "@zknoid/sdk/components/shared/Skeleton";

export function TimerItem({ time, text }: { time: number; text: string }) {
  return (
    <div className={"flex flex-col gap-[0.26vw]"}>
      <div
        className={
          "w-[5.208vw] h-[5.208vw] rounded-[0.521vw] bg-[#252525] flex flex-col justify-center items-center"
        }
      >
        <span className={"text-[3.49vw] text-foreground font-bold"}>
          {String(time).padStart(2, "0")}
        </span>
      </div>
      <div
        className={
          "w-[5.208vw] h-[1.563vw] rounded-[0.521vw] bg-[#252525] flex flex-col justify-center items-center"
        }
      >
        <span
          className={
            "text-foreground text-[0.833vw] font-plexsans leading-[110%]"
          }
        >
          {text}
        </span>
      </div>
    </div>
  );
}

export function Banner({
  eventEndsIn,
  openRules,
}: {
  eventEndsIn: DurationObjectUnits | undefined;
  openRules: () => void;
}) {
  return (
    <div
      className={
        "w-full h-[20.833vw] rounded-[0.781vw] relative overflow-hidden"
      }
    >
      <Image
        src={
          "https://res.cloudinary.com/dw4kivbv0/image/upload/f_auto,q_50,w_2800/v1/store/memecoins/umizmfjdndkcqgyccsvz"
        }
        width={1400}
        height={400}
        alt={"Banner"}
        className={"w-full h-full object-cover object-center"}
      />
      <div
        className={
          "absolute left-0 top-0 flex flex-col items-center justify-center w-full h-full"
        }
      >
        <div className={"flex flex-col gap-[0.521vw]"}>
          <div
            className={
              "rounded-[0.521vw] bg-[#252525] py-[0.677vw] px-[3.125vw] flex flex-col justify-center items-center"
            }
          >
            <span
              className={"text-foreground text-[1.25vw] font-bold font-museo"}
            >
              Token competition ends in
            </span>
          </div>
          <div className={"flex flex-row gap-[0.781vw]"}>
            <TimerItem
              time={Math.trunc(eventEndsIn?.days ?? 0)}
              text={"Days"}
            />
            <TimerItem
              time={Math.trunc(eventEndsIn?.hours ?? 0)}
              text={"Hours"}
            />
            <TimerItem
              time={Math.trunc(eventEndsIn?.minutes ?? 0)}
              text={"Minutes"}
            />
            <TimerItem
              time={Math.trunc(eventEndsIn?.seconds ?? 0)}
              text={"Seconds"}
            />
          </div>
        </div>
      </div>
      <button
        className={
          "absolute right-[0.781vw] top-[0.781vw] hover:opacity-80 rounded-[0.26vw] border border-middle-accent flex flex-col justify-center items-center bg-foreground"
        }
        onClick={openRules}
      >
        <span
          className={
            "text-[1.823vw] font-museo font-bold text-center px-[1.042vw] text-middle-accent"
          }
        >
          ?
        </span>
      </button>
    </div>
  );
}

export function Slider({
  frozenAmount,
  hotAmount,
}: {
  frozenAmount: number;
  hotAmount: number;
}) {
  const [frozenPercent, setFrozenPercent] = useState<number>(0);
  const [hotPercent, setHotPercent] = useState<number>(0);

  useEffect(() => {
    const allSupply = frozenAmount + hotAmount;
    const currentFrozenPercent = (frozenAmount / allSupply) * 100;
    const currentHotPercent = (hotAmount / allSupply) * 100;
    setFrozenPercent(currentFrozenPercent);
    setHotPercent(currentHotPercent);
  }, [frozenAmount, hotAmount]);

  return (
    <div
      className={
        "rounded-[0.781vw] bg-bg-dark p-[1.042vw] flex flex-col gap-[1.042vw]"
      }
    >
      <span className={"text-[1.667vw] text-foreground font-bold font-museo"}>
        Frozen Frog VS Fire Dragon
      </span>
      <div className={"relative w-full h-[2.344vw] flex flex-row"}>
        <motion.div
          className={
            "absolute left-0 top-0 h-[2.344vw] bg-gradient-to-l to-[#232299] from-[#3A39FF] rounded-l-[0.521vw]"
          }
          style={{
            width: `${frozenPercent == 0 || hotPercent == 0 ? 50 : frozenPercent}%`,
          }}
        />
        <motion.div
          className={
            "absolute h-[2.344vw] z-[1] w-[0.104vw] bg-foreground rounded-t-[0.052vw] flex flex-col justify-center items-center"
          }
          style={{
            left: `${frozenPercent == 0 || hotPercent == 0 ? 50 : frozenPercent}%`,
          }}
        >
          <motion.div
            className={
              "absolute z-[1] mt-[1.042vw] top-full flex flex-row items-center justify-center gap-[0.365vw]"
            }
          >
            <Skeleton
              isLoading={isNaN(frozenPercent) || frozenPercent == 0}
              className={"w-[3.125vw] h-[0.625vw] rounded-full"}
            >
              <span
                className={
                  "text-[0.625vw] font-plexsans text-foreground leading-[110%]"
                }
              >
                {frozenPercent.toFixed(2)}%
              </span>
            </Skeleton>
            <span
              className={
                "text-[0.625vw] font-semibold font-plexsans text-foreground leading-[110%]"
              }
            >
              VS
            </span>
            <Skeleton
              isLoading={isNaN(hotPercent) || hotPercent == 0}
              className={"w-[3.125vw] h-[0.625vw] rounded-full"}
            >
              <span
                className={
                  "text-[0.625vw] font-plexsans text-foreground leading-[110%]"
                }
              >
                {hotPercent.toFixed(2)}%
              </span>
            </Skeleton>
          </motion.div>
        </motion.div>
        <motion.div
          className={
            "absolute right-0 top-0 h-[2.344vw] bg-gradient-to-l to-[#FF5B23] from-[#993715] rounded-r-[0.521vw]"
          }
          style={{
            width: `${frozenPercent == 0 || hotPercent == 0 ? 50 : hotPercent}%`,
          }}
        />
      </div>
      <div className={"w-full flex flex-row items-center justify-between"}>
        <Skeleton
          isLoading={frozenAmount == 0}
          className={"w-[8vw] h-[0.833vw] rounded-full"}
        >
          <span
            className={
              "text-[0.833vw] font-plexsans font-semibold leading-[110%] text-foreground uppercase"
            }
          >
            {abbreviateNumber(frozenAmount)} Frozen Frog
          </span>
        </Skeleton>
        <Skeleton
          isLoading={hotAmount == 0}
          className={"w-[8vw] h-[0.833vw] rounded-full"}
        >
          <span
            className={
              "text-[0.833vw] font-plexsans font-semibold leading-[110%] text-foreground uppercase"
            }
          >
            {abbreviateNumber(hotAmount)} Fire dragon
          </span>
        </Skeleton>
      </div>
    </div>
  );
}

function UserPlaceIcon() {
  return (
    <div
      className={
        "col-span-2 w-fit rounded-[0.26vw] bg-gradient-to-l from-[#FFE75E] to-[#AD6B00] flex flex-col justify-center items-center p-[0.26vw]"
      }
    >
      <span
        className={"text-[0.417vw] font-plexsans leading-[110%] text-[#252525]"}
      >
        Your place
      </span>
    </div>
  );
}

export function CoinBock({
  label,
  price,
  amount,
  leaderboard,
  image,
  link,
  btnColor,
  onBuy,
}: {
  label: string;
  price: number;
  amount: number;
  leaderboard: { userAddress: string; amount: number }[];
  image: any;
  link: string;
  btnColor: string;
  onBuy: () => void;
}) {
  const networkStore = useNetworkStore();
  const sortedLeaderboard = leaderboard
    .filter((item) => item.amount != 0)
    .sort((a, b) => b.amount - a.amount);

  const [userPlace, setUserPlace] = useState<
    { userAddress: string; amount: number; index: number } | undefined
  >(undefined);

  const getUserInfo = () => {
    const userInfo = sortedLeaderboard.find(
      (leaderboardItem) => leaderboardItem.userAddress === networkStore.address,
    );
    const userIndex = sortedLeaderboard.findIndex(
      (item) => item.userAddress === networkStore.address,
    );

    if (userInfo && userIndex != -1 && userPlace?.amount != userInfo.amount) {
      setUserPlace({
        ...userInfo,
        index: userIndex,
      });
    }
  };

  useEffect(() => {
    getUserInfo();
  }, [leaderboard]);

  return (
    <div
      className={
        "w-full rounded-[0.781vw] bg-bg-dark p-[0.781vw] flex flex-row gap-[1.563vw]"
      }
    >
      <div className={"flex flex-col gap-[1.042vw] w-1/2"}>
        <div className={"text-[1.25vw] font-museo font-bold text-foreground"}>
          Top {label} holders:
        </div>
        <div className={"flex flex-col gap-[0.521vw]"}>
          <div className={"border-b pb-[0.521vw] grid grid-cols-3"}>
            <span className={"text-[0.833vw] font-plexsans leading-[110%]"}>
              Position
            </span>
            <span
              className={
                "text-[0.833vw] font-plexsans leading-[110%] text-center"
              }
            >
              Wallet address
            </span>
            <span
              className={"text-[0.833vw] font-plexsans leading-[110%] text-end"}
            >
              Amount
            </span>
          </div>
          <Skeleton
            isLoading={sortedLeaderboard.length == 0}
            className={"h-[15.625vw] w-full rounded-[0.521vw]"}
          >
            <div className={"flex flex-col gap-[0.26vw]"}>
              {sortedLeaderboard.slice(0, 5).map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-px rounded-[0.521vw]",
                    index + 1 === 1
                      ? "bg-gradient-to-l from-[#FFE75F] to-[#252525]"
                      : index + 1 <= 3
                        ? "bg-gradient-to-l from-[#A8A6A6] to-[#252525]"
                        : "bg-gradient-to-l from-[#E3A54F] to-[#252525]",
                  )}
                >
                  <div
                    className={cn(
                      "grid bg-[#252525] items-center p-[0.521vw] rounded-[0.521vw]",
                      networkStore.address == item.userAddress
                        ? "grid-cols-9"
                        : "grid-cols-3",
                    )}
                  >
                    <span
                      className={
                        "text-foreground text-[0.833vw] font-plexsans leading-[110%]"
                      }
                    >
                      {index + 1}
                    </span>
                    {networkStore.address == item.userAddress && (
                      <UserPlaceIcon />
                    )}
                    <span
                      className={cn(
                        "text-foreground text-[0.833vw] font-plexsans leading-[110%] text-center",
                        networkStore.address == item.userAddress &&
                          "col-span-3",
                      )}
                    >
                      {formatAddress(item.userAddress)}
                    </span>
                    <span
                      className={cn(
                        "text-foreground text-[0.833vw] font-plexsans leading-[110%] text-end",
                        networkStore.address == item.userAddress &&
                          "col-span-3",
                      )}
                    >
                      {abbreviateNumber(item.amount)}
                    </span>
                  </div>
                </div>
              ))}
              {sortedLeaderboard.length < 5 &&
                [...Array(5 - sortedLeaderboard.length)].map((_, index) => (
                  <div
                    key={index}
                    className={
                      "rounded-[0.521vw] bg-[#252525] flex justify-center items-center p-[0.521vw]"
                    }
                  >
                    <span
                      className={
                        "text-foreground text-[0.833vw] font-plexsans leading-[110%]"
                      }
                    >
                      ...
                    </span>
                  </div>
                ))}
              {!sortedLeaderboard
                .slice(0, 5)
                .find((item) => item.userAddress === networkStore.address) &&
              userPlace ? (
                <>
                  <div
                    className={
                      "rounded-[0.521vw] bg-[#252525] flex justify-center items-center p-[0.521vw]"
                    }
                  >
                    <span
                      className={
                        "text-foreground text-[0.833vw] font-plexsans leading-[110%]"
                      }
                    >
                      ...
                    </span>
                  </div>
                  <div
                    key={"userPlace"}
                    className={
                      "grid grid-cols-9 rounded-[0.521vw] bg-[#252525] items-center p-[0.521vw]"
                    }
                  >
                    <span
                      className={
                        "text-foreground text-[0.833vw] font-plexsans leading-[110%]"
                      }
                    >
                      {userPlace.index + 1}
                    </span>
                    <UserPlaceIcon />
                    <span
                      className={
                        "col-span-3 text-foreground text-[0.833vw] font-plexsans leading-[110%] text-center"
                      }
                    >
                      {formatAddress(userPlace.userAddress)}
                    </span>
                    <span
                      className={
                        "col-span-3 text-foreground text-[0.833vw] font-plexsans leading-[110%] text-end"
                      }
                    >
                      {abbreviateNumber(userPlace.amount)}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={
                      "rounded-[0.521vw] bg-[#252525] flex justify-center items-center p-[0.521vw]"
                    }
                  >
                    <span
                      className={
                        "text-foreground text-[0.833vw] font-plexsans leading-[110%]"
                      }
                    >
                      ...
                    </span>
                  </div>
                  <div
                    className={
                      "rounded-[0.521vw] bg-[#252525] flex justify-center items-center p-[0.521vw]"
                    }
                  >
                    <span
                      className={
                        "text-foreground text-[0.833vw] font-plexsans leading-[110%]"
                      }
                    >
                      ...
                    </span>
                  </div>
                </>
              )}
            </div>
          </Skeleton>
        </div>
      </div>
      <div className={"flex flex-col w-1/2"}>
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className={
            "rounded-[0.26vw] hover:opacity-80 bg-[#252525] py-[0.26vw] px-[0.417vw] flex flex-col justify-center items-center ml-auto"
          }
        >
          <Image
            src={minanftIMG}
            alt={"minanft"}
            className={"w-full h-full object-contain object-center"}
          />
        </Link>
        <div className={"flex flex-col"}>
          <div className={"w-[11.458vw] h-[11.458vw] mx-auto"}>
            <Image
              src={image}
              alt={"Coin"}
              className={"w-full h-full object-contain object-center"}
            />
          </div>
          <div
            className={
              "mt-[0.781vw] rounded-[0.521vw] bg-[#252525] flex flex-col p-[0.781vw] gap-[0.677vw]"
            }
          >
            <Skeleton
              isLoading={amount == 0}
              className={"w-[70%] h-[1.25vw] rounded-full"}
            >
              <span
                className={
                  "text-[1.25vw] font-semibold font-plexsans leading-[110%] uppercase"
                }
              >
                Total Supply: {abbreviateNumber(amount)}
              </span>
            </Skeleton>
            <Skeleton
              isLoading={price == 0}
              className={"w-1/2 h-[0.833vw] rounded-full"}
            >
              <span className={"text-[0.833vw] font-plexsans leading-[110%]"}>
                Current Price: {price.toFixed(priceFormatDecimals)} MINA
              </span>
            </Skeleton>
          </div>
          <button
            className={
              "disabled:opacity-60 disabled:cursor-progress hover:opacity-80 rounded-[0.26vw] flex flex-col justify-center items-center w-full py-[0.26vw] mt-[0.26vw]"
            }
            style={{ backgroundColor: btnColor }}
            disabled={price == 0}
            onClick={onBuy}
          >
            <span
              className={"text-[1.25vw] font-museo font-medium text-foreground"}
            >
              Buy {label}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
