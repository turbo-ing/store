'use server';

import { NetworkIds, NETWORKS } from "@zknoid/sdk/constants/networks";

const network = NETWORKS[process.env.NEXT_PUBLIC_NETWORK_ID || NetworkIds.MINA_DEVNET];

export const isPendingTicket = async (hash: string) => {
  const res = await fetch(
    `${network.blockberryEndpoint}/zkapps/txs/${hash}`,
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-api-key': process.env.BLOCKBERRY_KEY || '',
      },
    }
  );
  if (!res.ok) {
    throw new Error('Error while fetching pending ticket state');
  }
  const data = await res.json();
  return data;
};
