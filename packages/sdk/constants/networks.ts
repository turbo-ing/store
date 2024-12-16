export interface Network {
  networkID: string;
  palladNetworkID: string;
  name: string;
  graphql: string;
  archive: string;
}

export const NetworkIds = {
  ZEKO_TESTNET: 'zeko:testnet',
  MINA_DEVNET: 'mina:testnet',
  MINA_MAINNET: 'mina:mainnet',
};

export const PalladNetworkIds = {
  ZEKO_TESTNET: '69420',
  MINA_DEVNET: '29936104443aaf264a7f0192ac64b1c7173198c1ed404c1bcff5e562e05eb7f6',
  MINA_MAINNET: '',
};

export const PALLAD_TO_AURO_NETWORK_IDS = {
  [PalladNetworkIds.MINA_MAINNET]: NetworkIds.MINA_MAINNET,
  [PalladNetworkIds.MINA_DEVNET]: NetworkIds.MINA_DEVNET,
  [PalladNetworkIds.ZEKO_TESTNET]: NetworkIds.ZEKO_TESTNET
}

export const NETWORKS: { readonly [networkId: string]: Network } = {
  [NetworkIds.MINA_MAINNET]: {
    networkID: NetworkIds.MINA_MAINNET,
    palladNetworkID: PalladNetworkIds.MINA_MAINNET,
    name: 'Mainnet',
    graphql: 'https://proxy.zknoid.io/mina-node/mainnet-main-node',
    archive: 'https://proxy.zknoid.io/mina-node/devnet-archive-node',
  },
  [NetworkIds.MINA_DEVNET]: {
    networkID: NetworkIds.MINA_DEVNET,
    palladNetworkID: PalladNetworkIds.MINA_DEVNET,
    name: 'Devnet',
    graphql: 'https://proxy.zknoid.io/mina-node/devnet-main-node',
    archive: 'https://proxy.zknoid.io/mina-node/devnet-archive-node',
  },
  [NetworkIds.ZEKO_TESTNET]: {
    networkID: NetworkIds.ZEKO_TESTNET,
    palladNetworkID: PalladNetworkIds.ZEKO_TESTNET,
    name: 'Zeko',
    graphql: 'https://devnet.zeko.io/graphql',
    archive: '',
  },
};

export const ALL_NETWORKS = [
  NETWORKS[NetworkIds.MINA_MAINNET],
  NETWORKS[NetworkIds.MINA_DEVNET],
  NETWORKS[NetworkIds.ZEKO_TESTNET],
];
