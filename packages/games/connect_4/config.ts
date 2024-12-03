import { createZkNoidGameConfig } from '@zknoid/sdk/lib/createConfig';
import { ZkNoidGameType } from '@zknoid/sdk/lib/platform/game_types';
import { ZkNoidGameFeature, ZkNoidGameGenre } from '@zknoid/sdk/lib/platform/game_tags';
import { Connect4 } from 'zknoid-chain-dev';
import Connect4Game from './Connect4';
import Connect4Lobby from './components/Connect4Lobby';

export const connect4Config = createZkNoidGameConfig({
  id: 'connect_4',
  type: ZkNoidGameType.PVP,
  name: 'Connect4',
  description:
    'Guess who is a game where a player hides a character and gives the PC to another player. Other player tries to guess the character',
  image: '/image/games/soon.svg',
  genre: ZkNoidGameGenre.BoardGames,
  features: [ZkNoidGameFeature.Multiplayer],
  isReleased: true,
  releaseDate: new Date(2024, 0, 1),
  popularity: 50,
  author: 'CodeDecoders',
  rules:
    'Guess who is a game where a player hides a character and gives the PC to another player. Other player tries to guess the character',
  runtimeModules: {
    Connect4,
  },
  page: Connect4Game,
  lobby: Connect4Lobby,
});
