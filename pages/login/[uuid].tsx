import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSockets } from "../../components/provider/SocketProvider";

const Login = () => {
  const router = useRouter();
  const { uuid } = router.query;
  const { userJoin } = useSockets();

  const [name, setName] = useState("");

  const sanitizeUuid = typeof uuid === "string" ? uuid : "Uh oh";

  return (
    <div>
      Login {uuid} {name}
      <input onChange={(e) => setName(e.target.value)} />
      <button
        onClick={() => {
          userJoin(name, sanitizeUuid);
          router.push(`/room/${sanitizeUuid}`);
        }}
      >
        Join Room
      </button>
    </div>
  );
};

export default Login;
