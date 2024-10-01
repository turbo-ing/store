import { createContext } from "react";
import { ILotteryRound } from "../../lib/types";

interface ILotteryContext {
  roundInfo: ILotteryRound | undefined;
  minaEvents: any | undefined;
  userGiftCodes: { code: string; used: boolean; createdAt: string }[];
  getRoundsInfosQuery: (
    roundsIds: number[],
    params?: { refetchInterval?: number | false },
  ) => ILotteryRound[] | undefined;
}

const LotteryContext = createContext<ILotteryContext>({
  roundInfo: undefined,
  minaEvents: undefined,
  userGiftCodes: [],
  getRoundsInfosQuery: () => undefined,
});

export default LotteryContext;
