import clientPromise from '../../../app/lib/mongodb';

import { z } from 'zod';

import { createTRPCContext, createTRPCRouter, publicProcedure } from '../../../server/api/trpc';
import { createCaller } from '../root';

const client = await clientPromise;
const db = client?.db(process.env.MONGODB_DB);
const oneDayLotteryDB = client?.db(process.env.BACKEND_MONGODB_DB_ONE_DAY);
const oneWeekLotteryDB = client?.db(process.env.BACKEND_MONGODB_DB);
const memeTokenDB = client?.db(process.env.MEMETOKENS_DATABASE);

const getLotteryStat = async (userAddress: string) => {
  // Get all users tickets
  const oneDayTickets =
    (await oneDayLotteryDB
      ?.collection('rounds')
      .aggregate([
        { $unwind: '$tickets' },
        { $match: { 'tickets.owner': userAddress } },
        {
          $project: {
            _id: 0,
            owner: '$tickets.owner',
            funds: '$tickets.funds',
            roundId: 1,
          },
        },
      ])
      .toArray()) || [];

  const oneWeekTickets =
    (await oneWeekLotteryDB
      ?.collection('rounds')
      .aggregate([
        { $unwind: '$tickets' },
        { $match: { 'tickets.owner': userAddress } },
        {
          $project: {
            _id: 0,
            owner: '$tickets.owner',
            funds: '$tickets.funds',
            roundId: { $add: ['$roundId', 75] }, // Add 75 to the roundId to get the one week roundId
          },
        },
      ])
      .toArray()) || [];

  const allTickets = [...oneDayTickets, ...oneWeekTickets];

  // Count total rewards
  const totalRewards = allTickets.reduce((acc, ticket) => acc + ticket.funds, 0);

  // Count total tickets
  const totalTickets = allTickets.length; // Update to count multiple tickets within one

  // Count total wins
  const totalWins = allTickets.filter((ticket) => ticket.funds > 0).length;

  // Count total rounds
  const roundsSet = new Set(allTickets.map((ticket) => ticket.roundId));
  const totalRounds = roundsSet.size;

  // Count best reward
  const bestReward = allTickets.reduce((max, ticket) => Math.max(max, ticket.funds), 0);

  // Count win rate
  const winRate = totalWins / totalTickets;

  return {
    totalRewards,
    totalWins,
    totalRounds,
    totalTickets,
    bestReward,
    winRate,
  };
};

export const accountStatsRouter = createTRPCRouter({
  getStats: publicProcedure
    .input(z.object({ userAddress: z.string() }))
    .query(async ({ input }) => {
      return await getLotteryStat(input.userAddress);
      // if (!db) return;
      // return await db.collection('accounts-stats').findOne({ userAddress: input.userAddress });
    }),
  getMemeTokenStats: publicProcedure.input(z.object({ userAddress: z.string() })).query(
    async ({
      input,
    }): Promise<{
      dragonPlace?: number;
      dragonBalance: number;
      dragonOwnership: number;
      frogPlace?: number;
      frogBalance: number;
      frogOwnership: number;
    }> => {
      // Create the caller inside the procedure
      const caller = createCaller(await createTRPCContext({ headers: new Headers() }));

      const leaderboard = await caller.http.memetokens.getLeaderBoardInfo();
      const tokensAmounts = await caller.http.memetokens.getBalances();

      const totalDragonBalance =
        (tokensAmounts!.dragonTokenSupply - tokensAmounts!.dragonPreminted) / 10 ** 9;
      const totalFrogBalance =
        (tokensAmounts!.frogTotalSupply - tokensAmounts!.frogPreminted) / 10 ** 9;

      const dragonPlace = leaderboard?.dragonLeaderboard?.findIndex(
        (holder) => holder.userAddress === input.userAddress
      );
      const frogPlace = leaderboard?.frogLeaderboard?.findIndex(
        (holder) => holder.userAddress === input.userAddress
      );

      let dragonBalance = 0;
      let dragonOwnership = 0;
      let frogBalance = 0;
      let frogOwnership = 0;

      if (dragonPlace !== -1) {
        dragonBalance = leaderboard?.dragonLeaderboard?.[dragonPlace]?.amount;
        dragonOwnership = (dragonBalance / totalDragonBalance) * 100;
      }

      if (frogPlace !== -1) {
        frogBalance = leaderboard?.frogLeaderboard?.[frogPlace]?.amount;
        frogOwnership = (frogBalance / totalFrogBalance) * 100;
      }

      return {
        dragonPlace,
        dragonBalance,
        dragonOwnership,
        frogPlace,
        frogBalance,
        frogOwnership,
      };
    }
  ),
  setStat: publicProcedure
    .input(z.object({ userAddress: z.string(), key: z.string(), value: z.string() }))
    .mutation(async ({ input }) => {
      if (!db) return;
      const value = JSON.parse(input.value);
      await db
        .collection('accounts-stats')
        .updateOne(
          { userAddress: input.userAddress },
          { $set: { [input.key]: value } },
          { upsert: true }
        );
    }),
});
