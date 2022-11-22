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
    <PageLayout className="flex flex-col items-center align-middle md:flex-row md:justify-between item">
      <Head>
        <title>Shätzen</title>
        <meta property="og:title" content="Shätzen" key="title" />
      </Head>

      <div className="flex flex-col flex-grow justify-center">
        <div className="mt-2">
          <h2 className="font-bold text-5xl transition-all">
            Scrum Poker <br /> made <TextAnimation />
          </h2>

          <span className="text-lg">A free tool. No sign up required.</span>
        </div>

        <ul className="flex flex-col gap-5 mt-4 w-full justify-around">
          {steps.map((step) => (
            <ListItem
              label={step.label}
              icon={step.icon}
              description={step.description}
            />
          ))}
        </ul>
      </div>

      <div className="flex flex-col flex-grow justify-center bg-white items-center gap-5 border-2 border-black p-8 rounded-lg shadow-base">
        <Button className="w-full h-16  bg-amber-200" onClick={generateRoomId}>
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
      </div>
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
      <div className="flex flex-col leading-3 ml-2">
        <h1 className="font-bold text-lg">{props.label}</h1>
        <span className="text-sm">{props.description}</span>
      </div>
    </li>
  );
};
