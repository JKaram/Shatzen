import { nanoid } from "nanoid";
import { ROOM_STRING_SIZE } from "../types/constants";
import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";

const App = () => {
  const router = useRouter();

  function generateRoomId() {
    const roomid = nanoid(ROOM_STRING_SIZE);
    router.push(`/login/${roomid}`);
  }

  return (
    <div className="min-w-full min-h-screen bg-[#e3e3e3] ">
      <h1>Shatzen</h1>
      <h2>Scrum Poker</h2>
      <div>
        <button onClick={generateRoomId}>Create a Room</button>
        <input />
        <Link href="/test">test</Link>
      </div>
    </div>
  );
};

export default App;
