'use client';
import dynamic from 'next/dynamic';

const Updater = dynamic(() => import("./non-ssr/NonSSRUpdater"), {
  ssr: false,
});

export default Updater;