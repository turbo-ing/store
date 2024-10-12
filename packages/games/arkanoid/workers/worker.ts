import 'reflect-metadata';

import { FetchedCache, WebFileSystem, fetchCache } from '@zknoid/sdk/lib/cache';
import { mockProof } from '@zknoid/sdk/lib/utils';

import {
  Field as Field014,
  UInt64,
  PublicKey,
  Field,
  MerkleMapWitness,
  MerkleMap,
  UInt32,
  Mina,
  fetchAccount,
  NetworkId,
  type JsonProof,
} from 'o1js';
import {
  checkMapGeneration,
  checkGameRecord,
  Bricks,
  GameInputs,
  GameRecord,
  MapGenerationProof,
  initGameProcess,
  GameProcessProof,
  processTicks,
  GameRecordProof,
  client,
  Tick,
} from 'zknoid-chain-dev';
import {
  Ticket,
  PLottery,
} from 'l1-lottery-contracts';

import {
  BuyTicketEvent,
  GetRewardEvent,
  ProduceResultEvent,
} from 'l1-lottery-contracts';
import { NETWORKS } from '@zknoid/sdk/constants/networks';
import { number } from 'zod';
// import { lotteryBackendRouter } from '../server/api/routers/lottery-backend';
// import { api } from '../trpc/vanilla';
// import { DummyBridge } from 'zknoidcontractsl1';

// ---------------------------------------------------------------------------------------
type Transaction = Awaited<ReturnType<typeof Mina.transaction>>;

const state = {
  gameRecord: null as null | typeof GameRecord,
  Lottery: null as null | typeof PLottery,
  lotteryGame: null as null | PLottery,
  lotteryCache: null as null | FetchedCache,
  buyTicketTransaction: null as null | Transaction,
  getRewardTransaction: null as null | Transaction,
};

// ---------------------------------------------------------------------------------------

const functions = {
  loadContracts: async (args: {}) => {
    console.log('[Worker] loading contracts');
    state.gameRecord = GameRecord;
    // state.dummyBridge = DummyBridge;
  },
  compileContracts: async (args: {}) => {},
  proveGameRecord: async (args: { seedJson: any; inputs: any; debug: any }) => {
    let seed = Field014.fromJSON(args.seedJson);
    let userInputs = (<any[]>JSON.parse(args.inputs)).map((elem) => {
      return GameInputs.fromJSON(elem);
    });
    console.log('[Worker] proof checking');

    console.log('Generating map proof');
    let gameContext = await checkMapGeneration(seed);
    const mapGenerationProof = await mockProof(gameContext, MapGenerationProof);

    console.log('Generating gameProcess proof');
    let currentGameState = await initGameProcess(gameContext);
    let currentGameStateProof = await mockProof(
      currentGameState,
      GameProcessProof
    );

    for (let i = 0; i < userInputs.length; i++) {
      currentGameState = await processTicks(
        currentGameStateProof,
        userInputs[i] as GameInputs
      );
      currentGameStateProof = await mockProof(
        currentGameState,
        GameProcessProof
      );
    }

    console.log('Generating game proof');

    const gameProof = await mockProof(
      await checkGameRecord(mapGenerationProof, currentGameStateProof),
      GameRecordProof
    );

    console.log('Proof generated', gameProof);

    gameProof.verify();

    console.log('Proof verified');

    console.log('Proof generated json', gameProof.toJSON());

    return gameProof.toJSON();
  },
};

// ---------------------------------------------------------------------------------------

export type WorkerFunctions = keyof typeof functions;

export type ZknoidWorkerRequest = {
  id: number;
  fn: WorkerFunctions;
  args: any;
};

export type ZknoidWorkerReponse = {
  id: number;
  data: any;
};

if (typeof window !== 'undefined') {
  addEventListener(
    'message',
    async (event: MessageEvent<ZknoidWorkerRequest>) => {
      const returnData = await functions[event.data.fn](event.data.args);

      const message: ZknoidWorkerReponse = {
        id: event.data.id,
        data: returnData,
      };
      postMessage(message);
    }
  );
}

console.log('Web Worker Successfully Initialized.');

const message: ZknoidWorkerReponse = {
  id: 0,
  data: {},
};

postMessage(message);
