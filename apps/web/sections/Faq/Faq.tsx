import { CONTACTS } from "@/constants/contacts";
import Link from "next/link";
import Image from "next/image";
import FaqAccordion from "../../features/FaqAccordion";
import { useState } from "react";
import simg from "@/public/image/misc/2.png";

const QA = [
  {
    title: "How to create a wallet on Mina and connect it to ZkNoid platform?",
    content: (
      <span className={"font-plexsans text-[0.833vw]"}>
        The Mina Network offers two wallet options:{" "}
        <Link
          href={"https://www.aurowallet.com/"}
          target={"_blank"}
          rel={"noopener noreferrer"}
          className={
            "underline underline-offset-2 hover:opacity-80 decoration-dotted"
          }
        >
          Auro Wallet
        </Link>{" "}
        and{" "}
        <Link
          href={"https://pallad.co/"}
          target={"_blank"}
          rel={"noopener noreferrer"}
          className={
            "underline underline-offset-2 hover:opacity-80 decoration-dotted"
          }
        >
          Pallad Wallet
        </Link>
        . To get started, you can create a new wallet and download a browser
        extension to use when accessing the game store in the future.
      </span>
    ),
  },
  {
    title: "How can I connect my wallet to the Game Store?",
    content: (
      <span className={"font-plexsans text-[0.833vw]"}>
        To connect your wallet to the game store, click the red "Connect Wallet"
        button in the website header and enter your wallet password in the
        wallet browser extension popup.
      </span>
    ),
  },
  {
    title: "How can I get test tokens to play games?",
    content: (
      <span className={"font-plexsans text-[0.833vw]"}>
        You can get test tokens by requesting them to your wallet address using
        the{" "}
        <Link
          href={"https://faucet.minaprotocol.com/"}
          target={"_blank"}
          rel={"noopener noreferrer"}
          className={
            "underline underline-offset-2 hover:opacity-80 decoration-dotted"
          }
        >
          Mina faucet.
        </Link>
      </span>
    ),
  },
  {
    title: "How can I invite my friend to play with me?",
    content: (
      <span className={"font-plexsans text-[0.833vw]"}>
        In the lobby creation process, you can choose to make the lobby private.
        After creating the lobby, you can share the link with your friends or
        followers.
      </span>
    ),
  },
  {
    title: "Where can I find an opponent to play in PVP games?",
    content: (
      <span className={"font-plexsans text-[0.833vw] flex flex-col"}>
        <span>There are two ways to find an opponent:</span>
        <span>
          1) Wait for an opponent in a lobby that has already been created.{" "}
        </span>

        <span>
          2) Use our{" "}
          <Link
            href={"https://discord.gg/hndRCZwQnb"}
            target={"_blank"}
            rel={"noopener noreferrer"}
            className={
              "underline underline-offset-2 hover:opacity-80 decoration-dotted"
            }
          >
            Discord channel
          </Link>{" "}
          to search for an opponent. You can find the channel by searching for
          the "Search Opponent" chat.
        </span>
      </span>
    ),
  },
  {
    title: "Is it possible to create my own competition with a prize bank?",
    content: (
      <span className={"font-plexsans text-[0.833vw]"}>
        Yes, to create your own competition, first choose a single-player game.
        Then, click "Create New Competition". Choose the settings for your
        competition and click "Create".
      </span>
    ),
  },
  {
    title: "How can I track the transaction?",
    content: (
      <span className={"font-plexsans text-[0.833vw]"}>
        When you make a purchase using your wallet, you can check the status of
        your transaction on the{" "}
        <Link
          href={"https://discord.gg/hndRCZwQnb"}
          target={"_blank"}
          rel={"noopener noreferrer"}
          className={
            "underline underline-offset-2 hover:opacity-80 decoration-dotted"
          }
        >
          Minascan
        </Link>{" "}
        blockchain explorer using the transaction hash provided by the wallet
        application.
      </span>
    ),
  },
  {
    title: "When will your games will be live on the mainnet?",
    content: (
      <span className={"font-plexsans text-[0.833vw]"}>
        We have two blockchain solutions that our games are built on: protokit
        and the L1 network. Games built on protokit will be launched on the
        mainnet after protokit launch. The lottery game built on the L1 layer
        network will be launched on the mainnet following the October testnet.
      </span>
    ),
  },
  {
    title: "What is ZkNoid?",
    content: (
      <>
        <span className={"font-plexsans text-[0.833vw]"}>
          The ZkNoid project is a home for zk-provable gaming. On the platform,
          you can try cutting edge games utilizing Zero-Knowledge proofs or
          build one using the provided infrastructure.
        </span>
        <Image src={simg} alt={"image"} className={"w-[1.042vw] h-[1.042vw]"} />
      </>
    ),
  },
  {
    title: "What can ZkNoid provide to users?",
    content: (
      <span className={"font-plexsans text-[0.833vw] flex flex-col"}>
        <span>
          For gamers, we support several on-chain games in different genres that
          provide an honest result through zk-proofs, both single-player and
          multiplayer.
        </span>
        <span>
          For developers, ZkNoid offers a ready-to-use infrastructure and
          provides assistance during the development process.
        </span>
        <span>
          For projects, we offer community-attraction competitions and quests
          with reward distribution.
        </span>
      </span>
    ),
  },
  {
    title: "Where can I find the ZkNoid Roadmap?",
    content: (
      <span className={"font-plexsans text-[0.833vw]"}>
        We are currently actively moving towards the Mainnet on the Mina
        Protocol. Our immediate plans include testing the Lottery game on the
        testnet and launching it on the mainnet, as well as launching the token
        and the clicker game for initial token allocation. You can find a more
        detailed roadmap in our{" "}
        <Link
          href={"https://docs.zknoid.io"}
          target={"_blank"}
          rel={"noopener noreferrer"}
          className={
            "underline underline-offset-2 hover:opacity-80 decoration-dotted"
          }
        >
          documentation.
        </Link>
      </span>
    ),
  },
  {
    title: "Does the team plan to launch a project token?",
    content: (
      <span className={"font-plexsans text-[0.833vw]"}>
        Yes, we plan to launch the token in the first or second quarter of 2025.
      </span>
    ),
  },
  {
    title: "I want to contribute to your project, how can I help you?",
    content: (
      <span className={"font-plexsans text-[0.833vw]"}>
        We would greatly appreciate any assistance with community attraction,
        marketing, and development. In particular, it would be greatly
        appreciated if you could share your experience with our project. If you
        have any development ideas, please do not hesitate to contact us on{" "}
        <Link
          href={"https://discord.gg/hndRCZwQnb"}
          target={"_blank"}
          rel={"noopener noreferrer"}
          className={
            "underline underline-offset-2 hover:opacity-80 decoration-dotted"
          }
        >
          Discord
        </Link>{" "}
        or{" "}
        <Link
          href={"https://twitter.com/ZkNoid"}
          target={"_blank"}
          rel={"noopener noreferrer"}
          className={
            "underline underline-offset-2 hover:opacity-80 decoration-dotted"
          }
        >
          Twitter
        </Link>{" "}
        to help improve the platform. You can receive a bounty for your
        contribution.
      </span>
    ),
  },
  {
    title: "I want to develop a game on Mina, where should I start?",
    content: (
      <span className={"font-plexsans text-[0.833vw]"}>
        ZkNoid provides a game SDK for external developers and offers a wealth
        of educational materials, such as text guides on how to build a game on
        the Mina Blockchain from scratch, available on{" "}
        <Link
          href={"https://zknoid.medium.com/"}
          target={"_blank"}
          rel={"noopener noreferrer"}
          className={
            "underline underline-offset-2 hover:opacity-80 decoration-dotted"
          }
        >
          Medium
        </Link>{" "}
        and{" "}
        <Link
          href={"https://www.youtube.com/@ZkNoid"}
          target={"_blank"}
          rel={"noopener noreferrer"}
          className={
            "underline underline-offset-2 hover:opacity-80 decoration-dotted"
          }
        >
          YouTube
        </Link>{" "}
        workshops.
      </span>
    ),
  },
];

export default function Faq() {
  const [openAccordionIdx, setOpenAccordionIdx] = useState<number | undefined>(
    undefined,
  );

  return (
    <div id={"faq"} className={"flex w-full flex-col"}>
      <span className={"font-museo text-[1.667vw] font-bold text-foreground"}>
        Technical support
      </span>
      <span
        className={
          "mt-[0.781vw] w-1/2 font-plexsans text-[0.833vw] text-foreground"
        }
      >
        If you have any questions or notice any issues with the operation of our
        application, please do not hesitate to contact us. We will be more than
        happy to answer any questions you may have and try our best to solve any
        problems as soon as possible.
      </span>
      <div className={"mt-[2.083vw] flex flex-col gap-[0.781vw]"}>
        <span
          className={"font-museo text-[1.25vw] font-medium text-foreground"}
        >
          Contacts
        </span>
        <div className={"flex flex-row gap-[0.781vw]"}>
          {CONTACTS.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className={
                "group flex flex-row items-center justify-center gap-[0.521vw] rounded-[0.521vw] bg-[#252525] p-[1.563vw] shadow-2xl"
              }
            >
              <Image
                src={item.image}
                alt={"ZkNoid contacts"}
                className={"h-[1.25vw] w-[1.25vw]"}
              />
              <span
                className={
                  "font-plexsans text-[0.833vw] font-medium text-foreground group-hover:text-left-accent"
                }
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className={"mt-[3.125vw] flex flex-col gap-[1.042vw]"}>
        <span className={"text-[1.667vw] font-bold font-museo text-foreground"}>
          FAQ
        </span>
        <div className={"grid grid-cols-2 gap-x-[0.781vw] gap-y-[1.042vw]"}>
          {QA.map((item, index) => (
            <FaqAccordion
              key={index}
              isOpen={index == openAccordionIdx}
              toggleOpen={() => {
                index != openAccordionIdx
                  ? setOpenAccordionIdx(index)
                  : setOpenAccordionIdx(undefined);
              }}
              content={item.content}
              title={item.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
