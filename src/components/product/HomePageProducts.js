import { Nav, TabContainer, TabContent, TabPane } from "react-bootstrap";
import { simpleProductFilter } from "../../utils/filterProduct";
import MultipleRowsSlider from "../slider/MultipleRowsSlider";
import Product from "./Product";

const HomePageProducts = ({ products }) => {
  return (
    <section className="product-area box-90 pt-70 pb-40 slick-slider">
      <div className="container-fluid">
        <TabContainer defaultActiveKey="all">
          <div className="row">
            <div className="col-xl-5 col-lg-12">
              <div className="area-title mb-50">
                <h2>Brand New Products</h2>
                <p>Browse the huge variety of our products</p>
              </div>
            </div>
            <div className="col-xl-7 col-lg-12">
              <div className="product-tab mb-40">
                <Nav
                  as="ul"
                  className="nav product-nav  justify-content-xl-end"
                  id="myTab1"
                  role="tablist"
                >
                  <Nav.Item as="li">
                    <Nav.Link
                      as="a"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="nav-link"
                      id="home-tab"
                      data-toggle="tab"
                      eventKey="all"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      all
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <Nav.Link
                      as="a"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="nav-link"
                      id="profile-tab"
                      data-toggle="tab"
                      eventKey="furniture"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      furniture
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <Nav.Link
                      as="a"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="nav-link"
                      id="contact-tab"
                      data-toggle="tab"
                      eventKey="gent"
                      role="tab"
                      aria-controls="contact"
                      aria-selected="false"
                    >
                      Man cloth
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <Nav.Link
                      as="a"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="nav-link"
                      id="contact-tab1"
                      data-toggle="tab"
                      eventKey="ladies"
                      role="tab"
                      aria-controls="contact"
                      aria-selected="false"
                    >
                      woman cloth
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="product-tab-content">
                <TabContent className="tab-content" id="myTabContent">
                  <TabPane eventKey="all">
                    <div className="product-slider owl-carousel">
                      <MultipleRowsSlider>
                        {products &&
                          products.map((product) => (
                            <Product key={product.id} product={product} />
                          ))}
                      </MultipleRowsSlider>
                    </div>
                  </TabPane>
                  <TabPane eventKey="furniture">
                    <div className="product-slider owl-carousel ">
                      <MultipleRowsSlider>
                        {products &&
                          simpleProductFilter("furniture", products).map(
                            (product) => (
                              <Product key={product.id} product={product} />
                            )
                          )}
                      </MultipleRowsSlider>
                    </div>
                  </TabPane>
                  <TabPane eventKey="gent">
                    <div className="product-slider owl-carousel ">
                      <MultipleRowsSlider>
                        {products &&
                          simpleProductFilter("gent", products).map(
                            (product) => (
                              <Product key={product.id} product={product} />
                            )
                          )}
                      </MultipleRowsSlider>
                    </div>
                  </TabPane>
                  <TabPane eventKey="ladies">
                    <div className="product-slider owl-carousel ">
                      <MultipleRowsSlider>
                        {products &&
                          simpleProductFilter("ladies", products).map(
                            (product) => (
                              <Product key={product.id} product={product} />
                            )
                          )}
                      </MultipleRowsSlider>
                    </div>
                  </TabPane>
                </TabContent>
              </div>
            </div>
          </div>
        </TabContainer>
      </div>
    </section>
  );
};

export default HomePageProducts;
