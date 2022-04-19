import React, { useContext, useState } from "react";
import UserModal from "../components/StartupModal";
import { SocketContext } from "../components/provider/SocketProvider";
import { useCheckUser } from "../hooks/useCheckForUser";
import { UserPanel } from "../components/UserPanel";
import { RevealBox } from "../components/RevealBox";
import { EstimatesBox } from "../components/EstimatesBox";
import { Nav } from "../components/Nav";

const App = () => {
  const { user, status } = useContext(SocketContext);
  const isExistingUser = useCheckUser(user);
  const [show, setShow] = useState(!isExistingUser);

  // TODO Check user
  if (!user || !status) return "No user or status";

  return (
    <div className="min-h-screen min-w-full bg-white ">
      <UserModal show={show} toggle={() => setShow(false)} />
      <Nav />

      <div className="flex flex-col justify-center">
        <UserPanel />
        <RevealBox />
        <EstimatesBox />
      </div>
    </div>
  );
};

export default App;
