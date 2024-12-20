import { NETWORKS, NetworkIds } from '@zknoid/sdk/constants/networks';

export const FACTORY_ADDRESS: {
  readonly [networkId: string]: string | 'not-deployed';
} = {
  [NetworkIds.MINA_DEVNET]:
    'B62qpxvBxZtFZohm9BVnqnVoWiaZP92yjXtrPwmKFf7QvPK12aYZJVy',
  [NetworkIds.MINA_MAINNET]: 'B62qkmwNKgW5TsU95HhzLd1jFAEpsiGG27aiga1crLaUkPBeR4pZ5FU',
  [NetworkIds.ZEKO_TESTNET]: 'not-deployed',
};
