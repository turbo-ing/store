import { cn, sendTransaction } from "@zknoid/sdk/lib/helpers";
import { Currency } from "@zknoid/sdk/constants/currency";
import { useWorkerClientStore } from "../../../../workers/workerClientStore";
import { useNetworkStore } from "@zknoid/sdk/lib/stores/network";
import Loader from "@zknoid/sdk/components/shared/Loader";
import { formatUnits } from "@zknoid/sdk/lib/unit";
import { useContext, useState } from "react";
import Link from "next/link";
import LotteryContext from "../../../../lib/contexts/LotteryContext";
import { NetworkIds, NETWORKS } from "@zknoid/sdk/constants/networks";
import { useNotificationStore } from "@zknoid/sdk/components/shared/Notification/lib/notificationStore";

type Number = {
  number: number;
  win: boolean;
};

const network =
  NETWORKS[process.env.NEXT_PUBLIC_NETWORK_ID || NetworkIds.MINA_DEVNET];

export function TicketItem({
  plotteryAddress,
  roundId,
  numbers,
  ticketId,
  funds,
  amount,
  noCombination,
  claimed,
  claimHash,
  claimRequested,
  claimQueue,
}: {
  plotteryAddress: string;
  roundId: number;
  numbers: Number[];
  ticketId: number;
  funds: number | undefined;
  amount: number;
  noCombination: boolean;
  claimed: boolean;
  claimHash: string;
  claimRequested: boolean | null;
  claimQueue: number | null;
}) {
  const workerClient = useWorkerClientStore();
  const networkStore = useNetworkStore();
  const notificationStore = useNotificationStore();
  const [isLoader, setIsLoader] = useState<boolean>(false);
  const { addClaimRequestMutation } = useContext(LotteryContext);

  return (
    <div
      className={
        "grid grid-cols-3 lg:!grid-cols-4 gap-y-[2.326vw] lg:!gap-y-0 border-b py-[2.326vw] lg:!py-[0.521vw] first:border-t hover:bg-[#464646]"
      }
    >
      <div
        className={"flex flex-row items-center gap-[1.163vw] lg:!gap-[0.25vw]"}
      >
        {numbers.map((item, index) => (
          <div
            key={index}
            className={cn(
              "flex h-[5.814vw] lg:!h-[1.33vw] w-[5.814vw] lg:!w-[1.33vw] items-center justify-center rounded-[0.465vw] lg:!rounded-[0.15vw] border font-plexsans text-[3.488vw] lg:!text-[0.833vw] p-[1.163vw] lg:!p-0",
              {
                "border-left-accent bg-left-accent": item.win,
                "border-foreground text-foreground": !item.win,
                "text-black": item.win,
              },
            )}
          >
            {item.number}
          </div>
        ))}
      </div>
      <div
        className={
          "flex flex-row items-center justify-center gap-[0.25vw] font-plexsans text-[3.721vw] lg:!text-[0.833vw]"
        }
      >
        {amount}
      </div>
      <div
        className={
          "flex flex-row items-center gap-[0.25vw] font-plexsans text-[3.721vw] lg:!text-[0.833vw]"
        }
      >
        {!!funds ? (
          <>
            <span>{Number(formatUnits(funds)).toFixed(2)}</span>
            <span>{Currency.MINA}</span>
          </>
        ) : noCombination ? (
          <span>No combination</span>
        ) : (
          <span>No funds</span>
        )}
      </div>
      {!!funds && !claimRequested && !claimed && (
        <button
          className={
            "col-span-3 lg:!col-span-1 flex items-center justify-center rounded-[1.163vw] lg:!rounded-[0.33vw] bg-left-accent px-[0.74vw] py-[1.163vw] lg:!py-[0.37vw] font-museo text-[3.721vw] lg:!text-[0.833vw] font-medium text-black hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:opacity-60"
          }
          disabled={workerClient.isActiveTx}
          onClick={async () => {
            const claimRequest = {
              userAddress: networkStore.address!,
              roundId,
              ticketId,
            };
            addClaimRequestMutation(claimRequest);
            notificationStore.create({
              type: "success",
              message: "Claim requested!",
            });
          }}
        >
          <div
            className={
              "flex flex-row items-center gap-[10%] lg:!pr-[10%] text-center"
            }
          >
            {isLoader && <Loader size={"19"} color={"#212121"} />}
            <span>Claim</span>
          </div>
        </button>
      )}
      {!!funds && !claimRequested && claimed && (
        <Link
          href={`${network.minscanUrl}/tx/${claimHash}?type=zk-tx`}
          target={"_blank"}
          rel={"noopener noreferrer"}
          className={
            "items-center rounded-[0.33vw] px-[0.74vw] py-[0.37vw] font-museo text-[3.721vw] lg:!text-[0.833vw] font-medium text-foreground underline hover:cursor-pointer hover:text-left-accent"
          }
        >
          Transaction link
        </Link>
      )}
      {claimRequested && (
        <div
          className={
            "px-[0.74vw] py-[0.37vw] font-museo text-[3.721vw] lg:!text-[0.833vw] font-medium text-foreground"
          }
        >
          {" "}
          Claim requested. Queue {claimQueue}{" "}
        </div>
      )}
    </div>
  );
}
