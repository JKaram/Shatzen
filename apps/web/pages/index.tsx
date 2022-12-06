import { nanoid } from "nanoid";
import { ROOM_STRING_SIZE, USER_NAME_SIZE } from "../types/constants";
import { useRouter } from "next/router";
import Button from "../components/Button";
import PageLayout from "../components/PageLayout";
import React, { useState } from "react";
import Input from "../components/input";
import Head from "next/head";
import TextAnimation from "../components/TextAnimation";
import { PlusIcon, ShareIcon, StarIcon } from "@heroicons/react/outline";
import Container from "../components/Container";

const iconStyle = "h-10 w-10";

const steps = [
  {
    label: "Create",
    icon: <PlusIcon className={iconStyle} />,
    description: "Create a room and invite your team.",
  },
  {
    label: "Share",
    icon: <ShareIcon className={iconStyle} />,
    description: "Send the link to your team.",
  },
  {
    label: "Vote",
    icon: <StarIcon className={iconStyle} />,
    description: "Start Estimating, in real time.",
  },
];

const App = () => {
  const router = useRouter();
  const [roomName, setRoomName] = useState("");

  function generateRoomId() {
    const roomId = nanoid(ROOM_STRING_SIZE);
    router.push(`/login/${roomId}`);
  }

  function goToLogin() {
    router.push(`/login/${roomName.trim()}`);
  }

  function roomInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setRoomName(value);
  }

  return (
    <PageLayout className="flex flex-col">
      <Head>
        <title>Shätzen</title>
        <meta property="og:title" content="Shätzen" key="title" />
      </Head>

      <div className="flex flex-col">
        <div className="mt-2">
          <h2 className="text-5xl font-bold transition-all">
            Scrum Poker <br /> made <TextAnimation />
          </h2>

          <span className="text-lg">A free tool. No sign up required.</span>
        </div>

        <ul className="flex flex-col gap-5">
          {steps.map((step) => (
            <ListItem
              key={step.label}
              label={step.label}
              icon={step.icon}
              description={step.description}
            />
          ))}
        </ul>
      </div>

      <Container className="flex flex-col items-center gap-4">
        <Button
          className="h-16 font-bold w-72 bg-amber-300 "
          onClick={generateRoomId}
        >
          Create a Room
        </Button>
        <span>Or</span>
        <form
          className="flex flex-col"
          onSubmit={(e) => {
            e.preventDefault();
            goToLogin();
          }}
        >
          <Input
            onChange={roomInput}
            minLength={ROOM_STRING_SIZE}
            maxLength={USER_NAME_SIZE}
            placeholder="Enter a room name"
          />
          <Button
            type="submit"
            disabled={
              !roomName ||
              !roomName.trim() ||
              roomName.length < ROOM_STRING_SIZE
            }
            className="w-32 mt-5"
          >
            Enter Room
          </Button>
        </form>
      </Container>
    </PageLayout>
  );
};

export default App;

export const ListItem = (props: {
  label: string;
  icon: any;
  description: string;
}) => {
  return (
    <li className="flex items-center">
      {props.icon}
      <div className="flex flex-col ml-2 leading-3">
        <h1 className="text-lg font-bold">{props.label}</h1>
        <span className="text-sm">{props.description}</span>
      </div>
    </li>
  );
};
