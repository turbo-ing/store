import { NETWORKS, NetworkIds } from "@zknoid/sdk/constants/networks";

export const FACTORY_ADDRESS: {
  readonly [networkId: string]: string | "not-deployed";
} = {
  [NetworkIds.MINA_DEVNET]: "",
  [NetworkIds.MINA_MAINNET]:
    "B62qoT5XU2gKw5QCG31qsSYcSd9qPNSx4f5qPjTHrgP5ksDK8iwmZbv",
  [NetworkIds.ZEKO_TESTNET]: "not-deployed",
};
