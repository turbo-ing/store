import BoughtGiftCodeItem from "./ui/BoughtGiftCodeItem";
import { useNotificationStore } from "@zknoid/sdk/components/shared/Notification/lib/notificationStore";
import { cn } from "@zknoid/sdk/lib/helpers";
import { useContext, useEffect } from "react";
import LotteryContext from "../../../../lib/contexts/LotteryContext";
import { useGiftCodes } from "../../../../stores/giftCodes";

export default function BoughtGiftCodes() {
  const notificationStore = useNotificationStore();
  const lotteryContext = useContext(LotteryContext);
  const codesStore = useGiftCodes();

  const copyCodes = (giftCode: string | string[]) => {
    const codes = giftCode.toString().replaceAll(",", ", ");
    navigator.clipboard.writeText(codes);
    notificationStore.create({
      type: "success",
      message: "Copied!",
    });
  };

  useEffect(() => {
    lotteryContext
      .checkGiftCodesQuery(codesStore.giftCodes.map((x) => x.code))
      .then((giftCodes) => {
        if (giftCodes) codesStore.updateGiftCodes(giftCodes);
      });
  }, []);

  return (
    <div
      className={
        "flex h-full flex-col rounded-b-[0.521vw] bg-[#252525] px-[0.521vw] pb-[0.521vw]"
      }
    >
      <div
        className={
          "mb-[0.521vw] mt-[0.781vw] flex w-full flex-row gap-[0.521vw]"
        }
      >
        <div
          className={
            "flex max-h-[62.791vw] lg:!max-h-[6.771vw] w-full flex-col gap-x-[1.094vw] gap-y-[0.521vw] overflow-y-scroll pr-[0.5vw]"
          }
        >
          {codesStore.giftCodes
            .filter((x) => !x.deleted)
            .map((item, index) => (
              <div
                key={index}
                className={
                  "flex flex-row justify-center items-center gap-[1.094vw]"
                }
              >
                <BoughtGiftCodeItem code={item.code} />
                <div
                  className={
                    "w-full flex justify-start items-center gap-[1.163vw] lg:!gap-[0.26vw]"
                  }
                >
                  {!item.approved ? (
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={"w-[3.488vw] lg:!w-[0.781vw]"}
                    >
                      <path
                        d="M7.5 13.5C9.0913 13.5 10.6174 12.8679 11.7426 11.7426C12.8679 10.6174 13.5 9.0913 13.5 7.5C13.5 5.9087 12.8679 4.38258 11.7426 3.25736C10.6174 2.13214 9.0913 1.5 7.5 1.5C5.9087 1.5 4.38258 2.13214 3.25736 3.25736C2.13214 4.38258 1.5 5.9087 1.5 7.5C1.5 9.0913 2.13214 10.6174 3.25736 11.7426C4.38258 12.8679 5.9087 13.5 7.5 13.5ZM7.5 0C8.48491 0 9.46018 0.193993 10.3701 0.570904C11.2801 0.947814 12.1069 1.50026 12.8033 2.1967C13.4997 2.89314 14.0522 3.71993 14.4291 4.62987C14.806 5.53982 15 6.51509 15 7.5C15 9.48912 14.2098 11.3968 12.8033 12.8033C11.3968 14.2098 9.48912 15 7.5 15C3.3525 15 0 11.625 0 7.5C0 5.51088 0.790176 3.60322 2.1967 2.1967C3.60322 0.790176 5.51088 0 7.5 0ZM7.875 3.75V7.6875L11.25 9.69L10.6875 10.6125L6.75 8.25V3.75H7.875Z"
                        fill="#DCB8FF"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="15"
                      height="10"
                      viewBox="0 0 15 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={"w-[3.488vw] lg:!w-[0.781vw]"}
                    >
                      <path
                        d="M1 3.88889L6.05556 8.94444L14 1"
                        stroke="#F9F8F4"
                        className={cn(
                          item.used ? "stroke-[#FF5B23]" : "stroke-foreground",
                        )}
                        stroke-linejoin="round"
                      />
                    </svg>
                  )}
                  <span
                    className={cn(
                      "text-[2.791vw] lg:!text-[0.625vw] font-plexsans",
                      item.used
                        ? "text-[#FF5B23]"
                        : !item.approved
                          ? "text-right-accent"
                          : "text-foreground",
                    )}
                  >
                    {item.used
                      ? "Used"
                      : !item.approved
                        ? "Payment processing"
                        : "Ready to use"}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div
        className={
          "flex flex-row w-full mt-[4.651vw] lg:!mt-auto gap-[2.326vw] lg:!gap-[0.26vw]"
        }
      >
        <button
          className={
            "w-full cursor-pointer rounded-[1.163vw] lg:!rounded-[0.26vw] bg-middle-accent py-[2.791vw] lg:!py-[0.26vw] font-museo text-[3.256vw] lg:!text-[0.625vw] font-medium text-foreground hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:opacity-60"
          }
          disabled={!codesStore.giftCodes.find((item) => item.used)}
          onClick={() => {
            codesStore.removeGiftCodes(
              codesStore.giftCodes
                .filter((item) => item.used)
                .map((x) => x.code),
            );
            notificationStore.create({
              type: "success",
              message: "Successfully deleted used codes",
            });
          }}
        >
          Delete all used codes
        </button>
        <button
          className={
            "w-[60%] cursor-pointer rounded-[1.163vw] lg:!rounded-[0.26vw] bg-right-accent py-[2.791vw] lg:!py-[0.26vw] text-center font-museo text-[3.256vw] lg:!text-[0.729vw] font-medium text-bg-dark hover:opacity-80"
          }
          onClick={() =>
            copyCodes(
              codesStore.giftCodes
                .filter((item) => !item.used)
                .map((item) => item.code),
            )
          }
        >
          Copy all
        </button>
      </div>
    </div>
  );
}
