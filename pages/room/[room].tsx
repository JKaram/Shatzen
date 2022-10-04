import { EstimatesBox } from "../../components/EstimatesBox";
import { RevealBox } from "../../components/RevealBox";
import { useRouter } from "next/router";
import { UserPanel } from "../../components/UserPanel";
import { SocketContext, useSockets } from "../../components/provider/SocketProvider";
import React, { useContext, useEffect } from "react";

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

  return (
    <div>
      <div className="flex flex-col justify-center">
        <EstimatesBox />
        <RevealBox />
        <UserPanel />
      </div>
    </div>
  );
};

export default Room;
