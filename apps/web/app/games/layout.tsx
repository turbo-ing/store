"use client";

import { ReactNode, useState, useEffect } from "react";
import GamesContext from "../../../../packages/sdk/lib/contexts/GamesContext";
import { useRoundsStore } from "../../../../packages/games/lottery/lib/roundsStore";
import { api } from "../../trpc/react";
import { ILotteryRound } from "../../../../packages/games/lottery/lib/types";
import { useWorkerClientStore } from "../../../../packages/sdk/lib/stores/workerClient";
import { useNetworkStore } from "../../../../packages/sdk/lib/stores/network";

export default function Layout({ children }: { children: ReactNode }) {
  const roundsStore = useRoundsStore();
  const lotteryStore = useWorkerClientStore();
  const networkStore = useNetworkStore();

  const [roundInfo, setRoundInfo] = useState<ILotteryRound | undefined>();
  const [minaEvents, setMinaEvents] = useState<any | undefined>(undefined);
  const [userGiftCodes, setUserGiftCodes] = useState<
    { code: string; used: boolean; createdAt: string }[]
  >([]);

  const getRoundQuery = api.lotteryBackend.getRoundInfo.useQuery(
    {
      roundId: roundsStore.roundToShowId,
    },
    {
      refetchInterval: 5000,
    },
  );

  const getMinaEventsQuery = api.lotteryBackend.getMinaEvents.useQuery({});
  const getUserGiftCodesQuery = api.giftCodes.getUserGiftCodes.useQuery({
    userAddress: networkStore.address || "",
  });
  const getRoundsInfosQuery = api.lotteryBackend.getRoundInfos;

  useEffect(() => {
    if (!getRoundQuery.data) return undefined;
    setRoundInfo(getRoundQuery.data);
  }, [roundsStore.roundToShowId, getRoundQuery.data]);

  useEffect(() => {
    roundsStore.setRoundToShowId(lotteryStore.lotteryRoundId);
  }, [lotteryStore.lotteryRoundId]);

  useEffect(() => {
    if (!getMinaEventsQuery.data) return undefined;
    setMinaEvents(getMinaEventsQuery.data);
  }, [getMinaEventsQuery.data]);

  useEffect(() => {
    if (!getUserGiftCodesQuery.data) return undefined;
    setUserGiftCodes(
      getUserGiftCodesQuery.data.giftCodes.map((item) => ({
        code: item.code,
        used: item.used,
        createdAt: item.createdAt,
      })),
    );
  }, [getUserGiftCodesQuery.data]);

  return (
    <GamesContext.Provider
      value={{
        lotteryContext: {
          roundInfo: roundInfo,
          minaEvents: minaEvents,
          userGiftCodes: userGiftCodes,
          getRoundsInfosQuery: (roundsIds, params) =>
            (getRoundsInfosQuery.useQuery({ roundIds: roundsIds }, params)
              ?.data as ILotteryRound[]) || undefined,
        },
      }}
    >
      {children}
    </GamesContext.Provider>
  );
}
