"use client";

import { ReactNode, useState, useEffect } from "react";
import { useRoundsStore } from "../../../../packages/games/lottery/lib/roundsStore";
import { api } from "../../trpc/react";
import { api as vanilaApi } from "../../trpc/vanilla";

import { ILotteryRound } from "../../../../packages/games/lottery/lib/types";
import { useNetworkStore } from "../../../../packages/sdk/lib/stores/network";
import LotteryContext from "../../../../packages/games/lottery/lib/contexts/LotteryContext";
import SetupStoreContext from "../../../../packages/sdk/lib/contexts/SetupStoreContext";

export default function Layout({ children }: { children: ReactNode }) {
  const roundsStore = useRoundsStore();
  const networkStore = useNetworkStore();

  const [roundInfo, setRoundInfo] = useState<ILotteryRound | undefined>();
  const [minaEvents, setMinaEvents] = useState<any | undefined>(undefined);
  const getRoundQuery = api.lotteryBackend.getRoundInfos.useQuery(
    {
      roundIds: [roundsStore.roundToShowId],
    },
    {
      refetchInterval: 5000,
    }
  );

  const getMinaEventsQuery = api.lotteryBackend.getMinaEvents.useQuery({});

  const addGiftCodesMutation = api.giftCodes.addGiftCodes.useMutation();
  const addClaimRequestMutation = api.claimRequests.requestClaim.useMutation();
  const sendTicketQueueMutation = api.giftCodes.sendTicketQueue.useMutation();
  const getRoundsInfosQuery = api.lotteryBackend.getRoundInfos;

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
          getRoundsInfosQuery: (roundsIds, params) =>
            (getRoundsInfosQuery.useQuery({ roundIds: roundsIds }, params)
              ?.data as Record<number, ILotteryRound>) || undefined,
          addGiftCodesMutation: (giftCodes) =>
            addGiftCodesMutation.mutate(giftCodes),
          addClaimRequestMutation: (claim) => 
            addClaimRequestMutation.mutate(claim),
          sendTicketQueueMutation: (ticketQueue) =>
            sendTicketQueueMutation.mutate({
              userAddress: ticketQueue.userAddress,
              giftCode: ticketQueue.giftCode,
              roundId: ticketQueue.roundId,
              ticket: ticketQueue.ticket,
              signature: ticketQueue.signature
            }),
          async checkGiftCodesQuery(codes) {
            const data = await vanilaApi.giftCodes.checkGiftCodes.query({
              giftCodes: codes,
            });
            return data?.giftCodes;
          },
        }}
      >
        {children}
      </LotteryContext.Provider>
    </SetupStoreContext.Provider>
  );
}
