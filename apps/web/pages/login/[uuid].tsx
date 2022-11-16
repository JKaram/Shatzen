import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useSockets } from "../../components/provider/SocketProvider";
import PageLayout from "../../components/PageLayout";
import Button from "../../components/Button";
import Input from "../../components/input";
import { USER_NAME_SIZE, USER_STRING_MIN_SIZE } from "../../types/constants";
import Head from "next/head";

const Login = () => {
  const router = useRouter();
  const { uuid } = router.query;
  const { setRoomId, userJoin } = useSockets();

  useMemo(() => {
    setRoomId(uuid as string);
  }, [uuid]);

  const [name, setName] = useState("");

  function updateName(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setName(value);
  }

  const sanitizeUuid = typeof uuid === "string" ? uuid : undefined;

  if (!sanitizeUuid) return "UUID Error!";

  return (
    <PageLayout>
      <Head>
        <title>Shätzen | Login</title>
        <meta property="og:title" content="Room login" key="title" />
      </Head>
      <div className="flex flex-col bg-white items-center space-y-5 border-2 border-black p-8 rounded-lg shadow-base">
        <span className="text-lg">Enter your name</span>

        <form
          className="flex flex-col w-full mt-5 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            userJoin(name, sanitizeUuid);
          }}
        >
          <Input
            autoFocus
            onChange={updateName}
            placeholder="Name"
            maxLength={USER_NAME_SIZE}
          />
          <Button
            className="w-32 mt-5"
            type="submit"
            disabled={
              !name || !name.trim() || name.length < USER_STRING_MIN_SIZE
            }
          >
            Join Room
          </Button>
        </form>
      </div>
    </PageLayout>
  );
};

export default Login;
