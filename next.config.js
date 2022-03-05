const nextTranslate = require("next-translate");

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
  images: {
    domains: [
      "solastore.com.tr",
      "yenisite.solastore.com.tr",
      "d2tt2d87osw7ul.cloudfront.net",
    ],
    formats: ["image/avif", "image/webp"],
  },
});
