import GamePage from '@zknoid/sdk/components/framework/GamePage';
import { useContext } from 'react';
import ZkNoidGameContext from '@zknoid/sdk/lib/contexts/ZkNoidGameContext';
import { ClientAppChain } from 'zknoid-chain-dev';
import { useNetworkStore } from '@zknoid/sdk/lib/stores/network';
import LobbyPage from '@zknoid/sdk/components/framework/Lobby/LobbyPage';
import { connect4Config } from '../config';

export default function Connect4Lobby({
  params,
}: {
  params: { lobbyId: string };
}) {
  const networkStore = useNetworkStore();

  const { client } = useContext(ZkNoidGameContext);

  if (!client) {
    throw Error('Context app chain client is not set');
  }

  const client_ = client as ClientAppChain<
    typeof connect4Config.runtimeModules,
    any,
    any,
    any
  >;

  return (
    <GamePage
      gameConfig={connect4Config}
    >
      <LobbyPage
        lobbyId={params.lobbyId}
        query={
          networkStore.protokitClientStarted
            ? client_.query.runtime.Connect4
            : undefined
        }
        contractName={'Connect4'}
        config={connect4Config}
      />
    </GamePage>
  );
}
