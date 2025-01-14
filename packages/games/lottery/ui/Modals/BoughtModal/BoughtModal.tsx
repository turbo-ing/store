"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@zknoid/sdk/lib/helpers";

export default function BoughtModal({
  title,
  text,
  icon,
  onClose,
}: {
  title: string;
  text: string;
  icon: "ok" | "ticket";
  onClose: ({ isChecked }: { isChecked: boolean }) => void;
}) {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", duration: 0.4, bounce: 0 }}
        className={
          "fixed left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center backdrop-blur-md p-[10vw] lg:!p-0"
        }
        onClick={() => {
          onClose({ isChecked: isChecked });
          setIsChecked(false);
        }}
      >
        <motion.div
          className={
            "lg:!max-w-[30vw] flex flex-col items-center justify-center gap-[4.706vw] lg:!gap-[1.042vw] p-[11.765vw] lg:!p-[2.604vw] bg-bg-grey rounded-[2.353vw] lg:!rounded-[0.521vw]"
          }
          onClick={(e) => e.stopPropagation()}
        >
          <span
            className={
              "text-center font-museo font-medium text-foreground text-[8.235vw] lg:!text-[1.823vw]"
            }
          >
            {title}
          </span>
          {icon == "ok" ? (
            <svg
              width="105"
              height="73"
              viewBox="0 0 105 73"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={"w-[24.706vw] lg:!w-[5.469vw]"}
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M62.8536 51.6853C60.9003 53.642 57.7297 53.642 55.7764 51.6853L11.3653 7.19703C9.41202 5.24031 6.24147 5.24031 4.28814 7.19703L1.45358 10.0365C-0.494947 11.9884 -0.494943 15.1495 1.45359 17.1014L49.4092 65.1404C49.4127 65.1439 49.4127 65.1496 49.4092 65.1531C49.4057 65.1566 49.4057 65.1622 49.4092 65.1657L55.7638 71.5313C57.7171 73.488 60.8877 73.488 62.841 71.5313L102.821 31.4819C104.77 29.5299 104.77 26.3688 102.821 24.4169L99.9864 21.5774C98.0331 19.6207 94.8626 19.6207 92.9092 21.5774L62.8536 51.6853Z"
                fill="#121212"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.6439 1.46574C9.69301 -0.488578 6.52994 -0.48858 4.57901 1.46574L1.74444 4.30523C-0.206483 6.25955 -0.20648 9.42812 1.74445 11.3824L53.1524 62.8797C53.1785 62.9071 53.205 62.9342 53.2318 62.9611L56.0664 65.8006C58.0173 67.7549 61.1804 67.7549 63.1313 65.8006L103.1 25.7629C105.051 23.8085 105.051 20.64 103.1 18.6856L100.265 15.8462C98.3141 13.8918 95.151 13.8918 93.2001 15.8462L59.5998 49.5049L11.6439 1.46574Z"
                fill="#DCB8FF"
              />
            </svg>
          ) : (
            <svg
              width="106"
              height="91"
              viewBox="0 0 106 91"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={"rotate-[30deg] w-[21.647vw] lg:!w-[4.792vw]"}
            >
              <path
                d="M79.6742 0.00882762L65.2155 8.34782L67.686 12.6208L64.3348 14.5486L61.8844 10.2833L0.00771544 46.0043L6.90978 57.9681C13.6084 56.5322 19.1791 58.6725 21.6485 62.9496C24.1179 67.2267 23.1872 73.1171 18.5944 78.2003L25.5026 90.1658L87.3569 54.4542L84.9081 50.1826L88.2615 48.2466L90.7364 52.503L105.172 44.1688L98.2634 32.2033C91.5648 33.6392 85.9983 31.5001 83.5289 27.2229C81.0595 22.9458 81.9913 17.0514 86.5841 11.9681L79.6742 0.00882762ZM71.1327 18.5484L76.2629 27.4644L72.9096 29.4005L67.7793 20.4844L71.1327 18.5484ZM59.5383 19.0673L78.5966 52.0773L36.7524 76.2535L17.6706 43.2151L57.8671 20.0146L59.5383 19.0673ZM58.1351 24.3207L22.9301 44.6288L38.1555 71.0001L73.3454 50.6657L58.1351 24.3207ZM79.6868 33.3947L84.8432 42.2956L81.4898 44.2317L76.3334 35.3308L79.6868 33.3947Z"
                fill="#DCB8FF"
              />
            </svg>
          )}
          <span
            className={
              "font-plexsans text-center text-foreground text-[3.765vw] lg:!text-[0.833vw]"
            }
          >
            {text}
          </span>
          <button
            onClick={() => {
              onClose({ isChecked: isChecked });
              setIsChecked(false);
            }}
            className={
              "w-full py-[1.176vw] lg:!py-[0.26vw] rounded-[1.176vw] lg:!rounded-[0.26vw] bg-right-accent text-bg-grey font-museo font-medium text-[3.765vw] lg:!text-[0.833vw]"
            }
          >
            Close
          </button>
          <button
            className={
              "mr-auto cursor-pointer hover:opacity-80 flex flex-row items-center justify-center w-fit gap-[2.353vw] lg:!gap-[0.521vw]"
            }
            onClick={() => {
              setIsChecked(!isChecked);
            }}
          >
            <motion.div
              className={
                "rounded-[0.471vw] lg:!rounded-[0.104vw] flex flex-col items-center justify-center border border-right-accent"
              }
              animate={
                isChecked
                  ? { backgroundColor: "#dcb8ff" }
                  : { backgroundColor: "#212121" }
              }
            >
              <motion.svg
                width="14"
                height="10"
                viewBox="0 0 14 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={"w-[2.824vw] lg:!w-[0.625vw]"}
                animate={isChecked ? { opacity: 1 } : { opacity: 0 }}
              >
                <path d="M1 4.00195L5.5 8.50195L13 1.00195" stroke="#252525" />
              </motion.svg>
            </motion.div>
            <span
              className={
                "text-[3.294vw] lg:!text-[0.729vw] font-plexsans text-foreground"
              }
            >
              Don't show again
            </span>
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
