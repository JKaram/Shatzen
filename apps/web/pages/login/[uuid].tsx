import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useSockets } from "../../providers/SocketProvider";
import PageLayout from "../../components/PageLayout";
import Button from "../../components/Button";
import Input from "../../components/input";
import { USER_NAME_SIZE, USER_STRING_MIN_SIZE } from "../../types/constants";
import Head from "next/head";
import CardBuilder from "../../components/CardBuilder";
import { useCardBuilder } from "../../hooks/useCardBuilder";

const Login = () => {
  const router = useRouter();
  const { uuid } = router.query;
  const { setRoomId, userJoin } = useSockets();
  const { selected, setSelected } = useCardBuilder();

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
    <PageLayout className="flex flex-col justify-center">
      <Head>
        <title>Shätzen | Login</title>
        <meta property="og:title" content="Room login" key="title" />
      </Head>
      <div className="flex flex-col items-center p-8 space-y-5 bg-white border-2 border-black rounded-lg shadow-base">
        <span className="text-lg">Enter your name</span>

        <form
          className="flex flex-col w-full mt-5 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            userJoin({ name, ...selected }, sanitizeUuid);
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
        <CardBuilder selected={selected} setSelected={setSelected} />
      </div>
    </PageLayout>
  );
};

export default Login;
