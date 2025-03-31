import clientPromise from "../../../app/lib/mongodb";

import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../../../server/api/trpc";

const client = await clientPromise;
const db = client?.db(process.env.BACKEND_MONGODB_DB);
const oneDayDb = client?.db(process.env.BACKEND_MONGODB_DB_ONE_DAY);

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
        oneDay: z.boolean().optional(),
      })
    )
    .query(async ({ input }) => {
      if (!db || !oneDayDb) return;
      const roundInfos = await (input.oneDay ? oneDayDb : db)
        .collection("rounds")
        .find({
          roundId: {
            $in: input.roundIds,
          },
        })
        .toArray();

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
            buyHash?: string;
            claimHash?: string;
            funds: bigint;
            hash: string;
            claimRequested: boolean | null;
            claimQueue: number | null;
          }[];
          winningCombination: number[] | undefined;
          plotteryAddress: string;
          randomManagerAddress: string;
          lastReducedTicket: number | undefined;
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
            funds: BigInt(ticket.funds),
          })),
          winningCombination: roundInfo?.winningCombination,
          total: roundInfo?.total as number,
          plotteryAddress: roundInfo?.plotteryAddress,
          randomManagerAddress: roundInfo?.randomManagerAddress,
          lastReducedTicket: roundInfo?.lastReducedTicket,
        } as any;
      }

      const claimRequestInfo = await (input.oneDay ? oneDayDb : db)
        .collection("claim_requests")
        .find({
          roundId: {
            $in: input.roundIds,
          },
          status: "pending",
        })
        .toArray();

      claimRequestInfo.forEach((claimRequest: any, index: number) => {
        data[claimRequest.roundId].tickets[
          claimRequest.ticketId
        ].claimRequested = true;
        data[claimRequest.roundId].tickets[claimRequest.ticketId].claimQueue =
          index;
      });

      console.log(data);

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
