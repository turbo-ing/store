import { NETWORKS, NetworkIds } from "@zknoid/sdk/constants/networks";

export const FACTORY_ADDRESS: {
  readonly [networkId: string]: string | "not-deployed";
} = {
  [NetworkIds.MINA_DEVNET]: "",
  [NetworkIds.MINA_MAINNET]:
    "B62qjYJU7zoMmH9eSxoJPZzi3XkLKUiFoGaBy8559rhzA7rdU9vvSfu",
  [NetworkIds.ZEKO_TESTNET]: "not-deployed",
};
