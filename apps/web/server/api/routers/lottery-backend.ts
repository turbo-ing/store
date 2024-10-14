import clientPromise from "../../../app/lib/mongodb";

import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../../../server/api/trpc";

const client = await clientPromise;
const db = client?.db(process.env.BACKEND_MONGODB_DB);

export interface Progress {
  ARKANOID: boolean[];
  RANDZU: boolean[];
  THIMBLERIG: boolean[];
  UI_TESTS_WEB: boolean[];
}

export const lotteryBackendRouter = createTRPCRouter({
  getRoundInfos: publicProcedure
    .input(
      z.object({
        roundIds: z.array(z.number()),
      })
    )
    .query(async ({ input }) => {
      if (!db) return;
      const roundInfos = await db
        .collection("rounds")
        .find({
          roundId: {
            $in: input.roundIds,
          },
        })
        .toArray();

      console.log("Fetched round infos", roundInfos);

      const data = {} as Record<
        number,
        {
          id: number;
          bank: bigint;
          tickets: {
            amount: bigint;
            numbers: number[];
            owner: string;
            claimed: boolean;
            funds: bigint;
            hash: string;
          }[];
          winningCombination: number[] | undefined;
          plotteryAddress: string;
          randomManagerAddress: string;
        }
      >;

      for (let i = 0; i < roundInfos.length; i++) {
        const roundInfo = roundInfos[i];
        data[roundInfos[i].roundId!] = {
          id: roundInfo?.roundId,
          bank: BigInt(roundInfo?.roundId),
          tickets: roundInfo?.tickets.map((ticket: any) => ({
            ...ticket,
            amount: BigInt(ticket.amount),
            funds: roundInfo?.dp ? BigInt(ticket.funds) : 0n,
          })),
          winningCombination: roundInfo?.dp
            ? roundInfo?.winningCombination
            : [],
          total: roundInfo?.total as number,
          plotteryAddress: roundInfo?.plotteryAddress,
          randomManagerAddress: roundInfo?.randomManagerAddress,
        } as any;
      }

      return data;
    }),
  getMinaEvents: publicProcedure.input(z.object({})).query(async () => {
    if (!db) return;
    const events = await db.collection("mina_events").find({}).toArray();

    return {
      events: events,
    };
  }),
});
