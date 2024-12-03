import React, { useState } from 'react';
import { useNetworkStore } from '@zknoid/sdk/lib/stores/network';
import {
  useConnect4MatchQueueStore,
  useObserveConnect4MatchQueue,
} from './stores/matchQueue';
import ZkNoidGameContext from "@zknoid/sdk/lib/contexts/ZkNoidGameContext";
import { UInt32, UInt64 } from 'o1js';
import { ClientAppChain } from 'zknoid-chain-dev';
import { connect4Config } from './config';
import {
  useLobbiesStore,
  useObserveLobbiesStore,
} from "@zknoid/sdk/lib/stores/lobbiesStore";
import { useStore } from 'zustand';
import { useSessionKeyStore } from '@zknoid/sdk/lib/stores/sessionKeyStorage';
import { useStartGame } from './features/startGame';
import GamePage from "@zknoid/sdk/components/framework/GamePage";
import { useToasterStore } from '@zknoid/sdk/lib/stores/toasterStore';
import { useRateGameStore } from '@zknoid/sdk/lib/stores/rateGameStore';
import styles from './Game.module.css';
import { GameWrap } from '@zknoid/sdk/components/framework/GamePage/GameWrap';
import { Win } from '@zknoid/sdk/components/framework/GameWidget/ui/popups/Win';
import { Lost } from '@zknoid/sdk/components/framework/GameWidget/ui/popups/Lost';
import WaitingPopup from './components/popup/waiting';
import { GameState } from "./lib/gameState";

type Player = 1 | 2 | 'Draw' | null;

const rows = 6;
const cols = 6;

const Connect4Game: React.FC = () => {
  const [gameState, setGameState] = React.useState<GameState>(
    GameState.NotStarted
  );
  const [finalState, setFinalState] = React.useState<GameState>(
    GameState.Active
  );
  const [loading, setLoading] = React.useState(false);

  const startGame = useStartGame((gameState) => setGameState(gameState));

  const { client } = React.useContext(ZkNoidGameContext);

  if (!client) {
    throw Error('Context app chain client is not set');
  }
  const networkStore = useNetworkStore();
  useObserveConnect4MatchQueue();
  const matchQueue = useConnect4MatchQueueStore();

  const client_ = client as ClientAppChain<
    typeof connect4Config.runtimeModules,
    any,
    any,
    any
  >;

  const query = networkStore.protokitClientStarted
    ? client_.query.runtime.Connect4
    : undefined;

  useObserveLobbiesStore(query);
  const lobbiesStore = useLobbiesStore();

  console.log('Active lobby', lobbiesStore.activeLobby);

  React.useEffect(() => {
    // if (matchQueue.gameInfo?.parsed.currentCycle) {
    //     setGameState(GameState.Waiting)
    // }

    console.log('Match Queue: ', matchQueue);

    if (matchQueue.inQueue && !matchQueue.activeGameId) {
      setGameState(GameState.Matchmaking);
    } else if (
      matchQueue.activeGameId &&
      Number(matchQueue.activeGameId) !== 0
    ) {
      setGameState(GameState.Active);
    } else {
      if (matchQueue.lastGameState == 'win') {
        setGameState(GameState.Won);
        setFinalState(GameState.Won);
      }

      if (matchQueue.lastGameState == 'lost') {
        console.log('LastGameState', matchQueue.lastGameState);
        setGameState(GameState.Lost);
        setFinalState(GameState.Lost);
      }
    }
  }, [matchQueue.activeGameId, matchQueue.inQueue, matchQueue.lastGameState]);

  const restart = () => {
    matchQueue.resetLastGameState();
    setGameState(GameState.NotStarted);
  };

  const sessionPrivateKey = useStore(useSessionKeyStore, (state) =>
    state.getSessionKey()
  );

  const makeMove = async (col: number = 2) => {
    if (!matchQueue.gameInfo?.parsed.isCurrentUserMove) return;
    console.log('making move', matchQueue.gameInfo);

    const Connect4 = client.runtime.resolve('Connect4');

    const tx = await client.transaction(
      sessionPrivateKey.toPublicKey(),
      async () => {
        Connect4.makeMove(
          UInt64.from(matchQueue.gameInfo!.gameId),
          UInt32.from(col)
        );
      }
    );

    setLoading(true);

    tx.transaction = tx.transaction?.sign(sessionPrivateKey);
    await tx.send();

    setLoading(false);
  };

  React.useEffect(() => {
    if (matchQueue.gameInfo) {
      console.log('BoardEffect', matchQueue.gameInfo?.parsed.board);
      if (matchQueue.gameInfo.parsed.winner) {
        if (matchQueue.gameInfo.parsed.winner == networkStore.address) {
          console.log('WinnerIs', matchQueue.gameInfo.parsed.winner);
          setGameState(GameState.Won);
        } else {
          console.log('LoserIs', matchQueue.gameInfo.parsed.winner);
          setGameState(GameState.Lost);
        }
      }

      console.log('CurrentMove', matchQueue.gameInfo.parsed.currentMoveUser);

      setGameState(
        matchQueue.gameInfo.parsed.isCurrentUserMove
          ? GameState.Active
          : GameState.Waiting
      );
    }

    setBoard(matchQueue.gameInfo?.parsed.board);
  }, [matchQueue.gameInfo]);

  const [board, setBoard] = useState<Player[][]>(
    Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(null))
  );
  const [winner, setWinner] = useState<Player>(null);
  const [hoverCol, setHoverCol] = useState<number | null>(null);

  return (
    <GamePage
      gameConfig={connect4Config}
    >
      {finalState === GameState.Won && (
        <GameWrap>
          <Win
            onBtnClick={restart}
            title={'You won! Congratulations!'}
            btnText={'Find new game'}
          />
        </GameWrap>
      )}
      {finalState === GameState.Lost && (
        <GameWrap>
          <Lost startGame={restart} />
        </GameWrap>
      )}
      {finalState == GameState.Active && (
        <div className={styles.container}>
          <h1 className={styles.title}>Connect 4 - 6x6 Grid</h1>
          <div className={styles.board}>
            {board?.map((row, rowIndex) => (
              <div key={rowIndex} className={styles.row}>
                {row.map((cell, colIndex) => (
                  <div
                    key={colIndex}
                    className={`${styles.cell} ${hoverCol === colIndex ? styles.hoverCell : ''}`}
                    onClick={() => makeMove(colIndex)}
                    onMouseEnter={() => setHoverCol(colIndex)}
                    onMouseLeave={() => setHoverCol(null)}
                  >
                    <div
                      className={`${styles.disc} ${cell === 1 ? styles.redDisc : cell === 2 ? styles.yellowDisc : ''}`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          {winner === 'Draw' && (
            <h2 className={styles.winnerMessage + ' ' + styles.title}>
              It&apos;s a draw!
            </h2>
          )}
          {gameState === GameState.Waiting && <WaitingPopup />}
        </div>
      )}
    </GamePage>
  );
};

export default Connect4Game;
