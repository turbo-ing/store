import { NETWORKS, NetworkIds } from '@zknoid/sdk/constants/networks';

export const LOTTERY_ADDRESS: {
  readonly [networkId: string]: string | 'not-deployed';
} = {
  [NetworkIds.MINA_DEVNET]:
    'B62qjxJJDmDyHtjM6NBzG4jUKnCWdsoFuYHneakf5s5jAbSAB4Gq9ND',
  [NetworkIds.ZEKO_TESTNET]: 'not-deployed',
};

export const FACTORY_ADDRESS: {
  readonly [networkId: string]: string | 'not-deployed';
} = {
  [NetworkIds.MINA_DEVNET]:
    'B62qpDzNdAAX8yvrcqFPDrwXbKy6mgZDusFgaq5hcgf35AaQDQAGRVF',
  [NetworkIds.ZEKO_TESTNET]: 'not-deployed',
};
