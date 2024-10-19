"use client";

import "reflect-metadata";
import Footer from "@zknoid/sdk/components/widgets/Footer/Footer";
import MainSection from "@/components/pages/MainSection";
import Header from "@zknoid/sdk/components/widgets/Header";
import ZkNoidGameContext from "@zknoid/sdk/lib/contexts/ZkNoidGameContext";
import SetupStoreContext from "../../../packages/sdk/lib/contexts/SetupStoreContext";
import { useNetworkStore } from "@zknoid/sdk/lib/stores/network";
import { api } from "../trpc/react";

export default function Home() {
  const networkStore = useNetworkStore();
  const accountData = api.accounts.getAccount.useQuery({
    userAddress: networkStore.address || "",
  }).data;
  const nameMutator = api.accounts.setName.useMutation();
  const avatarIdMutator = api.accounts.setAvatar.useMutation();
  const gameFeedbackMutator = api.ratings.setGameFeedback.useMutation();

  return (
    <ZkNoidGameContext.Provider
      value={{
        client: undefined,
        appchainSupported: false,
        buildLocalClient: true,
      }}
    >
      <SetupStoreContext.Provider
        value={{
          account: {
            name: accountData?.account?.name,
            avatarId: accountData?.account?.avatarId,
            nameMutator: (name) =>
              nameMutator.mutate({
                userAddress: networkStore.address || "",
                name: name,
              }),
            avatarIdMutator: (avatarId) =>
              avatarIdMutator.mutate({
                userAddress: networkStore.address || "",
                avatarId: avatarId,
              }),
          },
          ratings: {
            gameFeedbackMutator: (feedback) =>
              gameFeedbackMutator.mutate({
                userAddress: feedback.userAddress,
                gameId: feedback.gameId,
                feedback: feedback.feedbackText,
                rating: feedback.rating,
              }),
          },
        }}
      >
        <div className="flex min-h-screen flex-col">
          <Header />
          <MainSection />
          <Footer />
        </div>
      </SetupStoreContext.Provider>
    </ZkNoidGameContext.Provider>
  );
}
