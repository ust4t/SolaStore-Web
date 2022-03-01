import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import useTranslation from "next-translate/useTranslation";

import { SET_CART_DATA } from "../context/types";
import useQueryMutation from "./useQueryMutation";

export default function useCart(dispatch) {
  const user = useSelector((state) => state.auth);
  const { t } = useTranslation("common");
  const { isLoading: isCartLoading, refetch: cartRefetch } = useQuery(
    `cart_${user.uid}`,
    () =>
      fetch(`/api/cart/getCartItems?user=${user.uid}`).then((res) =>
        res.json()
      ),
    {
      onSuccess: ({ data }) => {
        dispatch({
          type: SET_CART_DATA,
          payload: data,
        });
      },
    }
  );
  const { mutate } = useQueryMutation(`addCart_${user.uid}`);

  const addToCartAction = (creds) => {
    mutate(
      {
        url: `/api/cart/addToCart?user=${creds.user}&productID=${creds.id}&quantity=${creds.quantity}`,
      },
      {
        onSuccess: () => {
          cartRefetch();
          toast.success(t("cartAdded"));
        },
      }
    );
  };

  const removeFromCart = (creds) => {
    mutate(
      {
        url: `/api/cart/removeFromCart?user=${creds.user}&ProductID=${creds.id}`,
      },
      {
        onSuccess: ({ data }) => {
          cartRefetch();
          toast.error(t("cartRemoved"));
        },
      }
    );
  };

  const incrementQuantity = (creds) => {
    mutate(
      {
        url: `/api/cart/increaseProductCount?user=${creds.user}&ProductID=${creds.id}`,
      },
      {
        onSuccess: ({ data }) => {
          cartRefetch();
          toast.success("Increased Quantity");
        },
      }
    );
  };

  const decrementQuantity = (creds) => {
    mutate(
      {
        url: `/api/cart/decreaseProductCount?user=${creds.user}&ProductID=${creds.id}`,
      },
      {
        onSuccess: ({ data }) => {
          cartRefetch();
          toast.error("Decreased Quantity");
        },
      }
    );
  };

  const cartActions = {
    addToCartAction,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    cartRefetch,
  };

  return {
    cartActions,
    isCartLoading,
  };
}
