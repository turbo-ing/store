import { Field, Bool, JsonProof } from "o1js";

import type {
  ZknoidWorkerRequest,
  ZknoidWorkerReponse,
  WorkerFunctions,
} from "./worker";
import { Bricks, GameInputs, checkGameRecord } from "zknoid-chain-dev";
import { GameRecordProof } from "zknoid-chain-dev";

export default class ZknoidWorkerClient {
  loadContracts() {
    return this._call("loadContracts", {});
  }
  compileContracts() {
    return this._call("compileContracts", {});
  }
  async proveGameRecord({
    seed,
    inputs,
    debug,
  }: {
    seed: Field;
    inputs: GameInputs[];
    debug: Bool;
  }) {
    const result = (await this._call("proveGameRecord", {
      seedJson: seed.toJSON(),
      inputs: JSON.stringify(inputs.map((elem) => GameInputs.toJSON(elem))),
      debug: Bool.toJSON(debug),
    })) as any;
    console.log("Restoring", result);
    //@ts-ignore
    const restoredProof = await GameRecordProof.fromJSON(result! as JsonProof);
    console.log("Restored", restoredProof);

    return restoredProof;
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
