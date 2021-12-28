import { Nav, Tab } from "react-bootstrap";
import Product from "./Product";

const Home5ProductTab = ({ products }) => {
  const productFilter = (includesValue) => (
    <div className="row">
      {products &&
        products.map(
          (product, i) =>
            product.category.includes(includesValue.toLowerCase()) && (
              <div className="col-lg-3 col-sm-6" key={i}>
                <Product product={product} home5 />
              </div>
            )
        )}
    </div>
  );

  return (
    <section className="product-area pt-70 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="section-title-five text-center">
              <span>All the best item for You</span>
              <h4>Trending Products</h4>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="product-tab-five text-center">
              <Tab.Container defaultActiveKey="Fruits">
                <Nav className="justify-content-center">
                  <div className="nav custom-tabs" id="nav-tab" role="tablist">
                    <Nav.Link eventKey="Fruits">
                      <i className="fal fa-salad" />
                      Fruits
                    </Nav.Link>
                    <Nav.Link eventKey="Organic">
                      <i className="fal fa-pumpkin" />
                      Organic
                    </Nav.Link>
                    <Nav.Link eventKey="Vegetable">
                      <i className="fal fa-salad" />
                      Vegetable
                    </Nav.Link>
                    <Nav.Link eventKey="fish">
                      <i className="fal fa-fish" />
                      Spices
                    </Nav.Link>
                    <Nav.Link eventKey="Meats">
                      <i className="fal fa-turkey" />
                      Meats
                    </Nav.Link>
                  </div>
                </Nav>
                <Tab.Content className="tab-content" id="nav-tabContent">
                  <Tab.Pane eventKey="Fruits">
                    {productFilter("Fruits")}
                  </Tab.Pane>
                  <Tab.Pane eventKey="Organic">
                    {productFilter("Organic")}
                  </Tab.Pane>
                  <Tab.Pane eventKey="Vegetable">
                    {productFilter("Vegetable")}
                  </Tab.Pane>
                  <Tab.Pane eventKey="fish">{productFilter("fish")}</Tab.Pane>
                  <Tab.Pane eventKey="Meats">{productFilter("Meats")}</Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home5ProductTab;
