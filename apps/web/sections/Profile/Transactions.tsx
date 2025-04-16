import { useNetworkStore } from '@zknoid/sdk/lib/stores/network';
import { api } from '../../trpc/react';
import { useEffect, useState } from 'react';
import { getZkAppTxByHash } from '@zknoid/sdk/lib/api/getZkAppTxByHash';
import { formatAddress } from '@zknoid/sdk/lib/helpers';

interface Tx {
  status: string;
  timestamp: number;
  txHash: string;
}

export function Transactions() {
  const networkStore = useNetworkStore();
  const transactions = api.http.txStore.getUserTransactions.useQuery({
    userAddress: networkStore.address!,
  }).data?.transactions;

  const [txs, setTxs] = useState<Tx[]>([]);

  useEffect(() => {
    if (!transactions) return;

    console.log(transactions);

    setTxs(transactions as unknown as Tx[]);

    const fetchTxs = async () => {
      const promises = transactions?.map(async (item) => {
        const transaction = await getZkAppTxByHash(item.txHash);
        return {
          ...item,
          status: transaction.txStatus,
          timestamp: transaction.timestamp,
        };
      });
      if (!promises) return;
      const newTxs = await Promise.all(promises);

      console.log(newTxs);
      setTxs(newTxs as unknown as Tx[]);
    };
    fetchTxs();
  }, [transactions]);

  return (
    <div className="w-full pt-[1.5625vw] font-plexsans">
      <div className="grid grid-cols-3 gap-4 text-sm text-[#f9f8f4] mb-2 px-4 font-plexsans">
        <div>Transaction hash</div>
        <div className="text-center">Transaction status</div>
        <div className="text-right">Date and Time</div>
      </div>
      <div className="h-px w-full bg-[#373737] mb-3"></div>
      <div className="space-y-3">
        {txs?.map((transaction, index) => (
          <div
            key={index}
            className="grid grid-cols-3 gap-4 px-[0.7813vw] py-[0.5208vw] bg-[#212121] rounded-xl text-sm text-[#f9f8f4]"
          >
            <div className="truncate flex items-center">{formatAddress(transaction.txHash)}</div>
            <div className="flex justify-center">
              {transaction.status === 'success' && (
                <span className="bg-[#00b708] text-[#212121] px-4 py-1 rounded-[0.2604vw] text-center">
                  Success
                </span>
              )}
              {transaction.status === 'pending' && (
                <span className="bg-[#ffcc00] text-[#212121] px-4 py-1 rounded-[0.2604vw] text-center">
                  Pending
                </span>
              )}
              {transaction.status === 'failed' && (
                <span className="bg-[#dc0c07] text-white px-4 py-1 rounded-[0.2604vw] text-center">
                  Failed
                </span>
              )}
            </div>
            <div className="text-right flex items-center justify-end">{transaction.timestamp}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
