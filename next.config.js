const nextTranslate = require("next-translate");

const main_headers = [
  {
    key: "Cache-Control",
    value: "public, s-maxage=15, stale-while-revalidate=59",
  },
];

module.exports = nextTranslate({
  swcMinify: true,
  i18n: {
    localeDetection: false,
    locales: ["en", "ru", "ar", "fr", "tr", "ru"],
    defaultLocale: "ru",

    domains: [
      {
        domain: "localhost:3000",
        defaultLocale: "ru",
        http: true,
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)", // applies headers to all pages
        headers: main_headers,
      },
    ];
  },
  images: {
    domains: ["solastore.com.tr", "yenisite.solastore.com.tr"],
    // formats: [
    //   "image/webp",
    //   "image/jpeg",
    //   "image/jpg",
    //   "image/png",
    //   "image/svg+xml",
    //   "image/avif",
    // ],
  },
});
