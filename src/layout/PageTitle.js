import { useState } from "react";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

import ShareModal from "../components/Modals/ShareModal";

const PageTitle = ({
  pageTitle,
  active,
  thankupage,
  thankupageTitle,
  share,
  shareDetails,
  shareTitle,
  id,
  navigation = false,
}) => {
  const { t } = useTranslation("common");
  const [shareModal, setShareModal] = useState(false);
  return (
    <div
      className="breadcrumb-bg pt-20 pb-20"
      data-background="images/all-bg/papyrus.png"
      style={{ backgroundImage: 'url("/images/all-bg/papyrus.png")' }}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="page-title text-center">
              {thankupage && (
                <i
                  className="fa fa-check-circle text-success fs-100 mb-3"
                  ariaHidden="true"
                />
              )}

              <h3 className={thankupage ? "mb-2" : ""}>{pageTitle}</h3>
              {share && (
                <div className="d-flex d-lg-none justify-content-center">
                  <button
                    onClick={() => setShareModal(true)}
                    className="btn grenbtn1 rounded-3 p-3 py-2">
                    {shareTitle}
                  </button>
                  <ShareModal
                    urlDetails={shareDetails}
                    show={shareModal}
                    handleClose={() => setShareModal(false)}
                  />
                </div>
              )}
              {thankupage && (
                <p className="fs-20">
                  {thankupageTitle} <br /> Order ID: {id}
                </p>
              )}
              {/* <h2 className="breadcrumb-title">{pageTitle}</h2> */}
              <div className="row justify-content-center">
                {navigation && (
                  <div className="col-lg-3 d-none d-lg-block">
                    <div className="previous-product">
                      <a href="#">
                        <i className="fas fa-angle-left" /> Önceki Ürünü Gör
                      </a>
                    </div>
                  </div>
                )}
                {active && (
                  <div className="col-lg-6">
                    <div className="breadcrumb-menu mt-20">
                      <ul className="trail-items">
                        <li className="trail-item trail-begin">
                          <Link href="/">
                            <a>{t("menu.home")}</a>
                          </Link>
                        </li>
                        <li className="trail-item trail-end">
                          <span>{active}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
                {navigation && (
                  <div className="col-lg-3 d-none d-lg-block">
                    <div className="next-product">
                      <a href="#">
                        Sonraki Ürünü Gör <i className="fas fa-angle-right" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
