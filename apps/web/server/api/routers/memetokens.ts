import clientPromise from "../../../app/lib/mongodb";

import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../../../server/api/trpc";

import * as Silvana from "@silvana-one/api";

const frogTokenAddress =
  "B62qqEnkkDnJVibzwswgAKax9sEFNVFYMjHN99mvJFUWkS3PFayETsw"; // #TODO move to env
const dragonTokenAddress =
  "B62qnAcaUEPCdxN2VF7Q1SiT9JrXs8ecNxi153RLaMWPXZtaMFdbwRG"; //

export const memetokensRouter = createTRPCRouter({
  getBalances: publicProcedure.query(async () => {
    Silvana.config({
      apiKey: process.env.NEXT_PUBLIC_SILVANA_PUBLIC_KEY!, // #TODO move to server side
      chain: "devnet",
    });

    let frogTotalSupply = (
      await Silvana.getTokenBalance({
        body: {
          tokenAddress: frogTokenAddress,
          address: frogTokenAddress,
        },
      })
    ).data?.balance;

    let dragonTokenSupply = (
      await Silvana.getTokenBalance({
        body: {
          tokenAddress: dragonTokenAddress,
          address: dragonTokenAddress,
        },
      })
    ).data?.balance;

    return {
      frogTotalSupply,
      dragonTokenSupply,
    };
  }),
});
