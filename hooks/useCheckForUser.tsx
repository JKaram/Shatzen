import { useEffect, useState } from "react";
import { User } from "../types/aliases";

// TODO Keep name locally

export const useCheckUser = (user: User | undefined) => {
  const [userExsits, setUserExsits] = useState(!!user?.name);

  useEffect(() => {
    if (userExsits) {
      setUserExsits(true);
    } else {
      setUserExsits(false);
    }
  }, [userExsits]);

  return userExsits;
};
