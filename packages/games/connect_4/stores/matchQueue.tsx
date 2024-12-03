import { PublicKey, UInt32, UInt64 } from 'o1js';
import { useContext, useEffect } from 'react';
import { useProtokitChainStore } from '@zknoid/sdk/lib/stores/protokitChain';
import { useNetworkStore } from '@zknoid/sdk/lib/stores/network';
import ZkNoidGameContext from '@zknoid/sdk/lib/contexts/ZkNoidGameContext';
import { connect4Config } from '../config';
import { type ClientAppChain } from "zknoid-chain-dev";
import { create } from 'zustand';

import { immer } from 'zustand/middleware/immer';
import {
  MatchQueueState,
  matchQueueInitializer,
} from "@zknoid/sdk/lib/stores/matchQueue";

export const useConnect4MatchQueueStore = create<
  MatchQueueState,
  [['zustand/immer', never]]
>(matchQueueInitializer);


export const useObserveConnect4MatchQueue = () => {
  const chain = useProtokitChainStore();
  const network = useNetworkStore();
  const matchQueue = useConnect4MatchQueueStore();
  const { client } = useContext(ZkNoidGameContext);

  const client_ = client as ClientAppChain<
    typeof connect4Config.runtimeModules,
    any,
    any,
    any
  >;

  useEffect(() => {
    if (
      !network.walletConnected ||
      !network.address ||
      !chain.block?.height ||
      !network.protokitClientStarted
    ) {
      return;
    }

    console.log('This is the client', client);
    console.log('This is the client runtime', client_.query);

    if (!client) {
      throw Error('Context app chain client is not set');
    }

    console.log(
      'Following is the network address | user address',
      network.address
    );

    matchQueue.loadMatchQueue(
      client_.query.runtime.Connect4,
      chain.block?.height
    );
    console.log('LoadingActive');
    matchQueue.loadActiveGame(
      client_.query.runtime.Connect4,
      chain.block?.height,
      PublicKey.fromBase58(network.address!)
    );
  }, [
    chain.block?.height,
    network.walletConnected,
    network.address,
    network.protokitClientStarted,
  ]);
};
