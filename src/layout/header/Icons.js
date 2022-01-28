import { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSelector } from 'react-redux';

import { Menu, Dropdown } from 'antd';
import ColorfulText from '../../components/ColorfulText';
import CartProductItem from '../../components/CartProductItem';
import { StoreContext } from '../../context/StoreProvider';
import sources from '../../../sources';

export const SearchIcon = ({ hendelChangeSearch }) => (
	<Link href='#'>
		<a
			className='search-btn nav-search search-trigger'
			onClick={() => hendelChangeSearch()}>
			<i className='fas fa-search' />
		</a>
	</Link>
);

export const UserIcon = () => {
	const name = useSelector((state) => state.auth.name);
	return (
		<Link href='/login'>
			<a className='d-flex align-items-end justify-content-center'>
				<i className='fas fa-user favf' />
				<h6 className='fs-6 fw-bold'>{name}</h6>
			</a>
		</Link>
	);
};
export const WishlistIcon = () => {
	const { state } = useContext(StoreContext);
	return (
		<Link href='/wishlist'>
			<a className='position-relative'>
				<span className='iconValue'>
					{state.wishlistData ? state.wishlistData.length : 0}
				</span>
				<i className='fas fa-heart favf' />
			</a>
		</Link>
	);
};

export const CartIcon = () => {
	const { state } = useContext(StoreContext);

	const cartsNum =
		state.cartData &&
		state.cartData.reduce((quantity, currQty) => {
			return quantity + currQty.quantity;
		}, 0);

	const totalPrice =
		state.cartData &&
		state.cartData.reduce((price, currPrice) => {
			return price + currPrice.price;
		}, 0);

	const menu = (
		<Menu style={{ padding: 15, maxHeight: '400px', overflowY: 'scroll' }}>
			<div style={{ display: 'flex', justifyContent: 'end' }}>
				<ColorfulText>${totalPrice || 0}</ColorfulText>
			</div>
			{state.cartData &&
				state.cartData.map(
					({
						chartID,
						pictureOneGuidName,
						price,
						productShortName,
						productID,
						quantity,
					}) => (
						<CartProductItem
							key={chartID}
							image={`${sources.imageMinSrc}${pictureOneGuidName}`}
							name={productShortName}
							price={price}
							id={productID}
							quantity={quantity}
						/>
					)
				)}
		</Menu>
	);
	return (
		<Link href='/cart'>
			<Dropdown overlay={menu} placement='topRight'>
				<a className='position-relative'>
					<span className='iconValue'>{cartsNum || 0}</span>
					<i className='fas fa-cart-arrow-down favf' />
				</a>
			</Dropdown>
		</Link>
	);
};

export const Logo = () => (
	<div className='logo product-details-logo'>
		<Link href='/'>
			<a>
				<Image src='/img/logo/logo.png' alt='Logo' width='120' height='80' />
			</a>
		</Link>
	</div>
);
export const HamburgerIcon = ({ sidebarActive, darkBg }) => (
	<div className={`hamburger-menu text-end `}>
		<Link href='#'>
			<a
				className={darkBg ? 'text-white' : ''}
				onClick={(e) => {
					e.preventDefault();
					sidebarActive();
				}}>
				<i className='fas fa-bars' />
			</a>
		</Link>
	</div>
);
