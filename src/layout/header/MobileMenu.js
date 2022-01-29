import MetisMenu from '@metismenu/react';
import Link from 'next/link';
import { Fragment } from 'react';
import { connect } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';

import InnerMobileMenu from './InnerMobileMenu';
const MobileMenu = ({ menu, sidebarActive, sidebarClose }) => {
	const { t } = useTranslation('common');
	return (
		<Fragment>
			<aside className={`slide-bar ${sidebarActive}`}>
				<div className='close-mobile-menu'>
					<a
						href='#'
						onClick={(e) => {
							sidebarClose();
							e.preventDefault();
						}}>
						<i className='fas fa-times' />
					</a>
				</div>
				{/* side-mobile-menu start */}
				<nav className='side-mobile-menu'>
					<MetisMenu id='mobile-menu-active' className='metismenu'>
						<li>
							<Link href='/'>
								<a>{t('menu.home')}</a>
							</Link>
						</li>
						<li>
							<Link href='/shop/brandlist'>
								<a>{t('menu.brands')}</a>
							</Link>
						</li>
						{menu &&
							menu.map(
								({ selectedCategoryName, categoryID, subcategories }, i) => (
									<li key={`${categoryID}?=)${i}`} className='has-dropdown'>
										<Link
											href={{
												pathname: '/shop',
												query: {
													categoryIds: categoryID,
													brandIds: '',
													searchPrice: '',
												},
											}}>
											<a>{selectedCategoryName}</a>
										</Link>
										<InnerMobileMenu subcategories={subcategories} />
									</li>
								)
							)}

						<li>
							<Link href='/'>
								<a>{t('menu.contact')}</a>
							</Link>
						</li>
					</MetisMenu>
				</nav>
			</aside>
			<div
				className={`body-overlay ${sidebarActive ? 'active' : ''}`}
				onClick={sidebarClose}
			/>
		</Fragment>
	);
};

const mapStateToProps = (state) => ({
	menu: state.menu.menuData,
});

export default connect(mapStateToProps)(MobileMenu);
