import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../../server/api/trpc";
import * as Silvana from "@silvana-one/api";

const frogTokenAddress = process.env.FROG_TOKEN_ADDRESS!;
const dragonTokenAddress = process.env.DRAGON_TOKEN_ADDRESS!;
const chain = process.env.MEMETOKENS_CHAIN!;

export const memetokensRouter = createTRPCRouter({
  getBalances: publicProcedure.query(async () => {
    Silvana.config({
      apiKey: process.env.SILVANA_API_KEY!,
      chain: chain as any,
    });

    const frogTotalSupply = (
      await Silvana.getTokenBalance({
        body: {
          tokenAddress: frogTokenAddress,
          address: frogTokenAddress,
        },
      })
    ).data?.balance;

    const dragonTokenSupply = (
      await Silvana.getTokenBalance({
        body: {
          tokenAddress: dragonTokenAddress,
          address: dragonTokenAddress,
        },
      })
    ).data?.balance;

    return { frogTotalSupply, dragonTokenSupply };
  }),

  mintTokens: publicProcedure
    .input(
      z.object({
        sender: z.string(),
        tokenAddress: z.string(),
        to: z.string(),
        amount: z.number(),
        price: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      Silvana.config({
        apiKey: process.env.SILVANA_API_KEY!,
        chain: chain as any,
      });

      const { sender, tokenAddress, to, amount, price } = input;
      const result = await Silvana.mintTokens({
        body: { sender, tokenAddress, to, amount, price },
      });

      return result.data;
    }),

  proveTx: publicProcedure
    .input(
      z.object({
        tx: z.any(),
        signedData: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      Silvana.config({
        apiKey: process.env.SILVANA_API_KEY!,
        chain: chain as any,
      });

      const { tx, signedData } = input;
      const result = await Silvana.prove({
        body: {
          tx,
          signedData,
        },
      });

      return result.data;
    }),

  checkProofStatus: publicProcedure
    .input(
      z.object({
        jobId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      Silvana.config({
        apiKey: process.env.SILVANA_API_KEY!,
        chain: chain as any,
      });

      const proofs = await Silvana.getProof({ body: { jobId: input.jobId } });
      return proofs;
    }),

  checkTransactionStatus: publicProcedure
    .input(
      z.object({
        txHash: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      Silvana.config({
        apiKey: process.env.SILVANA_API_KEY!,
        chain: chain as any,
      });

      let txStatusData = (
        await Silvana.txStatus({ body: { hash: input.txHash } })
      ).data;

      let txStatus = txStatusData?.status ?? "pending";

      if (txStatus === "failed") {
        return {
          pending: false,
          success: false,
        };
      }

      if (txStatus === "applied") {
        return {
          pending: false,
          success: true,
        };
      }

      return {
        pending: true,
        success: false,
      };
    }),
});
