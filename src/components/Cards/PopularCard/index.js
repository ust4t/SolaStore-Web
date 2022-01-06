import React, { useContext, useState } from "react";
import Image from "next/image";
import { Col, Row } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
// import "swiper/css";
import Link from "next/link";

import toast from "react-hot-toast";
import { useRouter } from "next/router";

import ColorfulText from "../../ColorfulText";
import Heart from "../../Heart";
import ProductModal from "../../product/ProductModal";
import sources from "../../../../sources";
import { addToCart } from "../../../redux/action/utilis";
import { connect } from "react-redux";
import { getProducts } from "../../../redux/action/product";
import { StoreContext } from "../../../context/StoreProvider";
import { SET_DETAILS } from "../../../context/types";
import { useIsMutating } from "react-query";

function ProductCard({ productData, addToCart }) {
  const { id, name, images, price, oldPrice, variants } = productData;
  const router = useRouter();
  const { state, dispatch, cartActions } = useContext(StoreContext);
  const { addToCartAction } = cartActions;
  const [currentImages, setCurrentImages] = useState({
    id,
    pictures: images,
  });
  const [quickView, setQuickView] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const isMutating = useIsMutating({ mutationKey: `addCart_${id}` });

  const originalDiscount = oldPrice - price;

  const rate = 0.7;

  const changeDressColor = (imagesArray) => {
    setCurrentImages(imagesArray);
  };

  const onMouseEnter = () => {
    setCurrentImageIndex(1);
  };
  const onMouseLeave = () => {
    setCurrentImageIndex(0);
  };
  const onAddToCart = () => {
    addToCartAction({
      user: "0d1c9955-326f-42fd-b04d-b745b80b70e3",
      id,
    });
  };

  const navigateToDetail = () => {
    dispatch({
      type: SET_DETAILS,
      payload: variants,
    });
    router.push({
      pathname: `/${id}`,
    });
  };

  // return (
  //   <div
  //     className="product-card"
  //     style={{
  //       margin: "20px",
  //     }}>
  //     <Col
  //       className="product-image-container"
  //       onMouseEnter={onMouseEnter}
  //       onMouseLeave={onMouseLeave}>
  //       <Row className="product-header">
  //         {!!oldPrice && oldPrice > 0 && (
  //           <ColorfulText
  //             style={{ height: 22 }}>{`↓ $${originalDiscount}`}</ColorfulText>
  //         )}
  //         <div
  //           style={{
  //             paddingLeft: 10,
  //             paddingRight: 10,
  //           }}>
  //           <Heart isLiked={isLiked} setIsLiked={setIsLiked} />
  //         </div>
  //       </Row>
  //       <div
  //         className={`add-to-cart animate__animated animate__faster ${
  //           currentImageIndex ? "animate__fadeInUp" : "animate__fadeOutDown"
  //         }`}
  //         onClick={onAddToCart}>
  //         {isMutating > 0 ? "Loading......" : "Sepete Ekle"}
  //       </div>

  //       <div
  //         className={`product-image-1 animate__animated animate__faster ${
  //           !currentImageIndex ? "animate__fadeIn" : "animate__fadeOut"
  //         }`}>
  //         {/* <Link href={`/shop/${currentImages.id}`}> */}
  //         {/* default images */}
  //         <Image
  //           onClick={navigateToDetail}
  //           src={`${sources.imageMidSrc}${currentImages.pictures[0].guidName}`}
  //           width={400 * rate}
  //           height={600 * rate}
  //           priority={true}
  //         />
  //         {/* </Link> */}
  //       </div>
  //       <div
  //         className={`product-image-2 animate__animated animate__faster ${
  //           currentImageIndex ? "animate__fadeIn" : "animate__fadeOut"
  //         }`}>
  //         {/* <Link href={`/shop/${currentImages.id}`}> */}
  //         {/* hover images */}
  //         <Image
  //           onClick={navigateToDetail}
  //           src={`${sources.imageMidSrc}${currentImages.pictures[1].guidName}`}
  //           width={400 * rate}
  //           height={600 * rate}
  //           priority={true}
  //         />
  //         {/* </Link> */}
  //       </div>
  //     </Col>
  //     {/* <Link href={`/shop/${currentImages.id}`}> */}
  //     <div
  //       onClick={navigateToDetail}
  //       className="product-card-name"
  //       style={{
  //         fontSize: "1rem",
  //       }}>
  //       {name}
  //     </div>
  //     {/* </Link> */}
  //     <div className="product-card-price">{`$ ${price}`}</div>

  //     <Row className="select-colors">
  //       <Swiper
  //         modules={[Autoplay, Navigation]}
  //         spaceBetween={0}
  //         centeredSlides={true}
  //         slidesPerView={5}
  //         navigation
  //         autoplay={{
  //           delay: 6000,
  //         }}>
  //         {variants &&
  //           [...variants, { images }].map((variant, i) => (
  //             <SwiperSlide>
  //               <Image
  //                 key={`${i}__`}
  //                 className="color-select"
  //                 width={60}
  //                 height={60}
  //                 src={`${sources.imageMinSrc}${
  //                   variant.picture_1 || variant.images[0].guidName
  //                 }`}
  //                 priority={true}
  //                 onClick={() => {
  //                   if (variant.pictures) {
  //                     setCurrentImages({
  //                       id: variant.productID,
  //                       pictures: variant.pictures,
  //                     });
  //                   } else {
  //                     setCurrentImages({
  //                       id,
  //                       pictures: variant.images,
  //                     });
  //                   }
  //                 }}
  //               />
  //             </SwiperSlide>
  //           ))}
  //       </Swiper>
  //     </Row>
  //   </div>
  // );

  return (
    <div
      className="product-wrapper mb-40"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      <ProductModal
        show={quickView}
        handleClose={() => setQuickView(false)}
        product={{
          productID: id,
          productShortName: name,
          pictures: images,
          ...productData,
        }}
      />
      <div className="pro-img mb-20 position-relative">
        {!!oldPrice && oldPrice > 0 && (
          <span className="discount-tag">
            <span className="discount-amount">-{originalDiscount}$</span>
          </span>
        )}
        <span
          className="position-absolute top-0 start-0 translate-middle m-4 z-index-first cursor-pointer"
          // onClick={(e) => onClickWishlist(e)}
          // className={` ${
          //   wishlist && wishlist.find((pro) => pro.id === currentImages.id)
          //     ? "active"
          //     : ""
          // } `}
        >
          <Heart isLiked={isLiked} setIsLiked={setIsLiked} size="35px" />
        </span>
        <span>
          <Link href={`/${id}`}>
            <a>
              <img
                className={`  animate__animated product-image-1 animate__faster img-fluid ${
                  !currentImageIndex
                    ? "opacity-0 animate__fadeIn"
                    : "opacity-100 animate__fadeOut"
                }`}
                src={`${sources.imageMidSrc}${currentImages.pictures[0].guidName}`}
                alt="Product"
                loading="lazy"
              />
            </a>
          </Link>
        </span>
        <span>
          <Link href={`/${id}`}>
            <a>
              <img
                className={` animate__animated product-image-2 animate__faster img-fluid ${
                  currentImageIndex
                    ? "opacity-0 animate__fadeIn"
                    : "opacity-100 animate__fadeOut"
                }`}
                src={`${sources.imageMidSrc}${currentImages.pictures[1].guidName}`}
                alt="Product"
                loading="lazy"
              />
            </a>
          </Link>
        </span>

        <div className="mb-4 product-action text-center">
          <a
            className={`animate__animated animate__faster ${
              currentImageIndex ? "animate__fadeInUp" : "animate__fadeOutDown"
            }`}
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setQuickView(true);
            }}
            data-toggle="tooltip"
            data-placement="top"
            title="Quick View">
            <i className="fal fa-eye" />
          </a>
          <a
            className={`animate__animated animate__faster ${
              currentImageIndex ? "animate__fadeInUp" : "animate__fadeOutDown"
            }`}
            href="#"
            data-toggle="tooltip"
            data-placement="top"
            title="Share">
            <i className="fas fa-share-alt"></i>
          </a>
        </div>
        <div className="product-action text-center position-absolute bottom-0 start-50 translate-middle-x w-100 mb-0 p-0 ">
          <div
            className={`cart-button animate__animated animate__faster h-100 ${
              currentImageIndex ? "animate__fadeInUp" : "animate__fadeOutDown"
            }`}
            onClick={onAddToCart}>
            Sepete Ekle
          </div>
        </div>
      </div>
      <div className="pro-text">
        <div className="pro-title">
          <h6>
            <Link href={`/${id}`}>{name}</Link>
          </h6>

          {oldPrice > 0 ? (
            <>
              <h5>
                {price && (
                  <del
                    style={{
                      color: "red !important",
                    }}>
                    ${Number(oldPrice)} USD
                  </del>
                )}
              </h5>
              <h5 className="pro-price">{price && `$${Number(price)} USD`}</h5>
            </>
          ) : (
            <h5 className="pro-price">{price && `$${Number(price)} USD`}</h5>
          )}
        </div>
      </div>
      {productData.variants && (
        <Row className="select-colors">
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
              <SwiperSlide>
                <Image
                  key={`${i}__`}
                  className="color-select"
                  width={60}
                  height={60}
                  src={`${sources.imageMinSrc}${
                    variant.picture_1 || variant.images[0].guidName
                  }`}
                  priority={true}
                  onClick={() => {
                    if (variant.pictures) {
                      setCurrentImages({
                        id: variant.productID,
                        pictures: variant.pictures,
                      });
                    } else {
                      setCurrentImages({
                        id,
                        pictures: variant.images,
                      });
                    }
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </Row>
      )}
    </div>
  );
}

export default connect(null, {
  addToCart,
  getProducts,
})(ProductCard);
