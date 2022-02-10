import useTranslation from "next-translate/useTranslation";
import { useContext, useEffect, useState, memo } from "react";
import { Nav, Tab } from "react-bootstrap";
import Head from "next/head";

import PopularCard from "../../components/Cards/PopularCard";
import PaginationList from "../../components/PaginationList";
import FilterDropdown from "../../components/product/filter/FilterDropdown";
import ProductListView from "../../components/product/ProductListView";
import { StoreContext } from "../../context/StoreProvider";
import { activeData, dblock } from "../../utils/utils";
import Layout from "../Layout";
import PageTitle from "../PageTitle";
import { custom_col_6 } from "./Shop.module.css";

const ShopLayout = ({
  allProducts,
  brands,
  defaultKey,
  full,
  title,
  share,
  shareDetails,
  titleHead,
  sortValue,
  active_,
  filterDropdown = false,
  isHidden = false,
  isActiveHidden,
}) => {
  const { t } = useTranslation("common");
  const { cartActions } = useContext(StoreContext);
  const { addToCartAction } = cartActions;
  const [pageLimit, setPageLimit] = useState(20);
  const [offset, setOffset] = useState(0);
  const pageCount = Math.ceil(allProducts.length / pageLimit);
  const [active, setActive] = useState(active_ ? active_ : 0);
  const [cartAnim, setCartAnim] = useState(false);
  const [selectedPage, setSelectedPage] = useState(0);

  let sort = sortValue ? sortValue : pageLimit;
  const [products, setProducts] = useState(
    allProducts.slice(offset, offset + pageLimit)
  );

  const { min, max } = activeData(active, sort, allProducts);

  const handlePageData = () => {
    const pageData = allProducts.slice(offset, offset + pageLimit);
    setProducts(pageData);
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setSelectedPage(selectedPage);
    const offset = selectedPage * pageLimit;
    setOffset(offset);
    handlePageData();
  };

  useEffect(() => {
    setSelectedPage(0);
  }, [allProducts, pageLimit]);

  useEffect(() => {
    handlePageData();
  }, [offset, allProducts, pageLimit]);

  return (
    <>
      <Head>
        <title>{titleHead}</title>
      </Head>
      <Layout news={4} logoLeft layout={2} paymentOption>
        {cartAnim && <div className="body_overlay" />}
        <main>
          {!isHidden && (
            <PageTitle
              share={share}
              shareDetails={{
                ...shareDetails,
              }}
              pageTitle={title}
              active={isActiveHidden ? null : title}
            />
          )}
          <section className="pt-45 px-4">
            <div className="container">
              {filterDropdown && (
                <FilterDropdown
                  brands={brands}
                  pageLimit={pageLimit}
                  setPageLimit={setPageLimit}
                  setActive_={() => setActive(0)}
                />
              )}
              <div className="row">
                <div className={full ? "col-12" : "col-lg-9 col-md-8"}>
                  {products.length > 0 ? (
                    <Tab.Container
                      defaultActiveKey={defaultKey ? defaultKey : "grid"}
                      className="shop-content-area">
                      <div className="content-header mb-55">
                        <div className="ch-left">
                          <Nav
                            className="nav shop-tabs"
                            id="myTab"
                            role="tablist">
                            <Nav.Item>
                              <Nav.Link eventKey="grid">
                                <i className="fas fa-th" />
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="list">
                                <i className="fas fa-list-ul" />
                              </Nav.Link>
                            </Nav.Item>
                          </Nav>
                        </div>

                        <div className="ch-right p-0">
                          <div className="show-text m-0">
                            <span className="p-0 border-0">
                              {t("common:filterNum", { min, max })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Tab.Content
                        className="tab-content shop-tabs-content"
                        id="myTabContent">
                        <Tab.Pane eventKey="grid">
                          <div className="row custom-row-10">
                            {products &&
                              products.map((productItem, index) => (
                                <div
                                  className={`${
                                    full
                                      ? `col-6 col-lg-3 ${custom_col_6} col-sm-6 custom-col-10`
                                      : `col-lg-4 ${custom_col_6} col-sm-6 custom-col-10`
                                  } ${dblock(active, index, sort)}`}
                                  key={`${productItem.productID}-_*-|${index}`}>
                                  <PopularCard
                                    setAnim={setCartAnim}
                                    productData={{
                                      id: productItem.masterProductID,
                                      name: productItem.productShortName,
                                      images: productItem.pictures,
                                      singlePrice: productItem.singlePrice,
                                      sizes: productItem.sizes,
                                      price: productItem.price,
                                      oldPrice: productItem.oldPrice,
                                      productStockCode:
                                        productItem.productStockCode,
                                      video_1: productItem.video_1,
                                      variants: productItem?.variants,
                                      index,
                                    }}
                                  />
                                </div>
                              ))}
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="list">
                          {products &&
                            products.map((product, i) => (
                              <ProductListView
                                addToCartAction={addToCartAction}
                                key={`${product.masterProductID}_|${i}`}
                                product={product}
                              />
                            ))}
                        </Tab.Pane>
                      </Tab.Content>
                    </Tab.Container>
                  ) : (
                    <h3 className="text-center">No Product Found</h3>
                  )}
                  <div className="mt-5 mb-5">
                    <PaginationList
                      forcePage={selectedPage}
                      pageCount={pageCount}
                      handlePageClick={handlePageClick}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
};

export default memo(ShopLayout);
