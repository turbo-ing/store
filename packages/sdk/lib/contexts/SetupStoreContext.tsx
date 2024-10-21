"use client";

import { createContext } from "react";

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
    getGameRatingQuery:
      | ((gameId: string) => Record<number, number>)
      | undefined;
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
});

export default SetupStoreContext;
