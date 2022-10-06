import { nanoid } from "nanoid";
import { ROOM_STRING_SIZE } from "../types/constants";
import { useRouter } from "next/router";
import React from "react";
import PageLayout from "../components/PageLayout";
import Button from "../components/Button";

const App = () => {
  const router = useRouter();

  function generateRoomId() {
    const roomid = nanoid(ROOM_STRING_SIZE);
    router.push(`/login/${roomid}`);
  }

  return (
    <PageLayout>
      <header className="flex flex-col items-center">
        <h1 className="text-6xl">Shatzen</h1>
        <h2 className="text-lg">Scrum Poker</h2>
      </header>

      <Button className="mt-5" onClick={generateRoomId}>
        Create a Room
      </Button>
    </PageLayout>
  );
};

export default App;
