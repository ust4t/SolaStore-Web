import toast from "react-hot-toast";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SET_CART_DATA,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
} from "../context/types";
import useQueryMutation from "./useQueryMutation";

export default function useCart(dispatch) {
  const user = useSelector((state) => state.auth);
  const chooseId = user.state === "guest" ? user.uid : user.rnd_id;
  const { isLoading: isCartLoading, refetch: cartRefetch } = useQuery(
    `cart_${chooseId}`,
    () =>
      fetch(`/api/cart/getCartItems?user=${chooseId}`).then((res) =>
        res.json()
      ),
    {
      onSuccess: ({ data }) => {
        console.log("cart data", data);
        dispatch({
          type: SET_CART_DATA,
          payload: data,
        });
      },
    }
  );
  const { mutate } = useQueryMutation(`addCart_${chooseId}`);

  const addToCartAction = (creds) => {
    dispatch({
      type: ADD_TO_CART,
    });
    mutate(
      {
        url: `/api/cart/addToCart?user=${creds.user}&productID=${creds.id}`,
      },
      {
        onSuccess: ({ data }) => {
          cartRefetch();
          toast.success("Added order to cart");
        },
      }
    );
  };

  const removeFromCart = (creds) => {
    dispatch({
      type: REMOVE_FROM_CART,
    });
    mutate(
      {
        url: `/api/cart/removeFromCart?user=${creds.user}&ProductID=${creds.id}`,
      },
      {
        onSuccess: ({ data }) => {
          cartRefetch();
          toast.error("Removed From Cart");
        },
      }
    );
  };

  const incrementQuantity = (creds) => {
    dispatch({
      type: INCREMENT_QUANTITY,
    });
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
    dispatch({
      type: DECREMENT_QUANTITY,
    });
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
