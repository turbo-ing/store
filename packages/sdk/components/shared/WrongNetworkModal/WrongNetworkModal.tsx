import BaseModal from "../Modal/BaseModal";
import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import catWifeIMG from "../../../public/image/cat-wife.svg";
import Image from "next/image";
import { Network } from "../../../constants/networks";

const NetworkSwitchButton = dynamic(
  () => import("./nonSSR/NetworkSwitchButton"),
  {
    ssr: false,
  },
);

export default function WrongNetworkModal({
  expectedNetwork,
}: {
  expectedNetwork: Network;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <BaseModal isOpen={isOpen} setIsOpen={setIsOpen} isDismissible={false}>
      <div
        className={
          "flex w-full h-full lg:!max-w-[26.042vw] lg:!max-h-[20.833vw] flex-col"
        }
      >
        <Image
          src={catWifeIMG}
          alt={"catWifeImg"}
          className={
            "mx-auto h-[23.256vw] lg:!h-[10vw] w-auto object-contain object-center"
          }
        />
        <span
          className={
            "my-[2.326vw] lg:!my-[1vw] text-center font-museo text-[3.721vw] lg:!text-[1vw] font-medium"
          }
        >
          This game only supports {expectedNetwork.name} network, in order to
          play you need to switch network
        </span>
        <div className={"flex flex-col gap-[1.86vw] lg:!gap-[1vw]"}>
          <NetworkSwitchButton switchToNetwork={expectedNetwork} />
          <div className={"flex flex-row items-center"}>
            <div className={"h-px w-full bg-neutral-500"} />
            <span
              className={
                "px-[0.93vw] lg:!px-[0.5vw] text-[1.628vw] lg:!text-[0.5vw]"
              }
            >
              or
            </span>
            <div className={"h-px w-full bg-neutral-500"} />
          </div>
          <Link
            href={"/"}
            className={
              "w-full rounded-[1.163vw] lg:!rounded-[0.26vw] border border-right-accent p-[0.5vw] text-center font-museo text-[3.256vw] lg:!text-[0.833vw] font-medium hover:bg-right-accent/10"
            }
          >
            Pick another game
          </Link>
        </div>
      </div>
    </BaseModal>
  );
}
