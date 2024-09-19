import {create} from "zustand";
import {persist} from "zustand/middleware";

export interface AccountStore {
    name?: string;
    setName: (name: string) => void;
    avatarId? : number;
    setAvatarId: (avatarId: number) => void;
    nameMutator: (name: string) => void;
    setNameMutator: (nameMutator: (name: string) => void) => void;
    avatarIdMutator: (avatarId: number) => void
    setAvatarIdMutator: (avatarIdMutator: (avatarId: number) => void) => void;
}

export const useAccountStore = create<
    AccountStore,
    [['zustand/persist', never]]
>(
    persist(
        (set, get) => ({
            name: undefined,
            avatarId: undefined,
            nameMutator: () => {},
            avatarIdMutator: () => {},
            setName: (name) => {
                set(() => ({
                    name: name,
                }));
            },
            setAvatarId: (avatarId) => {
                set(() => ({
                    avatarId: avatarId,
                }));
            },
            setNameMutator: (nameMutator: (name: string) => void) => {
                set(() => ({
                    nameMutator: nameMutator,
                }));
            },
            setAvatarIdMutator: (avatarIdMutator: (avatarId: number) => void) => {
                set(() => ({
                    avatarIdMutator: avatarIdMutator,
                }))
            }
        }),
        {
            name: 'accountStore',
        }
    )
);