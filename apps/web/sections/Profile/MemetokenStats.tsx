'use client';

import Image from 'next/image';

export function MemetokenStats({
  amount,
  place,
  ownership,
  token,
  tokenIMG,
}: {
  token: string;
  tokenIMG: any;
  amount: number;
  place: number;
  ownership: number;
}) {
  return (
    <div className="w-full p-[0.781vw] rounded-[0.521vw] bg-[#252525] grid grid-cols-2 grid-rows-2 gap-[0.781vw]">
      <div className="p-[0.521vw] flex flex-row items-center justify-start gap-[0.521vw]">
        <Image src={tokenIMG} alt={token} className="w-[2.292vw] h-[2.292vw]" />
        <span className="text-[1.25vw] text-foreground font-plexsans leading-[110%] font-semibold">
          {token} Token
        </span>
      </div>
      <div className="rounded-[0.26vw] bg-[#353535] p-[0.521vw]">
        <div className="flex flex-col gap-[0.26vw]">
          <span className="text-[1.042vw] text-foreground font-plexsans leading-[110%] font-medium">
            Amount
          </span>
          <div className="flex flex-row gap-[0.26vw]">
            <span className="text-[1.979vw] font-plexsans font-semibold leading-[110%] text-foreground">
              {amount % 1000 === 0 ? amount / 1000 + 'k' : (amount / 1000).toFixed(2) + 'k'}
            </span>
            <span className="mt-auto mb-[0.26vw] text-[0.833vw] font-plexsans leading-[110%] text-foreground">
              {token}
            </span>
          </div>
        </div>
      </div>
      <div className="rounded-[0.26vw] bg-[#353535] p-[0.521vw]">
        <div className="flex flex-col gap-[0.26vw]">
          <span className="text-[1.042vw] text-foreground font-plexsans leading-[110%] font-medium">
            Place in Leaderboard
          </span>
          <div className="flex flex-row gap-[0.26vw]">
            <span className="text-[1.979vw] font-plexsans font-semibold leading-[110%] text-foreground">
              {place === -1 ? '-' : place}
            </span>
            <span className="mt-auto mb-[0.26vw] text-[0.833vw] font-plexsans leading-[110%] text-foreground">
              Rating
            </span>
          </div>
        </div>
      </div>
      <div className="rounded-[0.26vw] bg-[#353535] p-[0.521vw]">
        <div className="flex flex-col gap-[0.26vw]">
          <span className="text-[1.042vw] text-foreground font-plexsans leading-[110%] font-medium">
            Ownership Percentage
          </span>
          <div className="flex flex-row gap-[0.26vw]">
            <span className="text-[1.979vw] font-plexsans font-semibold leading-[110%] text-foreground">
              {ownership.toFixed(2)}
            </span>
            <span className="mt-auto mb-[0.26vw] text-[0.833vw] font-plexsans leading-[110%] text-foreground">
              %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
