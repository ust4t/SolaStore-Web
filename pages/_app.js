import Head from "next/head";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import AllToaster from "../src/components/AllToaser";
import Preloader from "../src/layout/Preloader";
import ScrollTop from "../src/layout/ScrollTop";
import store from "../src/redux/store";
import { QueryClient, QueryClientProvider } from "react-query";
import { animationCreate, aTagClick } from "../src/utils/utils";
import "../styles/main.css";
import "swiper/css/bundle";
import "../styles/global.css";
import "animate.css";
import "antd/dist/antd.css";
import StoreProvider from "../src/context/StoreProvider";

function MyApp({ Component, pageProps }) {
  const [preloader, setPreloader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      store && setPreloader(false);
    }, 1000);
    setTimeout(() => {
      animationCreate();
    }, 1000);
    aTagClick();
  }, []);

  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <StoreProvider>
        <AllToaster />
        <Head>
          <title>Retro - Minimal eCommerce Redux Template</title>
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
          <Component {...pageProps} />
        </QueryClientProvider>
      </StoreProvider>
    </Provider>
  );
}

export default MyApp;
