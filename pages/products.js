import { useEffect, useState } from "react";
import { Nav, TabContainer, TabContent, TabPane } from "react-bootstrap";
import { connect } from "react-redux";
import Paggination from "../src/components/Paggination";
import Product from "../src/components/product/Product";
import ProductListView from "../src/components/product/ProductListView";
import Layout from "../src/layout/Layout";
import PageTitle from "../src/layout/PageTitle";
import { getProducts } from "../src/redux/action/product";
import { activeData, dblock } from "../src/utils/utils";

const Products = ({ getProducts, products }) => {
  const [active, setActive] = useState(0);
  let sort = 6;
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Layout sticky container footerBg textCenter>
      <main>
        <PageTitle active="Shop" pageTitle="Our Shop" />
        <section className="shop-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                {/* tab filter */}
                <TabContainer defaultActiveKey="grid">
                  <div className="row">
                    <div className="col-xl-5 col-lg-5 col-md-6">
                      <div className="product-showing mb-40">
                        {/* Active sort product */}
                        <p>{activeData(active, sort, products)}</p>
                      </div>
                    </div>
                    <div className="col-xl-7 col-lg-7 col-md-6">
                      <div className="shop-tab f-right">
                        <Nav
                          as="ul"
                          className="nav text-center"
                          id="myTab"
                          role="tablist"
                        >
                          <Nav.Item as="li">
                            <Nav.Link
                              as="a"
                              href="#"
                              onClick={(e) => e.preventDefault()}
                              eventKey="list"
                            >
                              <i className="fas fa-list-ul" />{" "}
                            </Nav.Link>
                          </Nav.Item>
                          <Nav.Item as="li">
                            <Nav.Link
                              as="a"
                              href="#"
                              onClick={(e) => e.preventDefault()}
                              eventKey="grid"
                            >
                              <i className="fas fa-th-large" />
                            </Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </div>
                      <div className="pro-filter-btn mb-40 f-right">
                        {/* <button id="filter-btn">Filter +</button> */}
                      </div>
                    </div>
                  </div>
                  {/* tab content */}
                  <TabContent>
                    <TabPane eventKey="grid">
                      <div className="row">
                        {products &&
                          products.map((product, i) => (
                            <div
                              className={`col-lg-4 col-md-6 ${dblock(
                                active,
                                i,
                                sort
                              )}`}
                              key={product.id}
                            >
                              <Product product={product} />
                            </div>
                          ))}
                      </div>
                    </TabPane>
                    <TabPane eventKey="list">
                      {products &&
                        products.map((product, i) => (
                          <div key={i} className={`${dblock(active, i, sort)}`}>
                            <ProductListView product={product} />
                          </div>
                        ))}
                    </TabPane>
                  </TabContent>
                </TabContainer>

                <Paggination
                  active={active}
                  setActive={setActive}
                  sort={sort}
                  length={products && products.length}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  products: state.product.products,
});

export default connect(mapStateToProps, { getProducts })(Products);
