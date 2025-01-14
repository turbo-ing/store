import {
  applyWSSHandler,
  CreateWSSContextFnOptions,
} from "@trpc/server/adapters/ws";
import ws from "ws";
import { createTRPCContext, createTRPCRouter } from "@/server/api/trpc";
import { wsRouter } from "@/server/api/wsRouter";
import { AddressInfo } from "node:net";

const wss = new ws.Server({
  port: 3001,
});

const createContext = async (opts: CreateWSSContextFnOptions) => {
  return createTRPCContext({ headers: opts.req.headers as unknown as Headers });
};

const handler = applyWSSHandler({
  wss,
  router: createTRPCRouter({
    ws: wsRouter,
  }),
  createContext,
});
wss.on("connection", (ws, request) => {
  console.log(
    `> Connection (${request.socket.remoteAddress}), clients size: ${wss.clients.size}`,
  );
  ws.once("close", () => {
    console.log(
      `> Disconnect (${request.socket.remoteAddress}), clients size: ${wss.clients.size}`,
    );
  });
});

const wssAddress = wss.address() as AddressInfo;

console.log(
  `✅ WebSocket Server listening on ws://${wssAddress?.address === "::" ? "localhost" : wssAddress?.address || "undefined"}:${wssAddress?.port || 3001}`,
);
process.on("SIGTERM", () => {
  console.log("SIGTERM");
  handler.broadcastReconnectNotification();
  wss.close();
});
