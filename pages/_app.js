import { useEffect, useState } from "react";
import Head from "next/head";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";
import axios from "axios";

import AllToaster from "../src/components/AllToaser";
import Preloader from "../src/layout/Preloader";
import ScrollTop from "../src/layout/ScrollTop";
import { aTagClick } from "../src/utils/utils";
import StoreProvider from "../src/context/StoreProvider";
import store from "../src/redux/store";
import { GET_MAIN_MENU } from "../src/redux/action/type";
import "../styles/main.css";
import "swiper/css/bundle";
import "animate.css";
import "antd/dist/antd.css";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const queryClient = new QueryClient();
  const [preloader, setPreloader] = useState(true);

  const fetchMenu = async () => {
    setPreloader(true);
    try {
      const { data: menu } = await axios.get(
        `/api/getFullMenu?lang=${store.getState().lang}`
      );
      store.dispatch({
        type: GET_MAIN_MENU,
        payload: menu,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setPreloader(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [router.locale]);

  useEffect(() => {
    if (router.locale !== store.getState().lang) {
      router.push(router.asPath, router.asPath, {
        locale: store.getState().lang,
      });
    }

    aTagClick();
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <title>SolaStore</title>
        <meta name="description" content />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/img/logo/favicon/favicon.ico"
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/img/logo/favicon/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/img/logo/favicon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/img/logo/favicon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/img/logo/favicon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/img/logo/favicon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/img/logo/favicon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/img/logo/favicon/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/img/logo/favicon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/img/logo/favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/img/logo/favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/img/logo/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/img/logo/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/img/logo/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/img/logo/favicon/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/img/logo/favicon/ms-icon-144x144.png"
        />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <AllToaster />
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          {preloader ? <Preloader /> : <ScrollTop />}
          <Component {...pageProps} />
        </StoreProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;
