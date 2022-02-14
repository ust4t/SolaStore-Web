import React, { useContext, useState } from "react";

import {
  embla__slide,
  embla__slide__inner,
  embla__slide__img,
  reelsFooter,
  videoFooter__record,
} from "./ReelsCard.module.css";
import Heart from "../../Heart";
import sources from "../../../../sources";
import { StoreContext } from "../../../context/StoreProvider";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ReelsCard = ({ embla, videoRef, reelsData, setShareModal, onClose }) => {
  const { video, name, id, index, picture } = reelsData;
  const { state, cartActions, wishListActions } = useContext(StoreContext);
  const auth = useSelector((state) => state.auth);
  const { addToCartAction } = cartActions;
  const { addToWishList, removeFromWishList } = wishListActions;
  const [isLiked, setIsLiked] = useState(false);
  const wishlist =
    state.wishlistData &&
    state.wishlistData.find((data) => data.masterProductID === id);

  useEffect(() => {
    if (wishlist) {
      setIsLiked(true);
    }
  }, [wishlist]);

  const handleAddToCart = (id) => {
    addToCartAction({
      user: auth.uid,
      id,
      quantity: 1,
    });
  };

  const handleLike = (id) => {
    if (!isLiked) {
      addToWishList({
        user: auth.uid,
        id,
      });
      setIsLiked(true);
      return;
    }

    removeFromWishList({
      user: auth.uid,
      id,
    });
    setIsLiked(false);
    return;
  };

  return (
    <div className={embla__slide}>
      <div className={embla__slide__inner}>
        <video
          onEnded={() =>
            embla && embla.scrollTo(embla.selectedScrollSnap() + 1)
          }
          ref={(el) => (videoRef.current[index] = el)}
          controls
          className={embla__slide__img}
          src={`${sources.videos}${video}`}
        />
      </div>
      <div
        onClick={onClose}
        className="position-absolute"
        style={{
          top: "20px",
          right: "10px",
          filter: "drop-shadow(0px 0px 10px #000)",
          cursor: "pointer",
        }}>
        <i
          style={{
            fontSize: "30px",
          }}
          className="fas fa-times text-white"
        />
      </div>
      <div
        style={{
          gap: "45px",
          zIndex: "5",
          bottom: "25px",
          right: "5px",
        }}
        className="position-absolute d-flex flex-column justify-content-center align-items-center">
        <div
          style={{
            display: "grid",
            placeItems: "center",
            filter: "drop-shadow(0px 0px 10px #000)",
          }}>
          <Heart isLiked={isLiked} onClick={() => handleLike(id)} />
          <h6 className="text-white">Нравится</h6>
        </div>
        <div
          onClick={() => handleAddToCart(id)}
          style={{
            display: "grid",
            placeItems: "center",
            filter: "drop-shadow(0px 0px 10px #000)",
            cursor: "pointer",
          }}>
          <i
            className="fas fa-plus text-white"
            style={{
              fontSize: "30px",
            }}
          />
          <h6 className="text-white">Добавлять</h6>
        </div>

        <div
          onClick={() =>
            setShareModal({
              isOpen: true,
              details: {
                url: "https://www.solastore.com.tr/detail/",
                name,
                id,
                picture,
              },
            })
          }
          style={{
            display: "grid",
            placeItems: "center",
            filter: "drop-shadow(0px 0px 10px #000)",
            cursor: "pointer",
          }}>
          <i
            className="fas fa-share text-white"
            style={{
              fontSize: "30px",
            }}
          />
          <h6 className="text-white">доля</h6>
        </div>
        <i
          className={`fas fa-compact-disc text-white ${videoFooter__record}`}
        />
      </div>
      <div
        className={`row position-absolute bottom-0 start-0 p-2 ${reelsFooter}`}>
        <div className="col-12">
          <h3 className="text-white fs-3">{name}</h3>
        </div>
      </div>
    </div>
  );
};

export default ReelsCard;
