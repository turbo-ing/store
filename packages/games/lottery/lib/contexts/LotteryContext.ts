import { createContext } from "react";
import { ILotteryRound } from "../../lib/types";

interface IAddedGiftCodes {
  userAddress: string;
  codes: string[];
  signature: string;
  transactionHash: string;
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
  userGiftCodes: { code: string; used: boolean; createdAt: string }[];
  getRoundsInfosQuery: (
    roundsIds: number[],
    params?: { refetchInterval?: number | false },
  ) => Record<number, ILotteryRound> | undefined;
  addGiftCodesMutation: (giftCodes: IAddedGiftCodes) => void;
  removeUsedGiftCodesMutation: (userAddress: string) => void;
  sendTicketQueueMutation: (ticketQueue: ITicketQueue) => void;
  useGiftCodeMutation: (giftCode: string) => void;
}

const LotteryContext = createContext<ILotteryContext>({
  roundInfo: undefined,
  minaEvents: undefined,
  userGiftCodes: [],
  getRoundsInfosQuery: () => undefined,
  addGiftCodesMutation: () => {},
  removeUsedGiftCodesMutation: () => {},
  sendTicketQueueMutation: () => {},
  useGiftCodeMutation: () => {},
});

export default LotteryContext;
