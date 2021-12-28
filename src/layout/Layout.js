import { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { filterByName } from "../redux/action/filter";
import { getProducts } from "../redux/action/product";
import { getCarts, getCompare, getWishlist } from "../redux/action/utilis";
import { DefaultFooter, Footer_1 } from "./Footer";
import Header from "./header/Header";

const Layout = ({
  noFooter,
  news,
  layout,
  darkBg,
  logoLeft,
  footer,
  children,
  transparent,
  paymentOption,
  getProducts,
  filterByName,
  getCarts,
  getWishlist,
  getCompare,
}) => {
  useEffect(() => {
    getProducts();
    getCarts();
    getWishlist();
    getCompare();
  }, []);
  const footerLayout = (value) => {
    switch (value) {
      case 1:
        return <Footer_1 darkBg={darkBg} />;

      default:
        return <DefaultFooter darkBg={darkBg} paymentOption={paymentOption} />;
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
        filterByName={filterByName}
      />
      {children}
      {!noFooter && footerLayout(footer)}
    </Fragment>
  );
};

export default connect(null, {
  getProducts,
  filterByName,
  getCarts,
  getWishlist,
  getCompare,
})(Layout);
