import { nanoid } from "nanoid";
import { ROOM_STRING_SIZE, USER_NAME_SIZE } from "../types/constants";
import { useRouter } from "next/router";
import Button from "../components/Button";
import PageLayout from "../components/PageLayout";
import React, { useState } from "react";
import Input from "../components/input";
import Head from "next/head";
import TextAnimation from "../components/TextAnimation";

const App = () => {
  const router = useRouter();
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

      <h2 className="font-bold text-4xl">
        <br></br> Scrum Poker made <TextAnimation />
      </h2>

      <span className="leading-loose text-center">
        Customize the way you estimate that works best
      </span>

      <div className="flex flex-col bg-white items-center space-y-5 border-2 border-black p-4 rounded-lg shadow-base">
        <Button className="w-full mt-5" onClick={generateRoomId}>
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
