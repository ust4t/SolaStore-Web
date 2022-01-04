import { Fragment, useEffect } from "react";
import { Modal, Nav, Tab } from "react-bootstrap";
import toast from "react-hot-toast";
import { connect } from "react-redux";
import {
  addToCart,
  addWishlist,
  compare,
  decreaseCart,
  getCarts,
  getCompare,
  getWishlist,
} from "../../redux/action/utilis";
import Reating from "./Reating";
import sources from "../../../sources";

const ProductModal = ({
  show,
  handleClose,
  product,
  carts,
  wishlists,
  addToCart,
  addWishlist,
  decreaseCart,
  getCarts,
  getWishlist,
  getCompare,
  compares,
  compare,
  mainPrice,
  price,
}) => {
  useEffect(() => {
    getCarts();
    getWishlist();
    getCompare();
  }, []);
  // const cart = product && carts && carts.find((cart) => cart.id === product.id);
  // const wishlist =
  //   product &&
  //   wishlists &&
  //   wishlists.find((wishlist) => wishlist.id === product.id);
  // const compare_ =
  //   product &&
  //   compares &&
  //   compares.find((compare) => compare.id === product.id);

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
    // addWishlist(product);
    // if (wishlist) {
    //   toast.error("Remove item in wishlist.");
    // } else {
    //   toast.success("Add item in wishlist.");
    // }
  };
  const onClickCompares = (e) => {
    e.preventDefault();
    // compare(product);
    // if (compare_) {
    //   toast.error("Remove item in compare.");
    // } else {
    //   toast.success("Add item in compare.");
    // }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Body>
        <div className="product-details-area product-modal">
          <div>
            <i
              className="fa fa-times modal-icon "
              onClick={() => handleClose()}
            />
          </div>
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <Tab.Container defaultActiveKey="tum-0">
                <div className="pro-details-tab">
                  <Tab.Content className="tab-content custom-content">
                    {product &&
                      product.pictures.map((img, i) => (
                        <Tab.Pane
                          key={`${img.productID}__${img.brandID}`}
                          eventKey={`tum-${i}`}>
                          <img
                            src={`${sources.imageMidSrc}${img.guidName}`}
                            className="img-fluid"
                            alt="Tum img"
                          />
                        </Tab.Pane>
                      ))}
                  </Tab.Content>
                  <Nav
                    className="nav custom-tab mt-3"
                    id="myTab"
                    role="tablist">
                    {product &&
                      product.pictures.map((img, i) => (
                        <Nav.Item key={i}>
                          <Nav.Link eventKey={`tum-${i}`}>
                            <img
                              src={`${sources.imageMinSrc}${img.guidName}`}
                              className="img-fluid"
                              alt="Src"
                            />
                          </Nav.Link>
                        </Nav.Item>
                      ))}
                  </Nav>
                </div>
              </Tab.Container>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="pro-details-content mt-15">
                <h4>{product && product.productShortName}</h4>
                {/* {product && product.reating && (
                  <div className="details-rating mb-10">
                    <Reating rating={product && product.reating} />
                    <span>(23 Customer Review)</span>
                  </div>
                )} */}
                <span className="details-pro-price mb-40">
                  {/* $ {product && Number(product.mainPrice).toFixed(2)}{" "} */}
                  {product &&
                    product.price &&
                    `- $${product && Number(product.price).toFixed(2)}`}
                </span>
                <p>
                  La croix blog sriracha, distillery ugh small batch retro
                  literally coloring book disrupt gochujang affogato. Edison
                  bulb. The next generation of our icon library + toolkit is
                  coming with more icons, more styles, more services..
                </p>
                <div className="pro-quan-area mb-55">
                  <div className="product-quantity">
                    <div className="cart-plus-minus">
                      {/* <input type="text" value={cart ? cart.qty : 1} disabled /> */}
                      <button
                        className="dec qtybutton"
                        // onClick={(e) =>
                        //   cart && cart.qty !== 1 && onClickRemoveCart(e)
                        // }
                        // disabled={cart ? false : true}
                        disabled
                        >
                        -
                      </button>
                      <button
                        className="inc qtybutton"
                        // onClick={(e) => onClickCart(e)}
                        // disabled={cart ? false : true}
                        disabled>
                        +
                      </button>
                    </div>
                  </div>
                  <div className="pro-cart-btn ms-10">
                    <a
                      href="#"
                      // onClick={(e) => {
                      //   e.preventDefault();
                      //   addToCart(product);
                      //   toast.success("Add item in Cart.");
                      // }}
                      >
                      Add to cart
                    </a>
                  </div>
                  <div className="pro-wish ml-20">
                    <a
                      href="#"
                      // className={`${wishlist ? "active_wishList" : ""} `}
                      className={`${true ? "active_wishList" : ""} `}
                      // onClick={(e) => onClickWishlist(e)}
                      >
                      <i className="fas fa-heart" />
                    </a>
                  </div>
                </div>

                <div className="stock-update">
                  <div className="stock-list">
                    <ul>
                      <li>
                        <span>Stock :</span>{" "}
                        <span className="s-text red">
                          {/* {product && product.stock
                            ? "In Stock"
                            : "Out Of Stock"} */}
                          {product 
                            ? "In Stock"
                            : "Out Of Stock"}
                        </span>
                      </li>
                      <li>
                        <span>SKU :</span>{" "}
                        {/* <span className="s-text">
                          {product &&
                            product.category[0].split("")[0] + product.id}
                        </span>{" "} */}
                      </li>
                      <li>
                        <span>Categgory :</span>{" "}
                        <span className="s-text text-capitalize">
                          {" "}
                          {/* {product &&
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
                            ))} */}
                        </span>
                      </li>
                      <li>
                        <span>Tag :</span>{" "}
                        <span className="s-text text-capitalize">
                          {" "}
                          {/* {product &&
                            product.tags.map((tags, i) => (
                              <Fragment key={i}>
                                {tags}
                                {product.tags.length > 1 &&
                                i !== product.tags.length - 1
                                  ? ", "
                                  : ""}
                              </Fragment>
                            ))} */}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  carts: state.utilis.carts,
  wishlists: state.utilis.wishlist,
  compares: state.utilis.compares,
});

export default connect(mapStateToProps, {
  addToCart,
  decreaseCart,
  getCarts,
  addWishlist,
  getWishlist,
  getCompare,
  compare,
})(ProductModal);
