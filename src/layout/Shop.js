import { useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { connect } from "react-redux";
import Paggination from "../components/Paggination";
import Filter from "../components/product/filter/Filter";
import Product from "../components/product/Product";
import ProductListView from "../components/product/ProductListView";
import { getProducts } from "../redux/action/product";
import { getProductByFilter } from "../utils/filterProduct";
import { activeData, dblock, hideProduct } from "../utils/utils";
import Layout from "./Layout";
import PageTitle from "./PageTitle";

const ShopLayout = ({
  // getProducts,
  allProducts,
  defaultKey,
  rightSideBar,
  full,
  sortValue,
  keyValueForQurey,
  value = "vegetables",
  active_,
  filter,
}) => {
  useEffect(() => {
    getProductByFilter(hideProduct(allProducts), filter);
  }, []);
  const [active, setActive] = useState(active_ ? active_ : 0);
  let sort = sortValue ? sortValue : 6;
  // let products =
  //   allProducts && value
  //     ? allProducts.filter((product) =>
  //         product[keyValueForQurey].includes(value)
  //       )
  //     : allProducts;
  let products = allProducts;
  return (
    <Layout>
      <main>
        <PageTitle pageTitle="Shop" active="Products" />
        <section className="shop-sidebar pt-75">
          <div className="container">
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
                            {activeData(active, sort, products)}
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
                            products.map((product, i) => (
                              <div
                                className={`${
                                  full
                                    ? "col-lg-3 col-sm-6 custom-col-10"
                                    : "col-lg-4 col-sm-6 custom-col-10"
                                } ${dblock(active, i, sort)}`}
                                key={i}>
                                <Product product={product} />
                              </div>
                            ))}
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="list">
                        {products &&
                          products.map((product, i) => (
                            <ProductListView key={i} product={product} />
                          ))}
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                ) : (
                  <h3 className="text-center">No Product Found</h3>
                )}
                <div className="mt-5 mb-5">
                  <Paggination
                    active={active}
                    setActive={setActive}
                    sort={sort}
                    length={products && products.length}
                  />
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
