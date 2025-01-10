import { NETWORKS, NetworkIds } from "@zknoid/sdk/constants/networks";

export const FACTORY_ADDRESS: {
  readonly [networkId: string]: string | "not-deployed";
} = {
  [NetworkIds.MINA_DEVNET]: "",
  [NetworkIds.MINA_MAINNET]:
    "B62qqvta86HY8x1sg7RGfzE73RLm8prY75qEhy2mxMN5sPqiRSGPK6V",
  [NetworkIds.ZEKO_TESTNET]: "not-deployed",
};
