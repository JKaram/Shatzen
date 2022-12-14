import { nanoid } from "nanoid";
import { ROOM_STRING_SIZE } from "../types/constants";
import { useRouter } from "next/router";
import Button from "../components/Button";
import PageLayout from "../components/PageLayout";
import React from "react";
import Head from "next/head";
import TextAnimation from "../components/TextAnimation";
import { Spacer } from "../components/Spacer";
import { StepItem } from "../components/StepItem";

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

      <div className="w-[350px] heroDropShadow sm:w-[450px] md:w-[500px] md:border-black  xl:w-[800px] relative rounded-lg m-auto transition-all">
        <span className="absolute z-10 text-2xl text-black transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          Placeholder for video
        </span>
        <video
          className="blur-sm"
          height="100%"
          width="100%"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/hero_vid.mp4" type="video/mp4" />
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

        <ul className="flex flex-col gap-5 overflow-hidden xl:flex-row">
          {steps.map((step, index) => (
            <StepItem key={step.label} index={index} {...step} />
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

const steps = [
  {
    label: "Create",
    icon: "PlusIcon",
    description: "Create a room and invite your team.",
  },
  {
    label: "Share",
    icon: "ShareIcon",
    description: "Send the link to your team.",
  },
  {
    label: "Vote",
    icon: "StarIcon",
    description: "Start Estimating, in real time.",
  },
];
