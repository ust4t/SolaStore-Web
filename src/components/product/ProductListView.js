import Link from 'next/link';
import { useState } from 'react';
import sources from '../../../sources';
import ProductModal from './ProductModal';
const ProductListView = ({ product, col5, addToCartAction }) => {
	const [quickView, setQuickView] = useState(false);

	const onClickCart = (e) => {
		e.preventDefault();
		const productData = {
			id: product.productID,
			user: '0d1c9955-326f-42fd-b04d-b745b80b70e3',
		};
		addToCartAction(productData);
	};
	const onClickWishlist = (e) => {
		e.preventDefault();
	};

	return (
		<div className='row'>
			<ProductModal
				show={quickView}
				handleClose={() => setQuickView(false)}
				product={product}
			/>
			<div className={`col-lg-4 col-sm-6 custom-col-10`}>
				<div className='product-wrapper mb-30'>
					<div className='pro-img mb-20'>
						<Link href={`/detail/${product.masterProductID}`}>
							<a>
								<img
									src={`${sources.imageMidSrc}${product.picture_1}`}
									alt='img 1'
								/>
							</a>
						</Link>
						<div className='sale-tag'>
							{product.new && <span className='new'>new</span>}
							{product.sale && <span className='sale'>sale</span>}
						</div>
					</div>
				</div>
			</div>
			<div className={`col-lg-8 col-sm-6 custom-col-10`}>
				<div className='product-wrapper pro-list-content mb-40'>
					<div className='pro-text'>
						<div className='pro-title'>
							<h6>
								<Link href={`/detail/${product.masterProductID}`}>
									{product.productShortName}
								</Link>
							</h6>
							<h5 className='pro-price'>
								{product.oldPrice > 0 ? (
									<>
										<del
											style={{
												color: 'red',
											}}
											className='old-price ml-2'>
											{`$${Number(product.oldPrice)} USD`}
										</del>
										<h5 className='old-price ml-2'>
											{`$${Number(product.price)} USD`}
										</h5>
									</>
								) : (
									<h5 className='old-price ml-2'>
										{`$${Number(product.price)} USD`}
									</h5>
								)}
							</h5>
						</div>
					</div>
					{product.selectedDetail && <p>{product.selectedDetail}</p>}
					<div className='product-action'>
						<a href='#' title='Shopping Cart' onClick={onClickCart}>
							<i className='fal fa-cart-arrow-down' />
						</a>
						<a
							href='#'
							onClick={(e) => {
								e.preventDefault();
								setQuickView(true);
							}}>
							<i className='fal fa-eye' />
						</a>
						{/* <a
              href="#"
              className={` ${
                wishlist && wishlist.find((pro) => pro.id === product.id)
                  ? "active"
                  : ""
              } `}
              onClick={(e) => onClickWishlist(e)}>
              <i className="fal fa-exchange" />
            </a> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductListView;
