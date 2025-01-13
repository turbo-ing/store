import { cn } from "@zknoid/sdk/lib/helpers";

export default function BuyGiftCodesCounter({
  giftCodeToBuyAmount,
  setGiftCodeToBuyAmount,
}: {
  giftCodeToBuyAmount: number;
  setGiftCodeToBuyAmount: (amount: number) => void;
}) {
  return (
    <div
      className={
        "flex flex-col rounded-b-[4.651vw] lg:!rounded-b-[0.521vw] bg-[#252525] px-[2.326vw] lg:!px-[0.521vw] pt-[4.651vw] lg:!pt-[1.25vw]"
      }
    >
      <div
        className={
          "flex w-full lg:!w-[90%] flex-row items-center justify-between border-b border-foreground pb-[3.488vw] lg:!pb-[0.729vw]"
        }
      >
        <span
          className={
            "font-plexsans text-[3.721vw] lg:!text-[0.833vw] font-medium text-foreground"
          }
        >
          Add codes to cart
        </span>
        <div
          className={cn(
            "flex h-[5.581vw] lg:!h-[1.6vw] items-center justify-between rounded-[1.163vw] lg:!rounded-[0.33vw]",
            "text-[3.721vw] lg:!text-[1.07vw] text-[#252525]",
          )}
        >
          <button
            className="cursor-pointer p-[0.3vw] hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-30"
            onClick={() => setGiftCodeToBuyAmount(giftCodeToBuyAmount - 1)}
            disabled={giftCodeToBuyAmount - 1 < 1}
          >
            <svg
              width="16"
              height="3"
              viewBox="0 0 16 3"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[3.721vw] lg:!w-[1.07vw]"
            >
              <path d="M0 0.5H16V2.5H0V0.5Z" fill="#F9F8F4" />
              <path d="M0 0.5H16V2.5H0V0.5Z" fill="#F9F8F4" />
            </svg>
          </button>
          <div className="mx-[2.326vw] lg:!mx-[0.4vw] text-foreground opacity-50">
            {giftCodeToBuyAmount}
          </div>
          <div
            className="cursor-pointer p-[0.3vw] hover:opacity-60"
            onClick={() => setGiftCodeToBuyAmount(giftCodeToBuyAmount + 1)}
          >
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[3.721vw] lg:!w-[1.07vw]"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 9.5V16.5H9V9.5H16V7.5H9V0.5H7V7.5H0V9.5H7Z"
                fill="#F9F8F4"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 9.5V16.5H9V9.5H16V7.5H9V0.5H7V7.5H0V9.5H7Z"
                fill="#F9F8F4"
              />
            </svg>
          </div>
        </div>
      </div>
      <span
        className={
          "w-full lg:!w-[90%] pt-[2.326vw] pb-[2.326vw] lg:!pb-0 lg:!pt-[0.521vw] font-plexsans text-[3.256vw] lg:!text-[0.729vw] text-foreground"
        }
      >
        After paying for the gift codes, you can copy them in this window and
        give them to your friends
      </span>
    </div>
  );
}
