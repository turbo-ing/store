import { NETWORKS, NetworkIds } from '@zknoid/sdk/constants/networks';

export const LOTTERY_ADDRESS: {
  readonly [networkId: string]: string | 'not-deployed';
} = {
  [NetworkIds.MINA_DEVNET]:
    'B62qm75zXnsTi9eM6mohWWwfMXhiR2WMeRFB2ecFHjeYMKHs2c1bqtk',
  [NetworkIds.ZEKO_TESTNET]: 'not-deployed',
};

export const FACTORY_ADDRESS: {
  readonly [networkId: string]: string | 'not-deployed';
} = {
  [NetworkIds.MINA_DEVNET]:
    'B62qpDzNdAAX8yvrcqFPDrwXbKy6mgZDusFgaq5hcgf35AaQDQAGRVF',
  [NetworkIds.ZEKO_TESTNET]: 'not-deployed',
};
