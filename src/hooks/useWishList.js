import useTranslation from "next-translate/useTranslation";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import AnimatedToast from "../components/Toasts/AnimatedToast";
import FavoriteAnim from "../../public/lottie/favorite.json";
import { SET_WISHLIST_DATA } from "../context/types";
import useQueryMutation from "./useQueryMutation";

export default function useWishList(dispatch) {
  const { t } = useTranslation("common");
  const { lang, auth } = useSelector((state) => state);
  const { isLoading: isWishlistLoading, refetch: wishlistRefetch } = useQuery(
    "wishlist",
    () =>
      fetch(
        `/api/wishlist/getUserFavorites?user=${auth.uid}&lang=${lang.lang}`
      ).then((res) => res.json()),
    {
      onSuccess: ({ data }) => {
        dispatch({
          type: SET_WISHLIST_DATA,
          payload: auth.uid ? data : [],
        });
      },
    }
  );
  const { mutate } = useQueryMutation(`wishlistMutate_${auth.uid}`);

  const addToWishList = (creds) => {
    mutate(
      {
        url: `/api/wishlist/addFavoriteProduct?user=${creds.user}&productID=${creds.id}`,
      },
      {
        onSuccess: () => {
          wishlistRefetch();
          // toast.success(t("addWishlist"));
          toast(
            (ht) => (
              <AnimatedToast
                animationData={FavoriteAnim}
                message={t("addWishlist")}
                hotToast={ht}
                messageSize="1.7rem"
                config={{
                  style: {
                    width: "155px",
                    height: "155px",
                  },
                }}
              />
            ),
            {
              duration: 1500,
              position: "top-center",
            }
          );
        },
      }
    );
  };

  const removeFromWishList = (creds) => {
    mutate(
      {
        url: `/api/wishlist/removeFavoriteProduct?user=${creds.user}&productID=${creds.id}`,
      },
      {
        onSuccess: () => {
          wishlistRefetch();
          // toast.error(t("removedfromlist"));
          toast(
            (ht) => (
              <AnimatedToast
                animationData={FavoriteAnim}
                message={t("removedfromlist")}
                hotToast={ht}
                messageSize="1.7rem"
                config={{
                  style: {
                    width: "155px",
                    height: "155px",
                  },
                }}
              />
            ),
            {
              duration: 1500,
              position: "top-center",
            }
          );
        },
      }
    );
  };

  const wishListActions = {
    addToWishList,
    removeFromWishList,
    wishlistRefetch,
  };

  return {
    wishListActions,
    isWishlistLoading,
  };
}
