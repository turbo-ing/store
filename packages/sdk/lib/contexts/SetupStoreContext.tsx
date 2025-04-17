'use client';

import { createContext } from 'react';

interface ISetupStoreContext {
  account: {
    name: string | undefined;
    avatarId: number | undefined;
    nameMutator: ((name: string) => void) | undefined;
    avatarIdMutator: ((avatarId: number) => void) | undefined;
  };
  ratings: {
    gameFeedbackMutator:
      | ((feedback: {
          userAddress: string;
          gameId: string;
          feedbackText: string;
          rating: number;
        }) => void)
      | undefined;
    getGameRatingQuery: ((gameId: string) => Record<number, number>) | undefined;
  };
  favorites: {
    setFavoriteGameStatus:
      | ((userAddress: string, gameId: string, status: boolean) => void)
      | undefined;
    userFavoriteGames:
      | {
          userAddress: string;
          gameId: string;
          status: boolean;
        }[]
      | undefined;
  };
  chat: {
    sendMessageMutator:
      | (({
          roomId,
          sender,
          text,
        }: {
          roomId: string;
          sender: {
            address: string;
            name?: string;
          };
          text: string;
        }) => Promise<{
          roomId: string;
          sender: {
            address: string;
            name?: string;
          };
          text: string;
          createdAt: string;
        }>)
      | undefined;
    onMessageSubscription:
      | (({
          roomId,
          opts,
        }: {
          roomId: string;
          opts?: {
            onStarted?: () => void;
            onData<T>(data: T): void;
            onError<T>(err: T): void;
          };
        }) => void)
      | undefined;
  };
  txStore: {
    userTransactions: { userAddress: string; txHash: string; type: string }[] | undefined;
    addTransaction: ((userAddress: string, txHash: string, type: string) => void) | undefined;
  };
}

const SetupStoreContext = createContext<ISetupStoreContext>({
  account: {
    name: undefined,
    avatarId: undefined,
    nameMutator: undefined,
    avatarIdMutator: undefined,
  },
  ratings: {
    gameFeedbackMutator: undefined,
    getGameRatingQuery: undefined,
  },
  favorites: {
    setFavoriteGameStatus: undefined,
    userFavoriteGames: undefined,
  },
  chat: {
    sendMessageMutator: undefined,
    onMessageSubscription: undefined,
  },
  txStore: {
    userTransactions: undefined,
    addTransaction: undefined,
  },
});

export default SetupStoreContext;
