import React from 'react';
import Link from 'next/link';
import BackgroundImage from '../BackgroundImage';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import sources from '../../../sources';
import styles from './Slider.module.css';
import { HomePageSliderWithArrow } from './HomePageSlider';

export default function SliderProducts({ sliders }) {
	return (
		<section className='hero-area position-relative '>
			<div className='hero-slider-two'>
				<div className='slider-active slider-active-one'>
					<HomePageSliderWithArrow>
						{sliders &&
							sliders.map(
								(
									{
										pictureID,
										guidName,
										selectedText1,
										selectedText2,
										selectedTextButton,
									},
									i
								) => (
									<div className='single-slider slider-height-two d-flex align-items-end bg-center-cover'>
										<div className='container'>
											<div className='row'>
												<div className='col-lg-12'>
													<div className='hero-caption-two mb-85 d-flex flex-column align-items-center justify-content-center'>
														<BackgroundImage
															key={`${pictureID}_-_${i}`}
															src={`${sources.slider}${guidName}`}
															objectFit='cover'
															objectPosition='center'
															layout='fill'
															quality={100}>
															<h5
																className='text-white fadeInUp wow text-uppercase text-shadow'
																data-animation='fadeInUp'
																data-delay='.2s'>
																{selectedText1}
															</h5>
															<h2
																className='text-white fadeInUp wow text-uppercase text-shadow'
																data-animation='fadeInUp'
																data-delay='.4s'>
																{selectedText2}
															</h2>
															<Link
																href={
																	selectedText1 === 'İNDİRİMLİ ÜRÜNLER'
																		? '/shop/saleproducts'
																		: '/shop/newproducts'
																}>
																<a
																	className={`${styles.sliderButton} w-25`}
																	rel='noopener noreferrer'>
																	{selectedTextButton}
																</a>
															</Link>
														</BackgroundImage>
													</div>
												</div>
											</div>
										</div>
									</div>
								)
							)}
					</HomePageSliderWithArrow>
				</div>
			</div>
		</section>
	);
}
