import { NETWORKS, NetworkIds } from "@zknoid/sdk/constants/networks";

export const FACTORY_ADDRESS: {
  readonly [networkId: string]: string | "not-deployed";
} = {
  [NetworkIds.MINA_DEVNET]: "",
  [NetworkIds.MINA_MAINNET]:
    "B62qjLYqvScLRUVHaxnpLqg2rJgmsbKTYNjWYGt2jLKvmdS8WnBxgv8",
  [NetworkIds.ZEKO_TESTNET]: "not-deployed",
};
