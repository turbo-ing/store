"use client";

import { ReactNode, useState, useEffect } from "react";
import { useRoundsStore } from "../../../../packages/games/lottery/lib/roundsStore";
import { api } from "../../trpc/react";
import { ILotteryRound } from "../../../../packages/games/lottery/lib/types";
import { useNetworkStore } from "../../../../packages/sdk/lib/stores/network";
import LotteryContext from "../../../../packages/games/lottery/lib/contexts/LotteryContext";

export default function Layout({ children }: { children: ReactNode }) {
  const roundsStore = useRoundsStore();
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
  const removeUsedGiftCodesMutation =
    api.giftCodes.removeUsedGiftCodes.useMutation();
  const addGiftCodeMutation = api.giftCodes.addGiftCode.useMutation();
  const addGiftCodesMutation = api.giftCodes.addGiftCodes.useMutation();
  const sendTicketQueueMutation = api.giftCodes.sendTicketQueue.useMutation();
  const useGiftCodeMutation = api.giftCodes.useGiftCode.useMutation();

  useEffect(() => {
    if (!getRoundQuery.data) return undefined;
    setRoundInfo(getRoundQuery.data);
  }, [roundsStore.roundToShowId, getRoundQuery.data]);

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
    <LotteryContext.Provider
      value={{
        roundInfo: roundInfo,
        minaEvents: minaEvents,
        userGiftCodes: userGiftCodes,
        getRoundsInfosQuery: (roundsIds, params) =>
          (getRoundsInfosQuery.useQuery({ roundIds: roundsIds }, params)
            ?.data as ILotteryRound[]) || undefined,
        addGiftCodeMutation: (giftCode) =>
          addGiftCodeMutation.mutate({
            userAddress: giftCode.userAddress,
            code: giftCode.code,
            transactionHash: giftCode.transactionHash,
          }),
        addGiftCodesMutation: (giftCodes) =>
          addGiftCodesMutation.mutate(giftCodes),
        removeUsedGiftCodesMutation: (userAddress) =>
          removeUsedGiftCodesMutation.mutate({ userAddress: userAddress }),
        sendTicketQueueMutation: (ticketQueue) =>
          sendTicketQueueMutation.mutate({
            userAddress: ticketQueue.userAddress,
            giftCode: ticketQueue.giftCode,
            roundId: ticketQueue.roundId,
            ticket: ticketQueue.ticket,
          }),
        useGiftCodeMutation: (giftCode) =>
          useGiftCodeMutation.mutate({ giftCode: giftCode }),
      }}
    >
      {children}
    </LotteryContext.Provider>
  );
}
