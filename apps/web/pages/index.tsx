import { nanoid } from "nanoid";
import { ROOM_STRING_SIZE } from "../types/constants";
import { useRouter } from "next/router";
import Button from "../components/Button";
import PageLayout from "../components/PageLayout";
import React from "react";
import Head from "next/head";
import TextAnimation from "../components/TextAnimation";
import { PlusIcon, ShareIcon, StarIcon } from "@heroicons/react/outline";
import { Spacer } from "../components/Spacer";

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

  function generateRoomId() {
    const roomId = nanoid(ROOM_STRING_SIZE);
    router.push(`/login/${roomId}`);
  }

  return (
    <PageLayout className="flex flex-col transition-all xl:flex-row-reverse xl:items-center">
      <Head>
        <title>Shätzen</title>
        <meta property="og:title" content="Shätzen" key="title" />
      </Head>

      <div className="w-[350px] sm:w-[450px] md:w-[500px] md:border-black lg:w-[700px] xl:w-[800px] relative rounded-lg m-auto overflow-hidden transition-all">
        <span className="absolute text-2xl text-white">
          Mind Blowing video coming soon!
        </span>
        <video height="100%" width="100%" autoPlay loop muted playsInline>
          <source src="/mov_bbb.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="p-2">
        <div>
          <h1 className="text-5xl font-bold lg:text-6xl ">
            Scrum Poker made <TextAnimation />
          </h1>
          <span className="text-2xl md:text-3xl lg:text-4xl">
            A free tool. No sign up required.
          </span>
        </div>
        <Spacer size="small" />

        <ul className="flex flex-col gap-5 xl:flex-row">
          {steps.map((step) => (
            <ListItem
              key={step.label}
              label={step.label}
              icon={step.icon}
              description={step.description}
            />
          ))}
        </ul>
        <Spacer size="large" />
        <Button
          className="w-full h-16 text-2xl font-bold bg-amber-300 hover:bg-amber-200 md:text-3xl lg:text-4xl xl:w-1/2"
          onClick={generateRoomId}
        >
          Create a Room
        </Button>
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
    <li className="flex items-center xl:items-start">
      {props.icon}
      <div className="flex flex-col ml-2 leading-3">
        <h1 className="text-2xl font-bold">{props.label}</h1>
        <span className="text-sm md:text-lg">{props.description}</span>
      </div>
    </li>
  );
};
