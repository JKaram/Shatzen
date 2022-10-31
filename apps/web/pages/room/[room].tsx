import { EstimatesBox } from "../../components/EstimatesBox";
import { RevealBox } from "../../components/RevealBox";
import { useRouter } from "next/router";
import { UserPanel } from "../../components/UserPanel";
import { SocketContext } from "../../components/Provider/SocketProvider";
import React, { useContext, useEffect } from "react";
import PageLayout from "../../components/PageLayout";
import Head from "next/head";
import OptionsModal from "../../components/Options/OptionsModal";

const Room = () => {
  const router = useRouter();
  const { room } = router.query;
  const { user } = useContext(SocketContext);

  useEffect(() => {
    if (!user && router.isReady) {
      router.push(`/login/${room}`);
    }
  }, [user, router.isReady]);

  if (!router.isReady) return <div>Loading</div>;

  return (
    <PageLayout>
      <OptionsModal />
      <Head>
        <title>Shätzen | {room}</title>
        <meta property="og:title" content="Estimating room" key="title" />
      </Head>

      <EstimatesBox />
      <RevealBox />
      <UserPanel />
    </PageLayout>
  );
};

export default Room;
