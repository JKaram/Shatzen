import "../styles/globals.css";
import { CookiesProvider } from "react-cookie";
import SocketProvider from "../components/provider/SocketProvider";
import { motion } from "framer-motion";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <CookiesProvider>
      <SocketProvider>
        <motion.div
          key={router.route}
          initial="initial"
          animate="animate"
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
          exit={{ opacity: 0, x: 100 }}
        >
          <Component {...pageProps} />
        </motion.div>
      </SocketProvider>
    </CookiesProvider>
  );
}

export default MyApp;
