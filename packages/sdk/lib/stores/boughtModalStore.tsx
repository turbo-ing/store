import { create } from "zustand";
import { persist } from "zustand/middleware";

enum BoughtModalsVariants {
  ticket = "ticket",
  codeBuy = "codeBuy",
  codeUse = "codeUse",
}

export interface BoughtModalStore {
  notShow: BoughtModalsVariants[];
  addNotShow: (target: BoughtModalsVariants) => void;
  removeNotShow: (target: BoughtModalsVariants) => void;
  openModalId: string;
  open: (id: string) => void;
  close: () => void;
}

export const useBoughtModalStore = create<
  BoughtModalStore,
  [["zustand/persist", never]]
>(
  persist(
    (set, get) => ({
      notShow: [],
      openModalId: "",
      addNotShow: (target) => {
        set((state) => ({
          notShow: [...state.notShow, target],
        }));
      },
      removeNotShow: (target) => {
        set((state) => ({
          notShow: state.notShow.filter((i) => i !== target),
        }));
      },
      open: (id) => {
        set(() => ({
          openModalId: id,
        }));
      },
      close: () => {
        set(() => ({
          openModalId: "",
        }));
      },
    }),
    {
      name: "boughtModalStore",
    },
  ),
);
