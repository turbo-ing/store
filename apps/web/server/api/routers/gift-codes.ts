import clientPromise from "../../../app/lib/mongodb";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../../../server/api/trpc";

const client = await clientPromise;
const db = client?.db(process.env.BACKEND_MONGODB_DB);

export const giftCodesRouter = createTRPCRouter({
  checkGiftCodes: publicProcedure
    .input(z.object({ giftCodes: z.string().array() }))
    .query(async ({ input }) => {
      if (!db) return;

      return {
        giftCodes: (await db
          .collection("gift-codes")
          .find({ code: {$in: input.giftCodes} })
          .toArray()).map(x => ({
            code: x.code,
            used: x.used,
            approved: true
          })),
      };
    }),
  addGiftCodes: publicProcedure
    .input(
      z.object({
        userAddress: z.string(),
        codes: z.string().array(),
        signature: z.string(),
        paymentHash: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      if (!db) return;

      await db.collection("gift-codes-requested").insertOne({
        userAddress: input.userAddress,
        paymentHash: input.paymentHash,
        codes: input.codes,
        signature: input.signature, 
        createdAt: new Date().toISOString(),
      });
    }),
  sendTicketQueue: publicProcedure
    .input(
      z.object({
        userAddress: z.string(),
        giftCode: z.string(),
        roundId: z.number(),
        ticket: z.object({
          numbers: z.array(z.number()),
        }),
      })
    )
    .mutation(async ({ input }) => {
      if (!db) return;

      await db.collection("promo_tickets_queue").insertOne({
        userAddress: input.userAddress,
        giftCode: input.giftCode,
        roundId: input.roundId,
        ticket: input.ticket,
        createdAt: new Date().toISOString(),
      });
    }),
});
