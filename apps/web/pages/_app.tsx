import "../styles/globals.css";
import SocketProvider, {
  useSockets,
} from "../components/provider/SocketProvider";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
      <Component {...pageProps} />
    </SocketProvider>
  );
}

export default MyApp;
