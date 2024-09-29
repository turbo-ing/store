"use client";
import { useEffect } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import ZknoidWorkerClient from "./workerClient";

export interface ClientState {
  status: string;
  client: ZknoidWorkerClient | undefined;
  start: () => Promise<ZknoidWorkerClient>;
}

export const useWorkerClientStore = create<
  ClientState,
  [["zustand/immer", never]]
>(
  immer((set) => ({
    status: "Not loaded",
    client: undefined,
    async start() {
      set((state) => {
        state.status = "Loading worker";
      });

      const zkappWorkerClient = new ZknoidWorkerClient();

      await zkappWorkerClient.waitFor();

      set((state) => {
        state.status = "Loading contracts";
      });

      await zkappWorkerClient.loadContracts();

      set((state) => {
        state.status = "Initializing zkapp";
      });

      set((state) => {
        state.status = "Initialized";
        state.client = zkappWorkerClient;
      });

      return zkappWorkerClient;
    },
  }))
);

export const useRegisterWorkerClient = () => {
  const workerClientStore = useWorkerClientStore();

  useEffect(() => {
    if (workerClientStore.status == "Not loaded") workerClientStore.start();
  }, []);
};
