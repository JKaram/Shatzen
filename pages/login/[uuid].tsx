import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSockets } from "../../components/provider/SocketProvider";
import PageLayout from "../../components/PageLayout";
import Button from "../../components/Button";
import Input from "../../components/input";

const Login = () => {
  const router = useRouter();
  const { uuid } = router.query;
  const { userJoin } = useSockets();

  const [name, setName] = useState("");

  function updateName(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setName(value);
  }

  const sanitizeUuid = typeof uuid === "string" ? uuid : undefined;

  if (!sanitizeUuid) return "UUID Error";

  return (
    <PageLayout>
      Enter your name
      <form
        onSubmit={(e) => {
          e.preventDefault();
          userJoin(name, sanitizeUuid);
        }}
      >
        <Input onChange={updateName} placeholder="Name" />
        <Button type="submit" disabled={!name}>
          Join Room
        </Button>
      </form>
    </PageLayout>
  );
};

export default Login;
