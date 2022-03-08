import { useContext } from "react";
import { useSelector } from "react-redux";
import useTranslation from "next-translate/useTranslation";

import Layout from "../src/layout/Layout";
import PageTitle from "../src/layout/PageTitle";
import { StoreContext } from "../src/context/StoreProvider";
import WishlistCard from "../src/components/Cards/WishlistCard";

const Wishlist = () => {
  const { t } = useTranslation("wishlist");
  const user = useSelector((state) => state.auth);
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
    <Layout news={4} logoLeft layout={2} paymentOption={true} hideWheel={true}>
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
                    <div className="overflow-hidden border border-1 p-2 rounded-3">
                      {wishlist &&
                        wishlist.map((wishlistItem, i) => (
                          <WishlistCard
                            key={`${wishlistItem.productID}--*?${i}`}
                            wishlist={wishlistItem}
                            onAddToCart={() =>
                              handleAddToCart(wishlistItem.productID)
                            }
                            onWishlistRemove={() =>
                              handleWishlistRemove(wishlistItem.productID)
                            }
                          />
                        ))}
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
