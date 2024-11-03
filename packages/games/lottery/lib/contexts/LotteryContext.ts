import { createContext } from "react";
import { ILotteryRound } from "../../lib/types";

interface IAddedGiftCodes {
  userAddress: string;
  codes: string[];
  signature: string;
  paymentHash: string;
}
export interface IGiftCodeCheckResult {
  code: string;
  used: boolean;
  approved: boolean;
}
interface ITicketQueue {
  userAddress: string;
  giftCode: string;
  roundId: number;
  ticket: {
    numbers: number[];
  };
}

interface ILotteryContext {
  roundInfo: ILotteryRound | undefined;
  minaEvents: any | undefined;
  getRoundsInfosQuery: (
    roundsIds: number[],
    params?: { refetchInterval?: number | false }
  ) => Record<number, ILotteryRound> | undefined;
  checkGiftCodesQuery: (
    codes: string[],
  ) => Promise<IGiftCodeCheckResult[] | undefined>;
  addGiftCodesMutation: (giftCodes: IAddedGiftCodes) => void;
  sendTicketQueueMutation: (ticketQueue: ITicketQueue) => void;
}

const LotteryContext = createContext<ILotteryContext>({
  roundInfo: undefined,
  minaEvents: undefined,
  getRoundsInfosQuery: () => undefined,
  addGiftCodesMutation: async () => {},
  sendTicketQueueMutation: async () => {},
  checkGiftCodesQuery: async () => undefined,
});

export default LotteryContext;
