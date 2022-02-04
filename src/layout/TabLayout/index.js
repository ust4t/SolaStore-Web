import React from "react";
import { Nav, Tab } from "react-bootstrap";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";

import OtherProducts from "../../components/ProductSliders/OtherProducts";
const PopularProducts = dynamic(() =>
  import("../../components/ProductSliders/PopularProducts")
);

export default function TabLayout({ newProducts, saleProducts }) {
  const { t } = useTranslation("home");

  return (
    <section className="product-area pt-70 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="section-title-five text-center">
              <h4>{t("featured")}</h4>
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
                      {t("new")}
                    </Nav.Link>
                    <Nav.Link eventKey="Sale Products">
                      <i className="fas fa-tags"></i>
                      {t("sale")}
                    </Nav.Link>
                    <Nav.Link eventKey="Best Sell">
                      <i className="fas fa-chart-line"></i>
                      {t("bestseller")}
                    </Nav.Link>
                  </div>
                </Nav>
                <Tab.Content className="tab-content" id="nav-tabContent">
                  <Tab.Pane eventKey="New Products">
                    <OtherProducts id="new" products={newProducts} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="Sale Products">
                    <OtherProducts id="sale" products={saleProducts} />
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
