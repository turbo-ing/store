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
  },
});

export default SetupStoreContext;
