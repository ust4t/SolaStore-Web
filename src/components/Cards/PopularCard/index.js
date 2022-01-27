import React, { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import Heart from '../../Heart';
import ProductModal from '../../product/ProductModal';
import sources from '../../../../sources';

import { StoreContext } from '../../../context/StoreProvider';
import ShareModal from '../../Modals/ShareModal';
import useTranslation from 'next-translate/useTranslation';

function PopularCard({ productData }) {
	const { t } = useTranslation('common');
	const { id, name, images, price, oldPrice, singlePrice, sizes } = productData;
	const { auth, lang } = useSelector((state) => state);
	const { state, cartActions, wishListActions } = useContext(StoreContext);
	const { addToCartAction } = cartActions;
	const { addToWishList, removeFromWishList } = wishListActions;
	const [currentImages, setCurrentImages] = useState({
		id,
		pictures: images,
	});
	const [quickView, setQuickView] = useState(false);
	const [shareModal, setShareModal] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [isLiked, setIsLiked] = useState(false);

	const sizeNum = (sizes && sizes.split('-').length) || 0;
	const oldUnitPrice = oldPrice / sizeNum;
	const originalDiscount = oldUnitPrice - singlePrice;

	useEffect(() => {
		const wishlist =
			state.wishlistData &&
			state.wishlistData.find((item) => item.productID === id);
		if (wishlist) {
			setIsLiked(true);
		}
	}, []);

	const changeDressColor = (variant) => {
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
	};

	const onMouseEnter = () => setCurrentImageIndex(1);

	const onMouseLeave = () => setCurrentImageIndex(0);

	const onAddToCart = () =>
		addToCartAction({
			user: auth.uid,
			id,
		});

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
			return '/img/placeholder.jpg';
		}
	};

	return (
		<div
			className='product-wrapper mb-40'
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
			<ShareModal
				urlDetails={{
					id,
					pictures: currentImages.pictures,
				}}
				show={shareModal}
				handleClose={() => setShareModal(false)}
			/>
			<div className='pro-img mb-20 position-relative'>
				{!!oldPrice && oldPrice > 0 && (
					<span className='discount-tag'>
						<span className='discount-amount'>-{originalDiscount}$</span>
					</span>
				)}
				<span
					className='position-absolute top-0 start-0 translate-middle m-4 z-index-first cursor-pointer'
					onClick={onClickWishlist}>
					<Heart isLiked={isLiked} setIsLiked={setIsLiked} size='35px' />
				</span>

				<span
					className={`animate__animated product-image-1 animate__faster ${
						!currentImageIndex
							? 'opacity-0 animate__fadeIn'
							: 'opacity-100 animate__fadeOut'
					}`}>
					<Link href={`/detail/${id}`} locale={lang}>
						<a>
							<Image
								src={`${
									currentImages.pictures[0]
										? `${sources.imageMidSrc}${currentImages.pictures[0].guidName}`
										: '/img/placeholder.jpg'
								}`}
								width={400}
								height={600}
								alt={name}
								placeholder='blur'
								blurDataURL='/img/loadingImg.jpg'
							/>
						</a>
					</Link>
				</span>
				<span
					className={`animate__animated product-image-2 animate__faster ${
						currentImageIndex
							? 'opacity-0 animate__fadeIn'
							: 'opacity-100 animate__fadeOut'
					}`}>
					<Link href={`/detail/${id}`} locale={lang}>
						<a>
							<Image
								src={`${
									currentImages.pictures[1]
										? `${sources.imageMidSrc}${currentImages.pictures[1].guidName}`
										: '/img/placeholder.jpg'
								}`}
								alt={name}
								width={400}
								height={600}
								placeholder='blur'
								blurDataURL='/img/loadingImg.jpg'
							/>
						</a>
					</Link>
				</span>
				<div className='mb-4 product-action text-center'>
					<a
						className={`animate__animated animate__faster ${
							currentImageIndex ? 'animate__fadeInUp' : 'animate__fadeOutDown'
						}`}
						href='#'
						onClick={(e) => {
							e.preventDefault();
							setQuickView(true);
						}}
						data-toggle='tooltip'
						data-placement='top'
						title='Quick View'>
						<i className='fas fa-eye' />
					</a>
					<a
						onClick={(e) => {
							e.preventDefault();
							setShareModal(true);
						}}
						className={`animate__animated animate__faster ${
							currentImageIndex ? 'animate__fadeInUp' : 'animate__fadeOutDown'
						}`}
						href='#'
						data-toggle='tooltip'
						data-placement='top'
						title='Share'>
						<i className='fas fa-share-alt'></i>
					</a>
				</div>
				<div className='product-action text-center position-absolute bottom-0 start-50 translate-middle-x w-100 mb-0 p-0 '>
					<div
						className={`cart-button animate__animated animate__faster h-100 ${
							currentImageIndex ? 'animate__fadeInUp' : 'animate__fadeOutDown'
						}`}
						onClick={onAddToCart}>
						{t('basket')}
					</div>
				</div>
			</div>
			<div className='pro-text'>
				<div className='pro-title'>
					<h6>
						<Link href={`/detail/${id}`} locale={lang}>
							{name}
						</Link>
					</h6>

					{oldPrice > 0 && sizeNum ? (
						<>
							<h5>
								{price && (
									<del className='text-danger'>${oldUnitPrice} USD</del>
								)}
							</h5>
							<h5 className='pro-price'>{price && `$${singlePrice} USD`}</h5>
						</>
					) : (
						<>
							<br />
							<h5 className='pro-price'>{price && `$${singlePrice} USD`}</h5>
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
									className='color-select'
									width={60}
									height={60}
									src={checkVariantImage(variant)}
									priority={true}
									onClick={() => changeDressColor(variant)}
									placeholder='blur'
									blurDataURL='/img/loadingImg.jpg'
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
