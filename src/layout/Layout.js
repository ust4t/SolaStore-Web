import { Fragment } from 'react';
import { DefaultFooter, Footer_1 } from './Footer';
import Header from './header/Header';

const Layout = ({
	noFooter,
	news,
	layout,
	darkBg,
	logoLeft,
	footer,
	children,
	transparent,
}) => {
	const footerLayout = (value) => {
		switch (value) {
			case 1:
				return <Footer_1 darkBg={darkBg} />;

			default:
				return <DefaultFooter darkBg={darkBg} />;
		}
	};
	return (
		<Fragment>
			<Header
				news={news}
				layout={layout}
				darkBg={darkBg}
				logoLeft={logoLeft}
				transparent={transparent}
			/>
			{children}
			{!noFooter && footerLayout(footer)}
		</Fragment>
	);
};

export default Layout;
