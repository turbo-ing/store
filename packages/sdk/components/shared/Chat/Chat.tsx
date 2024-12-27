"use client";

import { cn, formatAddress } from "../../../lib/helpers";
import { useContext, useEffect, useRef, useState } from "react";
import { useNetworkStore } from "../../../lib/stores/network";
import SetupStoreContext from "../../../lib/contexts/SetupStoreContext";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../Tooltip";

interface IMessage {
  roomId: string;
  sender: {
    address: string;
    name?: string;
  };
  text: string;
  createdAt: string;
}

const MessageItem = ({ message }: { message: IMessage }) => {
  const ref = useRef<HTMLDivElement>(null);
  const msgDate = new Date();

  useEffect(() => {
    if (ref.current?.parentElement) {
      ref.current.parentElement.scrollTo({
        top: ref.current.parentElement.scrollHeight,
      });
    }
  }, []);

  return (
    <div ref={ref} className={"flex flex-row gap-[0.26vw]"}>
      <span
        className={"font-regular font-plexsans text-[0.833vw] text-foreground"}
      >
        {msgDate.getHours() < 10
          ? "0" + msgDate.getHours()
          : msgDate.getHours()}
        :
        {msgDate.getMinutes() < 10
          ? "0" + msgDate.getMinutes()
          : msgDate.getMinutes()}
      </span>
      <span
        className={"font-plexsans text-[0.833vw] font-medium text-left-accent"}
      >
        {message.sender.name || formatAddress(message.sender.address)}:
      </span>
      <span
        className={
          "font-plexsans text-[0.833vw] font-light text-foreground break-all"
        }
      >
        {message.text}
      </span>
    </div>
  );
};

const EmojiTooltip = ({ addEmoji }: { addEmoji: (emoji: string) => void }) => {
  const emojis = [
    "🔥",
    "🥳",
    "🎉",
    "🏆",
    "❤️",
    "💚",
    "🐍",
    "💩",
    "👀",
    "🙂",
    "😁",
    "😅",
    "😋",
    "🤣",
    "🤗",
    "🤩",
    "😍",
    "😘",
    "🥰",
    "🥺",
    "😵‍💫",
    "🤮",
    "🤡",
    "😈",
    "👿",
    "💀",
    "☠️",
    "👽",
    "🥱",
    "🫡",
    "🫢",
    "🤯",
    "🤬",
    "😱",
    "😨",
    "😩",
    "🤪",
    "😭",
    "🙏",
    "💪",
    "🫵",
    "🤙",
    "✍️",
    "👉",
    "🤘",
    "👍",
    "👎",
    "🤝",
    "🫶",
    "👏",
  ];

  return (
    <TooltipProvider delayDuration={400}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={
              "w-[10%] cursor-pointer hover:opacity-80 p-[0.26vw] h-full rounded-[0.26vw] border flex flex-col justify-center items-center"
            }
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={"w-[1.042vw]"}
            >
              <path
                d="M7.5 15C6.01664 15 4.56659 14.5601 3.33323 13.736C2.09986 12.9119 1.13856 11.7406 0.570907 10.3701C0.00324961 8.99968 -0.145275 7.49168 0.144114 6.03683C0.433503 4.58197 1.14781 3.2456 2.1967 2.1967C3.2456 1.14781 4.58197 0.433503 6.03683 0.144114C7.49168 -0.145275 8.99968 0.00324961 10.3701 0.570907C11.7406 1.13856 12.9119 2.09986 13.736 3.33323C14.5601 4.56659 15 6.01664 15 7.5C14.9978 9.48846 14.207 11.3949 12.8009 12.8009C11.3949 14.207 9.48846 14.9978 7.5 15ZM7.5 1.25C6.26387 1.25 5.0555 1.61656 4.02769 2.30332C2.99988 2.99008 2.1988 3.96619 1.72576 5.10823C1.25271 6.25027 1.12894 7.50694 1.3701 8.71932C1.61125 9.9317 2.20651 11.0453 3.08059 11.9194C3.95466 12.7935 5.06831 13.3888 6.28069 13.6299C7.49307 13.8711 8.74973 13.7473 9.89177 13.2742C11.0338 12.8012 12.0099 12.0001 12.6967 10.9723C13.3834 9.94451 13.75 8.73613 13.75 7.5C13.7482 5.84296 13.0891 4.2543 11.9174 3.0826C10.7457 1.91089 9.15705 1.25182 7.5 1.25ZM11.0413 9.84125C11.1651 9.73102 11.24 9.57612 11.2496 9.41061C11.2593 9.24511 11.2027 9.08257 11.0925 8.95875C10.9823 8.83493 10.8274 8.75997 10.6619 8.75035C10.4964 8.74074 10.3338 8.79727 10.21 8.9075C9.44596 9.5508 8.49658 9.93353 7.5 10C6.50401 9.93358 5.55514 9.55131 4.79125 8.90875C4.66759 8.79836 4.50515 8.7416 4.33965 8.75098C4.17415 8.76036 4.01915 8.83509 3.90875 8.95875C3.79836 9.08241 3.7416 9.24485 3.75098 9.41036C3.76036 9.57586 3.8351 9.73085 3.95875 9.84125C4.95117 10.6891 6.19639 11.1844 7.5 11.25C8.80362 11.1844 10.0488 10.6891 11.0413 9.84125ZM8.75 6.25C8.75 6.875 9.30938 6.875 10 6.875C10.6906 6.875 11.25 6.875 11.25 6.25C11.25 5.91848 11.1183 5.60054 10.8839 5.36612C10.6495 5.1317 10.3315 5 10 5C9.66848 5 9.35054 5.1317 9.11612 5.36612C8.8817 5.60054 8.75 5.91848 8.75 6.25ZM6.875 6.25C6.875 6.08424 6.80915 5.92527 6.69194 5.80806C6.57473 5.69085 6.41576 5.625 6.25 5.625H4.375C4.20924 5.625 4.05027 5.69085 3.93306 5.80806C3.81585 5.92527 3.75 6.08424 3.75 6.25C3.75 6.41576 3.81585 6.57473 3.93306 6.69194C4.05027 6.80915 4.20924 6.875 4.375 6.875H6.25C6.41576 6.875 6.57473 6.80915 6.69194 6.69194C6.80915 6.57473 6.875 6.41576 6.875 6.25Z"
                fill="#F9F8F4"
              />
            </svg>
          </div>
        </TooltipTrigger>
        <TooltipContent
          className={
            "max-w-[20.833vw] flex flex-row flex-wrap gap-[1.024vw] shadow-2xl bg-bg-grey rounded-[0.521vw] border-none p-[0.521vw]"
          }
        >
          {emojis.map((item, index) => (
            <button
              type={"button"}
              key={index}
              onClick={() => addEmoji(item)}
              className={
                "select-none w-[1.146vw] h-[1.146vw] text-[1.146vw] cursor-pointer hover:opacity-80"
              }
            >
              {item}
            </button>
          ))}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default function Chat({
  roomId,
  className,
}: {
  roomId: string;
  className?: string;
}) {
  const networkStore = useNetworkStore();
  const { chat, account } = useContext(SetupStoreContext);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<IMessage[]>([]);

  const scrollHeight = chatBoxRef?.current?.scrollHeight || 0;
  const clientHeight = chatBoxRef?.current?.clientHeight || 0;

  chat.onMessageSubscription?.({
    roomId: roomId,
    opts: {
      onData: (message) => {
        setMessages([...messages, message as IMessage]);
      },
      onError: (err) => {
        console.log("ERROR", err);
      },
    },
  });

  const sendMessage = async (inputMessage: string) => {
    await chat.sendMessageMutator?.({
      roomId: roomId,
      sender: {
        address: networkStore.address || "undefined",
        name: account.name,
      },
      text: inputMessage,
    });
  };

  const validationSchema = Yup.object().shape({
    inputMessage: Yup.string().required(),
  });

  return (
    <div className={cn("flex flex-col", className)}>
      <div className={"flex max-w-fit flex-row"}>
        <span
          className={
            "rounded-t-[0.26vw] bg-left-accent px-[2.5vw] py-[0.26vw] font-plexsans text-[0.833vw] font-medium uppercase text-bg-dark"
          }
        >
          Chat
        </span>
        <div
          className={
            "-ml-[0.15vw] border-[1.042vw] border-solid border-b-left-accent border-l-left-accent border-r-transparent border-t-transparent"
          }
        />
      </div>
      <div
        className={
          "h-full rounded-b-[0.26vw] rounded-tr-[0.26vw] rounded-tl-none border border-left-accent p-[0.417vw] w-full"
        }
      >
        <div
          ref={chatBoxRef}
          className={cn(
            "flex flex-col w-full gap-[0.26vw] h-full overflow-y-scroll y-scrollbar pr-[0.417vw]",
            scrollHeight > clientHeight &&
              cn(
                "[&::-webkit-scrollbar]:w-[0.833vw]",
                "[&::-webkit-scrollbar-track]:bg-[#252525]",
                "[&::-webkit-scrollbar-thumb]:bg-left-accent",
                "[&::-webkit-scrollbar-thumb]:rounded-[0.15vw]",
                "[&::-webkit-scrollbar-track]:outline",
                "[&::-webkit-scrollbar-track]:outline-left-accent",
                "[&::-webkit-scrollbar-track]:rounded-[0.15vw]",
              ),
          )}
        >
          {messages.length > 0 ? (
            messages.map((item, index) => (
              <MessageItem key={index} message={item} />
            ))
          ) : (
            <div className={"text-[0.833vw]"}>No messages yet...</div>
          )}
        </div>
      </div>
      <Formik
        initialValues={{ inputMessage: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, formikHelpers) => {
          await sendMessage(values.inputMessage);
          await formikHelpers.setFieldValue("inputMessage", "");
        }}
      >
        {({ setFieldValue, values }) => (
          <Form
            className={"mt-[0.521vw] flex flex-row items-center gap-[0.26vw]"}
          >
            <Field
              name={"inputMessage"}
              type={"text"}
              placeholder={"Type a message..."}
              className={
                "focus:outline-none w-full border p-[0.26vw] rounded-[0.26vw] bg-bg-grey text-[0.833vw] placeholder:text-[0.833vw]"
              }
            />
            <EmojiTooltip
              addEmoji={(emoji: string) =>
                setFieldValue("inputMessage", values.inputMessage + emoji)
              }
            />
            <button
              type={"submit"}
              className={
                "w-[30%] h-full hover:opacity-80 bg-left-accent p-[0.26vw] rounded-[0.26vw] text-center text-bg-grey text-[0.833vw] font-museo font-medium"
              }
            >
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
