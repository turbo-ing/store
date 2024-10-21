import { NETWORKS, NetworkIds } from '@zknoid/sdk/constants/networks';

export const FACTORY_ADDRESS: {
  readonly [networkId: string]: string | 'not-deployed';
} = {
  [NetworkIds.MINA_DEVNET]:
    'B62qqBirm9eB7q53Ejg6fodYNoWVG2LHqp3uyvBe542cQEMUCoA9w6u',
  [NetworkIds.ZEKO_TESTNET]: 'not-deployed',
};
