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

import * as Silvana from "@silvana-one/api";

export function MemecoinBuyModal({
  token,
  onClose,
  frogTotalSupply,
  dragonTotalSupply,
}: {
  token: "frog" | "dragon";
  onClose: () => void;
  frogTotalSupply: number;
  dragonTotalSupply: number;
}) {
  const frogPrice = 5;
  const dragonPrice = 5;

  const notificationStore = useNotificationStore();
  const [chosenCoin, setChosenCoin] = useState<"frog" | "dragon">(token);
  const [buyAmount, setBuyAmount] = useState<number>(1);
  const [minaAmount, setMinaAmount] = useState<number>(
    chosenCoin === "frog" ? frogPrice : dragonPrice
  );

  const validationSchema = Yup.object().shape({
    amount: Yup.number().min(1, "Min amount: 1").required("Amount is required"),
    minaAmount: Yup.number()
      .min(
        chosenCoin === "frog" ? frogPrice : dragonPrice,
        `Min amount: ${chosenCoin === "frog" ? frogPrice : dragonPrice}`
      )
      .required("Amount is required"),
  });

  const onFormSubmit = () => {
    notificationStore.create({
      type: "success",
      message: "form submitted",
    });
    onClose();
  };

  const removeLeadingZero = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const num = parseFloat(value);

    if (Number.isInteger(num) && value.startsWith("0") && value.length > 1) {
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

                      const supply =
                        chosenCoin === "frog"
                          ? frogTotalSupply
                          : dragonTotalSupply;
                      const tokenAmount =
                        value / (0.00001 + supply / 10_000_000_000);

                      await setFieldValue("minaAmount", value);
                      await setFieldValue("amount", tokenAmount);
                      setMinaAmount(value);
                      setBuyAmount(tokenAmount);
                    }}
                    className={
                      "text-right ml-auto outline-none appearance-none focus:outline-none bg-[#252525] mr-[0.521vw] text-foreground text-[1.042vw] font-medium font-plexsans leading-[110%] uppercase"
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
                    onValueChange={(value: "frog" | "dragon") => {
                      setChosenCoin(value);
                      setBuyAmount(1);
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

                      const supply =
                        chosenCoin === "frog"
                          ? frogTotalSupply
                          : dragonTotalSupply;
                      const mintPrice =
                        value * (0.00001 + supply / 10_000_000_000);

                      await setFieldValue("amount", value);
                      await setFieldValue("minaAmount", mintPrice);
                      setBuyAmount(value);
                      setMinaAmount(mintPrice);
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
                  chosenCoin == "frog" ? "bg-[#3A39FF]" : "bg-[#FF5B23]"
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
            </Form>
          )}
        </Formik>
      </div>
    </motion.div>
  );
}
