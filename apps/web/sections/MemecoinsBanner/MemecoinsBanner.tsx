"use client";

import Image from "next/image";
import memeBannerIMG from "@/public/image/memecoins/banner.svg";
import coinFrogIMG from "@/public/image/memecoins/coin-frog.svg";
import coinDragonIMG from "@/public/image/memecoins/сoin-dragon.svg";
import minanftIMG from "@/public/image/partners/minanft.svg";
import minaICON from "@/public/image/memecoins/mina.svg";
import dragonICON from "@/public/image/memecoins/dragon.svg";
import frogICON from "@/public/image/memecoins/frog.svg";
import { DateTime, DurationObjectUnits, Interval } from "luxon";
import { ChangeEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn, formatAddress } from "@zknoid/sdk/lib/helpers";
import { useNetworkStore } from "@zknoid/sdk/lib/stores/network";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTriggerChevron,
  SelectValue,
} from "../../../../packages/sdk/components/shared/Select/Select";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useNotificationStore } from "@zknoid/sdk/components/shared/Notification/lib/notificationStore";

function TimerItem({ time, text }: { time: number; text: string }) {
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

function Banner({
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
        src={memeBannerIMG}
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

function Slider({
  frozenAmount,
  hotAmount,
}: {
  frozenAmount: number;
  hotAmount: number;
}) {
  const [frozenPercent, setFrozenPercent] = useState<number>(0);
  const [hotPercent, setHotPercent] = useState<number>(0);
  const [winning, setWinning] = useState<"neutral" | "hot" | "frozen">(
    "neutral",
  );

  useEffect(() => {
    const allSupply = frozenAmount + hotAmount;
    const currentFrozenPercent = (frozenAmount / allSupply) * 100;
    const currentHotPercent = (hotAmount / allSupply) * 100;
    const winningType =
      currentFrozenPercent == currentHotPercent
        ? "neutral"
        : currentFrozenPercent < currentHotPercent
          ? "hot"
          : "frozen";
    setFrozenPercent(currentFrozenPercent);
    setHotPercent(currentHotPercent);
    setWinning(winningType);
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
      <div
        className={
          "relative w-full h-[2.344vw] flex flex-row overflow-hidden rounded-[0.521vw]"
        }
      >
        <motion.div
          className={
            "absolute left-0 top-0 h-[2.344vw] bg-gradient-to-l to-[#232299] from-[#3A39FF]"
          }
          animate={
            winning == "frozen" || winning == "neutral"
              ? {
                  borderTopRightRadius: "0.521vw",
                  borderBottomRightRadius: "0.521vw",
                  zIndex: 1,
                }
              : undefined
          }
          style={{
            width: `${winning == "hot" ? frozenPercent + 1 : frozenPercent}%`,
          }}
        />
        <motion.div
          className={
            "absolute right-0 top-0 h-[2.344vw] bg-gradient-to-l to-[#FF5B23] from-[#993715]"
          }
          animate={
            winning == "hot" || winning == "neutral"
              ? {
                  borderTopLeftRadius: "0.521vw",
                  borderBottomLeftRadius: "0.521vw",
                  zIndex: 1,
                }
              : undefined
          }
          style={{
            width: `${winning == "frozen" ? hotPercent + 1 : hotPercent}%`,
          }}
        />
      </div>
      <div className={"w-full flex flex-row items-center justify-between"}>
        <span
          className={
            "text-[0.833vw] font-plexsans font-semibold leading-[110%] text-foreground uppercase"
          }
        >
          {frozenAmount} Frozen Frog
        </span>
        <span
          className={
            "text-[0.833vw] font-plexsans font-semibold leading-[110%] text-foreground uppercase"
          }
        >
          {hotAmount} fire dragon
        </span>
      </div>
    </div>
  );
}

function CoinBock({
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
  const sortedLeaderboard = leaderboard.sort((a, b) => b.amount - a.amount);

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
                  className={
                    "grid grid-cols-3 bg-[#252525] items-center p-[0.521vw] rounded-[0.521vw]"
                  }
                >
                  <span
                    className={
                      "text-foreground text-[0.833vw] font-plexsans leading-[110%]"
                    }
                  >
                    {index + 1}
                  </span>
                  <span
                    className={
                      "text-foreground text-[0.833vw] font-plexsans leading-[110%] text-center"
                    }
                  >
                    {formatAddress(item.userAddress)}
                  </span>
                  <span
                    className={
                      "text-foreground text-[0.833vw] font-plexsans leading-[110%] text-end"
                    }
                  >
                    {item.amount}
                  </span>
                </div>
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
                    "grid grid-cols-3 rounded-[0.521vw] bg-[#252525] items-center p-[0.521vw]"
                  }
                >
                  <span
                    className={
                      "text-foreground text-[0.833vw] font-plexsans leading-[110%]"
                    }
                  >
                    {userPlace.index + 1}
                  </span>
                  <span
                    className={
                      "text-foreground text-[0.833vw] font-plexsans leading-[110%] text-center"
                    }
                  >
                    {formatAddress(userPlace.userAddress)}
                  </span>
                  <span
                    className={
                      "text-foreground text-[0.833vw] font-plexsans leading-[110%] text-end"
                    }
                  >
                    {userPlace.amount}
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
        </div>
      </div>
      <div className={"flex flex-col w-1/2"}>
        <Link
          href={link}
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
            <span
              className={
                "text-[1.25vw] font-semibold font-plexsans leading-[110%] uppercase"
              }
            >
              Total Supply: {amount}
            </span>
            <span className={"text-[0.833vw] font-plexsans leading-[110%]"}>
              Current Price: {price} MINA
            </span>
          </div>
          <button
            className={
              "hover:opacity-80 rounded-[0.26vw] flex flex-col justify-center items-center w-full py-[0.26vw] mt-[0.26vw]"
            }
            style={{ backgroundColor: btnColor }}
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

function RulesModal({ onClose }: { onClose: () => void }) {
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

function BuyModal({
  defaultValue,
  onClose,
}: {
  defaultValue: "frog" | "dragon";
  onClose: () => void;
}) {
  const frogPrice = 1;
  const dragonPrice = 1;

  const notificationStore = useNotificationStore();
  const [choosenCoin, setChoosenCoin] = useState<"frog" | "dragon">(
    defaultValue,
  );
  const [buyAmount, setBuyAmount] = useState<number>(1);

  const validationSchema = Yup.object().shape({
    amount: Yup.number().min(1, "Min amount: 1").required("Amount is required"),
  });

  const onFormSubmit = () => {
    notificationStore.create({
      type: "success",
      message: "form submitted",
    });
    onClose();
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
      onClick={onClose}
    >
      <div
        className={
          "min-h-[20.833vw] min-w-[28.646vw] relative flex flex-col rounded-[0.781vw] bg-bg-dark p-[1.563vw]"
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
        <Formik
          initialValues={{ amount: buyAmount }}
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
                Mint {choosenCoin == "frog" ? "Frozen Frog" : "Fire Dragon"}{" "}
                Token
              </div>
              <div className={"flex flex-col gap-[0.26vw] mb-[1.042vw]"}>
                <span
                  className={
                    "text-[0.833vw] font-plexsans text-foreground leading-[110%]"
                  }
                >
                  From
                </span>
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
                  <span
                    className={
                      "ml-auto mr-[0.521vw] text-foreground text-[1.042vw] font-medium font-plexsans leading-[110%] uppercase"
                    }
                  >
                    {choosenCoin === "frog"
                      ? buyAmount * frogPrice
                      : buyAmount * dragonPrice}
                  </span>
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
                    src={choosenCoin === "frog" ? frogICON : dragonICON}
                    alt={"Coin icon"}
                    className={"w-[1.771vw] h-[1.771vw]"}
                  />
                  <Select
                    value={choosenCoin}
                    onValueChange={(value: "frog" | "dragon") => {
                      setChoosenCoin(value);
                      setBuyAmount(1);
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
                      await setFieldValue("amount", e.target.value);
                      setBuyAmount(Number(e.target.value));
                    }}
                    className={
                      "text-right ml-auto outline-none appearance-none focus:outline-none bg-[#252525] mr-[0.521vw] text-foreground text-[1.042vw] font-medium font-plexsans leading-[110%] uppercase"
                    }
                  />
                </div>
              </div>
              <button
                type={"submit"}
                className={cn(
                  "rounded-[0.26vw] py-[0.521vw] flex flex-col justify-center items-center w-full",
                  choosenCoin == "frog" ? "bg-[#3A39FF]" : "bg-[#FF5B23]",
                )}
              >
                <span
                  className={
                    "text-[1.25vw] font-museo font-medium text-foreground"
                  }
                >
                  Mint {choosenCoin == "frog" ? "Frozen Frog" : "Fire Dragon"}
                </span>
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </motion.div>
  );
}

export default function MemecoinsBanner() {
  const event = {
    date: {
      start: new Date("2025-02-22T00:00:00.000+03:00"),
      end: new Date("2025-03-01T00:00:00.000+03:00"),
    },
  };

  const frozenCoinAmount = 1200;
  const hotCoinAmount = 994;
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState<boolean>(false);
  const [touchedCoin, setTouchedCoin] = useState<"frog" | "dragon" | undefined>(
    undefined,
  );

  const getTimeLeft = () => {
    return Interval.fromDateTimes(
      DateTime.now(),
      DateTime.fromJSDate(
        event.date.start.getTime() >= Date.now()
          ? event.date.start
          : event.date.end,
      ),
    )
      .toDuration(["days", "hours", "minutes", "seconds"])
      .toObject();
  };
  const [eventEndsIn, setEventEndsIn] = useState<
    DurationObjectUnits | undefined
  >(undefined);
  useEffect(() => {
    setEventEndsIn(getTimeLeft());

    const interval = setInterval(() => {
      setEventEndsIn(getTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const frozenLeaderboard = [
    {
      userAddress: "B62qkV189rv4G3aUxj7nSCzn3bnDsZU8t9UCF2EhMQpnco7FBUain87",
      amount: 1,
    },
    {
      userAddress: "B62qkV189rv4G3aUxj7nSCzn3bnDsZU8t9UCF2EhMQpnco7FBUais99",
      amount: 500,
    },
    {
      userAddress: "B60qkV189rv4G3aUxj7nSCzn3bnDsZU8t9UCF2EhMQpnco7FBUs9u12",
      amount: 5,
    },
    {
      userAddress: "B62qkV189rv4G3aUxj7nSCzn3bnDsZU8t9UCF2EhMQpnco7FBUaid82",
      amount: 235,
    },
    {
      userAddress: "B99qkV189rv4G3aUxj7nSCzn3bnDDZU8t9UCF2EhMQpnco7FBUwib87",
      amount: 100,
    },
    {
      userAddress: "B62qkV189rv4G3aUxj7nSCzn3bnDsZU8t9UCF2EhMQpnco7FBUain89",
      amount: 12,
    },
    {
      userAddress: "B62qkV189rv4G3aUxj7nSCzn3bnDsZU8t9UCF2EhMQpnco7FBUain89",
      amount: 9,
    },
    {
      userAddress: "B62qkV189rv4G3aUxj7nSCzn3bnDsZU8t9UCF2EhMQpnco7FBUain89",
      amount: 3,
    },
    {
      userAddress: "B62qkV189rv4G3aUxj7nSCzn3bnDsZU8t9UCF2EhMQpnco7FBUain89",
      amount: 12235,
    },
    {
      userAddress: "B62qkV189rv4G3aUxj7nSCzn3bnDsZU8t9UCF2EhMQpnco7FBUain89",
      amount: 5,
    },
  ];

  const hotLeaderboard = [
    {
      userAddress: "B62qkV189rv4G3aUxj7nSCzn3bnDsZU8t9UCF2EhMQpnco7FBUain00",
      amount: 900,
    },
    {
      userAddress: "B62qkV189rv4G3aUxj7nSCzn3bnDsZU8t9UCF2EhMQpnco7FBUais99",
      amount: 500,
    },
    {
      userAddress: "B60qkV189rv4G3aUxj7nSCzn3bnDsZU8t9UCF2EhMQpnco7FBUs9u12",
      amount: 5,
    },
    {
      userAddress: "B62qkV189rv4G3aUxj7nSCzn3bnDsZU8t9UCF2EhMQpnco7FBUaid82",
      amount: 235,
    },
    {
      userAddress: "B99qkV189rv4G3aUxj7nSCzn3bnDDZU8t9UCF2EhMQpnco7FBUwib87",
      amount: 100,
    },
    {
      userAddress: "B62qkV189rv4G3aUxj7nSCzn3bnDsZU8t9UCF2EhMQpnco7FBUain89",
      amount: 1024,
    },
  ];

  return (
    <section className={"flex flex-col gap-[1.042vw] mb-[5.208vw]"}>
      <div
        className={
          "mb-[0.521vw] text-[1.667vw] font-museo font-bold text-foreground"
        }
      >
        Meme Token Competition
      </div>
      <Banner
        eventEndsIn={eventEndsIn}
        openRules={() => {
          setIsRulesOpen(true);
        }}
      />
      <Slider frozenAmount={frozenCoinAmount} hotAmount={hotCoinAmount} />
      <div className={"flex flex-row gap-[0.781vw]"}>
        <CoinBock
          label={"Frozen Frog"}
          price={100}
          amount={frozenCoinAmount}
          leaderboard={frozenLeaderboard}
          image={coinFrogIMG}
          link={"#"}
          btnColor={"#3A39FF"}
          onBuy={() => {
            setTouchedCoin("frog");
            setIsBuyModalOpen(true);
          }}
        />
        <CoinBock
          label={"Fire Dragon"}
          price={200}
          amount={hotCoinAmount}
          leaderboard={hotLeaderboard}
          image={coinDragonIMG}
          link={"#"}
          btnColor={"#FF5B23"}
          onBuy={() => {
            setTouchedCoin("dragon");
            setIsBuyModalOpen(true);
          }}
        />
      </div>
      {isRulesOpen && (
        <RulesModal
          onClose={() => {
            setIsRulesOpen(false);
          }}
        />
      )}
      {isBuyModalOpen && touchedCoin && (
        <BuyModal
          defaultValue={touchedCoin}
          onClose={() => {
            setIsBuyModalOpen(false);
            setTouchedCoin(undefined);
          }}
        />
      )}
    </section>
  );
}
