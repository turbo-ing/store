import { createZkNoidGameConfig } from "@zknoid/sdk/lib/createConfig";
import { ZkNoidGameType } from "@zknoid/sdk/lib/platform/game_types";
import {
  ZkNoidGameFeature,
  ZkNoidGameGenre,
} from "@zknoid/sdk/lib/platform/game_tags";
import { Connect4 } from "zknoid-chain-dev";
import Game2048 from "./Game2048";

export const game2048Config = createZkNoidGameConfig({
  id: "game_2048",
  type: ZkNoidGameType.PVP,
  name: "2048",
  description:
    "2048 is a popular sliding puzzle game. Combine matching numbered tiles by sliding them together. Reach the elusive 2048 tile to win! This version is powered by Mina Protocol.",
  image: "/image/games/2048.svg",
  genre: ZkNoidGameGenre.Arcade,
  features: [ZkNoidGameFeature.SinglePlayer],
  isReleased: true,
  releaseDate: new Date(2024, 0, 1),
  popularity: 80,
  author: "Mina Protocol",
  rules:
    "Swipe to move all tiles. When two tiles with the same number touch, they merge into one with the sum of their values. Create a tile with the value 2048 to win!",
  runtimeModules: {
    Connect4,
  },
  page: Game2048,
}); 