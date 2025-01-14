import { createCallerFactory, createTRPCRouter } from "../../server/api/trpc";
import { chatRouter } from "@/server/api/routers/ws/chats";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const wsRouter = createTRPCRouter({
  chat: chatRouter,
});

// export type definition of API
export type WsRouter = typeof wsRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createWsCaller = createCallerFactory(wsRouter);
