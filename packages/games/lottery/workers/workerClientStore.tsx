"use client";
import { useCallback, useEffect, useMemo } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { performance } from "perf_hooks";

import ZknoidWorkerClient from "./workerClient";
import { BLOCK_PER_ROUND, PLottery } from "l1-lottery-contracts";
import { FACTORY_ADDRESS } from "../constants/addresses";
import { Field, PublicKey, UInt32, type JsonProof } from "o1js";
import { DateTime, Duration } from "luxon";
import { LOTTERY_ROUND_OFFSET } from "../ui/TicketsSection/OwnedTickets/lib/constant";

export interface ClientState {
  status: string;
  client: ZknoidWorkerClient | undefined;
  onchainStateInitialized: boolean;
  lotteryCompiled: boolean;
  lotteryCompilationStarted: boolean;
  isActiveTx: boolean;
  isLocalProving: boolean;
  onchainState:
    | {
        ticketRoot: Field;
        ticketNullifier: Field;
        bankRoot: Field;
        roundResultRoot: Field;
        startBlock: bigint;
      }
    | undefined;
  lotteryRoundId: number;
  start: () => Promise<ZknoidWorkerClient | undefined>;
  lotteryGames: Record<number, PLottery> | undefined;
  compileLottery: () => Promise<ZknoidWorkerClient>;
  updateOnchainState: () => Promise<void>;
  initLotteryInstance: (
    lotteryPublicKey58: string,
    networkId: string
  ) => Promise<void>;
  setOnchainState: (onchainState: { startBlock: bigint }) => Promise<void>;
  setRoundId: (roundId: number) => Promise<void>;
  buyTicket: (
    plotteryAddress: string,
    senderAccount: string,
    ticketNums: number[],
    amount: number
  ) => Promise<any>;
  getReward: (
    plotteryAddress: string,
    senderAccount: string,
    networkId: string,
    roundId: number,
    ticketNums: number[],
    amount: number
  ) => Promise<any>;
}

export const useWorkerClientStore = create<
  ClientState,
  [["zustand/immer", never]]
>(
  immer((set) => ({
    status: "Not loaded",
    client: undefined,
    onchainStateInitialized: false,
    lotteryCompiled: false,
    lotteryCompilationStarted: false,
    isActiveTx: false,
    isLocalProving: false,
    onchainState: undefined as
      | {
          ticketRoot: Field;
          ticketNullifier: Field;
          bankRoot: Field;
          roundResultRoot: Field;
          startBlock: bigint;
        }
      | undefined,
    lotteryRoundId: LOTTERY_ROUND_OFFSET,
    lotteryGames: undefined as Record<number, PLottery> | undefined,
    async start() {
      const isLocalProving =
        (window as any).localStorage.getItem("localProving") == "true";
      console.log("Starting", isLocalProving);
      set((state) => {
        state.isLocalProving = isLocalProving;
      });

      if (isLocalProving) {
        const zkappWorkerClient = new ZknoidWorkerClient();

        await zkappWorkerClient.waitFor();
        console.log("Loading worker");
        (window as any).lworker! = zkappWorkerClient;
        set((state) => {
          state.client = zkappWorkerClient;
        });
        return zkappWorkerClient;
      }
      set((state) => {
        state.status = "Loading worker";
      });
    },
    async setOnchainState(onchainState) {
      set((state) => {
        // @ts-ignore
        state.onchainState = onchainState;
      });
    },
    async setRoundId(roundId) {
      set((state) => {
        // @ts-ignore
        state.lotteryRoundId = roundId;
      });
    },
    async compileLottery() {
      set((state) => {
        state.status = "Lottery loading";
        state.lotteryCompilationStarted = true;
      });

      await this.client!.waitFor();

      // set((state) => {
      //   state.status = 'Lottery state fetching';
      // });

      // const onchainState = this.onchainState!;

      // set((state) => {
      //   state.onchainStateInitialized = true;
      // });

      // console.log('Fetched state', this.onchainState);

      // const roundId = Math.floor(
      //   (currBlock - Number(onchainState.startBlock)) / BLOCK_PER_ROUND
      // );

      // set((state) => {
      //   state.lotteryRoundId = roundId;
      //   state.status = 'State manager loading';
      // });

      // const publicKey = PublicKey.fromBase58(lotteryPublicKey58);
      // const lotteryGame = new PLottery(publicKey);

      // set((state) => {
      //   state.status = 'Sync with events';
      //   state.lotteryGame = lotteryGame;
      // });

      set((state) => {
        state.status = "Lottery prover cache downloading";
      });

      await this.client?.downloadLotteryCache();

      set((state) => {
        state.status = "Reduce contracts compiling";
      });

      const t1 = Date.now() / 1000;

      await this.client?.compileReduceProof();

      const t2 = Date.now() / 1000;

      set((state) => {
        state.status = "Lottery contracts compiling";
      });

      const t3 = Date.now() / 1000;

      await this.client?.compileLotteryContracts();

      const t4 = Date.now() / 1000;

      set((state) => {
        state.lotteryCompiled = true;
      });

      const dt1 = (t2 - t1).toFixed(2);
      const dt2 = (t3 - t2).toFixed(2);
      const dt3 = (t4 - t3).toFixed(2);

      const msg = `Lottery compiled (${dt1}s, ${dt2}s, ${dt3}s)`;
      console.log(msg);

      set((state) => {
        state.status = msg;
      });

      return this.client!;
    },
    async updateOnchainState() {
      // set((state) => {
      //   state.status = "Onchain state update";
      // });
      // this.client?.fetchOnchainState();
      // set((state) => {
      //   state.onchainStateInitialized = true;
      //   state.status = "Onchain state fetched";
      // });
    },
    async initLotteryInstance(plotteryAddress: string, networkId: string) {
      await this.client?.initLotteryInstance(plotteryAddress, networkId);
    },
    async buyTicket(
      plotteryAddress: string,
      senderAccount: string,
      ticketNums: number[],
      amount: number
    ) {
      set((state) => {
        state.status = "Ticket buy tx prepare";
        state.isActiveTx = true;
      });

      let txJson;

      if (this.isLocalProving) {
        await this.client?._call("buyTicket", {
          senderAccount,
          startBlock: this.onchainState?.startBlock,
          ticketNums,
          amount,
        });

        set((state) => {
          state.status = "Ticket buy tx proving";
        });

        txJson = await this.client?._call("proveBuyTicketTransaction", {});
      } else {
        const claimApiDomain =
          process.env.NEXT_PUBLIC_CLAIM_API_ENDPOINT ||
          "https://api2.zknoid.io";

        const claimData = await fetch(
          `${claimApiDomain}/buy-api/get-buy-data`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              ticketNums,
              senderAccount,
              amount,
            }),
          }
        );
        const resp = await claimData.json();
        txJson = JSON.parse(resp["txJson"]);
      }

      console.log("txJson", txJson);

      set((state) => {
        state.status = "Ticket buy tx proved";
        state.isActiveTx = false;
      });

      return txJson;
    },
    async getReward(
      plotteryAddress: string,
      senderAccount: string,
      networkId: string,
      roundId: number,
      ticketNums: number[],
      amount: number
    ) {
      set((state) => {
        state.status = "Get reward tx prepare";
        state.isActiveTx = true;
      });

      await this.client?._call("getReward", {
        plotteryAddress,
        networkId,
        senderAccount,
        startBlock: this.onchainState?.startBlock,
        roundId,
        ticketNums,
        amount,
      });

      set((state) => {
        state.status = "Get reward tx proving";
      });

      const txJson = await this.client?._call("proveGetRewardTransaction", {});

      set((state) => {
        state.status = "Get reward tx proved";
        state.isActiveTx = false;
      });

      return txJson;
    },
  }))
);

let loaded = false;

export const useRegisterWorkerClient = () => {
  const workerClientStore = useWorkerClientStore();
  useEffect(() => {
    if (workerClientStore.status == "Not loaded") {
      if (!loaded) {
        loaded = true;
        workerClientStore.start();
      }
    }
  }, []);
};
