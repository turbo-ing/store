import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface GiftCode {
  code: string;
  used: boolean;
  approved: boolean;
  deleted: boolean;
  createdAt: number;
}

export interface IGiftCodeCheckResult {
  code: string;
  used: boolean;
  approved: boolean;
}

export interface GiftCodesStorage {
  giftCodes: GiftCode[];
  addGiftCodes: (newCodes: GiftCode[]) => void;
  updateGiftCodes: (updatedCodes: IGiftCodeCheckResult[]) => void;
  removeGiftCodes: (codes: GiftCode[]) => void;
}

export const useGiftCodes = create<
  GiftCodesStorage,
  [["zustand/persist", never]]
>(
  persist(
    (set, get) => ({
      giftCodes: [],
      addGiftCodes: (newCodes) => {
        set((state) => ({
          giftCodes: [...state.giftCodes, ...newCodes],
        }));
      },
      updateGiftCodes: (updatedCodes) => {
        console.log('Updating codes', updatedCodes);
        set((state) => {
          const codes = state.giftCodes;
          for (let updatedCode of updatedCodes) {
            const codeIndex = codes.findIndex(x => x.code == updatedCode.code);
            codes[codeIndex].approved = updatedCode.approved;
            codes[codeIndex].used = updatedCode.used;
          }
          
          return {
            giftCodes: [...codes],
          };
        });
      },
      removeGiftCodes: (codesToDelete) => {
        set((state) => {
          const codes = state.giftCodes;
          for (const codeToDelete of codesToDelete) {
            const idxToDelete = codes.findIndex(
              (x) => x.code == codeToDelete.code
            );
            codes[idxToDelete].deleted = true;
          }
          return {
            giftCodes: codes,
          };
        });
      },
    }),
    {
      name: "giftCodes",
    }
  )
);
