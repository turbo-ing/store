"use client";

import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import SetupStoreContext from "../../../../lib/contexts/SetupStoreContext";
import { getZkAppTxByHash } from "../../../../lib/api/getZkAppTxByHash";
import Link from "next/link";
import { cn } from "../../../../lib/helpers";
import Skeleton from "../../../shared/Skeleton";

interface Tx {
  status: string;
  timestamp: number;
  userAddress: string;
  txHash: string;
  type: string;
}

export default function TxStore({ onClose }: { onClose: () => void }) {
  const { txStore } = useContext(SetupStoreContext);
  const [txs, setTxs] = useState<Tx[]>([]);

  useEffect(() => {
    if (!txStore.userTransactions) return;
    const fetchTxs = async () => {
      const promises = txStore.userTransactions?.map(async (item) => {
        const transaction = await getZkAppTxByHash(item.txHash);
        return {
          ...item,
          status: transaction.txStatus,
          timestamp: transaction.timestamp,
        };
      });
      if (!promises) return;
      const newTxs = await Promise.all(promises);
      setTxs(newTxs as unknown as Tx[]);
    };
    fetchTxs();
  }, [txStore.userTransactions]);

  const formatTimeElapsed = (timestamp: number) => {
    const postDate = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor(
      (now.getTime() - postDate.getTime()) / 1000,
    );

    if (diffInSeconds < 60) {
      return `${diffInSeconds}sec ago`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes}min ago`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    }

    return postDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "spring", duration: 0.4, bounce: 0 }}
      className={
        "fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center backdrop-blur-md p-[10vw] lg:!p-0"
      }
      onClick={() => onClose()}
    >
      <div
        className={
          "h-[23.438vw] min-w-[31.25vw] relative flex flex-col rounded-[0.781vw] bg-bg-dark p-[1.563vw]"
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className={"flex flex-col gap-[1.042vw] overflow-y-scroll"}>
          <span>Transaction store</span>
          <div
            className={
              "grid grid-cols-4 px-[0.521vw] py-[0.26vw] items-center border-b border-b-[#212121]"
            }
          >
            <span className={"font-plexsans text-[0.833vw]"}>Link</span>
            <span className={"font-plexsans text-[0.833vw]"}>Type</span>
            <span className={"font-plexsans text-[0.833vw] text-center"}>
              Status
            </span>
            <span className={"font-plexsans text-[0.833vw] text-end"}>
              Timestamp
            </span>
          </div>
          <div className={"flex flex-col gap-[1.042vw]"}>
            {txs.length != 0
              ? txs.map((item, index) => (
                  <div
                    key={index}
                    className={
                      "grid grid-cols-4 bg-[#212121] px-[0.521vw] py-[0.26vw] items-center rounded-[0.521vw]"
                    }
                  >
                    <Link
                      href={`https://minascan.io/mainnet/tx/${item.txHash}?type=zk-tx`}
                      className={
                        "hover:underline hover:opacity-80 font-plexsans text-[0.833vw]"
                      }
                    >
                      Link
                    </Link>
                    <span className={"font-plexsans text-[0.833vw]"}>
                      {item.type}
                    </span>
                    <div
                      className={cn(
                        "flex flex-row justify-center items-center rounded-[0.521vw] p-[0.26vw] w-[70%] mx-auto",
                        item.status == "applied"
                          ? "bg-[#00B70C]"
                          : item.status == "pending"
                            ? "bg-[#CBA303]"
                            : "bg-[#BF0600]",
                      )}
                    >
                      <span className={"font-plexsans text-[0.833vw]"}>
                        {item.status[0].toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                    <span className={"text-end font-plexsans text-[0.833vw]"}>
                      {formatTimeElapsed(item.timestamp)}
                    </span>
                  </div>
                ))
              : [...Array(6)].map((_, i) => (
                  <Skeleton
                    key={i}
                    isLoading={true}
                    className={
                      "w-full h-[2.083vw] bg-[#212121] rounded-[0.521vw]"
                    }
                    children={<></>}
                  />
                ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
