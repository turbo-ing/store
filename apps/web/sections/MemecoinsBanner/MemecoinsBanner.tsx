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

import { MemecoinBuyModal } from "./MemecoinBuyModal";
import { RulesModal } from "./RulesModal";
import { Banner, CoinBock, Slider } from "./ContestInfo";
import { api } from "../../trpc/react";

const mockFrozenLeaderboard = [
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

const mockHotLeaderboard = [
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

const calculatePrice = (totalSupply: number): number => {
  const initialPrice = 0.00001;
  const boundingCurveIncrease = totalSupply / 10_000_000_000;
  const slippage = 1.1;
  return (initialPrice + boundingCurveIncrease) * slippage;
};

export default function MemecoinsBanner() {
  const networkStore = useNetworkStore();

  const balances = api.http.memetokens.getBalances.useQuery(undefined, {
    refetchInterval: 30000,
  });
  const getUserTokensMutation =
    api.http.memetokens.getUserBalance.useMutation();

  const event = {
    date: {
      start: new Date("2025-02-22T00:00:00.000+03:00"),
      end: new Date("2025-03-01T00:00:00.000+03:00"),
    },
  };

  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState<boolean>(false);
  const [touchedCoin, setTouchedCoin] = useState<"frog" | "dragon" | undefined>(
    undefined
  );
  const [frogTotalSupply, setFrogTotalSupply] = useState<number>(0);
  const [dragonTotalSupply, setDragonTotalSupply] = useState<number>(0);

  const [frogPrice, setFrogPrice] = useState<number>(0);
  const [dragonPrice, setDragonPrice] = useState<number>(0);

  const [userFrogTokens, setUserFrogTokens] = useState<number>(0);
  const [userDragonTokens, setUserDragonTokens] = useState<number>(0);

  const [frozenLeaderboard, setFrozenLeaderboard] = useState(
    mockFrozenLeaderboard
  );
  const [hotLeaderboard, setHotLeaderboard] = useState(mockHotLeaderboard);

  const getTimeLeft = () => {
    return Interval.fromDateTimes(
      DateTime.now(),
      DateTime.fromJSDate(
        event.date.start.getTime() >= Date.now()
          ? event.date.start
          : event.date.end
      )
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

  useEffect(() => {
    if (balances.data) {
      setFrogTotalSupply((balances.data.frogTotalSupply || 0) / 1e9);
      setDragonTotalSupply((balances.data.dragonTokenSupply || 0) / 1e9);
    }
  }, [balances.data]);

  useEffect(() => {
    if (frogTotalSupply) {
      setFrogPrice(calculatePrice(frogTotalSupply));
    }
  }, [frogTotalSupply]);

  useEffect(() => {
    if (dragonTotalSupply) {
      setDragonPrice(calculatePrice(dragonTotalSupply));
    }
  }, [dragonTotalSupply]);

  useEffect(() => {
    const fetchUserTokens = async () => {
      if (networkStore.address) {
        const userTokens = await getUserTokensMutation.mutateAsync({
          address: networkStore.address,
        });
        setUserFrogTokens(userTokens.frogBalance || 0);
        setUserDragonTokens(userTokens.dragonBalance || 0);
      }
    };

    fetchUserTokens();

    const intervalId = setInterval(fetchUserTokens, 30000);

    return () => clearInterval(intervalId);
  }, [networkStore.address]);

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
      <Slider frozenAmount={frogTotalSupply} hotAmount={dragonTotalSupply} />
      <div className={"flex flex-row gap-[0.781vw]"}>
        <CoinBock
          label={"Frozen Frog"}
          price={frogPrice}
          amount={frogTotalSupply}
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
          price={dragonPrice}
          amount={dragonTotalSupply}
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
        <MemecoinBuyModal
          token={touchedCoin}
          onClose={() => {
            setIsBuyModalOpen(false);
            setTouchedCoin(undefined);
          }}
          frogPrice={frogPrice}
          dragonPrice={dragonPrice}
        />
      )}
    </section>
  );
}
