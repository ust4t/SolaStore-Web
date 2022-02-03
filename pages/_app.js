import { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";
import axios from "axios";
import toast from "react-hot-toast";

import AllToaster from "../src/components/AllToaser";
import ScrollTop from "../src/layout/ScrollTop";
import StoreProvider from "../src/context/StoreProvider";
import store from "../src/redux/store";
import { GET_MAIN_MENU, CREATE_USER_ID } from "../src/redux/action/type";
import "react-input-range/lib/css/index.css";
import "../public/css/bootstrap.min.css";
import "../styles/main.css";
import "swiper/css/bundle";
import "animate.css";
import "antd/dist/antd.css";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const queryClient = new QueryClient();

  const fetchMenu = async () => {
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
      toast.error("Menü alınırken hata oluştu");
    }
  };

  const fetchUser = async () => {
    if (
      (store.getState().auth.uid &&
        store.getState().auth.state === "user_registered") ||
      store.getState().auth.state === "guest"
    )
      return;

    try {
      const { data } = await axios.get("/api/auth/createUserId");
      store.dispatch({
        type: CREATE_USER_ID,
        payload: {
          uid: data.data,
          state: "guest",
          name: "Guest",
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Kullanıcı oluşturulurken bir hata oluştu");
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [router.locale]);

  useEffect(() => {
    fetchUser();
    if (router.locale !== store.getState().lang) {
      router.push(router.asPath, router.asPath, {
        locale: store.getState().lang,
      });
    }
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <title>SolaStore</title>
        <meta
          name="description"
          content="Solastore where you can find the best fashion that you always desired"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="shortcut icon"
          type="image/x-icon"
          href="/img/logo/favicon/favicon.ico"
        />
        <link rel="manifest" href="/img/logo/favicon/manifest.json" />
      </Head>
      <AllToaster />
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <ScrollTop />
          <Component {...pageProps} />
        </StoreProvider>
      </QueryClientProvider>
      <Script
        src="https://kit.fontawesome.com/9134714f20.js"
        crossorigin="anonymous"
        strategy="beforeInteractive"
      />
      {/* <Script
        id="yandex-metrika-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(e,t,a,n,c,m,r){e.ym=e.ym||function(){(e.ym.a=e.ym.a||[]).push(arguments)},e.ym.l=1*new Date,m=t.createElement(a),r=t.getElementsByTagName(a)[0],m.async=1,m.src="https://mc.yandex.ru/metrika/tag.js",r.parentNode.insertBefore(m,r)}(window,document,"script"),ym(69119899,"init",{clickmap:!0,trackLinks:!0,accurateTrackBounce:!0,webvisor:!0});`,
        }}
      /> */}
    </Provider>
  );
}

export default MyApp;
