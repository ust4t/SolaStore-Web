import Link from "next/link";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { connect, useSelector } from "react-redux";
import { addToCart, addWishlist } from "../../redux/action/utilis";
import ProductModal from "./ProductModal";
const ProductListView = ({ product, col5, addToCart, addWishlist }) => {
  const wishlist = useSelector((state) => state.utilis.wishlist);
  const [quickView, setQuickView] = useState(false);
  const [addCart, setaddCart] = useState(false);
  const [addWishlist_, setAddWishlist_] = useState(false);

  const onClickCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setaddCart(true);
    toast.success("Add item in Cart.");
  };
  const onClickWishlist = (e) => {
    e.preventDefault();
    addWishlist(product);
    setAddWishlist_(true);
    const wishlist_ = wishlist.find((wishlist) => wishlist.id === product.id);
    if (wishlist_) {
      toast.error("Remove item in wishlist.");
    } else {
      toast.success("Add item in wishlist.");
    }
  };

  return (
    <div className="row">
      <ProductModal
        show={quickView}
        handleClose={() => setQuickView(false)}
        product={product}
      />
      <div className={`col-lg-4 col-sm-6 custom-col-10`}>
        <div className="product-wrapper mb-30">
          <div className="pro-img mb-20">
            <Link href={`/shop/${product.masterProductID}`}>
              <a>
                <img src={product.img} alt="img 1" />
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
                <Link href={`/shop/${product.masterProductID}`}>
                  {product.name}
                </Link>
              </h6>
              <h5 className="pro-price">
                <span>{`$${Number(product.mainPrice).toFixed(2)} USD`}</span>
                {product.price && (
                  <del className="old-price ml-2">
                    {`$${Number(product.price).toFixed(2)} USD`}
                  </del>
                )}
              </h5>
            </div>
          </div>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt.
          </p>
          <div className="product-action">
            <a href="#" title="Shoppingb Cart" onClick={(e) => onClickCart(e)}>
              <i className="fal fa-cart-arrow-down" />
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setQuickView(true);
              }}>
              <i className="fal fa-eye" />
            </a>
            <a
              href="#"
              className={` ${
                wishlist && wishlist.find((pro) => pro.id === product.id)
                  ? "active"
                  : ""
              } `}
              onClick={(e) => onClickWishlist(e)}>
              <i className="fal fa-exchange" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { addToCart, addWishlist })(ProductListView);
