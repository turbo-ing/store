"use client";

import { createContext } from "react";
import { ILotteryRound } from "../../../games/lottery/lib/types";

interface IGamesContext {
  lotteryContext: {
    roundInfo: ILotteryRound | undefined;
    minaEvents: any | undefined;
    userGiftCodes: { code: string; used: boolean; createdAt: string }[];
    getRoundsInfosQuery: (
      roundsIds: number[],
      params?: { refetchInterval?: number | false },
    ) => ILotteryRound[] | undefined;
  };
}

const GamesContext = createContext<IGamesContext>({
  lotteryContext: {
    roundInfo: undefined,
    minaEvents: undefined,
    userGiftCodes: [],
    getRoundsInfosQuery: () => undefined,
  },
});

export default GamesContext;
