import GamePage from "@zknoid/sdk/components/framework/GamePage";
import { lotteryConfig } from "../config";
import { useNetworkStore } from "@zknoid/sdk/lib/stores/network";
import { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BannerSection from "./BannerSection";
import TicketsSection from "./TicketsSection";
import { useChainStore } from "@zknoid/sdk/lib/stores/minaChain";
import { DateTime, Duration } from "luxon";
import { fetchAccount } from "o1js";
import { FACTORY_ADDRESS } from "../constants/addresses";
import { BLOCK_PER_ROUND } from "l1-lottery-contracts";
import StateManager from "./StateManager";
import TicketsStorage from "./TicketsStorage";
import {
  useRegisterWorkerClient,
  useWorkerClientStore,
} from "../workers/workerClientStore";
import { useRoundsStore } from "../lib/roundsStore";
import NetworkValidator from "@zknoid/sdk/components/widgets/NetworkValidator";
import { NetworkIds, NETWORKS } from "@zknoid/sdk/constants/networks";
import { cn } from "@zknoid/sdk/lib/helpers";
import CurrentRoundInfo from "../ui/BannerSection/ui/CurrentRoundInfo";
import PrevRoundInfo from "../ui/BannerSection/ui/PrevRoundInfo";
import LotteryContext from "../lib/contexts/LotteryContext";
import { LOTTERY_ROUND_OFFSET } from "./TicketsSection/OwnedTickets/lib/constant";

export enum Pages {
  Main,
  Storage,
}

export default function Lottery({}: { params: { competitionId: string } }) {
  const networkStore = useNetworkStore();
  const [roundEndsIn, setRoundEndsIn] = useState<DateTime>(
    DateTime.fromMillis(0)
  );
  const [page, setPage] = useState<Pages>(Pages.Main);

  const workerClientStore = useWorkerClientStore();
  const chainStore = useChainStore();

  useRegisterWorkerClient();

  const roundsStore = useRoundsStore();
  const lotteryStore = useWorkerClientStore();

  useEffect(() => {
    roundsStore.setRoundToShowId(lotteryStore.lotteryRoundId);
  }, [lotteryStore.lotteryRoundId]);

  useEffect(() => {
    if (
      !networkStore.minaNetwork?.networkID ||
      !chainStore.block?.slotSinceGenesis
    )
      return;

    const factoryPublicKey58 =
      FACTORY_ADDRESS[networkStore.minaNetwork?.networkID!];

    (async () => {
      // TODO: wrap with trpc
      const account = await fetchAccount({ publicKey: factoryPublicKey58 });

      const onchainState = {
        startBlock: account.account?.zkapp?.appState[1].toBigInt()!,
      };

      console.log("Onchain state", onchainState);

      if (!onchainState?.startBlock) return;

      await workerClientStore.setOnchainState(onchainState);

      if (chainStore.block?.slotSinceGenesis) {
        const roundId = Math.floor(
          Number(chainStore.block!.slotSinceGenesis - onchainState.startBlock) /
            (7 * BLOCK_PER_ROUND)
        );

        workerClientStore.setRoundId(roundId + LOTTERY_ROUND_OFFSET);
      }
    })();
  }, [networkStore.minaNetwork?.networkID, chainStore.block]);

  useEffect(() => {
    if (
      workerClientStore.isLocalProving &&
      workerClientStore.client &&
      !workerClientStore.lotteryCompilationStarted
    ) {
      console.log("Starting lottery");
      workerClientStore.compileLottery();
    }
  }, [workerClientStore.client]);

  // useEffect(() => {
  //   if (workerClientStore.lotteryCompiled)
  //     workerClientStore.updateOnchainState();
  // }, [chainStore.block?.height, workerClientStore.lotteryCompiled]);

  // When onchain state is ready
  useEffect(() => {
    if (typeof workerClientStore.lotteryRoundId == undefined) return;

    const startBlock = workerClientStore.onchainState?.startBlock;
    const blockNum = chainStore.block?.slotSinceGenesis;

    // console.log('Lottery state', workerClientStore.onchainState);
    // console.log('Round id', workerClientStore.lotteryRoundId);

    blockNum && startBlock
      ? setRoundEndsIn(
          DateTime.now().plus(
            Duration.fromObject({
              second:
                (7 * BLOCK_PER_ROUND -
                  (Number(blockNum - startBlock) % (7 * BLOCK_PER_ROUND))) *
                3 *
                60,
            })
          )
        )
      : 0;
  }, [workerClientStore.onchainState, workerClientStore.lotteryRoundId]);

  const { roundInfo } = useContext(LotteryContext);

  const ticketsNum = roundInfo?.tickets
    .map((x) => x.amount)
    .reduce((x, y) => x + y, 0n);

  return (
    <GamePage
      gameConfig={lotteryConfig}
      useTabs={false}
      useTitle={false}
      useLayout={false}
    >
      <StateManager />

      <AnimatePresence mode={"wait"}>
        {page == Pages.Main && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className={"lg:!hidden flex flex-row gap-[3.488vw] mb-[3.488vw]"}
            >
              <button
                onClick={() =>
                  roundsStore.setRoundToShowId(roundsStore.roundToShowId - 1)
                }
                disabled={roundsStore.roundToShowId < 1}
                className={cn(
                  "w-full flex flex-row items-center justify-center gap-[3.488vw] rounded-[2.326vw] bg-bg-grey p-[2.326vw]",
                  roundsStore.roundToShowId < 1 ? "opacity-0" : "opacity-100"
                )}
              >
                <svg
                  width="10"
                  height="16"
                  viewBox="0 0 10 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={"w-[1.628vw] h-[3.256vw]"}
                >
                  <path
                    d="M9 1L2 8L9 15"
                    stroke="#F9F8F4"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                <span
                  className={
                    "uppercase text-[3.256vw] font-bold font-museo text-foreground leading-[100%]"
                  }
                >
                  Previous round
                </span>
              </button>
              <button
                onClick={() =>
                  roundsStore.setRoundToShowId(roundsStore.roundToShowId + 1)
                }
                disabled={
                  roundsStore.roundToShowId >= lotteryStore.lotteryRoundId
                }
                className={cn(
                  "w-full flex flex-row-reverse items-center justify-center gap-[3.488vw] rounded-[2.326vw] bg-bg-grey p-[2.326vw]",
                  roundsStore.roundToShowId >= lotteryStore.lotteryRoundId
                    ? "opacity-0"
                    : "opacity-100"
                )}
              >
                <svg
                  width="10"
                  height="16"
                  viewBox="0 0 10 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={"w-[1.628vw] h-[3.256vw] rotate-180"}
                >
                  <path
                    d="M9 1L2 8L9 15"
                    stroke="#F9F8F4"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
                <span
                  className={
                    "uppercase text-[3.256vw] font-bold font-museo text-foreground leading-[100%]"
                  }
                >
                  Next round
                </span>
              </button>
            </div>
            <BannerSection roundEndsIn={roundEndsIn} setPage={setPage} />
            <div className={"lg:!hidden"}>
              {roundsStore.roundToShowId == lotteryStore.lotteryRoundId && (
                <CurrentRoundInfo ticketsNum={ticketsNum} />
              )}
            </div>
            <div className={"lg:!hidden"}>
              {roundsStore.roundToShowId != lotteryStore.lotteryRoundId && (
                <PrevRoundInfo
                  ticketsNum={ticketsNum}
                  winningCombination={roundInfo?.winningCombination}
                />
              )}
            </div>
            <TicketsSection />
          </motion.div>
        )}
        {page == Pages.Storage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <TicketsStorage setPage={setPage} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className={
          "flex grid-cols-4 flex-col-reverse gap-4 pt-10 lg:grid lg:pt-0"
        }
        animate={"windowed"}
      ></motion.div>

      <NetworkValidator
        expectedNetwork={
          NETWORKS[
            process.env.NEXT_PUBLIC_NETWORK_ID || NetworkIds.MINA_MAINNET
          ]
        }
      />
    </GamePage>
  );
}
