import PreviousRoundItem from "./ui/PreviousRoundItem";
import { BLOCK_PER_ROUND } from "l1-lottery-contracts";
import { useWorkerClientStore } from "../../../workers/workerClientStore";
import { useChainStore } from "@zknoid/sdk/lib/stores/minaChain";
import { useContext, useEffect, useState } from "react";
import { ILotteryRound } from "../../../lib/types";
import Skeleton from "@zknoid/sdk/components/shared/Skeleton";
import LotteryContext from "../../../lib/contexts/LotteryContext";
import { cn } from "@zknoid/sdk/lib/helpers";
import { LOTTERY_ROUND_OFFSET } from "../OwnedTickets/lib/constant";

const calcRoundTime = (
  roundId: number,
  slotSinceGenesis: number,
  startBlock: number
) => {
  const oneDayRounds = Math.min(LOTTERY_ROUND_OFFSET, roundId);
  const regularRounds = Math.max(0, roundId - oneDayRounds);

  const deployTime =
    Date.now() - (slotSinceGenesis - startBlock) * 3 * 60 * 1000;

  if (roundId <= LOTTERY_ROUND_OFFSET) {
    return new Date(
      deployTime -
        (LOTTERY_ROUND_OFFSET - oneDayRounds) * BLOCK_PER_ROUND * 3 * 60 * 1000
    );
  } else {
    return new Date(
      deployTime + regularRounds * BLOCK_PER_ROUND * 7 * 3 * 60 * 1000
    );
  }
};

export default function PreviousRounds() {
  const workerClientStore = useWorkerClientStore();
  const lotteryStore = useWorkerClientStore();
  const chainStore = useChainStore();
  const { getRoundsInfosQuery } = useContext(LotteryContext);

  const [page, setPage] = useState<number>(0);
  const [roundInfos, setRoundInfos] = useState<ILotteryRound[] | undefined>(
    undefined
  );
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const ROUNDS_PER_PAGE = isMobile ? 1 : 2;

  const roundsToShow = Array.from(
    { length: ROUNDS_PER_PAGE },
    (_, i) => workerClientStore.lotteryRoundId - i - page * ROUNDS_PER_PAGE
  ).filter((x) => x >= 0);

  const oneDayRounds = roundsToShow.filter(
    (roundId) => roundId < LOTTERY_ROUND_OFFSET
  );
  const regularRounds = roundsToShow.filter(
    (roundId) => roundId >= LOTTERY_ROUND_OFFSET
  );

  const oneDayData = getRoundsInfosQuery(oneDayRounds, true, {
    refetchInterval: 5000,
  });
  const regularData = getRoundsInfosQuery(regularRounds, false, {
    refetchInterval: 5000,
  });

  useEffect(() => {
    if ((!oneDayData && !regularData) || !chainStore.block?.slotSinceGenesis)
      return;

    const oneDayDataArray = Object.values(oneDayData || {});

    const regularDataWithOffset = Object.values(regularData || {}).map(
      (round) => ({
        ...round,
        id: round.id + LOTTERY_ROUND_OFFSET,
      })
    );

    setRoundInfos([...oneDayDataArray, ...regularDataWithOffset]);
  }, [oneDayData, regularData, chainStore.block?.slotSinceGenesis]);

  useEffect(() => {
    const checkWidth = () => {
      if (window.innerWidth <= 1024) setIsMobile(true);
      else setIsMobile(false);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);

    return () => {
      window.removeEventListener("resize", checkWidth);
    };
  }, []);

  return (
    <div className="mt-[16.279vw] lg:!mt-0">
      <div className="mb-[1.33vw] text-[7.442vw] lg:!text-[2.13vw]">
        Previous Lotteries
      </div>
      <div className={"lg:!hidden flex flex-row gap-[3.488vw] mb-[3.488vw]"}>
        <button
          onClick={() => setPage(page + 1)}
          disabled={
            page + 1 > workerClientStore.lotteryRoundId / ROUNDS_PER_PAGE
          }
          className={cn(
            "w-full flex flex-row items-center justify-center gap-[3.488vw] rounded-[2.326vw] bg-bg-grey p-[2.326vw]",
            page + 1 > workerClientStore.lotteryRoundId / ROUNDS_PER_PAGE
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
          onClick={() => setPage(page - 1)}
          disabled={page - 1 < 0}
          className={cn(
            "w-full flex flex-row-reverse items-center justify-center gap-[3.488vw] rounded-[2.326vw] bg-bg-grey p-[2.326vw]",
            page - 1 < 0 ? "opacity-0" : "opacity-100"
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
      <div
        className={"flex w-full flex-row gap-[1.042vw]"}
        id={"previousLotteries"}
      >
        {roundInfos !== undefined ? (
          <div className={"flex w-full flex-row gap-[1.042vw]"}>
            <button
              className={
                "hidden lg:!flex h-[4vw] w-[4vw] items-center justify-center rounded-[0.521vw] border border-left-accent hover:opacity-80 disabled:opacity-60"
              }
              onClick={() => setPage(page + 1)}
              disabled={
                page + 1 > workerClientStore.lotteryRoundId / ROUNDS_PER_PAGE
              }
            >
              <svg
                width="1.458vw"
                height="2.552vw"
                viewBox="0 0 28 49"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M26 46L4 24L26 2" stroke="#D2FF00" strokeWidth="5" />
              </svg>
            </button>
            <div
              className={
                "grid w-full grid-cols-1 lg:!grid-cols-2 gap-[1.042vw]"
              }
            >
              {chainStore.block &&
                chainStore.block?.slotSinceGenesis > 0 &&
                lotteryStore.onchainState?.startBlock &&
                roundInfos.map((round, index) => (
                  <PreviousRoundItem
                    key={index}
                    round={round}
                    roundDates={{
                      start: calcRoundTime(
                        round.id,
                        Number(chainStore.block?.slotSinceGenesis!),
                        Number(lotteryStore.onchainState?.startBlock!)
                      ),
                      end: calcRoundTime(
                        round.id + 1,
                        Number(chainStore.block?.slotSinceGenesis!),
                        Number(lotteryStore.onchainState?.startBlock!)
                      ),
                    }}
                  />
                ))}
            </div>
            <button
              className={
                "hidden lg:!flex h-[4vw] w-[4vw] items-center justify-center rounded-[0.521vw] border border-left-accent hover:opacity-80 disabled:opacity-60"
              }
              onClick={() => setPage(page - 1)}
              disabled={page - 1 < 0}
            >
              <svg
                width="1.458vw"
                height="2.552vw"
                viewBox="0 0 28 49"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.94922 2.68262L23.9492 24.6826L1.94922 46.6826"
                  stroke="#D2FF00"
                  strokeWidth="5"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div
            className={
              "grid w-full grid-cols-1 lg:!grid-cols-2 gap-[1.042vw] lg:!p-4"
            }
          >
            <Skeleton
              isLoading={true}
              className={
                "h-[58.14vw] lg:!h-[15vw] w-full rounded-[2.326vw] lg:!rounded-[0.67vw]"
              }
            >
              <div />
            </Skeleton>
            <Skeleton
              isLoading={true}
              className={"lg:!block hidden h-[15vw] w-full rounded-[0.67vw]"}
            >
              <div />
            </Skeleton>
          </div>
        )}
      </div>
    </div>
  );
}
