import { useContext } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

import Layout from "../src/layout/Layout";
import PageTitle from "../src/layout/PageTitle";
import { StoreContext } from "../src/context/StoreProvider";
import sources from "../sources";

const Wishlist = () => {
  const { t } = useTranslation("wishlist");
  const user = useSelector((state) => state.auth);
  // const chooseId = user.state === "guest" ? user.uid : user.rnd_id;
  const { state, wishListActions, cartActions } = useContext(StoreContext);
  const { removeFromWishList } = wishListActions;
  const { addToCartAction } = cartActions;

  const wishlist = state.wishlistData;

  const handleWishlistRemove = (id) => {
    removeFromWishList({
      id,
      user: user.uid,
    });
  };

  const handleAddToCart = (id) => {
    addToCartAction({
      id,
      user: user.uid,
      quantity: 1,
    });
  };

  return (
    <Layout news={4} logoLeft layout={2} paymentOption>
      <main>
        <PageTitle
          active={t("title")}
          pageTitle={t("title")}
          navigation={false}
        />
        {wishlist && wishlist.length > 0 ? (
          <section className="cart-area pt-100 pb-100">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <form action="#" onSubmit={(e) => e.preventDefault()}>
                    <div className="table-content table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="product-thumbnail">Images</th>
                            <th className="cart-product-name">Product</th>
                            <th className="product-price">Unit Price</th>
                            <th className="product-quantity">Quantity</th>
                            <th className="product-remove">Remove</th>
                          </tr>
                        </thead>
                        <tbody>
                          {wishlist &&
                            wishlist.map(
                              (
                                {
                                  picture_1,
                                  productID,
                                  productShortName,
                                  singlePrice,
                                },
                                i
                              ) => (
                                <tr key={`${productID}--*?${i}`}>
                                  <td className="product-thumbnail">
                                    <Link
                                      href={`/detail/${productShortName
                                        .toLowerCase()
                                        .replace(" ", "-")}:${productID}`}>
                                      <a>
                                        <Image
                                          src={`${sources.imageMidSrc}${picture_1}`}
                                          alt="wishlist"
                                          width="210"
                                          height="300"
                                        />
                                      </a>
                                    </Link>
                                  </td>
                                  <td className="product-name">
                                    <Link
                                      href={`/detail/${productShortName
                                        .toLowerCase()
                                        .replace(" ", "-")}:${productID}`}>
                                      <a href="#">{productShortName}</a>
                                    </Link>
                                  </td>
                                  <td className="product-price">
                                    <span className="amount">
                                      ${Number(singlePrice).toFixed(2)}
                                    </span>
                                  </td>
                                  <td className="product-quantity">
                                    <Link href="#">
                                      <a
                                        className="bt-btn theme-btn-2"
                                        onClick={() =>
                                          handleAddToCart(productID)
                                        }>
                                        {t("common:basket")}
                                      </a>
                                    </Link>
                                  </td>
                                  <td className="product-remove">
                                    <a
                                      href="#"
                                      onClick={() =>
                                        handleWishlistRemove(productID)
                                      }>
                                      <i className="fa fa-times" />
                                    </a>
                                  </td>
                                </tr>
                              )
                            )}
                        </tbody>
                      </table>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <h2 className="pt-100 pb-50 text-center w-100">
            {t("wishlistEmpty")}
          </h2>
        )}
      </main>
    </Layout>
  );
};

export default Wishlist;
