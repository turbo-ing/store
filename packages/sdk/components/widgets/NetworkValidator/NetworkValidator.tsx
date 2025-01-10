import { useNetworkStore } from "../../../lib/stores/network";
import { Network, NETWORKS } from "../../../constants/networks";
import ConnectWalletModal from "../../shared/ConnectWalletModal";
import WrongNetworkModal from "../../shared/WrongNetworkModal";

export default function NetworkValidator({
  expectedNetwork,
}: {
  expectedNetwork: Network;
}) {
  const networkStore = useNetworkStore();

  return (
    <>
      {networkStore.address && networkStore.walletConnected ? (
        networkStore.minaNetwork?.networkID != expectedNetwork.networkID && (
          <WrongNetworkModal expectedNetwork={expectedNetwork} />
        )
      ) : (
        <ConnectWalletModal />
      )}
    </>
  );
}
