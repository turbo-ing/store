import { NETWORKS, NetworkIds } from '@zknoid/sdk/constants/networks';

export const FACTORY_ADDRESS: {
  readonly [networkId: string]: string | 'not-deployed';
} = {
  [NetworkIds.MINA_DEVNET]:
    'B62qpxvBxZtFZohm9BVnqnVoWiaZP92yjXtrPwmKFf7QvPK12aYZJVy',
  [NetworkIds.ZEKO_TESTNET]: 'not-deployed',
};
