import { motion } from "framer-motion";
import { Nav } from "./Nav";
import Footer from "./Footer";
import React from "react";
import { useRouter } from "next/router";

type Props = { children: React.ReactNode };

export default function PageLayout({ children }: Props) {
  const router = useRouter();

  return (
    <div className="max-w-md min-h-screen m-auto overflow-hidden transition-all md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl">
      <Nav />
      <motion.div
        key={router.route}
        initial="initial"
        animate="animate"
        variants={{
          initial: {
            opacity: 1,
            x: -100,
          },
          animate: {
            opacity: 1,
            x: 0,
          },
        }}
        exit={{ opacity: 0, x: 100 }}
      >
        <main className="flex flex-col items-center pt-[3rem] h-[calc(100vh-140px)]">{children}</main>
      </motion.div>
      <Footer />
    </div>
  );
}
