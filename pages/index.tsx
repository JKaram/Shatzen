import { nanoid } from "nanoid";
import { ROOM_STRING_SIZE, USER_NAME_SIZE } from "../types/constants";
import { SocketContext } from "../components/provider/SocketProvider";
import { useRouter } from "next/router";
import Button from "../components/Button";
import PageLayout from "../components/PageLayout";
import React, { useContext, useEffect, useState } from "react";
import Input from "../components/input";

const App = () => {
  const router = useRouter();
  const { serverReady } = useContext(SocketContext);
  const [showStatus, setShowStatus] = useState(false);
  const [roomName, setRoomName] = useState("");

  function generateRoomId() {
    const roomid = nanoid(ROOM_STRING_SIZE);
    router.push(`/login/${roomid}`);
  }

  function goToLogin() {
    router.push(`/login/${roomName.trim()}`);
  }

  function roomInput(e) {
    const value = e.target.value;
    setRoomName(value);
  }

  useEffect(() => {
    // TODO: Hacky solution. Look for better alternative
    if (!serverReady) {
      setTimeout(() => {
        setShowStatus(true);
      }, 2000);
    }
    if (serverReady) {
      setTimeout(() => {
        setShowStatus(false);
      }, 2000);
    }
  }, [serverReady]);

  return (
    <PageLayout>
      <header className="flex flex-col items-center">
        <h1 className="text-6xl">Shatzen</h1>
        <h2 className="text-lg">Scrum Poker</h2>
      </header>

      <div className="flex flex-col items-center space-y-5">
        <Button disabled={!serverReady} className="w-full mt-5" onClick={generateRoomId}>
          Create a Room
        </Button>

        <span>Or</span>

        <form
          className="flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            goToLogin();
          }}
        >
          <Input
            onChange={roomInput}
            minLength={ROOM_STRING_SIZE}
            maxLength={USER_NAME_SIZE}
            placeholder="Enter a room name"
          />
          <Button
            type="submit"
            disabled={!roomName || !roomName.trim() || roomName.length < ROOM_STRING_SIZE}
            className="w-32 mt-5"
          >
            Enter Room
          </Button>
        </form>
      </div>

      {showStatus && !serverReady && <span className="mt-5">One moment. Waking up the server 😴</span>}
      {showStatus && serverReady && <span className="mt-5">Server is ready! Happy Estimating</span>}
    </PageLayout>
  );
};

export default App;
