import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import Link from "next/link";
import { useSelector } from "react-redux";
import useTranslation from "next-translate/useTranslation";

import Heart from "../../Heart";
import sources from "../../../../sources";
import { StoreContext } from "../../../context/StoreProvider";
import ShareModal from "../../Modals/ShareModal";
import {
  product_image_1,
  color_select,
  product_image_2,
  cart_button,
  cartBtnMobile,
  playBtn,
} from "./PopularCard.module.css";
import VideoModal from "../../Modals/VideoModal";
import { encodeURLString } from "../../../utils/utils";

function PopularCard({ productData }) {
  const { t } = useTranslation("common");
  const { id, name, images, price, oldPrice, singlePrice, sizes } = productData;
  const { auth, lang } = useSelector((state) => state);
  const { state, cartActions, wishListActions } = useContext(StoreContext);
  const { addToCartAction } = cartActions;
  const { addToWishList, removeFromWishList } = wishListActions;
  const [currentImages, setCurrentImages] = useState({
    id,
    selectedId: id,
    pictures: images,
  });
  const [shareModal, setShareModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [videoModal, setVideoModal] = useState(false);

  const sizeNum = (sizes && sizes.split("-").length) || 0;
  const oldUnitPrice = oldPrice / sizeNum;
  const originalDiscount = oldUnitPrice - singlePrice;

  const wishlist =
    state.wishlistData &&
    state.wishlistData.find((item) => item.productID === id);

  useEffect(() => {
    if (wishlist) setIsLiked(true);
  }, [wishlist]);

  const changeDressColor = (variant) => {
    if (variant.pictures) {
      setCurrentImages({
        id: variant.masterProductID,
        selectedId: variant.productID,
        pictures: variant.pictures,
      });
    } else {
      setCurrentImages({
        id,
        selectedId: id,
        pictures: variant.images,
      });
    }
  };

  const onMouseEnter = () => setCurrentImageIndex(1);

  const onMouseLeave = () => setCurrentImageIndex(0);

  const onAddToCart = () => {
    addToCartAction({
      user: auth.uid,
      id,
      quantity: 1,
    });
  };

  const onClickWishlist = (e) => {
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

  const checkVariantImage = (variant) => {
    if (variant.picture_1) {
      return `${sources.imageMinSrc}${variant.picture_1}`;
    } else if (Array.isArray(variant.images)) {
      return `${sources.imageMinSrc}${variant.images[0].guidName}`;
    } else {
      return "/images/placeholder.jpg";
    }
  };

  return (
    <div
      className="product-wrapper mb-40"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <ShareModal
        urlDetails={{
          url: "https://www.solastore.com.tr/detail/",
          id,
          name,
          pictures: !!currentImages.pictures.length
            ? `${sources.imageMidSrc}${currentImages.pictures[0].guidName}`
            : "/images/placeholder.jpg",
          query: `?selected=${currentImages.selectedId}`,
        }}
        show={shareModal}
        handleClose={() => setShareModal(false)}
      />
      <VideoModal
        link={`/detail/${encodeURLString(name)}:${id}?selected=${
          currentImages.selectedId
        }`}
        show={videoModal}
        handleClose={() => setVideoModal(false)}
        video={productData.video_1}
      />

      <div className="pro-img mb-20 position-relative">
        {!!oldPrice && oldPrice > 0 && (
          <span className="discount-tag">
            <span className="discount-amount">-{originalDiscount}$</span>
          </span>
        )}
        <span
          className="position-absolute top-0 start-0 translate-middle m-4 cursor-pointer"
          style={{
            zIndex: "150",
          }}>
          <Heart
            isLiked={isLiked}
            setIsLiked={setIsLiked}
            onClick={onClickWishlist}
            size="35px"
          />
        </span>
        {productData.video_1 && (
          <span
            onClick={() => setVideoModal(true)}
            className={`position-absolute translate-middle m-4 cursor-pointer ${playBtn}`}>
            <i className="fas fa-play" />
          </span>
        )}
        <span
          className="position-absolute start-0 translate-middle m-4 cursor-pointer d-block d-lg-none"
          style={{
            top: "45px",
            zIndex: "150",
          }}>
          <a
            onClick={(e) => {
              e.preventDefault();
              setShareModal(true);
            }}
            style={{
              fontSize: "1.3rem",
            }}
            href="#"
            data-toggle="tooltip"
            data-placement="top"
            title="Share">
            <i
              className="fas fa-share-alt"
              style={{
                color: "#adadad",
              }}></i>
          </a>
        </span>

        <span
          className={`animate__animated ${product_image_1} animate__faster ${
            !currentImageIndex
              ? "opacity-0 animate__fadeIn"
              : "opacity-100 animate__fadeOut"
          }`}>
          <Link
            href={{
              pathname: `/detail/${encodeURLString(name)}:${id}`,
              query: {
                selected: currentImages.selectedId,
              },
            }}
            locale={lang.lang}>
            <a>
              <Image
                className="pro-image-front"
                src={
                  !!currentImages.pictures.length &&
                  currentImages.pictures[0]?.guidName
                    ? `${sources.imageMidSrc}${currentImages.pictures[0].guidName}`
                    : "/images/placeholder.jpg"
                }
                width={400}
                height={600}
                alt={name}
                placeholder="blur"
                blurDataURL="/images/placeholder.jpg"
              />
            </a>
          </Link>
        </span>
        <span
          className={`animate__animated ${product_image_2} animate__faster ${
            currentImageIndex
              ? "opacity-0 animate__fadeIn"
              : "opacity-100 animate__fadeOut"
          }`}>
          <Link
            href={{
              pathname: `/detail/${encodeURLString(name)}:${id}`,
              query: {
                selected: currentImages.selectedId,
              },
            }}
            locale={lang.lang}>
            <a>
              <Image
                src={
                  !!currentImages.pictures.length &&
                  currentImages.pictures[1]?.guidName
                    ? `${sources.imageMidSrc}${currentImages.pictures[1].guidName}`
                    : "/images/placeholder.jpg"
                }
                alt={name}
                width={400}
                height={600}
                placeholder="blur"
                blurDataURL="/images/placeholder.jpg"
              />
            </a>
          </Link>
        </span>
        <div className="text-center d-block d-lg-none">
          <div
            className={`${cart_button} ${cartBtnMobile}`}
            onClick={onAddToCart}>
            {t("basket")}
          </div>
        </div>
        <div className="mb-4 product-action text-center">
          <span className="d-none d-lg-block">
            <a
              onClick={(e) => {
                e.preventDefault();
                setShareModal(true);
              }}
              className={`animate__animated animate__faster ${
                currentImageIndex ? "animate__fadeInUp" : "animate__fadeOutDown"
              }`}
              href="#"
              data-toggle="tooltip"
              data-placement="top"
              title="Share">
              <i className="fas fa-share-alt" />
            </a>
          </span>
        </div>
        <div
          className={`product-action text-center position-absolute bottom-0 start-50 translate-middle-x w-100 mb-0 p-0 d-none d-lg-block`}>
          <div
            className={`${cart_button} animate__animated animate__faster h-100 ${
              currentImageIndex ? "animate__fadeInUp" : "animate__fadeOutDown"
            }`}
            onClick={onAddToCart}>
            {t("basket")}
          </div>
        </div>
      </div>
      <div className="pro-text">
        <div className="pro-title">
          <h6>
            <Link
              href={{
                pathname: `/detail/${encodeURLString(name)}:${id}`,
                query: {
                  selected: currentImages.selectedId,
                },
              }}
              locale={lang.lang}>
              {name}
            </Link>
          </h6>

          {oldPrice > 0 && sizeNum ? (
            <>
              <h5>
                {price && (
                  <del className="text-danger">${oldUnitPrice} USD</del>
                )}
              </h5>
              <h5 className="pro-price">{price && `$${singlePrice} USD`}</h5>
            </>
          ) : (
            <>
              <br />
              <h5 className="pro-price">{price && `$${singlePrice} USD`}</h5>
            </>
          )}
        </div>
      </div>
      {!!productData?.variants && Array.isArray(images) && (
        <>
          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={0}
            centeredSlides={true}
            slidesPerView={5}
            navigation
            autoplay={{
              delay: 6000,
            }}>
            {[...productData.variants, { images }].map((variant, i) => (
              <SwiperSlide key={`${i}__..`}>
                <Image
                  className={color_select}
                  width={60}
                  height={60}
                  src={checkVariantImage(variant)}
                  priority={true}
                  onClick={() => changeDressColor(variant)}
                  placeholder="blur"
                  blurDataURL="/images/placeholder.jpg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </>
      )}
    </div>
  );
}

export default PopularCard;
