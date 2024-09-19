'use client'

import {useAccountStore} from '@zknoid/sdk/lib/stores/accountStore';
import {useEffect} from "react";
import {api} from "../../trpc/react";
import {useNetworkStore} from "@zknoid/sdk/lib/stores/network";

export function UseSetupStore() {
    const accountStore = useAccountStore();
    const networkStore = useNetworkStore();
    const accountData = api.accounts.getAccount.useQuery({userAddress: networkStore.address || ''}).data

    const nameMutator = api.accounts.setName.useMutation()
    const avatarIdMutator = api.accounts.setAvatar.useMutation()

    useEffect(() => {
        accountStore.setName(accountData?.account?.name || undefined);
        accountStore.setNameMutator((name) => nameMutator.mutate({userAddress: networkStore.address || '', name: name}));
        accountStore.setAvatarId(accountData?.account?.avatarId || undefined);
        accountStore.setAvatarIdMutator((avatarId) => avatarIdMutator.mutate({userAddress: networkStore.address || '', avatarId: avatarId}));
    }, []);
    return (
        <></>
    )
}