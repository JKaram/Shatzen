import { motion } from "framer-motion";
import { Nav } from "./Nav";
import { useRouter } from "next/router";
import React from "react";
import classNames from "classnames";
import Footer from "./Footer";

type Props = { children: React.ReactNode; className?: string };

export default function PageLayout({ children, className = undefined }: Props) {
  const router = useRouter();

  return (
    <div
      className={classNames(
        "max-w-md text-primary min-h-screen m-auto overflow-hidden transition-all md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl"
      )}
    >
      <Nav />
      <motion.div
        animate="animate"
        exit={{ opacity: 0, x: 100 }}
        initial="initial"
        key={router.route}
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
      >
        <main
          className={classNames(
            "px-2 h-[calc(100vh-96px)] mt-[44px]",
            className
          )}
        >
          {children}
        </main>
      </motion.div>
      <Footer />
    </div>
  );
}
