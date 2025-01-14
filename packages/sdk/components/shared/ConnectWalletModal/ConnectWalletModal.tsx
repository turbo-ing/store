import { useState } from "react";
import Image from "next/image";
import cubes from "./assets/Cubes.svg";
import Link from "next/link";
import { walletInstalled } from "../../../lib/helpers";
import { useNetworkStore } from "../../../lib/stores/network";
import BaseModal from "../../../components/shared/Modal/BaseModal";

export default function ConnectWalletModal() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const networkStore = useNetworkStore();
  return (
    <BaseModal isOpen={isOpen} setIsOpen={setIsOpen} isDismissible={false}>
      <div className={"flex w-full lg:!max-w-[26.042vw] flex-col"}>
        <Image
          src={cubes}
          alt={"cubes"}
          className={
            "mx-auto h-[23.256vw] lg:!h-[10vw] w-auto object-contain object-center"
          }
        />
        <span
          className={
            "my-[2.326vw] lg:!my-[1vw] text-center font-museo text-[3.721vw] lg:!text-[1vw] font-medium"
          }
        >
          This page requires a connected wallet, please connect your wallet by
          clicking on this button
        </span>
        <div className={"flex flex-col gap-[1.86vw] lg:!gap-[1vw]"}>
          <button
            className={
              "w-full rounded-[1.163vw] lg:!rounded-[0.26vw] bg-left-accent p-[0.5vw] text-center font-museo text-[3.256vw] lg:!text-[0.833vw] font-medium text-bg-dark hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-60"
            }
            disabled={!walletInstalled()}
            onClick={() => networkStore.connectWallet(false)}
          >
            Connect wallet
          </button>
          <Link
            href="https://www.aurowallet.com/"
            rel="noopener noreferrer"
            target="_blank"
            className={
              "w-full rounded-[1.163vw] lg:!rounded-[0.26vw] p-[0.25vw] text-center font-museo text-[3.256vw] lg:!text-[0.833vw] font-medium hover:bg-right-accent/10"
            }
          >
            I don&apos;t have a wallet
          </Link>
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
              "w-full rounded-[1.163vw] lg:!rounded-[0.26vw] border border-right-accent p-[0.25vw] text-center font-museo text-[3.256vw] lg:!text-[0.833vw] font-medium hover:bg-right-accent/10"
            }
          >
            Back to game store
          </Link>
        </div>
      </div>
    </BaseModal>
  );
}
