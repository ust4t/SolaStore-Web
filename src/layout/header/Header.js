import { Fragment, useState } from "react";

import { DefaultLayout, Layout2 } from "./HeaderLayout/HeaderLayouts";
import MobileMenu from "../MobileMenu";
import { News_4 } from "./News/News";

const Header = ({ news, layout, darkBg, logoLeft, hideWheel = false }) => {
  const [sidebar, setSidebar] = useState(false);

  const newsList = (value) => {
    switch (value) {
      case 4:
        return <News_4 />;
      default:
        break;
    }
  };
  const handleSidebar = () => setSidebar(!sidebar);
  function handleCloseSidebar() {
    setSidebar(false);
  }

  const headerLayout = (value, news) => {
    switch (value) {
      case 2:
        return (
          <Layout2
            hideWheel={hideWheel}
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
    </Fragment>
  );
};

export default Header;
