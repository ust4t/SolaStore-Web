import { Fragment, useState } from 'react';
import { DefaultLayout, Layout1, Layout2, Layout3 } from './HeaderLayouts';
import MobileMenu from './MobileMenu';
import { News_4 } from './News';
import Search from './Search';

const Header = ({ news, layout, darkBg, logoLeft }) => {
	const [activeSearchBar, setActiveSearchBar] = useState(false);
	const [sidebar, setSidebar] = useState(false);

	const newsList = (value) => {
		switch (value) {
			case 4:
				return <News_4 />;
			default:
				break;
		}
	};

	const headerLayout = (value, news) => {
		const handleSearchBar = () => setActiveSearchBar(true);
		const handleSidebar = () => setSidebar(true);

		switch (value) {
			case 1:
				return (
					<Layout1
						setActiveSearchBar={handleSearchBar}
						setSidebar={handleSidebar}
						news={news}
					/>
				);
			case 2:
				return (
					<Layout2
						setActiveSearchBar={handleSearchBar}
						setSidebar={handleSidebar}
						darkBg={darkBg}
						logoLeft={logoLeft}
						news={news}
					/>
				);
			case 3:
				return (
					<Layout3
						setActiveSearchBar={handleSearchBar}
						setSidebar={handleSidebar}
						news={news}
					/>
				);

			default:
				return (
					<DefaultLayout
						setActiveSearchBar={handleSearchBar}
						setSidebar={handleSidebar}
						news={news}
					/>
				);
		}
	};

	return (
		<Fragment>
			{headerLayout(layout, newsList(news))}

			<MobileMenu
				sidebarActive={sidebar ? 'show' : ''}
				sidebarClose={() => setSidebar(false)}
			/>
			<Search
				active={activeSearchBar ? 'd-block' : ''}
				hendelChangeSearch={() => setActiveSearchBar(false)}
			/>
		</Fragment>
	);
};

export default Header;
