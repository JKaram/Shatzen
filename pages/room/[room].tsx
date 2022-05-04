import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSockets } from "../../components/provider/SocketProvider";
import { Nav } from "../../components/Nav";
import { UserPanel } from "../../components/UserPanel";
import { EstimatesBox } from "../../components/EstimatesBox";
import { RevealBox } from "../../components/RevealBox";
import UserModal from "../../components/StartupModal";

const Room = () => {
  const router = useRouter();
  const { room } = router.query;
  const [show, setShow] = useState(true);

  const { addUser } = useSockets();

  useEffect(() => {}, []);

  if (!room) return <p>Loading...</p>;

  return (
    <div>
      <Nav />
      <UserModal room={`${room}`} show={show} toggle={() => setShow(false)} />

      <div className="flex flex-col justify-center">
        <UserPanel />
        <RevealBox />
        <EstimatesBox />
      </div>
    </div>
  );
};

export default Room;
