/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { observable } from "@trpc/server/observable";
import { EventEmitter } from "events";
import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../../trpc";
import { IMessage } from "../../../../entities/Chat/Chat";

interface MyEvents {
  sendMessage: (message: IMessage) => void;
}
declare interface MyEventEmitter {
  on<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  off<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  once<TEv extends keyof MyEvents>(event: TEv, listener: MyEvents[TEv]): this;
  emit<TEv extends keyof MyEvents>(
    event: TEv,
    ...args: Parameters<MyEvents[TEv]>
  ): boolean;
}

class MyEventEmitter extends EventEmitter {}

// In a real app, you'd probably use Redis or something
const ee = new MyEventEmitter();

// who is currently typing, key is `name`
// const currentlyTyping: Record<string, { lastTyped: Date }> =
//   Object.create(null);

// every 1s, clear old "isTyping"
// const interval = setInterval(() => {
//   let updated = false;
//   const now = Date.now();
//   for (const [key, value] of Object.entries(currentlyTyping)) {
//     if (now - value.lastTyped.getTime() > 3e3) {
//       delete currentlyTyping[key];
//       updated = true;
//     }
//   }
//   if (updated) {
//     ee.emit("isTypingUpdate");
//   }
// }, 3e3);
// process.on("SIGTERM", () => {
//   clearInterval(interval);
// });

export const chatRouter = createTRPCRouter({
  sendMessage: publicProcedure
    .input(
      z.object({
        roomId: z.string(),
        senderAddress: z.string(),
        // sender: z.object({
        //   address: z.string(),
        //   name: z.string().optional(),
        //   avatar: z.string().optional(),
        // }),
        text: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const message: IMessage = {
        ...input,
        createdAt: new Date().toISOString(),
      };

      ee.emit("sendMessage", message);
      return message;
    }),
  onMessage: publicProcedure.subscription(() => {
    return observable<IMessage>((emit) => {
      const onMessage = (data: IMessage) => {
        emit.next(data);
      };
      ee.on("sendMessage", onMessage);
      return () => {
        ee.off("sendMessage", onMessage);
      };
    });
  }),
});
