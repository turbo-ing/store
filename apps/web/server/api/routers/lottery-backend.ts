import clientPromise from '../../../app/lib/mongodb';

import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '../../../server/api/trpc';
import { Document, WithId } from 'mongodb';

const client = await clientPromise;
const db = client?.db(process.env.BACKEND_MONGODB_DB);
const oneDayDb = client?.db(process.env.BACKEND_MONGODB_DB_ONE_DAY);

export interface Progress {
  ARKANOID: boolean[];
  RANDZU: boolean[];
  THIMBLERIG: boolean[];
  UI_TESTS_WEB: boolean[];
}

type RoundInfos = Record<
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

const transformOutput = (
  data: RoundInfos,
  roundInfos: WithId<Document>[],
  startIndex: number = 0
) => {
  for (let i = 0; i < roundInfos.length; i++) {
    const roundInfo = roundInfos[i];
    data[roundInfos[i].roundId! + startIndex] = {
      id: roundInfo?.roundId + startIndex,
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

  return data;
};

export const lotteryBackendRouter = createTRPCRouter({
  getAllUserRounds: publicProcedure
    .input(
      z.object({
        userAddress: z.string(),
      })
    )
    .query(async ({ input }) => {
      if (!db || !oneDayDb) return;

      const dbs = [
        {
          db: oneDayDb,
          startIndex: 0,
        },
        {
          db: db,
          startIndex: 75,
        },
      ];

      const data = {} as RoundInfos;

      for (const currentDb of dbs) {
        const roundInfos = await currentDb.db
          .collection('rounds')
          .find({
            'tickets.owner': input.userAddress,
          })
          .toArray();

        transformOutput(data, roundInfos, currentDb.startIndex);

        const claimRequestInfo = await currentDb.db
          .collection('claim_requests')
          .find({
            userAddress: input.userAddress,
            status: 'pending',
          })
          .toArray();

        claimRequestInfo.forEach((claimRequest: any, index: number) => {
          data[claimRequest.roundId + currentDb.startIndex].tickets[
            claimRequest.ticketId
          ].claimRequested = true;
          data[claimRequest.roundId + currentDb.startIndex].tickets[
            claimRequest.ticketId
          ].claimQueue = index;
        });
      }

      return data;
    }),
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
        .collection('rounds')
        .find({
          roundId: {
            $in: input.roundIds,
          },
        })
        .toArray();

      const data = {} as RoundInfos;

      transformOutput(data, roundInfos);

      const claimRequestInfo = await (input.oneDay ? oneDayDb : db)
        .collection('claim_requests')
        .find({
          roundId: {
            $in: input.roundIds,
          },
          status: 'pending',
        })
        .toArray();

      claimRequestInfo.forEach((claimRequest: any, index: number) => {
        data[claimRequest.roundId].tickets[claimRequest.ticketId].claimRequested = true;
        data[claimRequest.roundId].tickets[claimRequest.ticketId].claimQueue = index;
      });

      console.log(data);

      return data;
    }),
  getMinaEvents: publicProcedure.input(z.object({})).query(async () => {
    if (!db) return;
    const events = await db.collection('mina_events').find({}).toArray();

    return {
      events: events,
    };
  }),
});
