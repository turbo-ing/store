import { NETWORKS, NetworkIds } from '@zknoid/sdk/constants/networks';

export const FACTORY_ADDRESS: {
  readonly [networkId: string]: string | 'not-deployed';
} = {
  [NetworkIds.MINA_DEVNET]:
    'B62qmJT1SnhrEuCb1XqoqdaAS4vgUPRd2xSSJBmrnqG2uzCH6DMGJZW',
  [NetworkIds.ZEKO_TESTNET]: 'not-deployed',
};
