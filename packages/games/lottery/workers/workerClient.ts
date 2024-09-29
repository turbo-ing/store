import { fetchAccount, Field, Bool, UInt64 } from 'o1js';

import type {
  ZknoidWorkerRequest,
  ZknoidWorkerReponse,
  WorkerFunctions,
} from './worker';

export default class ZknoidWorkerClient {
  compileContracts() {
    return this._call('compileContracts', {});
  }
  downloadLotteryCache() {
    return this._call('downloadLotteryCache', {});
  }
  compileLotteryContracts() {
    return this._call('compileLotteryContracts', {});
  }
  compileReduceProof() {
    return this._call('compileReduceProof', {});
  }
  compileDistributionProof() {
    return this._call('compileDistributionProof', {});
  }
  fetchOnchainState() {
    return this._call('fetchOnchainState', {});
  }
  initLotteryInstance(lotteryPublicKey58: string, networkId: string) {
    return this._call('initLotteryInstance', { lotteryPublicKey58, networkId });
  }
  buyTicket(
    senderAccount: string,
    startBlock: number,
    roundId: number,
    ticketNums: number[],
    amount: number
  ) {
    return this._call('buyTicket', {
      senderAccount,
      startBlock,
      roundId,
      ticketNums,
      amount,
    });
  }
  getReward(
    networkId: string,
    senderAccount: string,
    startBlock: number,
    roundId: number,
    ticketNums: number[],
    amount: number
  ) {
    return this._call('getReward', {
      networkId,
      senderAccount,
      startBlock,
      roundId,
      ticketNums,
      amount,
    });
  }
  
  getLotteryState() {
    return this._call('getLotteryState', {});
  }

  worker: Worker;

  promises: {
    [id: number]: { resolve: (res: any) => void; reject: (err: any) => void };
  };

  nextId: number;

  readyPromise: Promise<void>;

  constructor() {
    this.promises = {};

    this.worker = new Worker(new URL('./worker.ts', import.meta.url));
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
