export default function MobileRulesModal({
  setIsOpen,
}: {
  setIsOpen: (isOpen: boolean) => void;
}) {
  return (
    <div
      className={
        "fixed left-0 top-0 z-50 w-full h-full flex flex-col items-center justify-center backdrop-blur-md p-[10vw]"
      }
      onClick={() => setIsOpen(false)}
    >
      <div
        className={"w-[95vw] bg-right-accent rounded-[4.651vw]"}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={
            "flex flex-col lg:!flex-row gap-[2.326vw] lg:!gap-[1.042vw] p-[3.488vw] lg:!px-[1.042vw] lg:!py-[0.521vw] text-bg-grey"
          }
        >
          <div
            className={"flex w-full flex-col gap-[2.326vw] lg:!gap-[0.885vw]"}
          >
            <div
              className={
                "w-full text-center lg:!hidden block font-plexsans text-[3.721vw] lg:!text-[0.833vw] font-semibold"
              }
            >
              Rules
            </div>
            <div className={"flex flex-col gap-[0.26vw]"}>
              <span
                className={
                  "font-plexsans text-[3.721vw] lg:!text-[0.833vw] font-semibold"
                }
              >
                Round Duration
              </span>
              <span
                className={
                  "font-plexsans text-[3.256vw] lg:!text-[0.729vw] font-normal"
                }
              >
                Each round lasts approximately 24 hours
              </span>
            </div>
            <div className={"flex flex-col gap-[0.26vw]"}>
              <span
                className={
                  "font-plexsans text-[3.721vw] lg:!text-[0.833vw] font-semibold"
                }
              >
                Ticket Purchase
              </span>
              <span
                className={
                  "font-plexsans text-[3.256vw] lg:!text-[0.729vw] font-normal"
                }
              >
                Each ticket costs 10 $MINA
              </span>
              <span
                className={
                  "font-plexsans text-[3.256vw] lg:!text-[0.729vw] font-normal"
                }
              >
                Ticket consist of 6 numbers (1-9) and quantity
              </span>
              <span
                className={
                  "font-plexsans text-[3.256vw] lg:!text-[0.729vw] font-normal"
                }
              >
                Duplicates tickets are allowed
              </span>
            </div>
            <div className={"flex flex-col gap-[0.26vw]"}>
              <span
                className={
                  "font-plexsans text-[3.721vw] lg:!text-[0.833vw] font-semibold"
                }
              >
                Platform Fees
              </span>
              <span
                className={
                  "font-plexsans text-[3.256vw] lg:!text-[0.729vw] font-normal"
                }
              >
                A 3% fee is deducted from each ticket purchase.
              </span>
            </div>
            <div className={"flex flex-col gap-[0.26vw]"}>
              <span
                className={
                  "font-plexsans text-[3.721vw] lg:!text-[0.833vw] font-semibold"
                }
              >
                Winning Ticket reveal
              </span>
              <span
                className={
                  "font-plexsans text-[3.256vw] lg:!text-[0.729vw] font-normal"
                }
              >
                Winning ticket revealed within 2 days after round ends
              </span>
            </div>
          </div>
          <div
            className={"flex w-full flex-col gap-[2.326vw] lg:!gap-[0.885vw]"}
          >
            <div className={"flex flex-col gap-[0.26vw]"}>
              <span
                className={
                  "font-plexsans text-[3.721vw] lg:!text-[0.833vw] font-semibold"
                }
              >
                Claiming Rewards
              </span>
              <span
                className={
                  "font-plexsans text-[3.256vw] lg:!text-[0.729vw] font-normal"
                }
              >
                Each ticket earns points: 0, 90, 324, 2187, 26244, 590490, or
                31886460 for 0, 1, 2, 3, 4, 5, or 6 correct numbers
              </span>
              <span
                className={
                  "mt-[0.26vw] font-plexsans text-[3.256vw] lg:!text-[0.729vw] font-normal"
                }
              >
                The reward is a share of the total bank based on points, order
                of numbers matters
              </span>
            </div>
            <div className={"flex flex-col gap-[0.26vw]"}>
              <span
                className={
                  "font-plexsans text-[3.721vw] lg:!text-[0.833vw] font-semibold"
                }
              >
                Refunds
              </span>
              <span
                className={
                  "font-plexsans text-[3.256vw] lg:!text-[0.729vw] font-normal"
                }
              >
                If the winning ticket is not revealed within 2 days, you can get
                a refund for your ticket
              </span>
            </div>
          </div>
        </div>
        <div
          className={"p-[3.488vw] flex flex-col items-center justify-center"}
        >
          <button
            className={
              "w-full font-plexsans p-[1.163vw] rounded-[1.163vw] bg-middle-accent text-bg-grey text-[3.721vw] lg:!text-[0.833vw] font-semibold text-center lg:!hidden"
            }
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
