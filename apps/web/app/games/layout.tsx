"use client";

import { ReactNode, useState, useEffect } from "react";
import { useRoundsStore } from "../../../../packages/games/lottery/lib/roundsStore";
import { api } from "../../trpc/react";
import { ILotteryRound } from "../../../../packages/games/lottery/lib/types";
import { useNetworkStore } from "../../../../packages/sdk/lib/stores/network";
import LotteryContext from "../../../../packages/games/lottery/lib/contexts/LotteryContext";
import SetupStoreContext from "../../../../packages/sdk/lib/contexts/SetupStoreContext";

export default function Layout({ children }: { children: ReactNode }) {
  const roundsStore = useRoundsStore();
  const networkStore = useNetworkStore();

  const [roundInfo, setRoundInfo] = useState<ILotteryRound | undefined>();
  const [minaEvents, setMinaEvents] = useState<any | undefined>(undefined);
  const [userGiftCodes, setUserGiftCodes] = useState<
    { code: string; used: boolean; createdAt: string }[]
  >([]);

  const getRoundQuery = api.lotteryBackend.getRoundInfos.useQuery(
    {
      roundIds: [roundsStore.roundToShowId],
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
  const addGiftCodesMutation = api.giftCodes.addGiftCodes.useMutation();
  const sendTicketQueueMutation = api.giftCodes.sendTicketQueue.useMutation();
  const useGiftCodeMutation = api.giftCodes.useGiftCode.useMutation();

  const accountData = api.accounts.getAccount.useQuery({
    userAddress: networkStore.address || "",
  }).data;
  const nameMutator = api.accounts.setName.useMutation();
  const avatarIdMutator = api.accounts.setAvatar.useMutation();

  const gameFeedbackMutator = api.ratings.setGameFeedback.useMutation();
  const getGameIdQuery = api.ratings.getGameRating;

  const setFavoriteGameStatusMutation =
    api.favorites.setFavoriteGameStatus.useMutation();
  const getFavoriteGamesQuery = api.favorites.getFavoriteGames.useQuery({
    userAddress: networkStore.address || "",
  });

  useEffect(() => {
    if (!getRoundQuery.data) return undefined;

    setRoundInfo(Object.values(getRoundQuery.data)[0]);
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
    <SetupStoreContext.Provider
      value={{
        account: {
          name: accountData?.account?.name,
          avatarId: accountData?.account?.avatarId,
          nameMutator: (name) =>
            nameMutator.mutate({
              userAddress: networkStore.address || "",
              name: name,
            }),
          avatarIdMutator: (avatarId) =>
            avatarIdMutator.mutate({
              userAddress: networkStore.address || "",
              avatarId: avatarId,
            }),
        },
        ratings: {
          gameFeedbackMutator: (feedback) =>
            gameFeedbackMutator.mutate({
              userAddress: feedback.userAddress,
              gameId: feedback.gameId,
              feedback: feedback.feedbackText,
              rating: feedback.rating,
            }),
          getGameRatingQuery: (gameId) =>
            (getGameIdQuery.useQuery({ gameId: gameId })?.data
              ?.rating as Record<number, number>) || undefined,
        },
        favorites: {
          setFavoriteGameStatus: (userAddress, gameId, status) =>
            setFavoriteGameStatusMutation.mutate({
              userAddress: userAddress,
              gameId: gameId,
              status: status,
            }),
          userFavoriteGames: getFavoriteGamesQuery.data?.favorites as [],
        },
      }}
    >
      <LotteryContext.Provider
        value={{
          roundInfo: roundInfo,
          minaEvents: minaEvents,
          userGiftCodes: userGiftCodes,
          getRoundsInfosQuery: (roundsIds, params) =>
            (getRoundsInfosQuery.useQuery({ roundIds: roundsIds }, params)
              ?.data as Record<number, ILotteryRound>) || undefined,
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
    </SetupStoreContext.Provider>
  );
}
