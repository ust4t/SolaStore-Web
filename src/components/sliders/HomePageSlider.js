import Slider from 'react-slick';
import { Arrow } from './SliderArrows';
export const HomePageSliderWithArrow = ({ children, extraClass }) => {
	var settings = {
		autoplay: true,
		autoplaySpeed: 5000,
		dots: false,
		fade: true,
		cssEase: 'linear',
		prevArrow: <Arrow icon='fas fa-arrow-left' />,
		nextArrow: <Arrow icon='fas fa-arrow-right' />,
		arrows: true,
	};
	return (
		<Slider className={`${extraClass ? extraClass : ''}`} {...settings}>
			{children}
		</Slider>
	);
};
export const HomePageProductSliderWithArrow = ({ children, extraClass }) => {
	let settings = {
		dots: false,
		arrows: true,
		infinite: true,
		lazyLoad: true,
		speed: 300,
		prevArrow: <Arrow icon='fas fa-arrow-left' />,
		nextArrow: <Arrow icon='fas fa-arrow-right' />,
		slidesToShow: 4,
		slidesToScroll: 4,
		autoplay: true,
		autoplaySpeed: 5000,
		responsive: [
			{ breakpoint: 1200, settings: { slidesToShow: 4 } },
			{ breakpoint: 991, settings: { slidesToShow: 3, slidesToScroll: 3 } },
			{ breakpoint: 550, settings: { slidesToShow: 2, slidesToScroll: 2 } },
			{ breakpoint: 420, settings: { slidesToShow: 1, slidesToScroll: 1 } },
		],
	};
	return (
		<Slider
			{...settings}
			className={
				extraClass
					? extraClass
					: 'row custom-row-10 product-active common-arrows'
			}>
			{children}
		</Slider>
	);
};
