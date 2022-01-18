import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { connect } from "react-redux";

import sources from "../../../sources";
import { StoreContext } from "../../context/StoreProvider";
import Layout from "../../layout/Layout";
import PageTitle from "../../layout/PageTitle";
import { getProducts, getSingleProduct } from "../../redux/action/product";
import {
  addToCart,
  addWishlist,
  compare,
  decreaseCart,
  getCarts,
  getCompare,
  getWishlist,
} from "../../redux/action/utilis";
import { simpleProductFilter } from "../../utils/filterProduct";
import time from "../../utils/time";
import RelatedProduct from "../sliders/RelatedProduct";
import Product from "./Product";
import Reating from "./Reating";
import ShareModal from "./ShareModal";

const Details = ({
  productVariants,
  addWishlist,
  incomingProduct,
  compares,
  compare,
  getCompare,
  upthumb,
}) => {
  const { state, cartActions, wishListActions } = useContext(StoreContext);
  const { addToCartAction, incrementQuantity, decrementQuantity } = cartActions;
  const { addToWishList, removeFromWishList } = wishListActions;
  const [product, setProduct] = useState(incomingProduct);
  const [shareModal, setShareModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const videoRef = useRef();

  const cart =
    product &&
    state.cartData &&
    state.cartData.find((cart) => cart.productID === product.productID);

  useEffect(() => {
    if (product.video_1 && videoRef.current) videoRef.current.pause();
    const wishlist =
      state.wishlistData &&
      state.wishlistData.find(
        (wishlist) => wishlist.productID === product.productID
      );
    setIsLiked(wishlist ? true : false);
  }, []);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCartAction({
      id: product.productID,
      user: "0d1c9955-326f-42fd-b04d-b745b80b70e3",
    });
  };

  const onIncrementCart = (e) => {
    e.preventDefault();
    incrementQuantity({
      id: product.productID,
      user: "0d1c9955-326f-42fd-b04d-b745b80b70e3",
    });
  };
  const onDecrementCart = (e) => {
    e.preventDefault();
    decrementQuantity({
      id: product.productID,
      user: "0d1c9955-326f-42fd-b04d-b745b80b70e3",
    });
  };
  const handleAddToWishList = (e) => {
    e.preventDefault();
    if (!isLiked) {
      addToWishList({
        id: product.productID,
        user: "0d1c9955-326f-42fd-b04d-b745b80b70e3",
      });
      setIsLiked(true);
      return;
    }
    removeFromWishList({
      id: product.productID,
      user: "0d1c9955-326f-42fd-b04d-b745b80b70e3",
    });
    setIsLiked(false);
    return;
  };
  return (
    <Layout news={4} logoLeft layout={2} paymentOption>
      <main>
        <PageTitle active="SHOP DETAILS" pageTitle="Our Shop" />
        {product ? (
          <Fragment>
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
                    <Tab.Container defaultActiveKey="tum-0">
                      <div className="pro-details-tab">
                        <Tab.Content className="tab-content custom-content">
                          {product.video_1 && (
                            <Tab.Pane eventKey={`tum-${12}`}>
                              <video
                                id="videoProductDetail"
                                className="img-fluid"
                                controls
                                autoPlay
                                ref={videoRef}
                                width="536"
                                height="870">
                                <source
                                  src={`${sources.videos}${product.video_1}`}
                                  type="video/mp4"
                                />
                              </video>
                            </Tab.Pane>
                          )}
                          {product &&
                            product.pictures.map((img, i) => (
                              <Tab.Pane key={i} eventKey={`tum-${i}`}>
                                <img
                                  src={`${sources.imageMaxSrc}${img.guidName}`}
                                  className={`img-fluid ${
                                    upthumb ? "mb-3" : ""
                                  }`}
                                  alt="Tum img"
                                />
                              </Tab.Pane>
                            ))}
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
                                    if (product.video_1)
                                      videoRef.current.pause();
                                  }}>
                                  <img
                                    src={`${sources.imageMaxSrc}${img.guidName}`}
                                    className="img-fluid"
                                    alt="Src"
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
                                }}
                                eventKey={`tum-${12}`}
                                className="mr-0">
                                <img
                                  src={`${sources.imageMaxSrc}${product.picture_1}`}
                                  className="img-fluid"
                                  alt="Src"
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
                      <div className="col-8 col-md-4 py-3 border-right">
                        <span className="details-pro-price mb-40">
                          {product &&
                            product.price &&
                            `$${product && Number(product.price).toFixed(2)}`}
                        </span>
                      </div>
                      <div className="col-8 col-md-4 py-3">
                        <small>
                          <span>Ürün kodu: {product.productStockCode}</span>
                        </small>
                        <br />
                        <small>
                          <span className="text-muted">Kategori:</span>
                          <a href="/kisa_elbise-c-26">KISA ELBİSE</a>
                        </small>
                        <br />
                        <small>
                          <span className="text-muted">Marka:</span>
                          <a href="/Category/index?Type=Brand&amp;BrandID=13">
                            LADYFORM
                          </a>
                        </small>
                      </div>
                      <div className="col-4 col-md-4">
                        <div className="card border p-2">
                          <a href="/Category/index?Type=Brand&amp;BrandID=13">
                            <img
                              src="../img/brand/3af4332a-1.jpg"
                              className="card-img"
                            />
                          </a>
                          <p className="card-body text-center px-1 py-0">
                            <small>
                              <a href="#">LADYFORM</a>
                            </small>
                          </p>
                        </div>
                      </div>
                      <div className="stock-update">
                        <div className="stock-list">
                          <ul>
                            <li>
                              <span className="fs-6">Stock :</span>
                              <span className="red fs-6">
                                {product ? "In Stock" : "Out Of Stock"}
                              </span>
                            </li>
                            <li>
                              <span className="fs-6">SKU :</span>{" "}
                              <span className="fs-6"></span>{" "}
                            </li>
                            <li>
                              <span className="fs-6">Beden :</span>{" "}
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
                        <div className="pro-cart-btn ml-20">
                          <a href="#" onClick={handleAddToCart}>
                            Add to cart
                          </a>
                        </div>
                        <div className="pro-wish ml-30">
                          <a
                            href="#"
                            className={`fs-3 ${
                              isLiked ? "active_wishList" : ""
                            } `}
                            onClick={handleAddToWishList}>
                            <i className="fas fa-heart" />
                          </a>
                        </div>
                        <div className="pro-wish ml-20">
                          <a
                            href="#"
                            className={"fs-3"}
                            onClick={() => setShareModal(true)}>
                            <i className="fas fa-share-alt" />
                          </a>
                        </div>
                      </div>

                      <div className="product-details-info">
                        <div className="sidebar-product-color">
                          <h4 className="widget-title1">
                            Ürünün diğer renkleri
                          </h4>
                          <div
                            className="details-filter-row details-row-size"
                            style={{ margin: 5 }}>
                            {[incomingProduct, ...productVariants].map(
                              (variant) => (
                                <div
                                  className="details-filter-row details-row-size"
                                  onClick={() => setProduct(variant)}
                                  style={{ margin: 5, cursor: "pointer" }}>
                                  <div className="product-nav product-nav-thumbs">
                                    <span className="productvar cursor-pointer">
                                      <img
                                        src={`${sources.imageMinSrc}${variant.picture_1}`}
                                        alt={variant.productShortName}
                                        title={variant.productShortName}
                                        style={{ maxWidth: 90 }}
                                      />
                                    </span>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
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
                              Description
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
                                      <p>{product.productSelectedDetail}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Tab.Pane>
                          <Tab.Pane eventKey="review">
                            <p>
                              Duis aute irure dolor in reprehenderit in
                              voluptate velit esse cillum dolore eu fugiat nulla
                              pariatur. Excepteur sint occaecat cupidatat non
                              proident, sunt in culpa deserunt mollit anim id
                              est laborum.
                            </p>
                          </Tab.Pane>
                        </Tab.Content>
                      </div>
                    </div>
                  </div>
                </Tab.Container>
              </div>
            </section>
            <div className="product-details pt-100">
              {/* <RelatedProduct>
                {products &&
                  simpleProductFilter(
                    product && product.category[0],
                    products
                  ).map((product) => (
                    <Product key={product.id} product={product} />
                  ))}
              </RelatedProduct> */}
            </div>
          </Fragment>
        ) : (
          <h2 className="text-center pt-50 pb-50">No Product found</h2>
        )}
      </main>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  // products: state.product.products,
  detail: state.product,
  // product: state.product,
  carts: state.utilis.carts,
  wishlists: state.utilis.wishlist,
  compares: state.utilis.compares,
});

export default connect(mapStateToProps, {
  addToCart,
  decreaseCart,
  getCarts,
  getSingleProduct,
  addWishlist,
  getWishlist,
  getProducts,
  getCompare,
  compare,
})(Details);
