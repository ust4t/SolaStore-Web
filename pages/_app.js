import { useEffect, useState } from "react";
import Head from "next/head";
import { PersistGate } from "redux-persist/integration/react";
import AllToaster from "../src/components/AllToaser";
import Preloader from "../src/layout/Preloader";
import ScrollTop from "../src/layout/ScrollTop";
import { wrapper } from "../src/redux/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { animationCreate, aTagClick } from "../src/utils/utils";
import "../styles/main.css";
import "swiper/css/bundle";
import "animate.css";
import "antd/dist/antd.css";
import StoreProvider from "../src/context/StoreProvider";
import "../styles/global.css";
import { useStore } from "react-redux";

function MyApp({ Component, pageProps }) {
  const store = useStore((state) => state);
  const queryClient = new QueryClient();
  const [preloader, setPreloader] = useState(true);
  const dispatch = store.dispatch;
  useEffect(() => {
    setTimeout(() => {
      store && setPreloader(false);
    }, 1000);
    setTimeout(() => {
      animationCreate();
    }, 1000);
    aTagClick();
  }, []);

  return (
    <PersistGate persistor={store.__persistor} loading={<Preloader />}>
      <AllToaster />
      <Head>
        <title>SolaStore</title>
        <meta name="description" content />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="manifest" href="site.webmanifest" />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/img/logo/favicon.png"
        />
      </Head>
      {preloader ? <Preloader /> : <ScrollTop />}
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      </QueryClientProvider>
    </PersistGate>
  );
}

export default wrapper.withRedux(MyApp);
