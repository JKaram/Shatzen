import { AnimatePresence, motion } from "framer-motion";
import { Nav } from "./Nav";
import { useRouter } from "next/router";
import React from "react";
import classNames from "classnames";
import Footer from "./Footer";

type Props = { children: React.ReactNode; className?: string };

export default function PageLayout({ children, className = undefined }: Props) {
  const router = useRouter();

  return (
    <div className="m-auto transition-all text-primary max-w-7xl">
      <Nav />
      <AnimatePresence>
        <motion.div
          animate="animate"
          exit={{ opacity: 0 }}
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
            className={classNames("min-h-[calc(100vh-96px)]  mt-12", className)}
          >
            {children}
          </main>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
