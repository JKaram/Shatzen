import "../styles/globals.css";
import SocketProvider from "../components/provider/SocketProvider";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <SocketProvider>
      <Component {...pageProps} />
    </SocketProvider>
  );
}

export default MyApp;
