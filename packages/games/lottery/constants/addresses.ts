import { NETWORKS, NetworkIds } from '@zknoid/sdk/constants/networks';

export const FACTORY_ADDRESS: {
  readonly [networkId: string]: string | 'not-deployed';
} = {
  [NetworkIds.MINA_DEVNET]:
    '',
  [NetworkIds.MINA_MAINNET]: 'B62qnkFKdgqw5dqjTMKgofEhJwN14K3ZHJmr1vGhtyJvgy4o4ZoFn1C',
  [NetworkIds.ZEKO_TESTNET]: 'not-deployed',
};
