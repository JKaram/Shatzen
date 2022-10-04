import { nanoid } from "nanoid";
import { ROOM_STRING_SIZE } from "../types/constants";
import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";
import PageLayout from "../components/PageLayout";

const App = () => {
  const router = useRouter();

  function generateRoomId() {
    const roomid = nanoid(ROOM_STRING_SIZE);
    router.push(`/login/${roomid}`);
  }

  return (
    <PageLayout>
      <h1>Shatzen</h1>
      <h2>Scrum Poker</h2>
      <div>
        <button onClick={generateRoomId}>Create a Room</button>
        <input />
        <Link href="/test">test</Link>
      </div>
    </PageLayout>
  );
};

export default App;
