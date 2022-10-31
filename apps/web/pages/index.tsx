import { nanoid } from "nanoid";
import { ROOM_STRING_SIZE, USER_NAME_SIZE } from "../types/constants";
import { SocketContext } from "../components/Provider/SocketProvider";
import { useRouter } from "next/router";
import Button from "../components/Button";
import PageLayout from "../components/PageLayout";
import React, { useContext, useState } from "react";
import Input from "../components/input";
import Head from "next/head";

const App = () => {
  const router = useRouter();
  const { serverReady } = useContext(SocketContext);
  const [roomName, setRoomName] = useState("");

  function generateRoomId() {
    const roomId = nanoid(ROOM_STRING_SIZE);
    router.push(`/login/${roomId}`);
  }

  function goToLogin() {
    router.push(`/login/${roomName.trim()}`);
  }

  function roomInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setRoomName(value);
  }

  return (
    <PageLayout>
      <Head>
        <title>Shätzen</title>
        <meta property="og:title" content="Shätzen" key="title" />
      </Head>
      <header className="flex flex-col items-center">
        <h1 className="text-6xl">Shätzen</h1>
        <h2 className="text-lg">Scrum Poker</h2>
      </header>

      <div className="flex flex-col items-center space-y-5">
        <Button
          disabled={!serverReady}
          className="w-full mt-5"
          onClick={generateRoomId}
        >
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
            disabled={
              !roomName ||
              !roomName.trim() ||
              roomName.length < ROOM_STRING_SIZE
            }
            className="w-32 mt-5"
          >
            Enter Room
          </Button>
        </form>
      </div>
    </PageLayout>
  );
};

export default App;
