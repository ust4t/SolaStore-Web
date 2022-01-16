import { useContext, useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";

import PopularCard from "../components/Cards/PopularCard";
import Paggination from "../components/Paggination";
import PaginationList from "../components/PaginationList";
import Filter from "../components/product/filter/Filter";
import FilterDropdown from "../components/product/filter/FilterDropdown";
import ProductListView from "../components/product/ProductListView";
import { StoreContext } from "../context/StoreProvider";
import { getProducts } from "../redux/action/product";
import { activeData, dblock } from "../utils/utils";
import Layout from "./Layout";
import PageTitle from "./PageTitle";

const ShopLayout = ({
  allProducts,
  brands,
  defaultKey,
  rightSideBar,
  full,
  sortValue,
  keyValueForQurey,
  value = "vegetables",
  active_,
  filter,
  filterDropdown = false,
}) => {
  const { cartActions } = useContext(StoreContext);
  const { addToCartAction } = cartActions;
  const [pageLimit, setPageLimit] = useState(15);
  const [offset, setOffset] = useState(0);
  const pageCount = Math.ceil(allProducts.length / pageLimit);
  const [active, setActive] = useState(active_ ? active_ : 0);
  let sort = sortValue ? sortValue : pageLimit;
  const [products, setProducts] = useState(
    allProducts.slice(offset, offset + pageLimit)
  );

  const handlePageData = () => {
    const pageData = allProducts.slice(offset, offset + pageLimit);
    setProducts(pageData);
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * pageLimit;
    setOffset(offset);
    handlePageData();
  };

  useEffect(() => {
    handlePageData();
  }, [offset]);

  return (
    <Layout news={4} logoLeft layout={2} paymentOption>
      <main>
        <PageTitle pageTitle="Shop" active="Products" />
        <section className="shop-sidebar pt-75">
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
              {!full && !rightSideBar && (
                <div className="col-lg-3 col-md-4">
                  <Filter setActive_={() => setActive(0)} />
                </div>
              )}

              <div className={full ? "col-12" : "col-lg-9 col-md-8"}>
                {products && products.length > 0 ? (
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
                            {activeData(active, sort, allProducts)}
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
                            products.map((productItem, i) => (
                              <div
                                className={`${
                                  full
                                    ? "col-lg-3 col-sm-6 custom-col-10"
                                    : "col-lg-4 col-sm-6 custom-col-10"
                                } ${dblock(active, i, sort)}`}
                                key={`${productItem.productID}-_*|${i}`}>
                                <PopularCard
                                  productData={{
                                    id: productItem.productID,
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
                    pageCount={pageCount}
                    handlePageClick={handlePageClick}
                  />
                  {/* <ReactPaginate
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    previousLabel={<i className="fas fa-angle-double-left" />}
                    nextLabel={<i className="fas fa-angle-double-right" />}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={
                      "basic-pagination basic-pagination-2 text-center"
                    }
                    subContainerClassName={""}
                    activeClassName={"active"}
                  /> */}
                </div>
              </div>

              {!full && rightSideBar && (
                <div className="col-lg-3 col-md-4">
                  <Filter setActive_={() => setActive(0)} />
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  // allProducts: getProductByFilter(
  //   hideProduct(state.product.products),
  //   state.filter
  // ),
  filter: state.filter,
});

export default connect(mapStateToProps, { getProducts })(ShopLayout);
