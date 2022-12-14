import { motion } from "framer-motion";
import { Nav } from "./Nav";
import { useRouter } from "next/router";
import React from "react";
import classNames from "classnames";
import Footer from "./Footer";
import { pageTransitionVariants } from "../utils/motion";

type Props = { children: React.ReactNode; className?: string };

export default function PageLayout({ children, className = undefined }: Props) {
  const router = useRouter();

  return (
    <div className="m-auto transition-all text-primary max-w-7xl">
      <Nav />
      <motion.div
        animate="animate"
        initial="initial"
        key={router.route}
        variants={pageTransitionVariants}
      >
        <main
          className={classNames(
            "min-h-[calc(100vh-96px)] px-2  mt-12",
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
