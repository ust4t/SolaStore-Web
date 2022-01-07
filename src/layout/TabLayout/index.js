import React, { useState } from "react";

import PopularProducts from "../../components/PopularProducts";
import styles from "./TabLayout.module.css";
import NewProducts from "../../components/NewProducts";
import SaleProducts from "../../components/SaleProducts";
import { Nav, Tab } from "react-bootstrap";

export default function TabLayout() {
  const [popularData, setPopularData] = useState([]);

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
              <Tab.Container defaultActiveKey="Best Sell">
                <Nav className="justify-content-center">
                  <div className="nav custom-tabs" id="nav-tab" role="tablist">
                    <Nav.Link eventKey="Best Sell">
                      <i className="far fa-chart-line"></i>
                      Çok Satanlar
                    </Nav.Link>
                    <Nav.Link eventKey="New Products">
                      <i className="fas fa-fire-alt"></i>
                      Yeni Ürünler
                    </Nav.Link>
                    <Nav.Link eventKey="Sale Products">
                      <i className="fas fa-tags"></i>
                      İndirimdeki Ürünler
                    </Nav.Link>
                  </div>
                </Nav>
                <Tab.Content className="tab-content" id="nav-tabContent">
                  <Tab.Pane eventKey="Best Sell">
                    {/* <PopularProducts
                      popularData={popularData}
                      setPopularData={setPopularData}
                    /> */}
                  </Tab.Pane>
                  <Tab.Pane eventKey="New Products">
                    <NewProducts />
                  </Tab.Pane>
                  <Tab.Pane eventKey="Sale Products">
                    <SaleProducts
                      popularData={popularData}
                      setPopularData={setPopularData}
                    />
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
