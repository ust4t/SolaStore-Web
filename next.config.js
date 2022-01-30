const nextTranslate = require('next-translate');

module.exports = nextTranslate({
	plugins: [
		'postcss-flexbugs-fixes',
		[
			'postcss-preset-env',
			{
				autoprefixer: {
					flexbox: 'no-2009',
				},
				stage: 3,
				features: {
					'custom-properties': false,
				},
			},
		],
		[
			'@fullhuman/postcss-purgecss',
			{
				content: [
					'./pages/**/*.{js,jsx,ts,tsx}',
					'./components/**/*.{js,jsx,ts,tsx}',
				],
				defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
				safelist: ['html', 'body'],
			},
		],
	],
	i18n: {
		localeDetection: false,
		locales: ['en', 'ru', 'ar', 'fr', 'tr', 'ru'],
		defaultLocale: 'ru',

		domains: [
			{
				domain: 'localhost:3000',
				defaultLocale: 'ru',
				http: true,
			},
		],
	},
	images: {
		domains: ['solastore.com.tr', 'picsum.photos'],
		formats: ['image/webp'],
	},
});
