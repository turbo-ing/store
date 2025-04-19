'use client';
import { useChainStore } from "../../../../lib/stores/minaChain";
import { useNetworkStore } from "../../../../lib/stores/network";
import { useEffect, useRef } from "react";
import { useMinaBalancesStore } from "../../../../lib/stores/minaBalances";
import { useProtokitChainStore } from "../../../../lib/stores/protokitChain";
import { useObserveMinaBalance } from "../../../../lib/hooks/observe-mina-balance";

export const tickInterval = 20000;
export const protokitTickInterval = 5000;

export const usePollMinaBlockHeight = () => {
  const chain = useChainStore();
  const network = useNetworkStore();
  const isPolling = useRef(false);

  useEffect(() => {
    if (isPolling.current || !network.pollMinaBlocks || !network.minaNetwork?.networkID) return;
    isPolling.current = true;

    console.log("Poll chain id", network.minaNetwork?.networkID);

    const intervalId = setInterval(
      async () => {
        if (network.pollMinaBlocks) {
          console.log('Polling in loop');
          await chain.loadBlock(network.minaNetwork?.networkID!)
        }
        else {
          clearInterval(intervalId);
        }
      },
      tickInterval
    );
    console.log('Polling started');

    chain.loadBlock(network.minaNetwork?.networkID!);

    return () => {
      console.log('Clearing interval', intervalId)
      clearInterval(intervalId);
    };
  }, [network.minaNetwork?.networkID, network.pollMinaBlocks]);
};


export const usePollProtokitBlockHeight = () => {
  const chain = useProtokitChainStore();
  const isPolling = useRef(false);
  const network = useNetworkStore();

  useEffect(() => {
    if (isPolling.current || !network.pollProtokitBlocks) return;
    isPolling.current = true;

    const intervalId = setInterval(() => {
      chain.loadBlock();
    }, protokitTickInterval);
    chain.loadBlock();

    return () => clearInterval(intervalId);
  }, []);
};


export default function Updater() {
  usePollMinaBlockHeight();
  useObserveMinaBalance();
  usePollProtokitBlockHeight();

  return (<></>);
}
