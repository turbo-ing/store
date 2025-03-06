import { useEffect, useState } from "react";
import { cn } from "@zknoid/sdk/lib/helpers";
import MobileRulesModal from "../../../ui/BannerSection/ui/MobileRulesModal";
import Image from "next/image";
import iImage from "../../../images/5.png";

export default function Rules() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

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
    <>
      {isMobile ? (
        <>
          {isOpen && <MobileRulesModal setIsOpen={setIsOpen} />}
          <div className={"absolute bottom-0 right-0 z-0 h-full w-full"}>
            <button
              className={cn(
                "absolute bottom-[2.326vw] lg:!bottom-[1.042vw] right-[2.326vw] lg:!right-[1.042vw] z-[1] flex h-[13.488vw] lg:!h-[3.125vw] w-[13.488vw] lg:!w-[3.125vw] items-center justify-center rounded-[2.326vw] lg:!rounded-[0.26vw] border-left-accent bg-bg-dark hover:opacity-80",
                { border: !isOpen },
              )}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <svg
                  width="1.042vw"
                  height="1.042vw"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={"w-[3.256vw] h-[3.256vw] lg:!w-auto lg:!h-auto"}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.094 9.97056L19.5186 2.54594L17.3973 0.424621L9.97266 7.84924L2.54804 0.424621L0.426715 2.54594L7.85134 9.97056L0.426714 17.3952L2.54803 19.5165L9.97266 12.0919L17.3973 19.5165L19.5186 17.3952L12.094 9.97056Z"
                    fill="#DCB8FF"
                  />
                </svg>
              ) : (
                <div
                  className={
                    "font-museo text-[8.14vw] lg:!text-[1.823vw] font-bold text-left-accent"
                  }
                >
                  ?
                </div>
              )}
            </button>
          </div>
        </>
      ) : (
        <div
          className={cn({
            "absolute bottom-0 right-0 z-0 h-full w-full lg:!w-[35vw] lg:!rounded-l-[1.042vw] lg:!rounded-r-[0.521vw] rounded-[3.488vw] lg:!rounded-y-0 bg-right-accent":
              isOpen,
          })}
        >
          {isOpen && (
            <div
              className={
                "flex flex-col lg:!flex-row gap-[2.326vw] lg:!gap-[1.042vw] p-[3.488vw] lg:!px-[1.042vw] lg:!py-[0.521vw] text-bg-grey"
              }
            >
              <div
                className={
                  "flex w-full flex-col gap-[2.326vw] lg:!gap-[0.885vw]"
                }
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
                  <div className={"flex flex-row gap-[0.26vw]"}>
                    <span
                      className={
                        "font-plexsans text-[3.256vw] lg:!text-[0.729vw] font-normal"
                      }
                    >
                      Duplicates tickets are allowed
                    </span>
                    <Image
                      src={iImage}
                      alt={"img"}
                      className={"w-[1.042vw] h-[1.042vw]"}
                    />
                  </div>
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
                    A 10% fee is deducted from each ticket purchase.
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
                className={
                  "flex w-full flex-col gap-[2.326vw] lg:!gap-[0.885vw]"
                }
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
                    Each ticket earns points: 0, 90, 324, 2187, 26244, 590490,
                    or 31886460 for 0, 1, 2, 3, 4, 5, or 6 correct numbers
                  </span>
                  <span
                    className={
                      "mt-[0.26vw] font-plexsans text-[3.256vw] lg:!text-[0.729vw] font-normal"
                    }
                  >
                    The reward is a share of the total bank based on points,
                    order of numbers matters
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
                    If the winning ticket is not revealed within 2 days, you can
                    get a refund for your ticket
                  </span>
                </div>
              </div>
            </div>
          )}
          <button
            className={cn(
              "absolute bottom-[2.326vw] lg:!bottom-[1.042vw] right-[2.326vw] lg:!right-[1.042vw] z-[1] flex h-[13.488vw] lg:!h-[3.125vw] w-[13.488vw] lg:!w-[3.125vw] items-center justify-center rounded-[2.326vw] lg:!rounded-[0.26vw] border-left-accent bg-bg-dark hover:opacity-80",
              { border: !isOpen },
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <svg
                width="1.042vw"
                height="1.042vw"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={"w-[3.256vw] h-[3.256vw] lg:!w-auto lg:!h-auto"}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.094 9.97056L19.5186 2.54594L17.3973 0.424621L9.97266 7.84924L2.54804 0.424621L0.426715 2.54594L7.85134 9.97056L0.426714 17.3952L2.54803 19.5165L9.97266 12.0919L17.3973 19.5165L19.5186 17.3952L12.094 9.97056Z"
                  fill="#DCB8FF"
                />
              </svg>
            ) : (
              <div
                className={
                  "font-museo text-[8.14vw] lg:!text-[1.823vw] font-bold text-left-accent"
                }
              >
                ?
              </div>
            )}
          </button>
        </div>
      )}
    </>
  );
}
