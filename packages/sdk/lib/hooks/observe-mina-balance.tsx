import { useChainStore } from "../stores/minaChain";
import { useMinaBalancesStore } from "../stores/minaBalances";
import { useNetworkStore } from "../stores/network";
import { fetchAccount } from "o1js";
import { useEffect } from "react";

export const useObserveMinaBalance = () => {
  const chain = useChainStore();
  const balances = useMinaBalancesStore();
  const network = useNetworkStore();

  useEffect(() => {
    if (
      !network.walletConnected ||
      !network.address ||
      !network.minaNetwork?.networkID
    )
      return;

    async function loadBalance() {
      const account = await fetchAccount({ publicKey: network.address! });

      const balance = BigInt(account.account?.balance.toBigInt() ?? 0n);

      balances.loadBalance(network.minaNetwork?.networkID!, network.address!, balance);
    }

    loadBalance();
  }, [
    chain.block?.height,
    network.walletConnected,
    network.minaNetwork?.networkID,
    network.address,
  ]);
};
