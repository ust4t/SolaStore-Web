import Link from "next/link";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import sources from "../../../sources";
import { StoreContext } from "../../context/StoreProvider";
import Heart from "../Heart";
// import ProductModal from "./ProductModal";

const ProductListView = ({ product, col5, addToCartAction }) => {
  const user = useSelector((state) => state.auth);
  const { wishListActions } = useContext(StoreContext);
  const { addToWishList, removeFromWishList } = wishListActions;
  const [isLiked, setIsLiked] = useState(false);
  // const [quickView, setQuickView] = useState(false);
  // const chooseId = user.state === "guest" ? user.uid : user.rnd_id;

  const onClickCart = (e) => {
    e.preventDefault();
    const productData = {
      id: product.productID,
      user: user.uid,
      quantity: 1,
    };
    addToCartAction(productData);
  };

  const onClickWishlist = () => {
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
  return (
    <div className="row">
      {/* <ProductModal
        show={quickView}
        handleClose={() => setQuickView(false)}
        product={product}
      /> */}
      <div className={`col-lg-4 col-sm-6 custom-col-10`}>
        <div className="product-wrapper mb-30">
          <div className="pro-img mb-20">
            <Link
              href={`/detail/${product.productShortName.replace(" ", "-")}:${
                product.productID
              }`}>
              <a>
                <img
                  src={`${sources.imageMidSrc}${product.picture_1}`}
                  alt="img 1"
                />
              </a>
            </Link>
            <div className="sale-tag">
              {product.new && <span className="new">new</span>}
              {product.sale && <span className="sale">sale</span>}
            </div>
          </div>
        </div>
      </div>
      <div className={`col-lg-8 col-sm-6 custom-col-10`}>
        <div className="product-wrapper pro-list-content mb-40">
          <div className="pro-text">
            <div className="pro-title">
              <h6>
                <Link
                  href={`/detail/${product.productShortName.replace(
                    " ",
                    "-"
                  )}:${product.productID}`}>
                  {product.productShortName}
                </Link>
              </h6>
              <h5 className="pro-price">
                {product.oldPrice > 0 ? (
                  <>
                    <del
                      style={{
                        color: "red",
                      }}
                      className="old-price ml-2">
                      {`$${Number(product.oldPrice)} USD`}
                    </del>
                    <h5 className="old-price ml-2">
                      {`$${Number(product.price)} USD`}
                    </h5>
                  </>
                ) : (
                  <h5 className="old-price ml-2">
                    {`$${Number(product.price)} USD`}
                  </h5>
                )}
              </h5>
            </div>
          </div>
          {product.selectedDetail && <p>{product.selectedDetail}</p>}
          <div className="product-action d-flex align-items-center">
            <a href="#" title="Shopping Cart" onClick={onClickCart}>
              <i className="fas fa-cart-arrow-down" />
            </a>
            <a
              style={{
                background: "transparent",
                boxShadow: "none",
              }}>
              <Heart
                isLiked={isLiked}
                setIsLiked={setIsLiked}
                onClick={onClickWishlist}
                size="35px"
              />
            </a>
            {/* <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setQuickView(true);
              }}>
              <i className="fas fa-eye" />
            </a> */}
            {/* <a
              href="#"
              className={` ${
                wishlist && wishlist.find((pro) => pro.id === product.id)
                  ? "active"
                  : ""
              } `}
              onClick={(e) => onClickWishlist(e)}>
              <i className="fal fa-exchange" />
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListView;
