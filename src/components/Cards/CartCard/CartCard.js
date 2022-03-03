import Link from "next/link";

import sources from "../../../../sources";
import { encodeURLString } from "../../../utils/utils";
import CartAmount from "../../cart/CartAmount";

function CartCard({ cart, onCartRemove, onCartIncrease, onCartDecrease }) {
  return (
    <div className="py-2 col-12 border-bottom d-flex flex-column flex-sm-row justify-content-between align-items-center">
      <div className="d-flex d-sm-none w-100 px-2">
        <a href="#" onClick={onCartRemove}>
          <i
            className="fa fa-times text-danger"
            style={{
              fontSize: "1.4rem",
            }}
          />
        </a>
      </div>
      <div className="d-flex align-items-center ord">
        <Link
          href={{
            pathname: `/detail/${encodeURLString(cart.productShortName)}:${
              cart.productID
            }`,
            query: {
              selected: cart.productID,
            },
          }}>
          <a>
            <img
              className="img-fluid"
              src={`${sources.imageMinSrc}${cart.pictureOneGuidName}`}
              alt=""
            />
          </a>
        </Link>
      </div>
      <Link
        href={{
          pathname: `/detail/${encodeURLString(cart.productShortName)}:${
            cart.productID
          }`,
          query: {
            selected: cart.productID,
          },
        }}>
        <p className="fs-6 fw-bold my-2 m-sm-0">
          <a>{cart.productShortName}</a>
        </p>
      </Link>
      <p className="mb-0 fs-5">
        {cart.oldPrice > 0 ? (
          <>
            <del className="d-block mb-0 text-center text-danger">
              ${cart.oldPrice}
            </del>
            <span>${Number(cart.price).toFixed(2)}</span>
          </>
        ) : (
          <>
            <span className="red">${Number(cart.price).toFixed(2)}</span>
          </>
        )}
      </p>
      <CartAmount
        incrementQuantity={onCartIncrease}
        decrementQuantity={onCartDecrease}
        productID={cart.productID}
        cart={cart}
      />
      <div>
        <p className="mb-0 fs-5">
          <span className="red">
            ${Number(cart.price).toFixed(2) * cart.quantity}
          </span>
        </p>
      </div>
      <div className="d-none d-sm-block">
        <a href="#" onClick={onCartRemove}>
          <i
            className="fa fa-times text-danger"
            style={{
              fontSize: "1.4rem",
            }}
          />
        </a>
      </div>
    </div>
  );
}

export default CartCard;
