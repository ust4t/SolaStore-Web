import { Fragment, useState } from "react";

import { DefaultLayout, Layout2 } from "./HeaderLayout/HeaderLayouts";
import MobileMenu from "../MobileMenu";
import { News_4 } from "./News/News";
import Search from "./Search";

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
  const handleSearchBar = () => setActiveSearchBar(true);
  const handleSidebar = () => setSidebar(true);
  function handleCloseSidebar() {
    setSidebar(false);
  }

  const headerLayout = (value, news) => {
    switch (value) {
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

      <MobileMenu sidebarActive={sidebar} sidebarClose={handleCloseSidebar} />
      <Search
        active={activeSearchBar ? "d-block" : ""}
        hendelChangeSearch={() => setActiveSearchBar(false)}
      />
    </Fragment>
  );
};

export default Header;
