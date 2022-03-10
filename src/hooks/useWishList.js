import useTranslation from "next-translate/useTranslation";
import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

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
          toast.success(t("addWishlist"));
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
          toast.error(t("removedfromlist"));
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
