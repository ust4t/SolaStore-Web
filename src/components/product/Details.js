import { useRouter } from "next/router";
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

const Details = ({
  addToCart,
  decreaseCart,
  getSingleProduct,
  getCarts,
  addWishlist,
  getWishlist,
  carts,
  incomingProduct,
  wishlists,
  compares,
  compare,
  getProducts,
  getCompare,
  upcoming,
  upthumb,
}) => {
  const { state } = useContext(StoreContext);
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(incomingProduct);
  const videoRef = useRef();
  useEffect(() => {
    if (product.video_1 && videoRef.current) videoRef.current.pause();
    getCarts();
    getWishlist();
    // getProducts();
    getCompare();
    console.log(product);
  }, []);
  // const cart = product && carts && carts.find((cart) => cart.id === product.id);
  // const wishlist =
  //   product &&
  //   wishlists &&
  //   wishlists.find((wishlist) => wishlist.id === product.id);
  const compare_ =
    product &&
    compares &&
    compares.find((compare) => compare.id === product.id);

  const onClickCart = (e) => {
    e.preventDefault();
    // addToCart(product);
    toast.success("Add item in Cart.");
  };
  const onClickRemoveCart = (e) => {
    e.preventDefault();
    // decreaseCart(cart);
    toast.error("Remove item from Cart.");
  };
  const onClickWishlist = (e) => {
    e.preventDefault();
    addWishlist(product);
    if (wishlist) {
      toast.error("Remove item in wishlist.");
    } else {
      toast.success("Add item in wishlist.");
    }
  };
  const onClickCompares = (e) => {
    e.preventDefault();
    compare(product);
    if (compare_) {
      toast.error("Remove item in compare.");
    } else {
      toast.success("Add item in compare.");
    }
  };
  // let totalTime = time(product && product.upComeing);
  return (
    <Layout>
      <main>
        <PageTitle active="SHOP DETAILS" pageTitle="Our Shop" />
        {product ? (
          <Fragment>
            <section className="product-details-area pt-50 pb-50">
              <div className="container">
                <div className="row">
                  <div
                    className={` ${
                      upthumb ? "product-modal col-lg-5" : "col-lg-7"
                    }`}>
                    <Tab.Container defaultActiveKey="tum-0">
                      <div className="pro-details-tab">
                        <Tab.Content className="tab-content custom-content">
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
                        {/* {product && product.reating && (
                          <div className="details-rating  d-flex">
                            <Reating rating={product && product.reating} />
                            <span>(23 Customer Review)</span>
                          </div>
                        )} */}
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

                      <div className="col-12 mt-2">
                        <span>BEDEN: </span>
                        <span>{product.sizes}</span>
                      </div>

                      {/* <div className="pro-quan-area mb-55 mt-30">
                        <div className="product-quantity">
                          <div className="cart-plus-minus">
                            <input
                              type="text"
                              value={cart ? cart.qty : 1}
                              disabled
                            />
                            <button
                              className="dec qtybutton"
                              onClick={(e) =>
                                cart && cart.qty !== 1 && onClickRemoveCart(e)
                              }
                              disabled={cart ? false : true}
                            >
                              -
                            </button>
                            <button
                              className="inc qtybutton"
                              onClick={(e) => onClickCart(e)}
                              disabled={cart ? false : true}
                            >
                              +
                            </button>
                          </div>
                        </div> */}
                      {/* <div className="pro-cart-btn ml-20">
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              addToCart(product);
                              toast.success("Add item in Cart.");
                            }}
                          >
                            Add to cart
                          </a>
                        </div>
                        <div className="pro-wish ml-45">
                          <a
                            href="#"
                            className={`${wishlist ? "active_wishList" : ""} `}
                            onClick={(e) => onClickWishlist(e)}
                          >
                            <i className="fas fa-heart" />
                          </a>
                        </div>
                      </div> */}
                      {/* 
                      <div className="rating">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                      </div> */}

                      <div className="product-details-info">
                        <div className="sidebar-product-color">
                          <h4 className="widget-title1">
                            Ürünün diğer renkleri
                          </h4>
                          <div
                            className="details-filter-row details-row-size"
                            style={{ margin: 5 }}>
                            {[...state.detailVariants, incomingProduct].map(
                              (variant) => (
                                <div
                                  className="details-filter-row details-row-size"
                                  onClick={() => setProduct(variant)}
                                  style={{ margin: 5, cursor: "pointer" }}>
                                  <div className="product-nav product-nav-thumbs">
                                    <span
                                      className="productvar"
                                      style={{
                                        cursor: "pointer",
                                      }}>
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

                      <p></p>
                      {product.upComeing && (
                        <div className="product-coming variant-item mb-5 d-flex align-items-center">
                          <div className="variant-name me-4">
                            <span>time left</span>
                          </div>
                          <div className="event-timer details-timer d-flex">
                            <div className="cdown mb-1 days">
                              <p>
                                {totalTime.days} <br /> Days
                              </p>
                            </div>
                            <span className="cdown mb-1 hour">
                              <p>
                                {totalTime.hours} <br />
                                Hour
                              </p>
                            </span>
                            <span className="cdown mb-1 minutes">
                              <p>
                                {" "}
                                {totalTime.minutes} <br />
                                Min
                              </p>
                            </span>
                            <span className="cdown mb-1 second">
                              <span>
                                <p>
                                  {totalTime.seconds} <br />
                                  Sec
                                </p>
                              </span>
                            </span>
                          </div>
                        </div>
                      )}

                      {/* <div className="stock-update">
                        <div className="stock-list">
                          <ul>
                            <li>
                              <span>Stock :</span>{" "}
                              <span className="s-text red">
                                {product && product.stock
                                  ? "In Stock"
                                  : "Out Of Stock"}
                              </span>
                            </li>
                            <li>
                              <span>SKU :</span>{" "}
                              <span className="s-text">
                                {product &&
                                  product.category[0].split("")[0] + product.id}
                              </span>{" "}
                            </li>
                            <li>
                              <span>Categgory :</span>
                              <span className="s-text text-capitalize">
                                {product &&
                                  product.category.map((category, i) => (
                                    <Fragment key={i}>
                                      {"home_1home_2home_3home_4home_5".includes(
                                        category
                                      )
                                        ? ""
                                        : `${category}  ${
                                            product.category.length > 1 &&
                                            i !== product.category.length - 1
                                              ? ", "
                                              : ""
                                          }`}
                                    </Fragment>
                                  ))}
                              </span>
                            </li>
                            <li>
                              <span>Tag :</span>{" "}
                              <span className="s-text text-capitalize">
                                {" "}
                                {product &&
                                  product.tags.map((tags, i) => (
                                    <Fragment key={i}>
                                      {tags}
                                      {product.tags.length > 1 &&
                                      i !== product.tags.length - 1
                                        ? ", "
                                        : ""}
                                    </Fragment>
                                  ))}
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* product details area end */}
            {/* product desc area start */}
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
