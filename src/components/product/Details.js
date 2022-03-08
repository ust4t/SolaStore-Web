import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { useRouter } from "next/router";

import useCartAnim from "../../hooks/useCartAnim";
import sources from "../../../sources";
import { StoreContext } from "../../context/StoreProvider";
import Layout from "../../layout/Layout";

import Zoom from "../Zoom";
import ShareModal from "../Modals/ShareModal";
import {
  arrow,
  arrowLeft,
  arrowRight,
  brandStyle,
  smallBrandStyle,
  videoStyle,
  videoLogoStyle,
  navActive,
  mobileBtn,
  mobileCartBtn,
  discount_banner,
  price_box,
} from "./Details.module.css";
import { Arrow } from "../sliders/SliderArrows";
import Heart from "../Heart";
import { encodeURLString } from "../../utils/utils";

const Details = ({
  productVariants,
  incomingProduct,
  brand,
  category,
  upthumb,
  productMain,
}) => {
  const { t } = useTranslation("detail");
  const user = useSelector((state) => state.auth);
  const router = useRouter();
  const { state, cartActions, wishListActions } = useContext(StoreContext);
  const { addToCartAction } = cartActions;
  const { addToWishList, removeFromWishList } = wishListActions;
  const [product, setProduct] = useState(incomingProduct);
  const [shareModal, setShareModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageKey, setImageKey] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const videoRef = useRef();
  const cartRef = useRef();

  const sizeNum = (product.sizes && product.sizes.split("-").length) || 0;
  const oldUnitPrice = product.oldPrice / sizeNum;
  const productSize = [...product.pictures, product.video_1].filter(
    (item) => item !== null
  ).length;
  const wishlist =
    state.wishlistData &&
    state.wishlistData.find(
      (wishlist) => wishlist.productID === product.productID
    );

  useEffect(() => {
    if (product.video_1 && videoRef.current) videoRef.current.pause();
  }, [product]);

  useEffect(() => {
    if (wishlist) {
      setIsLiked(true);
    }
  }, [wishlist]);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCartAction({
      id: product.productID,
      user: user.uid,
      quantity,
    });
  };

  const onIncrementCart = (e) => {
    e.preventDefault();
    setQuantity(quantity + 1);
  };

  const handleAddToWishList = () => {
    if (!isLiked) {
      addToWishList({
        id: product.productID,
        user: user.uid,
      });
      setIsLiked(true);
      return;
    }
    removeFromWishList({
      id: product.productID,
      user: user.uid,
    });
    setIsLiked(false);
    return;
  };

  const handleNext = ({ imageKey, product }) => {
    if (product.video_1) {
      videoRef.current.pause();
    }

    if (imageKey < productSize - 1) {
      setImageKey(imageKey + 1);
    } else {
      setImageKey(0);
    }
  };

  const handlePrev = ({ imageKey, product }) => {
    if (product.video_1) {
      videoRef.current.pause();
    }

    if (imageKey > 0) {
      setImageKey(imageKey - 1);
    } else {
      setImageKey(productSize - 1);
    }
  };

  const checkImage = ({ source, img }) =>
    product.picture_1 ? `${source}${img}` : "/images/placeholder.jpg";

  useCartAnim({
    el: cartRef.current,
    src: `${sources.imageMidSrc}${product.picture_1}`,
    btnRef: "[data-addtocart]",
  });

  return (
    <Layout news={4} logoLeft layout={2} paymentOption>
      <main>
        {product ? (
          <Fragment>
            <Head>
              <title>Solastore | {product.productShortName}</title>
              <meta
                property="og:title"
                content={`Solastore | ${product.productShortName}`}
              />
              <meta
                property="og:url"
                content={`/detail/${encodeURLString(
                  product.productShortName
                )}:${id}?selected=${currentImages.selectedId}`}
              />
              <meta
                property="og:image"
                content={
                  product.picture_1
                    ? `${sources.imageMinSrc}${product.picture_1}`
                    : "/images/placeholder.jpg"
                }
              />
              <meta property="og:type" content="website" />
              <meta
                property="og:description"
                content="Solastore, where you can find the best fashion that you always desired"
              />
            </Head>
            <section className="product-details-area pt-50 pb-50">
              {product.oldPrice > 0 && sizeNum && (
                <div
                  style={{
                    background: "#390",
                  }}
                  className={`row p-3 py-4 align-items-center justify-content-around ${discount_banner}`}>
                  <div className="col-12 col-lg-5 d-flex align-items-center justify-content-center mb-3 mb-lg-0">
                    <i className="d-none d-lg-block text-white fas fa-tags fa-2x me-2" />
                    <h3 className="text-white m-0 fw-bold fs-4 text-center text-lg-start text-capitalize">
                      {t("discountTitle", {
                        category:
                          category.subCategoriesList.selectedSubCategoryName,
                        price:
                          oldUnitPrice * sizeNum -
                          product.singlePrice * sizeNum,
                      })}
                    </h3>
                  </div>
                  <div className="col-12 col-lg-4 d-flex flex-column flex-lg-row align-items-center justify-centent-center">
                    <h5 className={`m-0 ${price_box} mb-3 mb-lg-0`}>
                      {product.singlePrice * sizeNum}$
                    </h5>
                    <h5 className="m-0 fs-6 fw-bold text-white text-center text-lg-start">
                      {t("discountDesc")}
                    </h5>
                  </div>
                </div>
              )}
              <div
                className="row bg-white p-3 position-fixed bottom-0 start-0 d-flex align-item-center justify-content-center d-lg-none"
                style={{
                  width: "105%",
                  zIndex: 260,
                }}>
                <div className="col-6">
                  <div
                    onClick={handleAddToCart}
                    data-addtocart
                    ref={cartRef}
                    className={`${mobileBtn} cartContainer`}>
                    <i className="fas fa-cart-plus fa-lg" />{" "}
                    {t("common:addtocart")}
                  </div>
                </div>
                <div className="col-6">
                  <Link href="/cart">
                    <div className={`${mobileBtn} ${mobileCartBtn}`}>
                      <i className="fas fa-cart-arrow-down fa-lg" />{" "}
                      {t("cart:cartTitle")}
                    </div>
                  </Link>
                </div>
              </div>
              <ShareModal
                urlDetails={{
                  url: "https://www.solastore.com.tr/detail/",
                  id: product.masterProductID,
                  name: product.productShortName,
                  pictures: !!product.pictures.length
                    ? `${sources.imageMidSrc}${product.pictures[0].guidName}`
                    : "/images/placeholder.jpg",
                  query: `?selected=${product.productID}`,
                }}
                show={shareModal}
                handleClose={() => setShareModal(false)}
              />
              <div className="container">
                <div className="row">
                  <div
                    className={` ${
                      upthumb ? "product-modal col-lg-5" : "col-lg-7"
                    }`}>
                    <Tab.Container
                      activeKey={`tum-${imageKey}`}
                      defaultActiveKey={`tum-0`}>
                      <div className="pro-details-tab d-flex d-lg-block flex-column">
                        <Tab.Content className="tab-content custom-content position-relative">
                          <Arrow
                            onClick={() => handlePrev({ imageKey, product })}
                            className={`${arrow} ${arrowLeft}`}
                            icon="fas fa-arrow-left"
                          />
                          {product.video_1 && (
                            <Tab.Pane
                              eventKey={`tum-${product.pictures.length}`}>
                              <video
                                id="videoProductDetail"
                                controls
                                autoPlay
                                ref={videoRef}
                                className={videoStyle}>
                                <source
                                  src={`${sources.videos}${product.video_1}`}
                                  type="video/mp4"
                                />
                              </video>
                            </Tab.Pane>
                          )}
                          {product &&
                            product.pictures.map((img, i) => (
                              <Tab.Pane
                                key={i}
                                eventKey={`tum-${i}`}
                                style={{ maxWidth: "900px" }}>
                                <Zoom
                                  className="detail-image-front"
                                  width="600"
                                  height="900"
                                  layout="responsive"
                                  alt={product.productShortName}
                                  src={checkImage({
                                    source: sources.imageMaxSrc,
                                    img: img.guidName,
                                  })}
                                  priority
                                />
                              </Tab.Pane>
                            ))}
                          <Arrow
                            onClick={() => handleNext({ imageKey, product })}
                            className={`${arrow} ${arrowRight}`}
                            icon="fas fa-arrow-right"
                          />
                        </Tab.Content>

                        <Nav
                          className="nav custom-tab flex-nowrap flex-md-wrap justify-content-center justify-content-lg-start"
                          id="myTab"
                          role="tablist">
                          {product &&
                            product.pictures.map((img, i) => (
                              <Nav.Item key={i} className="px-1">
                                <Nav.Link
                                  eventKey={`tum-${i}`}
                                  className="mr-0"
                                  onClick={() => {
                                    if (product.video_1) {
                                      videoRef.current.pause();
                                    }
                                    setImageKey(i);
                                  }}>
                                  <Image
                                    className={`${
                                      `tum-${imageKey}` === `tum-${i}`
                                        ? navActive
                                        : ""
                                    }`}
                                    src={checkImage({
                                      source: sources.imageMaxSrc,
                                      img: img.guidName,
                                    })}
                                    width="145"
                                    height="220"
                                    alt={product.productShortName}
                                  />
                                </Nav.Link>
                              </Nav.Item>
                            ))}
                          {product.video_1 && (
                            <Nav.Item>
                              <Nav.Link
                                onClick={(e) => {
                                  if (product.video_1) {
                                    videoRef.current.currentTime = 0;
                                    videoRef.current.play();
                                  }
                                  setImageKey(product.pictures.length);
                                }}
                                eventKey={`tum-${product.pictures.length}`}
                                className="mr-0">
                                <i
                                  className={`fas fa-play position-absolute top-50 start-50 translate-middle z-index-first ${videoLogoStyle}`}
                                />
                                <Image
                                  className={`${
                                    `tum-${imageKey}` ===
                                    `tum-${productSize - 1}`
                                      ? navActive
                                      : ""
                                  }`}
                                  src={checkImage({
                                    source: sources.imageMaxSrc,
                                    img: product.picture_1,
                                  })}
                                  width="145"
                                  height="220"
                                  alt={product.productShortName}
                                />
                              </Nav.Link>
                            </Nav.Item>
                          )}
                        </Nav>
                      </div>
                    </Tab.Container>

                    {productVariants.length > 0 && (
                      <div className="product-details-info d-flex d-lg-none">
                        <div className="sidebar-product-color">
                          <h4 className="widget-title1 text-center text-md-start">
                            {t("otherColors")}
                          </h4>
                          <div
                            className="details-filter-row details-row-size"
                            style={{ margin: 5 }}>
                            {[productMain, ...productVariants]
                              .filter(
                                (variant) =>
                                  variant.pictures && variant.pictures.length
                              )
                              .map((variant) => (
                                <a
                                  onClick={() => {
                                    setProduct({
                                      ...variant,
                                      video_1: product.video_1,
                                    });
                                    setImageKey(0);
                                    router.push(
                                      `/detail/${encodeURLString(
                                        variant.productShortName
                                      )}:${variant.masterProductID}?selected=${
                                        variant.productID
                                      }`,
                                      undefined,
                                      { shallow: true }
                                    );
                                  }}
                                  href="#">
                                  <div
                                    className="details-filter-row details-row-size"
                                    style={{ margin: 5, cursor: "pointer" }}>
                                    <div className="product-nav product-nav-thumbs">
                                      <span className="productvar cursor-pointer">
                                        <Image
                                          // src={`${sources.imageMinSrc}${variant.picture_1}`}
                                          src={checkImage({
                                            source: sources.imageMinSrc,
                                            img: variant.picture_1,
                                          })}
                                          alt={variant.productShortName}
                                          title={variant.productShortName}
                                          width={90}
                                          height={140}
                                        />
                                      </span>
                                    </div>
                                  </div>
                                </a>
                              ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={upthumb ? "col-lg-7" : "col-lg-5"}>
                    <div className="pro-details-content mt-15 row">
                      <div className="col-12 col-md-12">
                        <h3 className="border-bottom">
                          {product && product.productShortName}
                        </h3>
                      </div>
                      <div className="col-7 col-md-4 py-3 border-right">
                        <span className="details-pro-price mb-40">
                          {product.oldPrice > 0 && sizeNum ? (
                            <>
                              <h5>
                                {product.price && (
                                  <del className="text-danger">
                                    ${oldUnitPrice * sizeNum} USD
                                  </del>
                                )}
                              </h5>
                              <span className="details-pro-price mb-40">
                                {product.price &&
                                  `$${product.singlePrice * sizeNum} USD`}
                              </span>
                            </>
                          ) : (
                            <>
                              <br />
                              <span className="details-pro-price mb-40">
                                {product.price &&
                                  `$${product.singlePrice * sizeNum} USD`}
                              </span>
                            </>
                          )}
                        </span>
                      </div>
                      {brand && (
                        <div className="col-5 col-md-4">
                          <div className="card border p-2">
                            <Link
                              href={`/brands/${encodeURLString(
                                brand.brandName
                              )}:${brand.brandID}`}>
                              <div>
                                <Image
                                  className="cursor-pointer"
                                  src={
                                    brand.guidName2
                                      ? `${sources.brand}${brand.guidName2}`
                                      : "/images/placeholder.jpg"
                                  }
                                  width="180"
                                  height="130"
                                  layout="responsive"
                                  quality={50}
                                />
                              </div>
                            </Link>
                            <p className="card-body text-center px-1 py-0 m-0 my-1">
                              <Link
                                href={`/brands/${encodeURLString(
                                  brand.brandName
                                )}:${brand.brandID}`}>
                                <span className={brandStyle}>
                                  {brand.brandName}
                                </span>
                              </Link>
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="col-7 col-md-4 py-3">
                        <small>
                          <span className="text-muted">
                            {t("productCode")}:{" "}
                            <span className="text-dark">
                              {product.productStockCode}
                            </span>
                          </span>
                        </small>
                        <br />

                        <small>
                          <span className="text-muted">{t("brand")}:</span>
                          <Link
                            href={`/brands/${encodeURLString(
                              brand.brandName
                            )}:${brand.brandID}`}>
                            <span
                              className={`${brandStyle} ${smallBrandStyle}`}>
                              {brand.brandName}
                            </span>
                          </Link>
                        </small>
                        <br />
                        <small>
                          <span className="text-muted">{t("category")}:</span>
                          <Link
                            href={`/shop/${encodeURLString(
                              category.subCategoriesList.selectedSubCategoryName
                            )}:${category.subCategoriesList.subCategoryID}`}>
                            <span
                              className={`${brandStyle} ${smallBrandStyle}`}>
                              {
                                category.subCategoriesList
                                  .selectedSubCategoryName
                              }
                            </span>
                          </Link>
                        </small>
                      </div>

                      <div className="stock-update">
                        <div className="stock-list">
                          <ul>
                            <li>
                              <span className="fs-6">{t("stock")} :</span>
                              <span className="red fs-6">
                                {product ? t("inStock") : t("outOfStock")}
                              </span>
                            </li>
                            <li>
                              <span className="fs-6">{t("size")} :</span>{" "}
                              <span className="fs-6">{product.sizes}</span>
                            </li>
                          </ul>
                        </div>
                        <div className="d-flex d-lg-none justify-content-center ms-auto">
                          <div className="pro-wish me-2">
                            <Heart
                              onClick={handleAddToWishList}
                              isLiked={isLiked}
                              setIsLiked={setIsLiked}
                            />
                          </div>
                          <div className="pro-wish">
                            <a
                              href="#"
                              className={"fs-3"}
                              onClick={() => setShareModal(true)}>
                              <i className="fas fa-share-alt" />
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="d-none d-lg-flex justify-content-center justify-content-lg-start mb-55 mt-30">
                        <div className="product-quantity">
                          <div className="cart-plus-minus">
                            <input
                              type="text"
                              onChange={(e) => setSizeNum(e.target.value)}
                              value={quantity}
                              disabled
                            />
                            <button
                              className="dec qtybutton cursor-pointer"
                              onClick={(e) =>
                                quantity !== 1 && setQuantity(quantity - 1)
                              }>
                              -
                            </button>
                            <button
                              className="inc qtybutton cursor-pointer"
                              onClick={onIncrementCart}>
                              +
                            </button>
                          </div>
                        </div>
                        <div
                          data-addtocart
                          ref={cartRef}
                          className="detailPos pro-cart-btn ms-2 ms-sm-3 ms-md-4 ms-lg-3 me-1 me-sm-3 cartContainer">
                          <a href="#" onClick={handleAddToCart}>
                            <i className="fas fa-cart-arrow-down fa-lg" />{" "}
                            {t("common:addtocart")}
                          </a>
                        </div>
                        <div className="d-none d-sm-block">
                          <div className="pro-wish me-2">
                            <Heart
                              onClick={handleAddToWishList}
                              isLiked={isLiked}
                              setIsLiked={setIsLiked}
                            />
                          </div>
                          <div className="pro-wish">
                            <a
                              href="#"
                              className={"fs-3"}
                              onClick={() => setShareModal(true)}>
                              <i className="fas fa-share-alt" />
                            </a>
                          </div>
                        </div>
                      </div>

                      {productVariants.length > 0 && (
                        <div className="product-details-info d-none d-lg-flex">
                          <div className="sidebar-product-color">
                            <h4 className="widget-title1 text-center text-md-start">
                              {t("otherColors")}
                            </h4>
                            <div
                              className="details-filter-row details-row-size"
                              style={{ margin: 5 }}>
                              {[productMain, ...productVariants]
                                .filter(
                                  (variant) =>
                                    variant.pictures && variant.pictures.length
                                )
                                .map((variant) => (
                                  <a
                                    onClick={() => {
                                      setProduct({
                                        ...variant,
                                        video_1: product.video_1,
                                      });
                                      setImageKey(0);
                                      router.push(
                                        `/detail/${encodeURLString(
                                          variant.productShortName
                                        )}:${
                                          variant.masterProductID
                                        }?selected=${variant.productID}`,
                                        undefined,
                                        { shallow: true }
                                      );
                                    }}
                                    href="#">
                                    <div
                                      className="details-filter-row details-row-size"
                                      style={{ margin: 5, cursor: "pointer" }}>
                                      <div className="product-nav product-nav-thumbs">
                                        <span className="productvar cursor-pointer">
                                          <Image
                                            // src={`${sources.imageMinSrc}${variant.picture_1}`}
                                            src={checkImage({
                                              source: sources.imageMinSrc,
                                              img: variant.picture_1,
                                            })}
                                            alt={variant.productShortName}
                                            title={variant.productShortName}
                                            width={90}
                                            height={140}
                                          />
                                        </span>
                                      </div>
                                    </div>
                                  </a>
                                ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <h1
                style={{
                  color: "#ccc",
                }}
                className="fs-6 me-2 text-end">
                ID: {product.productID}
              </h1>
            </section>
            <section className="pro-desc-area">
              <div className="container">
                <Tab.Container defaultActiveKey="dec">
                  <div className="pro-tab-border">
                    <div className="row">
                      <div className="col-lg-3">
                        <Nav as="nav">
                          <div
                            className="nav pro-desc-tab"
                            id="nav-tab"
                            role="tablist">
                            <Nav.Link
                              as="a"
                              className="c-pointer"
                              eventKey="dec">
                              {t("desc")}
                            </Nav.Link>
                            {/* <Nav.Link
                              as="a"
                              className="c-pointer"
                              eventKey="review">
                              Reviews (4)
                            </Nav.Link> */}
                          </div>
                        </Nav>
                      </div>
                      <div className="col-lg-9">
                        <Tab.Content className=" pro-desc-tab-content">
                          <Tab.Pane eventKey="dec">
                            <div className="desc-img-wrapper">
                              <div className="pro-desc-single">
                                <div className="row g-0">
                                  <div className="col-lg-10 col-width-20">
                                    <div className="pro-desc-text">
                                      <h4>{product && product.name}</h4>
                                      <p>
                                        {incomingProduct.productSelectedDetail}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey="review">
                            <p>{incomingProduct.productSelectedDetail}</p>
                          </Tab.Pane>
                        </Tab.Content>
                      </div>
                    </div>
                  </div>
                </Tab.Container>
              </div>
            </section>
          </Fragment>
        ) : (
          <h2 className="text-center pt-50 pb-50">No Product found</h2>
        )}
      </main>
    </Layout>
  );
};

export default Details;
