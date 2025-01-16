export interface ILotteryTicket {
  amount: bigint;
  numbers: number[];
  owner: string;
  claimed: boolean;
  buyHash?: string;
  claimHash?: string;
  funds: bigint;
  hash: string;
  claimRequested: boolean | null;
  claimQueue: number | null;
}

export interface ILotteryRound {
  id: number;
  bank: bigint;
  tickets: ILotteryTicket[];
  winningCombination: number[] | undefined;
  plotteryAddress: string;
  randomManagerAddress: string;
  lastReducedTicket?: number | undefined;
}
