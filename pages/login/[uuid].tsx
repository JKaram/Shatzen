import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSockets } from "../../components/provider/SocketProvider";
import PageLayout from "../../components/PageLayout";

const Login = () => {
  const router = useRouter();
  const { uuid } = router.query;
  const { userJoin } = useSockets();

  const [name, setName] = useState("");

  function updateName(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setName(value);
  }

  const sanitizeUuid = typeof uuid === "string" ? uuid : "Uh oh";

  return (
    <PageLayout>
      Login {uuid} {name}
      <input onChange={updateName} />
      <button
        onClick={() => {
          userJoin(name, sanitizeUuid);
          router.push(`/room/${sanitizeUuid}`);
        }}
      >
        Join Room
      </button>
    </PageLayout>
  );
};

export default Login;
