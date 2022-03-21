import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Router from "next/router";

import {
  embla__slide,
  embla__slide__inner,
  embla__slide__img,
  reelsFooter,
  videoFooter__record,
} from "./ReelsCard.module.css";
import Heart from "../../Heart";
import { StoreContext } from "../../../context/StoreProvider";
import { SET_STORY_PAGE } from "../../../redux/action/type";
import { encodeURLString } from "../../../utils/utils";

const ReelsCard = ({
  embla,
  videoRef,
  reelsData,
  setShareModal,
  onClose,
  inView,
}) => {
  const { video, name, id, index, picture, reelsLength } = reelsData;
  const { state, cartActions, wishListActions } = useContext(StoreContext);
  const { auth, page } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { addToCartAction } = cartActions;
  const { addToWishList, removeFromWishList } = wishListActions;
  const [isLiked, setIsLiked] = useState(false);
  const wishlist =
    state.wishlistData &&
    state.wishlistData.find((data) => data.masterProductID === id);
  const [paused, setPaused] = useState(false);

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

  const handlePlay = () => {
    if (paused) {
      videoRef.current[index].play();
    } else {
      videoRef.current[index].pause();
    }
  };

  const handleVideoEnded = () => {
    if (index === reelsLength - 1) {
      dispatch({
        type: SET_STORY_PAGE,
        payload: {
          page: page.page + 1,
          lastIndex: 0,
        },
      });
      Router.push({
        pathname: "/story",
        query: {
          page: page.page + 1,
          pageSize: 25,
        },
      });
      if (embla) embla.scrollTo(0);
      return;
    }
    if (embla) embla.scrollTo(embla.selectedScrollSnap() + 1);
    dispatch({
      type: SET_STORY_PAGE,
      payload: {
        page: page.page,
        lastIndex: embla.selectedScrollSnap(),
      },
    });
  };

  const handleStoryClose = () => {
    dispatch({
      type: SET_STORY_PAGE,
      payload: {
        page: page.page,
        lastIndex: embla.selectedScrollSnap(),
      },
    });
    onClose();
  };

  return (
    <div className={embla__slide}>
      <div className={embla__slide__inner}>
        <video
          poster={picture}
          preload="none"
          autoPlay
          accept="video/*"
          playsInline
          muted={false}
          // onClick={handlePlay}
          onPlay={() => setPaused(false)}
          onPause={() => setPaused(true)}
          onEnded={handleVideoEnded}
          ref={(el) => (videoRef.current[index] = el)}
          controls={false}
          className={embla__slide__img}
          src={inView || index === 0 ? video : ""}
        />
      </div>
      <div
        onClick={handleStoryClose}
        className="position-absolute"
        style={{
          top: "20px",
          right: "10px",
          filter: "drop-shadow(rgb(0, 0, 0, .5) 0px 0px 5px)",
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
          gap: "40px",
          zIndex: "5",
          bottom: "25px",
          right: "15px",
        }}
        className="position-absolute d-flex flex-column justify-content-center align-items-center">
        <div
          style={{
            display: "grid",
            placeItems: "center",
            filter: "drop-shadow(rgb(0, 0, 0, .5) 0px 0px 5px)",
          }}>
          <Heart
            isLiked={isLiked}
            onClick={() => handleLike(id)}
            style={{
              fontSize: "35px",
            }}
          />
        </div>
        <div
          onClick={() => handleAddToCart(id)}
          style={{
            display: "grid",
            placeItems: "center",
            filter: "drop-shadow(rgb(0, 0, 0, .5) 0px 0px 5px)",
            cursor: "pointer",
          }}>
          <i
            className="fas fa-cart-plus text-white"
            style={{
              fontSize: "30px",
            }}
          />
        </div>
        <div
          onClick={() =>
            Router.push({
              pathname: `/detail/${encodeURLString(name)}:${id}`,
              query: {
                selected: id,
              },
            })
          }
          style={{
            display: "grid",
            placeItems: "center",
            filter: "drop-shadow(rgb(0, 0, 0, .5) 0px 0px 5px)",
            cursor: "pointer",
          }}>
          <i
            className="fas fa-link text-white"
            style={{
              fontSize: "30px",
            }}
          />
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
            filter: "drop-shadow(rgb(0, 0, 0, .5) 0px 0px 5px)",
            cursor: "pointer",
          }}>
          <i
            className="fas fa-share text-white"
            style={{
              fontSize: "30px",
            }}
          />
        </div>
        <img
          src="/images/placeholder.jpg"
          width={50}
          height={50}
          onClick={handlePlay}
          className={videoFooter__record}
          style={{
            animationPlayState: paused ? "paused" : "running",
          }}
        />
      </div>
      <div
        className={`row position-absolute bottom-0 start-0 p-2 ${reelsFooter}`}>
        <div className="col-12">
          <h3 className="text-white">{name}</h3>
        </div>
      </div>
    </div>
  );
};

export default ReelsCard;
