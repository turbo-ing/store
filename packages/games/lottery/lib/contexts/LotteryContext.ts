import { createContext } from "react";
import { ILotteryRound } from "../../lib/types";

interface IAddedGiftCodes {
  userAddress: string;
  codes: string[];
  signature: string;
  paymentHash: string;
}

interface IClaimRequest {
  userAddress: string;
  roundId: number;
  ticketId: number;
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
  signature: string;
}

interface ILotteryContext {
  roundInfo: ILotteryRound | undefined;
  minaEvents: any | undefined;
  getRoundsInfosQuery: (
    roundsIds: number[],
    oneDay: boolean,
    params?: { refetchInterval?: number | false }
  ) => Record<number, ILotteryRound> | undefined;
  checkGiftCodesQuery: (
    codes: string[]
  ) => Promise<IGiftCodeCheckResult[] | undefined>;
  addGiftCodesMutation: (giftCodes: IAddedGiftCodes) => void;
  addClaimRequestMutation: (claimRequest: IClaimRequest) => void;
  sendTicketQueueMutation: (ticketQueue: ITicketQueue) => void;
}

const LotteryContext = createContext<ILotteryContext>({
  roundInfo: undefined,
  minaEvents: undefined,
  getRoundsInfosQuery: () => undefined,
  addGiftCodesMutation: () => {},
  addClaimRequestMutation: () => {},
  sendTicketQueueMutation: () => {},
  checkGiftCodesQuery: async () => undefined,
});

export default LotteryContext;
