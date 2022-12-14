import "../styles/globals.css";
import SocketProvider, { useSockets } from "../providers/SocketProvider";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ModalProvider } from "../providers/ModalProvider";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { removeUser } = useSockets();

  useEffect(() => {
    router.beforePopState(() => {
      if (router.asPath.includes("/room/")) {
        removeUser();
      }
      return true;
    });

    return () => {
      router.beforePopState(() => true);
    };
  }, [router]);

  return (
    <SocketProvider>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </SocketProvider>
  );
}

export default MyApp;
