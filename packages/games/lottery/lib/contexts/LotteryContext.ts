import { createContext } from "react";
import { ILotteryRound } from "../../lib/types";

interface IGiftCode {
  userAddress: string;
  code: string;
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
  ) => ILotteryRound[] | undefined;
  addGiftCodeMutation: (giftCode: IGiftCode) => void;
  addGiftCodesMutation: (giftCodes: IGiftCode[]) => void;
  removeUsedGiftCodesMutation: (userAddress: string) => void;
  sendTicketQueueMutation: (ticketQueue: ITicketQueue) => void;
  useGiftCodeMutation: (giftCode: string) => void;
}

const LotteryContext = createContext<ILotteryContext>({
  roundInfo: undefined,
  minaEvents: undefined,
  userGiftCodes: [],
  getRoundsInfosQuery: () => undefined,
  addGiftCodeMutation: () => {},
  addGiftCodesMutation: () => {},
  removeUsedGiftCodesMutation: () => {},
  sendTicketQueueMutation: () => {},
  useGiftCodeMutation: () => {},
});

export default LotteryContext;
