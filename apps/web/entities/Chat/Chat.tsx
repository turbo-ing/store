"use client";

import { formatAddress } from "@zknoid/sdk/lib/helpers";
import { useState } from "react";
import { useNetworkStore } from "@zknoid/sdk/lib/stores/network";
import { useNotificationStore } from "@zknoid/sdk/components/shared/Notification/lib/notificationStore";
import { api } from "../../trpc/react";

export interface IMessage {
  roomId: string;
  senderAddress: string;
  text: string;
  createdAt: string;
}

const MessageItem = ({ message }: { message: IMessage }) => {
  const msgDate = new Date();
  return (
    <div className={"flex flex-row gap-[0.26vw] font-plexsans text-[0.833vw]"}>
      <span className={"font-regular text-foreground"}>
        {msgDate.getHours() < 10
          ? "0" + msgDate.getHours()
          : msgDate.getHours()}
        :
        {msgDate.getMinutes() < 10
          ? "0" + msgDate.getMinutes()
          : msgDate.getMinutes()}
      </span>
      <span className={"font-medium text-left-accent"}>
        {formatAddress(message.senderAddress) || "Anonymous"}:
      </span>
      <span className={"font-light text-foreground"}>{message.text}</span>
    </div>
  );
};

export default function Chat({ roomId }: { roomId: string }) {
  const networkStore = useNetworkStore();
  const notificationStore = useNotificationStore();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");

  api.ws.chat.onMessage.useSubscription(undefined, {
    onData: (message) => {
      setMessages([...messages, message]);
    },
    onError: (error) => {
      console.error("error", error);
    },
  });

  const sendMessageMutation = api.ws.chat.sendMessage.useMutation();

  const sendMessage = async () => {
    await sendMessageMutation.mutateAsync({
      roomId: roomId,
      senderAddress: networkStore.address || "",
      text: inputMessage,
    });
    setInputMessage("");
    notificationStore.create({
      type: "success",
      message: "Message sent",
    });
  };

  return (
    <div className={"flex w-full flex-col gap-0"}>
      <div className={"flex max-w-fit flex-row gap-0"}>
        <span
          className={
            "rounded-t-[0.26vw] bg-left-accent px-[2.5vw] py-[0.26vw] font-plexsans text-[0.833vw] font-medium uppercase text-bg-dark"
          }
        >
          Chat
        </span>
        <div
          className={
            "-ml-[0.104vw] border-[1.042vw] border-solid border-b-left-accent border-l-left-accent border-r-transparent border-t-transparent"
          }
        />
      </div>
      <div
        className={
          "flex flex-col gap-[0.417vw] rounded-b-[0.26vw] rounded-tr-[0.26vw] rounded-tl-none border border-left-accent p-[0.417vw]"
        }
      >
        {messages.length > 0 ? (
          messages.map((item, index) => (
            <MessageItem key={index} message={item} />
          ))
        ) : (
          <div>NO MSG</div>
        )}
      </div>
      <div className={"mt-[0.521vw] flex flex-row items-center gap-[0.26vw]"}>
        <input
          type={"text"}
          value={inputMessage}
          onChange={(event) => setInputMessage(event.target.value)}
          className={
            "w-full border border-left-accent p-[0.26vw] rounded-[0.26vw] bg-bg-grey"
          }
        />
        <button
          onClick={sendMessage}
          className={
            "w-[30%] h-full hover:opacity-80 bg-left-accent p-[0.26vw] rounded-[0.26vw] text-center text-bg-grey text-[0.833vw] font-museo font-medium"
          }
        >
          Send
        </button>
      </div>
    </div>
    // <div
    //   className={
    //     "flex flex-col gap-[0.26vw] p-[0.26vw] rounded-[0.26vw] border"
    //   }
    // >
    //   <span>CHAT</span>
    //   <div className={"flex flex-col gap-[0.26vw] mt-[0.26vw] border-b w-full"}>
    //     {messages.length > 0 ? (
    //       messages.map((message, index) => (
    //         <MessageItem key={index} message={message} />
    //       ))
    //     ) : (
    //       <span>NO MESSAGES</span>
    //     )}
    //   </div>
    //   <div className={"flex flex-row items-center gap-[0.26vw] mt-[0.26vw]"}>
    //     <input
    //       className={"p-[0.26vw] border rounded-[0.26vw] bg-bg-grey"}
    //       onChange={(event) => setInputMessage(event.target.value)}
    //     />
    //     <button onClick={sendMessage}>Send Message</button>
    //   </div>
    // </div>
  );
}
