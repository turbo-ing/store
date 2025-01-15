import { NETWORKS, NetworkIds } from "@zknoid/sdk/constants/networks";

export const FACTORY_ADDRESS: {
  readonly [networkId: string]: string | "not-deployed";
} = {
  [NetworkIds.MINA_DEVNET]: "",
  [NetworkIds.MINA_MAINNET]:
    "B62qpHtWX41NstxzzUe8xooKogqomDwgJ4CN8J3V2274v5B9dnfJ1fu",
  [NetworkIds.ZEKO_TESTNET]: "not-deployed",
};
