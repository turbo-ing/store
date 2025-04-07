import clientPromise from "../../../app/lib/mongodb";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { LOTTERY_ROUND_OFFSET } from "../../../../../packages/games/lottery/ui/TicketsSection/OwnedTickets/lib/constant";

const client = await clientPromise;
const db = client?.db(process.env.BACKEND_MONGODB_DB);
const oneDayDB = client?.db(process.env.BACKEND_MONGODB_DB_ONE_DAY);

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
      if (!db || !oneDayDB) return;

      const targetDB = input.roundId >= LOTTERY_ROUND_OFFSET ? db : oneDayDB;
      const targetRound =
        input.roundId >= LOTTERY_ROUND_OFFSET
          ? input.roundId - LOTTERY_ROUND_OFFSET
          : input.roundId;

      await targetDB.collection("claim_requests").updateOne(
        {
          roundId: targetRound,
          ticketId: input.ticketId,
        },
        {
          $setOnInsert: {
            userAddress: input.userAddress,
            status: "pending",
            createdAt: new Date().toISOString(),
          },
        },
        {
          upsert: true,
        }
      );
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
