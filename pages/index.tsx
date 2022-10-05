import { nanoid } from "nanoid";
import { ROOM_STRING_SIZE } from "../types/constants";
import { useRouter } from "next/router";
import Link from "next/link";
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
      <h1 className="text-4xl">Shatzen</h1>
      <h2 className="text-lg">Scrum Poker</h2>
      <div>
        <Button onClick={generateRoomId}>Create a Room</Button>
      </div>
    </PageLayout>
  );
};

export default App;
