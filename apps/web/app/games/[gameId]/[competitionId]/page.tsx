'use client';
import 'reflect-metadata';

import dynamic from 'next/dynamic';
import { zkNoidConfig } from '@zknoid/games/config';

// import "@zknoid/games/styles.css";

const GamePageWrapper = dynamic(
  () => import('@zknoid/sdk/components/framework/dynamic/GamePageWrapper'),
  {
    ssr: false,
  }
);

export default function Home({
  params,
}: {
  params: { competitionId: string; gameId: string };
}) {
  return (
    <GamePageWrapper
      gameId={params.gameId}
      competitionId={params.competitionId}
      zkNoidConfig={zkNoidConfig}
    />
  );
}
