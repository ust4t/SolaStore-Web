import { createContext, useReducer } from "react";
import initialState from "./store";
import reducer from "./reducer";
import useCart from "../hooks/useCart";
import useWishList from "../hooks/useWishList";

export const StoreContext = createContext();

export default function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cartActions, isCartLoading } = useCart(dispatch);
  const { wishListActions, isWishlistLoading } = useWishList(dispatch);

  return (
    <StoreContext.Provider
      value={{
        state,
        dispatch,
        cartActions,
        isCartLoading,
        wishListActions,
        isWishlistLoading,
      }}>
      {children}
    </StoreContext.Provider>
  );
}
