import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../../server/api/trpc";
import * as Silvana from "@silvana-one/api";
import clientPromise from "@/app/lib/mongodb";

const frogTokenAddress = process.env.NEXT_PUBLIC_FROG_TOKEN_ADDRESS!;
const dragonTokenAddress = process.env.NEXT_PUBLIC_DRAGON_TOKEN_ADDRESS!;
const chain = process.env.MEMETOKENS_CHAIN!;

const client = await clientPromise;
const db = client?.db(process.env.MEMETOKENS_DATABASE);

const excludedAddresses = [
  "B62qpq6k13mXQh6HiMUcefssybR9Wjh5kbP2YzQNz2Wk9DKvobfpKTA",
];

export const memetokensRouter = createTRPCRouter({
  getUserBalance: publicProcedure
    .input(
      z.object({
        address: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      Silvana.config({
        apiKey: process.env.SILVANA_API_KEY!,
        chain: chain as any,
      });

      const frogBalance =
        (
          await Silvana.getTokenBalance({
            body: {
              tokenAddress: frogTokenAddress,
              address: input.address,
            },
          })
        ).data?.balance || 0;

      const dragonBalance =
        (
          await Silvana.getTokenBalance({
            body: {
              tokenAddress: dragonTokenAddress,
              address: input.address,
            },
          })
        ).data?.balance || 0;

      // Update score on database
      await db?.collection("leaderboard").updateOne(
        {
          address: input.address,
        },
        {
          $set: {
            address: input.address,
            frogBalance,
            dragonBalance,
          },
        },
        {
          upsert: true,
        }
      );

      return { frogBalance, dragonBalance };
    }),

  getBalances: publicProcedure.query(async () => {
    Silvana.config({
      apiKey: process.env.SILVANA_API_KEY!,
      chain: chain as any,
    });

    // Remove preminted supply from total supply
    const premintedSupplyRecords = await db
      ?.collection("leaderboard")
      .find({
        address: { $in: excludedAddresses },
      })
      .toArray();

    const premintedSupply = premintedSupplyRecords?.reduce(
      (acc, cur) => {
        return {
          frogPreminted: acc.frogPreminted + cur.frogBalance,
          dragonPreminted: acc.dragonPreminted + cur.dragonBalance,
        };
      },
      { frogPreminted: 0, dragonPreminted: 0 }
    ) || { frogPreminted: 0, dragonPreminted: 0 };

    const frogTotalSupply =
      (
        await Silvana.getTokenBalance({
          body: {
            tokenAddress: frogTokenAddress,
            address: frogTokenAddress,
          },
        })
      ).data?.balance || 0;

    const dragonTokenSupply =
      (
        await Silvana.getTokenBalance({
          body: {
            tokenAddress: dragonTokenAddress,
            address: dragonTokenAddress,
          },
        })
      ).data?.balance || 0;

    return {
      frogTotalSupply: frogTotalSupply,
      frogPreminted: premintedSupply.frogPreminted,
      dragonTokenSupply: dragonTokenSupply,
      dragonPreminted: premintedSupply.dragonPreminted,
    };
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

      await db?.collection("tx_statuses").insertOne({
        userAddress: tx.sender,
        jobId: result.data?.jobId,
      });

      result.data?.jobId;

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

      if (
        proofs.data?.jobStatus === "finished" ||
        proofs.data?.jobStatus === "used" ||
        proofs.data?.jobStatus === "failed"
      ) {
        if (!proofs.data.results) {
          console.error("No results found in proofs");
          return proofs;
        }

        await db?.collection("tx_statuses").updateOne(
          {
            jobId: input.jobId,
          },
          {
            $set: {
              proofStatus: proofs.data.jobStatus,
              txHash: proofs.data.results![0].hash,
            },
          }
        );
      }

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
        await db?.collection("tx_statuses").updateOne(
          {
            txHash: input.txHash,
          },
          {
            $set: {
              txStatus: "failed",
            },
          }
        );

        return {
          pending: false,
          success: false,
        };
      }

      if (txStatus === "applied") {
        await db?.collection("tx_statuses").updateOne(
          {
            txHash: input.txHash,
          },
          {
            $set: {
              txStatus: "success",
            },
          }
        );

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

  getLeaderBoardInfo: publicProcedure.query(async ({ input }) => {
    let frogLeaderboard = (
      await db!
        .collection("leaderboard")
        .find({ frogBalance: { $gt: 0 }, address: { $nin: excludedAddresses } })
        .sort({ frogBalance: -1 })
        .toArray()
    ).map((v) => {
      return {
        userAddress: v.address,
        amount: v.frogBalance / 1e9,
      };
    });

    let dragonLeaderboard = (
      await db!
        .collection("leaderboard")
        .find({
          dragonBalance: { $gt: 0 },
          address: { $nin: excludedAddresses },
        })
        .sort({ dragonBalance: -1 })
        .toArray()
    ).map((v) => {
      return {
        userAddress: v.address,
        amount: v.dragonBalance / 1e9,
      };
    });

    return {
      frogLeaderboard,
      dragonLeaderboard,
    };
  }),
});
