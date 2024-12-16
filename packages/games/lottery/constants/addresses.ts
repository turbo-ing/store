import { NETWORKS, NetworkIds } from '@zknoid/sdk/constants/networks';

export const FACTORY_ADDRESS: {
  readonly [networkId: string]: string | 'not-deployed';
} = {
  [NetworkIds.MINA_DEVNET]:
    'B62qoJ59ASv7orJxqM7uVXeyeBf2C3TaPC3rcCe1viJCrQnUb5Hv65X',
  [NetworkIds.MINA_MAINNET]: 'B62qm3D7yKDQmpzXvGYrKgUfnd6MRwYvregLyv5ywfLpQhHqE6WqVsH',
  [NetworkIds.ZEKO_TESTNET]: 'not-deployed',
};
