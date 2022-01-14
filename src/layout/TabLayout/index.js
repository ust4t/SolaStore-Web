import React from "react";
import { Nav, Tab } from "react-bootstrap";
import dynamic from "next/dynamic";

// import PopularProducts from "../../components/PopularProducts";
import NewProducts from "../../components/NewProducts";
// import SaleProducts from "../../components/SaleProducts";
const PopularProducts = dynamic(() =>
  import("../../components/PopularProducts")
);
const SaleProducts = dynamic(() => import("../../components/SaleProducts"));

export default function TabLayout({ newProducts, saleProducts }) {
  return (
    <section className="product-area pt-70 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="section-title-five text-center">
              <h4>Öne Çıkan Ürünler</h4>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="product-tab-five text-center">
              <Tab.Container defaultActiveKey="New Products">
                <Nav className="justify-content-center">
                  <div className="nav custom-tabs" id="nav-tab" role="tablist">
                    <Nav.Link eventKey="New Products">
                      <i className="fas fa-fire-alt"></i>
                      Yeni Ürünler
                    </Nav.Link>
                    <Nav.Link eventKey="Sale Products">
                      <i className="fas fa-tags"></i>
                      İndirimdeki Ürünler
                    </Nav.Link>
                    <Nav.Link eventKey="Best Sell">
                      <i className="far fa-chart-line"></i>
                      Çok Satanlar
                    </Nav.Link>
                  </div>
                </Nav>
                <Tab.Content className="tab-content" id="nav-tabContent">
                  <Tab.Pane eventKey="New Products">
                    <NewProducts newProducts={newProducts} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="Sale Products">
                    <SaleProducts saleProducts={saleProducts} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="Best Sell">
                    <PopularProducts />
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
