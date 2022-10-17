import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const useCheckUser = (): [boolean, "loading" | "success", () => void] => {
  const [cookies] = useCookies(["name"]);
  const [status, setStatus] = useState<"loading" | "success">("loading");
  const [isUser, setIsUser] = useState(true);

  const changeName = () => {
    setIsUser(false);
  };

  useEffect(() => {
    if (cookies.name) {
      setIsUser(true);
      setStatus("success");
    } else {
      setStatus("success");
      setIsUser(false);
    }
  }, []);

  return [isUser, status, changeName];
};
