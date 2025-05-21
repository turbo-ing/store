import { createConfig } from "@zknoid/sdk/lib/createConfig";
import { numberGuessingConfig } from "./number_guessing/config";
import { randzuConfig } from "./randzu/config";
import { arkanoidConfig } from "./arkanoid/config";
import { checkersConfig } from "./checkers/config";
import { tileVilleConfig } from "./tileville/config";
import { pokerConfig } from "./poker/config";
import { thimblerigConfig } from "./thimblerig/config";
import { lotteryConfig } from "./lottery/config";
import { connect4Config } from "./connect_4/config";
import { game2048Config } from "./game_2048/config";

import { gameTemplateConfig } from "./game-template/config";

export const zkNoidConfig = createConfig({
  games: [
    // gameTemplateConfig,
    lotteryConfig,
    tileVilleConfig,
    randzuConfig,
    checkersConfig,
    thimblerigConfig,
    pokerConfig,
    arkanoidConfig,
    numberGuessingConfig,
    connect4Config,
    game2048Config
  ],
});
