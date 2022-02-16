import { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";
import axios from "axios";
// import toast from "react-hot-toast";

import AllToaster from "../src/components/AllToaser";
import ScrollTop from "../src/layout/ScrollTop";
import StoreProvider from "../src/context/StoreProvider";
import store from "../src/redux/store";
import { GET_MAIN_MENU, CREATE_USER_ID } from "../src/redux/action/type";
import menuData from "../public/menuData.json";

import "zuck.js/dist/skins/snapgram.min.css";
import "zuck.js/dist/zuck.min.css";
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

  const checkUser = async () => {
    const { data } = await axios.get("/api/auth/checkUser");
    store.dispatch({
      type: CREATE_USER_ID,
      payload: { ...data },
    });
  };

  const handleRouteChange = (url) => {
    if (typeof window !== "undefined") {
      window.gtag("config", "UA-73451034-1", {
        page_path: url,
      });
    }
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    fetchMenu();
  }, [router.locale]);

  useEffect(() => {
    checkUser();
    if (router.locale !== store.getState().lang) {
      router.push(router.asPath, router.asPath, {
        locale: store.getState().lang,
      });
    }
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <title>
          Sola Store | Оптом Женская одежда | Wholesale Women's Clothing
        </title>
        <meta
          name="description"
          content="Solastore, where you can find the best fashion that you always desired"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="Fashion, Solastore, Trending" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/images/logo/favicon/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/images/logo/favicon/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/images/logo/favicon/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/images/logo/favicon/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/images/logo/favicon/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/images/logo/favicon/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/images/logo/favicon/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/images/logo/favicon/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/logo/favicon/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/images/logo/favicon/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/logo/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/images/logo/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/logo/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/images/logo/favicon/manifest.json" />
        <meta
          name="msapplication-TileImage"
          content="/images/logo/favicon/ms-icon-144x144.png"
        />
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
        crossOrigin="anonymous"
        strategy="beforeInteractive"
      />
      <Script
        id="yandex-metrika-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `!function(e,t,a,n,c,m,r){e.ym=e.ym||function(){(e.ym.a=e.ym.a||[]).push(arguments)},e.ym.l=1*new Date,m=t.createElement(a),r=t.getElementsByTagName(a)[0],m.async=1,m.src="https://mc.yandex.ru/metrika/tag.js",r.parentNode.insertBefore(m,r)}(window,document,"script"),ym(69119899,"init",{clickmap:!0,trackLinks:!0,accurateTrackBounce:!0,webvisor:!0});`,
        }}
      />
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=UA-73451034-1"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-73451034-1', { page_path: window.location.pathname }); 
          `}
      </Script>
    </Provider>
  );
}

export default MyApp;
