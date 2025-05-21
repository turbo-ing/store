import GamePage from '@zknoid/sdk/components/framework/GamePage';
import { useContext } from 'react';
import ZkNoidGameContext from '@zknoid/sdk/lib/contexts/ZkNoidGameContext';
import { ClientAppChain } from 'zknoid-chain-dev';
import { useNetworkStore } from '@zknoid/sdk/lib/stores/network';
import LobbyPage from '@zknoid/sdk/components/framework/Lobby/LobbyPage';
import { game2048Config } from '../config';

export default function Game2048Lobby({
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
    typeof game2048Config.runtimeModules,
    any,
    any,
    any
  >;

  return (
    <GamePage
      gameConfig={game2048Config}
    >
      <LobbyPage
        lobbyId={params.lobbyId}
        query={
          networkStore.protokitClientStarted
            ? client_.query.runtime.Connect4
            : undefined
        }
        contractName={'Connect4'}
        config={game2048Config}
      />
    </GamePage>
  );
} 