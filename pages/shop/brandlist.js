import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch } from 'react-redux';

import sources from '../../sources';
import Layout from '../../src/layout/Layout';
import { SET_TITLE } from '../../src/redux/action/type';

export default function AllBrands({ brands }) {
	const dispatch = useDispatch();

	const changeTitle = (title) => {
		dispatch({
			type: SET_TITLE,
			payload: title,
		});
	};

	return (
		<Layout news={4} logoLeft layout={2} paymentOption>
			<main className='my-4'>
				<section className='container'>
					<div className='row gy-4'>
						{brands ? (
							brands.map(({ brandID, brandName, guidName2 }) => (
								<div
									className='col-6 col-md-4'
									onClick={() => changeTitle(brandName)}>
									<Link
										href={{
											pathname: '/shop',
											query: {
												categoryIds: '',
												brandIds: brandID,
												searchPrice: '',
											},
										}}>
										<Image
											src={`${sources.brand}${guidName2}`}
											width={200}
											height={150}
											layout='responsive'
											className='cursor-pointer'
										/>
									</Link>
								</div>
							))
						) : (
							<h2 className='pt-100 pb-50 text-center w-100'>
								No Product Found
							</h2>
						)}
					</div>
				</section>
			</main>
		</Layout>
	);
}

export async function getStaticProps() {
	const brandsRes = await fetch(
		`https://api.solastore.com.tr/api/Brand/GetAllBrands?sourceProof=${process.env.SOURCE_PROOF}`
	);

	const brands = await brandsRes.json();

	return {
		props: {
			brands,
		},
	};
}
