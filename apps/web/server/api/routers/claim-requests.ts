import clientPromise from "../../../app/lib/mongodb";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

const client = await clientPromise;
const db = client?.db(process.env.BACKEND_MONGODB_DB);

export const claimRequestRouter = createTRPCRouter({
  requestClaim: publicProcedure
    .input(
      z.object({
        userAddress: z.string(),
        roundId: z.number(),
        ticketId: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      if (!db) return;

      await db.collection("claim-request").insertOne({
        userAddress: input.userAddress,
        roundId: input.roundId,
        ticketId: input.ticketId,
        status: "pending",
        createdAt: new Date().toISOString(),
      });
    }),

  getIndexInClaimRequestQueue: publicProcedure
    .input(
      z.object({
        roundId: z.number(),
        ticketId: z.number(),
      })
    )
    .query(async ({ input }) => {
      if (!db) return;

      const claimRequest = await db
        .collection("claim-request")
        .findOne({ roundId: input.roundId, ticketId: input.ticketId });

      if (!claimRequest) {
        console.log(
          `Can't find claim request for round ${input.roundId} and ticket ${input.ticketId}`
        );

        return {
          index: -1,
        };
      }

      const waitingRequests = await db
        .collection("claim-request")
        .find({
          status: "pending",
          _id: { $lt: claimRequest._id },
        })
        .toArray();

      return {
        index: waitingRequests.length,
      };
    }),

  getUserClaimRequests: publicProcedure
    .input(
      z.object({
        userAddress: z.string(),
      })
    )
    .query(async ({ input }) => {
      if (!db) return;

      return {
        claimRequests: await db
          .collection("claim-request")
          .find({ userAddress: input.userAddress, status: "pending" })
          .toArray(),
      };
    }),
});
