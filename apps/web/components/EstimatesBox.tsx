import React, { useContext } from "react";
import { SocketContext } from "../providers/SocketProvider";
import { UserCard } from "./UserCard";
import { AnimatePresence, motion } from "framer-motion";

export const EstimatesBox = () => {
  const { users } = useContext(SocketContext);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        animate: {
          width: "auto",
        },
      }}
      exit={{
        opacity: 0,
        transition: {
          delay: 3,
          duration: 5,
        },
      }}
      className="flex flex-wrap items-center justify-center gap-2 "
    >
      <AnimatePresence initial={false}>
        {users.map((user) => {
          return (
            <motion.div
              key={user.id}
              variants={{
                initial: {
                  opacity: 0,
                  y: 10,
                },
                animate: {
                  opacity: 100,
                  y: 0,
                },
              }}
              exit={{ opacity: 0, y: 10 }}
            >
              <UserCard key={user.id} user={user} />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  );
};
