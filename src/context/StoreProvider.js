import { createContext, useReducer } from "react";
import initialState from "./store";
import reducer from "./reducer";
import useCartMutation from "../hooks/useCartMutation";
import {
  ADD_TO_CART,
  DECREMENT_QUANTITY,
  INCREMENT_QUANTITY,
  REMOVE_FROM_CART,
  SET_CART_DATA,
} from "./types";
import toast from "react-hot-toast";
import { useQuery } from "react-query";

export const StoreContext = createContext();

export default function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { isLoading: isCartLoading, refetch: cartRefetch } = useQuery(
    "cart",
    () =>
      fetch(
        `/api/cart/getCartItems?user=${"0d1c9955-326f-42fd-b04d-b745b80b70e3"}`
      ).then((res) => res.json()),
    {
      onSuccess: ({ data }) => {
        dispatch({
          type: SET_CART_DATA,
          payload: data,
        });
      },
    }
  );

  const { mutate } = useCartMutation("addCart");

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
  };
  return (
    <StoreContext.Provider
      value={{
        state,
        dispatch,
        cartActions,
        isCartLoading,
      }}>
      {children}
    </StoreContext.Provider>
  );
}
