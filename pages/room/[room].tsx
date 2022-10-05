import { EstimatesBox } from "../../components/EstimatesBox";
import { RevealBox } from "../../components/RevealBox";
import { useRouter } from "next/router";
import { UserPanel } from "../../components/UserPanel";
import { SocketContext, useSockets } from "../../components/provider/SocketProvider";
import React, { useContext, useEffect } from "react";
import PageLayout from "../../components/PageLayout";

const Room = () => {
  const router = useRouter();
  const { room } = router.query;
  const { disconnect } = useSockets();
  const { user } = useContext(SocketContext);

  useEffect(() => {
    if (!user && router.isReady) {
      router.push(`/login/${room}`);
    }
  }, [user, router.isReady]);

  if (!router.isReady) return <div>Loading</div>;

  return (
    <PageLayout>
      <EstimatesBox />
      <RevealBox />
      <UserPanel />
    </PageLayout>
  );
};

export default Room;
