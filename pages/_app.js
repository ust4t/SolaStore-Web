import { useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";
import axios from "axios";
import ym, { YMInitializer } from "react-yandex-metrika";

import AllToaster from "../src/components/AllToaser";
// import ScrollTop from "../src/layout/ScrollTop";
import companySchema from "../public/companySchema.json";
import searchSchema from "../public/searchSchema.json";
import StoreProvider from "../src/context/StoreProvider";
import store from "../src/redux/store";
import {
  GET_MAIN_MENU,
  CREATE_USER_ID,
  SET_WHEEL_DATA,
  SET_COUNTRY,
  CHANGE_LANG,
  SET_WHEEL_ICON,
} from "../src/redux/action/type";
import menuData from "../public/menuData.json";
// import toast from "react-hot-toast";
import { loadState, saveState } from "../src/redux/browser-storage";

import "zuck.js/dist/skins/snapgram.min.css";
import "zuck.js/dist/zuck.min.css";
import "react-input-range/lib/css/index.css";
import "../public/css/bootstrap.min.css";
import "../styles/main.css";
import "swiper/css/bundle";
import "animate.css";
import "antd/dist/antd.css";
import "../styles/global.css";

// const analyticID1 = "UA-73451034-1";
// const analyticID2 = "G-SWHHCJ1EK6";
const analyticID1 = "UA-73451034-1";
const analyticID2 = "AW-359547484";

function MyApp({ Component, pageProps }) {
  const spinStatus = loadState("spinStatus", {
    hasSpinned: false,
    expires: new Date().getTime() + 60 * 60 * 24 * 1000,
  });
  const router = useRouter();
  const queryClient = new QueryClient();

  const fetchMenu = async () => {
    store.dispatch({
      type: GET_MAIN_MENU,
      payload: menuData[router.locale],
    });
    // try {
    //   const { data: menu } = await axios.get(
    //     `/api/getFullMenu?lang=${store.getState().lang.lang}`
    //   );
    //   store.dispatch({
    //     type: GET_MAIN_MENU,
    //     payload: menuData[router.locale].map((item) => ({
    //       ...item,
    //       squareCategoryPictureGuidName:
    //         menu
    //           .map(
    //             (menuItem) =>
    //               menuItem.categoryID === item.categoryID &&
    //               menuItem &&
    //               menuItem.squareCategoryPictureGuidName
    //           )
    //           .filter(Boolean)[0] || item.squareCategoryPictureGuidName,
    //     })),
    //   });
    // } catch (error) {
    //   store.dispatch({
    //     type: GET_MAIN_MENU,
    //     payload: menuData[router.locale],
    //   });
    //   toast.error("Men?? al??n??rken hata olu??tu");
    // }
  };

  const checkUser = async () => {
    const { data } = await axios.get("/api/auth/checkUser");
    store.dispatch({
      type: CREATE_USER_ID,
      payload: { ...data },
    });
  };

  const getWheels = async () => {
    const { data } = await axios.get("/api/advertisement/getWheelsData");
    store.dispatch({
      type: SET_WHEEL_DATA,
      payload: data,
    });
  };

  const handleRouteChange = (url) => {
    if (typeof window !== "undefined") {
      ym("hit", url);
      window.gtag("config", analyticID1, {
        page_path: url,
      });
      window.gtag("config", analyticID2, {
        page_path: url,
      });
    }
  };

  const detectCountry = async () => {
    if (router.locale !== store.getState().lang.lang) {
      router.push(router.asPath, router.asPath, {
        locale: store.getState().lang.lang,
      });
    }
    try {
      const { data } = await axios.get("/api/getLocation");
      store.dispatch({
        type: SET_COUNTRY,
        payload: data.country_code,
      });
      if (
        store.getState().lang.hasChanged &&
        data.continent_code.toLowerCase() === "eu"
      ) {
        router.push(router.asPath, router.asPath, {
          locale: "en",
        });
        store.dispatch({
          type: CHANGE_LANG,
          payload: {
            lang: "en",
            hasChanged: true,
          },
        });
      }
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("routeChangeStart", (url) => {
      ym("hit", url);
    });
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("routeChangeStart", (url) => {
        ym("hit", url);
      });
    };
  }, [router.events]);

  useEffect(() => {
    fetchMenu();
  }, [router.locale]);

  useEffect(() => {
    // if (router.locale !== store.getState().lang.lang) {
    //   router.push(router.asPath, router.asPath, {
    //     locale: store.getState().lang.lang,
    //   });
    // }
    store.dispatch({
      type: SET_WHEEL_ICON,
      payload: false,
    });

    setTimeout(
      () =>
        store.dispatch({
          type: SET_WHEEL_ICON,
          payload: true,
        }),
      30000
    );
    detectCountry();
    if (spinStatus.expires < Date.now())
      saveState("spinStatus", {
        hasSpinned: false,
        expires: new Date().getTime() + 60 * 60 * 24 * 1000,
      });
    getWheels();
    checkUser();
  }, []);

  return (
    <Provider store={store}>
      <Head>
        <title>
          Sola Store | ?????????? ?????????????? ???????????? | Wholesale Women's Clothing
        </title>
        <link rel="dns-prefetch" href="//www.googletagmanager.com/" />
        <link rel="dns-prefetch" href="//mc.yandex.ru/" />
        <link rel="dns-prefetch" href="//connect.facebook.net/" />
        <link rel="dns-prefetch" href="//embed.tawk.to/" />
        <link rel="dns-prefetch" href="//kit.fontawesome.com/" />
        <link
          rel="shortcut icon"
          href="/images/logo/favicon/apple-icon-72x72.jpg"
        />
        <Script
          id="google-tag-manager"
          strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M4BCPX3');`}</Script>
        <meta
          name="description"
          content="Solastore, where you can find the best fashion that you always desired"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="Fashion, Solastore, Trending" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="yandex-verification" content="69119899" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
        <meta property="fb:app_id" content="137952878122881" />
        <meta
          property="og:title"
          content="Sola Store | ?????????? ?????????????? ???????????? | Wholesale Women's Clothing"
        />
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="Sola Store" />
        <meta
          name="google-play-app"
          content="app-id=com.solastore.solastoreapp"
        />
        <meta name="apple-itunes-app" content="app-id=1532399779" />
        <link rel="canonical" href="https://solastore.com.tr/" />
        <meta name="twitter:app:name:iphone" content="Sola Store" />
        <meta name="twitter:app:name:ipad" content="Sola Store" />
        <meta name="twitter:app:id:iphone" content="1532399779" />
        <meta name="twitter:app:id:ipad" content="1532399779" />
        <meta
          name="twitter:app:url:iphone"
          content="https://apps.apple.com/tr/app/sola-store/id1532399779"
        />
        <meta
          name="twitter:app:url:ipad"
          content="https://apps.apple.com/tr/app/sola-store/id1532399779"
        />
        <meta name="twitter:app:name:googleplay" content="Sola Store" />
        <meta
          name="twitter:app:id:googleplay"
          content="com.solastore.solastoreapp"
        />
        <meta
          name="twitter:app:url:googleplay"
          content="https://play.google.com/store/apps/details?id=com.solastore.solastoreapp"
        />
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/images/logo/favicon/apple-icon-57x57.jpg"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/images/logo/favicon/apple-icon-60x60.jpg"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/images/logo/favicon/apple-icon-72x72.jpg"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/images/logo/favicon/apple-icon-76x76.jpg"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/images/logo/favicon/apple-icon-114x114.jpg"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/images/logo/favicon/apple-icon-120x120.jpg"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/images/logo/favicon/apple-icon-144x144.jpg"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/images/logo/favicon/apple-icon-152x152.jpg"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/logo/favicon/apple-icon-180x180.jpg"
        />
        <link
          rel="icon"
          type="image/jpeg"
          sizes="192x192"
          href="/images/logo/favicon/android-icon-192x192.jpg"
        />
        <link
          rel="icon"
          type="image/jpeg"
          sizes="32x32"
          href="/images/logo/favicon/favicon-32x32.jpg"
        />
        <link
          rel="icon"
          type="image/jpeg"
          sizes="96x96"
          href="/images/logo/favicon/favicon-96x96.jpg"
        />
        <link
          rel="icon"
          type="image/jpeg"
          sizes="16x16"
          href="/images/logo/favicon/favicon-16x16.jpg"
        />
        <link rel="manifest" href="/images/logo/favicon/manifest.json" />
        <meta
          name="msapplication-TileImage"
          content="/images/logo/favicon/ms-icon-144x144.jpg"
        />
        <script
          id="companySchema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(companySchema),
          }}
        />
        <script
          id="searchSchema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(searchSchema),
          }}
        />
      </Head>
      <AllToaster />
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          {/* <ScrollTop /> */}
          <Component {...pageProps} />
        </StoreProvider>
      </QueryClientProvider>
      <Script
        src="https://kit.fontawesome.com/9134714f20.js"
        crossOrigin="anonymous"
        strategy="beforeInteractive"
      />
      <YMInitializer
        accounts={[69119899]}
        options={{
          accurateTrackBounce: true,
          webvisor: true,
          defer: true,
          clickmap: true,
          trackHash: true,
          trackLinks: true,
        }}
        version="2"
      />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${analyticID1}`}
        strategy="afterInteractive"
      />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${analyticID2}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${analyticID2}'); 
          `}
      </Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${analyticID1}'); 
          `}
      </Script>
      <Script id="facebook-analytics" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '137952878122881');
      fbq('track', 'PageView');`}
      </Script>
      <Script id="live-chat-tawk" strategy="afterInteractive">
        {`
        var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
        (function(){
        var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
        s1.async=true;
        s1.src='https://embed.tawk.to/61534fca25797d7a890145c2/1fgmmvbk8';
        s1.charset='UTF-8';
        s1.setAttribute('crossorigin','*');
        s0.parentNode.insertBefore(s1,s0);
        })();
        `}
      </Script>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-M4BCPX3"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}></iframe>
      </noscript>
    </Provider>
  );
}

export default MyApp;
