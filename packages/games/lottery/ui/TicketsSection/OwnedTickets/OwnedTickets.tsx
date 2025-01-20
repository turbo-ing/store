import { useWorkerClientStore } from "../../../workers/workerClientStore";
import MyTicket from "./ui/MyTicket";
import { useContext, useEffect, useState } from "react";
import { useNetworkStore } from "@zknoid/sdk/lib/stores/network";
import { cn } from "@zknoid/sdk/lib/helpers";
import PageButton from "./ui/PageButton";
import { formatUnits } from "@zknoid/sdk/lib/unit";
import { Currency } from "@zknoid/sdk/constants/currency";
import { useRoundsStore } from "../../../lib/roundsStore";
import { ILotteryTicket } from "../../../lib/types";
import LotteryContext from "../../../lib/contexts/LotteryContext";

interface ITicket extends ILotteryTicket {
  id: string;
  ticketId: number;
}

export default function OwnedTickets({
  hasOwnedTickets,
  setHasOwnedTickets,
}: {
  hasOwnedTickets: boolean;
  setHasOwnedTickets: (hasTickets: boolean) => void;
}) {
  const roundsStore = useRoundsStore();
  const workerStore = useWorkerClientStore();
  const networkStore = useNetworkStore();
  const { roundInfo } = useContext(LotteryContext);

  const [page, setPage] = useState<number>(1);
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [currentTicket, setCurrentTicket] = useState<ITicket | undefined>(
    undefined,
  );

  const TICKETS_PER_PAGE =
    roundsStore.roundToShowId != workerStore.lotteryRoundId ? 6 : 4;
  const pagesAmount = Math.ceil(tickets.length / TICKETS_PER_PAGE);
  const renderTickets = tickets.slice(
    (page - 1) * TICKETS_PER_PAGE,
    page * TICKETS_PER_PAGE,
  );

  useEffect(() => {
    if (!roundInfo?.tickets) return;

    setTickets(
      roundInfo.tickets
        .map((x, i) => ({ ...x, ticketId: i }))
        .filter(
          (x: { owner: string | undefined }) => x.owner == networkStore.address,
        )
        .map((x, i) => ({
          id: `${i}`,
          ...x,
        })),
    );
  }, [roundsStore.roundToShowId, roundInfo, roundInfo?.tickets]);

  useEffect(() => {
    if (tickets.length != 0 && !hasOwnedTickets) {
      setHasOwnedTickets(true);
    }
  }, [tickets.length]);

  return (
    <div
      className={cn("flex w-full flex-col", tickets.length == 0 && "hidden")}
    >
      <div
        className={
          "mb-[1.33vw] flex flex-row items-center justify-start gap-[1vw]"
        }
      >
        <div className="text-[7.442vw] lg:!text-[2.13vw]">Your tickets</div>
        {roundsStore.roundToShowId != workerStore.lotteryRoundId &&
          tickets.length > TICKETS_PER_PAGE && (
            <div className={"flex flex-row gap-[0.5vw]"}>
              <button
                className={
                  "flex h-[1.82vw] w-[1.82vw] items-center justify-center rounded-[0.26vw] border border-foreground hover:opacity-80 disabled:opacity-60"
                }
                onClick={() => setPage((prevState) => prevState - 1)}
                disabled={page - 1 < 1}
              >
                <svg
                  width="0.729vw"
                  height="1.198vw"
                  viewBox="0 0 14 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.75 1.58301L2.75 11.583L12.75 21.583"
                    stroke="#F9F8F4"
                    strokeWidth="3"
                  />
                </svg>
              </button>

              <button
                className={
                  "flex h-[1.82vw] w-[1.82vw] items-center justify-center rounded-[0.26vw] border border-foreground hover:opacity-80 disabled:opacity-60"
                }
                onClick={() => setPage((prevState) => prevState + 1)}
                disabled={page + 1 > pagesAmount}
              >
                <svg
                  width="0.729vw"
                  height="1.198vw"
                  viewBox="0 0 14 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.25 1.58301L11.25 11.583L1.25 21.583"
                    stroke="#F9F8F4"
                    strokeWidth="3"
                  />
                </svg>
              </button>
            </div>
          )}
      </div>

      <div
        className={cn(
          "flex w-full flex-col lg:!flex-row gap-[1.176vw] lg:!gap-[0.3vw]",
          {
            "flex-wrap gap-[1.176vw] lg:!gap-[1.042vw]":
              roundsStore.roundToShowId != workerStore.lotteryRoundId,
          },
        )}
      >
        {tickets.length > TICKETS_PER_PAGE &&
          page != 1 &&
          roundsStore.roundToShowId == workerStore.lotteryRoundId && (
            <PageButton
              text={"Previous page"}
              symbol={"←"}
              onClick={() => {
                setPage((prevState) => prevState - 1);
                setCurrentTicket(undefined);
              }}
              disabled={page - 1 < 1}
            />
          )}
        {renderTickets.map((item, index) => (
          <MyTicket
            key={index}
            plotteryAddress={roundInfo?.plotteryAddress || ""}
            isOpen={
              roundsStore.roundToShowId != workerStore.lotteryRoundId ||
              item.id == currentTicket?.id ||
              (currentTicket == undefined && index == 0)
            }
            combination={item.numbers}
            amount={Number(item.amount)}
            index={
              page == 1
                ? index + 1
                : index + 1 + TICKETS_PER_PAGE * page - TICKETS_PER_PAGE
            }
            onClick={() => setCurrentTicket(item)}
            tags={
              item.funds
                ? [
                    `${Number(formatUnits(item.funds)).toFixed(2)} ${Currency.MINA} prize`,
                  ]
                : undefined
            }
            claimed={item.claimed}
            funds={item.funds}
            roundId={roundsStore.roundToShowId}
            hash={item.buyHash || ""}
            ticketId={item.ticketId}
            claimRequested={item.claimRequested}
            claimQueue={item.claimQueue}
          />
        ))}
        {tickets.length > TICKETS_PER_PAGE &&
          page + 1 <= pagesAmount &&
          roundsStore.roundToShowId == workerStore.lotteryRoundId && (
            <PageButton
              text={"Next page"}
              symbol={"→"}
              onClick={() => {
                setPage((prevState) => prevState + 1);
                setCurrentTicket(undefined);
              }}
              disabled={page + 1 > pagesAmount}
            />
          )}
      </div>
    </div>
  );
}
