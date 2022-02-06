import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

import sources from "../../../sources";
import { StoreContext } from "../../context/StoreProvider";
import Layout from "../../layout/Layout";
// import PageTitle from '../../layout/PageTitle';

// import RelatedProduct from '../sliders/RelatedProduct';
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
} from "./Details.module.css";
import { Arrow } from "../sliders/SliderArrows";
import Heart from "../Heart";
import Head from "next/head";

const Details = ({ productVariants, incomingProduct, brand, upthumb }) => {
  const { t } = useTranslation("detail");
  const user = useSelector((state) => state.auth);
  const chooseId = user.state === "guest" ? user.uid : user.rnd_id;
  const { state, cartActions, wishListActions } = useContext(StoreContext);
  const { addToCartAction, incrementQuantity, decrementQuantity } = cartActions;
  const { addToWishList, removeFromWishList } = wishListActions;
  const [product, setProduct] = useState(incomingProduct);
  const [shareModal, setShareModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageKey, setImageKey] = useState(0);
  const videoRef = useRef();
  const cart =
    product &&
    state.cartData &&
    state.cartData.find((cart) => cart.productID === product.productID);

  const sizeNum = (product.sizes && product.sizes.split("-").length) || 0;
  const oldUnitPrice = product.oldPrice / sizeNum;
  const productSize = [...product.pictures, product.video_1].filter(
    (item) => item !== null
  ).length;
  useEffect(() => {
    if (product.video_1 && videoRef.current) videoRef.current.pause();
  }, [product]);

  useEffect(() => {
    const wishlist =
      product &&
      state.wishlistData &&
      state.wishlistData.find(
        (wishlist) => wishlist.productID === product.productID
      );
    setIsLiked(wishlist ? true : false);
  }, []);

  const handleCartAnim = () => {
    let imgtodrag = document.getElementsByClassName("detailPos")[0];
    let viewcart = document.getElementsByClassName("cartToDrag")[0];
    let imgtodragImage = document.querySelector(".detail-image-front");

    let disLeft = imgtodrag.getBoundingClientRect().left;
    let disTop = imgtodrag.getBoundingClientRect().top;
    let cartleft = viewcart.getBoundingClientRect().left;
    let carttop = viewcart.getBoundingClientRect().top;
    let image = imgtodragImage.cloneNode(true);

    image.style =
      "z-index: 1111; width: 100px;opacity:0.8; position:fixed; top:" +
      disTop +
      "px;left:" +
      disLeft +
      "px;transition: left 2s, top 2s, width 7s, opacity 8s cubic-bezier(1, 1, 1, 1)";
    var rechange = document.body.appendChild(image);
    setTimeout(function () {
      image.style.left = cartleft + "px";
      image.style.top = carttop + "px";
      image.style.width = "40px";
      image.style.opacity = "0";
    }, 200);
    setTimeout(function () {
      rechange.parentNode.removeChild(rechange);
    }, 3000);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCartAction({
      id: product.productID,
      user: chooseId,
    });

    handleCartAnim();
  };

  const onIncrementCart = (e) => {
    e.preventDefault();
    incrementQuantity({
      id: product.productID,
      user: chooseId,
    });
  };
  const onDecrementCart = (e) => {
    e.preventDefault();
    decrementQuantity({
      id: product.productID,
      user: chooseId,
    });
  };
  const handleAddToWishList = () => {
    if (!isLiked) {
      addToWishList({
        id: product.productID,
        user: chooseId,
      });
      setIsLiked(true);
      return;
    }
    removeFromWishList({
      id: product.productID,
      user: chooseId,
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

  return (
    <Layout news={4} logoLeft layout={2} paymentOption>
      <main>
        {product ? (
          <Fragment>
            <Head>
              <title>Solastore | {product.productShortName}</title>
            </Head>
            <section className="product-details-area pt-50 pb-50">
              <ShareModal
                urlDetails={{
                  id: product.productID,
                  pictures: product.pictures,
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
                      <div className="pro-details-tab">
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
                                  src={`${sources.imageMaxSrc}${img.guidName}`}
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
                          className="nav custom-tab"
                          id="myTab"
                          role="tablist">
                          {product &&
                            product.pictures.map((img, i) => (
                              <Nav.Item key={i}>
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
                                    src={`${sources.imageMaxSrc}${img.guidName}`}
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
                                  src={`${sources.imageMaxSrc}${product.picture_1}`}
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
                      <div className="col-5 col-md-4">
                        <div className="card border p-2">
                          <Link
                            href={{
                              pathname: "/shop",
                              query: {
                                categoryIds: "",
                                brandIds: brand.brandID,
                                searchPrice: "",
                              },
                            }}>
                            <div>
                              <Image
                                className="cursor-pointer"
                                src={`${sources.brand}${brand.guidName2}`}
                                width="180"
                                height="130"
                                layout="responsive"
                                quality={50}
                              />
                            </div>
                          </Link>
                          <p className="card-body text-center px-1 py-0 m-0 my-1">
                            <Link
                              href={{
                                pathname: "/shop",
                                query: {
                                  categoryIds: "",
                                  brandIds: brand.brandID,
                                  searchPrice: "",
                                },
                              }}>
                              <span className={brandStyle}>
                                {brand.brandName}
                              </span>
                            </Link>
                          </p>
                        </div>
                      </div>
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
                          <span className="text-muted">
                            {t("category")}:{" "}
                            <span className="text-dark">KATEGORI</span>
                          </span>
                        </small>
                        <br />
                        <small>
                          <span className="text-muted">{t("brand")}:</span>
                          <Link
                            href={{
                              pathname: "/shop",
                              query: {
                                categoryIds: "",
                                brandIds: brand.brandID,
                                searchPrice: "",
                              },
                            }}>
                            <span
                              className={`${brandStyle} ${smallBrandStyle}`}>
                              {brand.brandName}
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
                      </div>

                      <div className="pro-quan-area mb-55 mt-30">
                        <div className="product-quantity">
                          <div className="cart-plus-minus">
                            <input
                              type="text"
                              value={cart ? cart.quantity : 1}
                              readOnly
                              disabled
                            />
                            <button
                              className="dec qtybutton cursor-pointer"
                              onClick={(e) =>
                                cart &&
                                cart.quantity !== 1 &&
                                onDecrementCart(e)
                              }
                              disabled={cart ? false : true}>
                              -
                            </button>
                            <button
                              className="inc qtybutton cursor-pointer"
                              onClick={onIncrementCart}
                              disabled={cart ? false : true}>
                              +
                            </button>
                          </div>
                        </div>
                        <div className="detailPos pro-cart-btn ms-2 ms-sm-3 ms-md-4 ms-lg-3 me-1 me-sm-3">
                          <a href="#" onClick={handleAddToCart}>
                            <i className="fas fa-cart-arrow-down fa-lg" /> Add
                            to cart
                          </a>
                        </div>
                        <div>
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
                        <div className="product-details-info">
                          <div className="sidebar-product-color">
                            <h4 className="widget-title1 text-center text-md-start">
                              {t("otherColors")}
                            </h4>
                            <div
                              className="details-filter-row details-row-size"
                              style={{ margin: 5 }}>
                              {[incomingProduct, ...productVariants]
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
                                    }}
                                    href="#">
                                    <div
                                      className="details-filter-row details-row-size"
                                      style={{ margin: 5, cursor: "pointer" }}>
                                      <div className="product-nav product-nav-thumbs">
                                        <span className="productvar cursor-pointer">
                                          <Image
                                            src={`${sources.imageMinSrc}${variant.picture_1}`}
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
                            <Nav.Link
                              as="a"
                              className="c-pointer"
                              eventKey="review">
                              Reviews (4)
                            </Nav.Link>
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
            {/* <div className="product-details pt-100">
              <RelatedProduct>
                {products &&
                  simpleProductFilter(
                    product && product.category[0],
                    products
                  ).map((product) => (
                    <Product key={product.id} product={product} />
                  ))}
              </RelatedProduct> 
            </div>
          */}
          </Fragment>
        ) : (
          <h2 className="text-center pt-50 pb-50">No Product found</h2>
        )}
      </main>
    </Layout>
  );
};

export default Details;
