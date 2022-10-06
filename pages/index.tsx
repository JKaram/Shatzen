import { nanoid } from "nanoid";
import { ROOM_STRING_SIZE } from "../types/constants";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import PageLayout from "../components/PageLayout";
import Button from "../components/Button";
import { SocketContext } from "../components/provider/SocketProvider";

const App = () => {
  const router = useRouter();
  const { serverReady } = useContext(SocketContext);
  const [showStatus, setShowStatus] = useState(false);

  function generateRoomId() {
    const roomid = nanoid(ROOM_STRING_SIZE);
    router.push(`/login/${roomid}`);
  }

  useEffect(() => {
    setTimeout(() => {
      if (!serverReady) {
        setShowStatus(true);
      }
      if (serverReady) {
        setShowStatus(false);
      }
    }, 1500);
  }, [serverReady]);

  return (
    <PageLayout>
      <header className="flex flex-col items-center">
        <h1 className="text-6xl">Shatzen</h1>
        <h2 className="text-lg">Scrum Poker</h2>
      </header>

      <Button disabled={!serverReady} className="w-full mt-5" onClick={generateRoomId}>
        Create a Room
      </Button>

      {showStatus && !serverReady && <span className="mt-5">One moment. Waking up the server 😴</span>}
      {showStatus && serverReady && <span className="mt-5">It's Up! Happy Estimating</span>}
    </PageLayout>
  );
};

export default App;
