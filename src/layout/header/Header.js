import { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCarts, getWishlist } from "../../redux/action/utilis";
import { totalPrice } from "../../utils/utils";
import { DefaultLayout, Layout1, Layout2, Layout3 } from "./HeaderLayouts";
import MobileMenu from "./MobileMenu";
import { News_4 } from "./News";
import Search from "./Search";

const Header = ({
  news,
  layout,
  darkBg,
  logoLeft,
  transparent,
  getCarts,
  getWishlist,
  carts,
  wishlist,
  filterByName,
}) => {
  const [activeSearchBar, setActiveSearchBar] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    getCarts();
    getWishlist();
  }, []);

  let totalCarts = carts && carts.length;
  let totalPrice_ = totalPrice(carts && carts);

  const newsList = (value) => {
    switch (value) {
      // case 1:
      //   return <News_1 darkBg={darkBg} />;
      // case 2:
      //   return <News_2 darkBg={darkBg} />;
      case 4:
        return <News_4 />;
      // case 5:
      //   return <News_5 />;
      default:
        break;
    }
  };

  const headerLayout = (value, news) => {
    switch (value) {
      case 1:
        return (
          <Layout1
            setActiveSearchBar={() => setActiveSearchBar(true)}
            setSidebar={() => setSidebar(true)}
            news={news}
            transparent={transparent}
            totalCarts={totalCarts}
            totalPrice={totalPrice_}
            filterByName={filterByName}
          />
        );
      case 2:
        return (
          <Layout2
            setActiveSearchBar={() => setActiveSearchBar(true)}
            setSidebar={() => setSidebar(true)}
            darkBg={darkBg}
            logoLeft={logoLeft}
            news={news}
            totalCarts={totalCarts}
            totalPrice={totalPrice_}
            filterByName={filterByName}
          />
        );
      case 3:
        return (
          <Layout3
            setActiveSearchBar={() => setActiveSearchBar(true)}
            setSidebar={() => setSidebar(true)}
            news={news}
            totalCarts={totalCarts}
            totalPrice={totalPrice_}
            filterByName={filterByName}
          />
        );

      default:
        return (
          <DefaultLayout
            setActiveSearchBar={() => setActiveSearchBar(true)}
            setSidebar={() => setSidebar(true)}
            news={news}
            totalCarts={totalCarts}
            totalPrice={totalPrice_}
            filterByName={filterByName}
          />
        );
    }
  };

  return (
    <Fragment>
      {headerLayout(layout, newsList(news))}

      <MobileMenu
        sidebarActive={sidebar ? "show" : ""}
        sidebarClose={() => setSidebar(false)}
      />
      <Search
        active={activeSearchBar ? "d-block" : ""}
        hendelChangeSearch={() => setActiveSearchBar(false)}
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  carts: state.utilis.carts,
  wishlist: state.utilis.wishlist,
});

export default connect(mapStateToProps, { getCarts, getWishlist })(Header);
