'use client';

import 'reflect-metadata';
import Footer from '@zknoid/sdk/components/widgets/Footer/Footer';
import MainSection from '@/components/pages/MainSection';
import Header from '@zknoid/sdk/components/widgets/Header';
import ZkNoidGameContext from '@zknoid/sdk/lib/contexts/ZkNoidGameContext';
import {useAccountStore} from "@zknoid/sdk/lib/stores/accountStore";

export default function Home() {
    const accountStore = useAccountStore()
  return (
    <ZkNoidGameContext.Provider
      value={{
        client: undefined,
        appchainSupported: false,
        buildLocalClient: true,
      }}
    >
      <div className="flex min-h-screen flex-col">
        <Header />
        <MainSection />
        <Footer />
      </div>
        <button className={'bg-right-accent p-4 w-10 h-10'} onClick={() => accountStore.setName('asd')}>Set name</button>
    </ZkNoidGameContext.Provider>
  );
}
