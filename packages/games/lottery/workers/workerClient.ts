import { fetchAccount, Field, Bool, UInt64 } from "o1js";

import type {
  ZknoidWorkerRequest,
  ZknoidWorkerReponse,
  WorkerFunctions,
} from "./worker";

export default class ZknoidWorkerClient {
  compileContracts() {
    return this._call("compileContracts", {});
  }
  downloadLotteryCache() {
    return this._call("downloadLotteryCache", {});
  }
  compileLotteryContracts() {
    return this._call("compileLotteryContracts", {});
  }
  compileReduceProof() {
    return this._call("compileReduceProof", {});
  }
  fetchOnchainState() {
    return this._call("fetchOnchainState", {});
  }
  initLotteryInstance(plotteryAddress: string, networkId: string) {
    return this._call("initLotteryInstance", { plotteryAddress, networkId });
  }
  logState() {
    return this._call("logState", {});
  }

  buyTicket(
    plotteryAddress: string,
    senderAccount: string,
    startBlock: number,
    ticketNums: number[],
    amount: number
  ) {
    return this._call("buyTicket", {
      senderAccount,
      startBlock,
      ticketNums,
      amount,
      plotteryAddress,
    });
  }
  getReward(
    plotteryAddress: string,
    networkId: string,
    senderAccount: string,
    roundId: number,
    ticketNums: number[],
    amount: number
  ) {
    return this._call("getReward", {
      plotteryAddress,
      networkId,
      senderAccount,
      roundId,
      ticketNums,
      amount,
    });
  }
  worker: Worker;

  promises: {
    [id: number]: { resolve: (res: any) => void; reject: (err: any) => void };
  };

  nextId: number;

  readyPromise: Promise<void>;

  constructor() {
    this.promises = {};

    this.worker = new Worker(new URL("./worker.ts", import.meta.url));
    (window as any).workerNoid = this.worker;
    this.readyPromise = new Promise((resolve, reject) => {
      this.promises[0] = { resolve, reject };
    });

    this.nextId = 1;

    this.worker.onmessage = (event: MessageEvent<ZknoidWorkerReponse>) => {
      this.promises[event.data.id].resolve(event.data.data);
      delete this.promises[event.data.id];
    };
  }

  async waitFor(): Promise<void> {
    await this.readyPromise;
  }

  _call(fn: WorkerFunctions, args: any) {
    return new Promise((resolve, reject) => {
      this.promises[this.nextId] = { resolve, reject };

      const message: ZknoidWorkerRequest = {
        id: this.nextId,
        fn,
        args,
      };

      this.worker.postMessage(message);

      this.nextId++;
    });
  }
}
