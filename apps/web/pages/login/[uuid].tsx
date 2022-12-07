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
import useLocalStorage from "../../hooks/useLocalStorage";
import { UserStorage } from "../../types/aliases";
import { Spacer } from "../../components/Spacer";

const Login = () => {
  const router = useRouter();
  const { uuid } = router.query;
  const { setRoomId, userJoin } = useSockets();
  const { selected, setSelected } = useCardBuilder();
  const [userStorage] = useLocalStorage<UserStorage | undefined>(
    "user",
    undefined
  );

  useMemo(() => {
    setRoomId(uuid as string);
  }, [uuid]);

  const [name, setName] = useState(userStorage?.name || "");

  function updateName(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setName(value);
  }

  const sanitizeUuid = typeof uuid === "string" ? uuid : undefined;

  if (!sanitizeUuid) return "UUID Error!";

  return (
    <PageLayout className="max-w-lg m-auto">
      <Head>
        <title>Shätzen | Login</title>
        <meta property="og:title" content="Room login" key="title" />
      </Head>
      <Spacer />
      <h1 className="text-3xl font-bold text-center">Join Room</h1>
      <p className="text-center text-gray-500">
        Pick a name and personalize your card
      </p>
      <Spacer size="medium" />
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          userJoin(
            { name, pattern: selected.pattern, colour: selected.colour },
            sanitizeUuid
          );
        }}
      >
        <Input
          icon="UserCircleIcon"
          label="Name"
          autoFocus
          value={name}
          onChange={updateName}
          placeholder="Bono"
          maxLength={USER_NAME_SIZE}
          className="w-full"
        />
        <Spacer size="small" />
        <CardBuilder selected={selected} setSelected={setSelected} />
        <Spacer size="large" />

        <Button
          className="w-full h-16 text-2xl font-bold bg-blue-300 hover:bg-blue-400 md:text-3xl lg:text-4xl"
          type="submit"
          disabled={!name || !name.trim() || name.length < USER_STRING_MIN_SIZE}
        >
          Join Room
        </Button>
      </form>
    </PageLayout>
  );
};

export default Login;
