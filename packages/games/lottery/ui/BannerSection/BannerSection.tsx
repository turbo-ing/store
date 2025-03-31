import { DateTime } from "luxon";
import { cn } from "@zknoid/sdk/lib/helpers";
import { useContext } from "react";
import { useWorkerClientStore } from "../../workers/workerClientStore";
import Rules from "./ui/Rules";
import BannerButton from "./ui/BannerButton";
import CenterConsole from "../../ui/BannerSection/ui/CenterConsole";
import CurrentRoundInfo from "../../ui/BannerSection/ui/CurrentRoundInfo";
import PrevRoundInfo from "../../ui/BannerSection/ui/PrevRoundInfo";
import { Pages } from "../Lottery";
import { useRoundsStore } from "../../lib/roundsStore";
import LotteryContext from "../../lib/contexts/LotteryContext";
import { LOTTERY_ROUND_OFFSET } from "../TicketsSection/OwnedTickets/lib/constant";
export default function BannerSection({
  roundEndsIn,
  setPage,
}: {
  roundEndsIn: DateTime;
  setPage: (page: Pages) => void;
}) {
  const lotteryStore = useWorkerClientStore();
  const roundsStore = useRoundsStore();

  const { roundInfo } = useContext(LotteryContext);

  const ticketsNum = roundInfo?.tickets
    .map((x) => x.amount)
    .reduce((x, y) => x + y, 0n);

  console.log("roundToSHOW", roundsStore.roundToShowId);
  console.log("/////////////roundInfo: /////////////", roundInfo);

  return (
    <div
      className={cn(
        "relative mb-[3.488vw] lg:!mb-[2.083vw] h-[80.233vw] lg:!h-[17.969vw] items-center justify-center rounded-[4.651vw] lg:!rounded-[0.67vw] border border-left-accent",
        {
          "bg-[url('/image/games/lottery/TopBanner-1-mobile.svg')] lg:!bg-[url('/image/games/lottery/TopBanner-1.svg')] bg-cover lg:!bg-contain bg-center bg-no-repeat":
            roundsStore.roundToShowId == lotteryStore.lotteryRoundId,
          "bg-[url('/image/games/lottery/TopBanner-2-mobile.svg')] lg:!bg-[url('/image/games/lottery/TopBanner-2.svg')] bg-cover lg:!bg-contain bg-center bg-no-repeat":
            roundsStore.roundToShowId != lotteryStore.lotteryRoundId,
        }
      )}
    >
      <div className="hidden lg:!flex absolute m-[1vw] h-[3.13vw] gap-[0.33vw]">
        <BannerButton
          onClick={() =>
            roundsStore.setRoundToShowId(roundsStore.roundToShowId - 1)
          }
          disabled={roundsStore.roundToShowId < 1}
          className="flex w-[3.13vw] items-center justify-center border-left-accent bg-bg-grey text-left-accent"
        >
          <svg
            width="1.042vw"
            height="1.823vw"
            viewBox="0 0 20 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto my-auto block w-[1vw]"
          >
            <path d="M18 2L3 17.5L18 33" stroke="#D2FF00" strokeWidth="3" />
          </svg>
        </BannerButton>
        <BannerButton
          onClick={() =>
            roundsStore.setRoundToShowId(roundsStore.roundToShowId + 1)
          }
          disabled={roundsStore.roundToShowId >= lotteryStore.lotteryRoundId}
          className="flex w-[3.13vw] items-center justify-center border-left-accent bg-bg-grey text-left-accent"
        >
          <svg
            width="1.042vw"
            height="1.823vw"
            viewBox="0 0 20 35"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto my-auto block w-[1vw] rotate-180"
          >
            <path d="M18 2L3 17.5L18 33" stroke="#D2FF00" strokeWidth="3" />
          </svg>
        </BannerButton>
      </div>
      <div className={"hidden lg:!block"}>
        {roundsStore.roundToShowId != lotteryStore.lotteryRoundId && (
          <PrevRoundInfo
            ticketsNum={ticketsNum}
            winningCombination={roundInfo?.winningCombination}
          />
        )}
      </div>

      <CenterConsole
        roundToShow={roundsStore.roundToShowId}
        roundEndsIn={roundEndsIn}
        roundInfo={roundInfo}
        setPage={setPage}
      />

      {roundsStore.roundToShowId != lotteryStore.lotteryRoundId && (
        <button
          onClick={() =>
            roundsStore.setRoundToShowId(lotteryStore.lotteryRoundId)
          }
          disabled={roundsStore.roundToShowId == lotteryStore.lotteryRoundId}
          className={
            "absolute right-[1vw] top-[1vw] hidden lg:!flex cursor-pointer flex-row items-center justify-center gap-[0.26vw] hover:opacity-80 disabled:opacity-60"
          }
        >
          <div className="flex h-[2.448vw] items-center justify-center rounded-[0.33vw] border border-right-accent px-[1vw] text-center text-[1.25vw] text-right-accent">
            To Ongoing round
          </div>
          <div
            className={
              "flex h-[2.448vw] w-[2.448vw] items-center justify-center rounded-[0.33vw] border border-right-accent"
            }
          >
            <svg
              width="1.042vw"
              height="1.823vw"
              viewBox="0 0 20 35"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto my-auto block w-[1vw]"
            >
              <path d="M2 2L17 17.5L2 33" stroke="#DCB8FF" strokeWidth="3" />
            </svg>
          </div>
        </button>
      )}

      <div className={"hidden lg:!block"}>
        {roundsStore.roundToShowId == lotteryStore.lotteryRoundId && (
          <CurrentRoundInfo ticketsNum={ticketsNum} />
        )}
      </div>

      <Rules />
    </div>
  );
}
