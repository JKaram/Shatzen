import "../styles/globals.css";
import { CookiesProvider } from "react-cookie";
import AppProvider from "../components/provider/AppProvider";
import SocketProvider from "../components/provider/SocketProvider";
// import type { AppProps } from "next/app";

// TODO figure out AppProps instead of any
function MyApp({ Component, pageProps }: any) {
  return (
    <CookiesProvider>
      <AppProvider>
        <SocketProvider>
          <Component {...pageProps} />
        </SocketProvider>
      </AppProvider>
    </CookiesProvider>
  );
}

export default MyApp;
