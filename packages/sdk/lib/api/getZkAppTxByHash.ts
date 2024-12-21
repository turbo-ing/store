"use server";

import { NetworkIds, NETWORKS } from "../../constants/networks";

const network =
  NETWORKS[process.env.NEXT_PUBLIC_NETWORK_ID || NetworkIds.MINA_DEVNET];

export const getZkAppTxByHash = async (txHash: string) => {
  const response = await fetch(
    `${network.blockberryEndpoint}/v1/zkapps/txs/${txHash}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-api-key": process.env.BLOCKBERRY_KEY || "",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Error while fetching transaction");
  }
  return response.json();
};
