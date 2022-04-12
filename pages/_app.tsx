import "../styles/globals.css";
import type { AppProps } from "next/app";
import SocketProvider from "../components/provider/SocketProvider";

function MyApp({ Component, pageProps }: any) {
  return (
    <SocketProvider>
      <Component {...pageProps} />
    </SocketProvider>
  );
}

export default MyApp;
