import { Nav, TabContainer, TabContent, TabPane } from "react-bootstrap";
import { simpleProductFilter } from "../../utils/filterProduct";
import SingleProductSlider from "../slider/SingleProductSlider";
import Product from "./Product";

const HomePageSingleProduct = ({ products }) => {
  return (
    <section className="product-area box-90 pt-45 pb-40 slick-slider">
      <div className="container-fluid">
        <TabContainer defaultActiveKey="all2">
          <div className="row">
            <div className="col-xl-5 col-lg-12">
              <div className="area-title mb-50">
                <h2>Best Sell Products</h2>
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
                      className="nav-link"
                      onClick={(e) => e.preventDefault()}
                      id="home-tab"
                      data-toggle="tab"
                      eventKey="all2"
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
                      className="nav-link"
                      onClick={(e) => e.preventDefault()}
                      id="profile-tab"
                      data-toggle="tab"
                      eventKey="furniture2"
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
                      className="nav-link"
                      onClick={(e) => e.preventDefault()}
                      id="contact-tab"
                      data-toggle="tab"
                      eventKey="gent2"
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
                      eventKey="ladies2"
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
                  <TabPane eventKey="all2">
                    <div className="product-slider owl-carousel">
                      <SingleProductSlider>
                        {products &&
                          products.map((product) => (
                            <Product key={product.id} product={product} />
                          ))}
                      </SingleProductSlider>
                    </div>
                  </TabPane>
                  <TabPane eventKey="furniture2">
                    <div className="product-slider owl-carousel ">
                      <SingleProductSlider>
                        {products &&
                          simpleProductFilter("furniture", products).map(
                            (product) => (
                              <Product key={product.id} product={product} />
                            )
                          )}
                      </SingleProductSlider>
                    </div>
                  </TabPane>
                  <TabPane eventKey="gent2">
                    <SingleProductSlider>
                      {products &&
                        simpleProductFilter("gent", products).map((product) => (
                          <Product key={product.id} product={product} />
                        ))}
                    </SingleProductSlider>
                  </TabPane>
                  <TabPane eventKey="ladies2">
                    <SingleProductSlider>
                      {products &&
                        simpleProductFilter("ladies", products).map(
                          (product) => (
                            <Product key={product.id} product={product} />
                          )
                        )}
                    </SingleProductSlider>
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

export default HomePageSingleProduct;
