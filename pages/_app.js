import Head from "next/head";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import AllToaster from "../src/components/AllToaser";
import Preloader from "../src/layout/Preloader";
import ScrollTop from "../src/layout/ScrollTop";
import store from "../src/redux/store";
import { animationCreate, aTagClick } from "../src/utils/utils";
import "../styles/main.css";
import "../styles/global.css";
import "antd/dist/antd.css";
import "animate.css";

function MyApp({ Component, pageProps }) {
  const [preloader, setPreloader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      store && setPreloader(false);
    }, 2000);
    setTimeout(() => {
      animationCreate();
    }, 2000);
    aTagClick();
  }, []);
  return (
    <Provider store={store}>
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
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
