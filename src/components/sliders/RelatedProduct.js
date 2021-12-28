import Slider from "react-slick";
const RelatedProduct = ({ children }) => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoPlay: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1190,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="product-area pb-100">
      <div className="container">
        <div className="row">
          <div className="col-xl-12">
            <div className="area-title text-center mb-50">
              <h2>Releted Products</h2>
              <p>Browse the huge variety of our products</p>
            </div>
          </div>
        </div>
        <div className="product-slider-2 owl-carousel">
          <Slider {...settings}>{children}</Slider>
        </div>
      </div>
    </section>
  );
};

export default RelatedProduct;
