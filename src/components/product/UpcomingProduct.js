import Link from "next/link";
import { Fragment, useEffect } from "react";
import { dataImage } from "../../utils/utils";
const UpcomingProduct = ({ upcomingProduct }) => {
  useEffect(() => {
    dataImage();
  }, [upcomingProduct]);
  return (
    <section
      className="upcoming-product-area pos-relative box-90 pt-120 pb-120"
      data-background={upcomingProduct && upcomingProduct.img}
      // style={{ backgroundImage: 'url("img/bg/bg2.jpg")' }}
    >
      <div className="upc-shape d-none d-xl-block">
        {upcomingProduct &&
          upcomingProduct.map.map((map, i) => (
            <div className={`bakix-marker map-c${i + 1} ${map.class}`} key={i}>
              <div className="bakix-map-icon">
                <i className="flaticon-add" />
              </div>
              <div className="bakix-map-address">
                <p>
                  {map.text.includes("/n")
                    ? map.text.split("/n").map((text, i) => (
                        <Fragment key={i}>
                          {text} <br />{" "}
                        </Fragment>
                      ))
                    : map.text}
                </p>
              </div>
            </div>
          ))}
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-6 offset-xl-6">
            <div className="upcoming-product">
              <div className="upc-price">$500.00</div>
              <h1>
                <Link href="/shop">
                  <a>Lodge Flush Mount</a>
                </Link>
              </h1>
              <ul className="upc-pro-info fix">
                <li className="d-flex">
                  <i className="flaticon-layers" />
                  <div className="upc-info">
                    <h4>Origin From</h4>
                    <span>Sweden</span>
                  </div>
                </li>
                <li className="d-flex">
                  <i className="flaticon-layers" />
                  <div className="upc-info">
                    <h4>Material</h4>
                    <span>Aluminum</span>
                  </div>
                </li>
                <li className="d-flex">
                  <i className="flaticon-layers" />
                  <div className="upc-info">
                    <h4>Designer</h4>
                    <span>themeian</span>
                  </div>
                </li>
              </ul>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla.
              </p>
              <div className="upc-btn">
                <Link href="/shop">
                  <a
                    className="btn theme-btn"
                    data-animation="fadeInLeft"
                    data-delay=".7s"
                  >
                    shop now
                  </a>
                </Link>
                <Link href="/shop">
                  <a
                    className="btn white-btn"
                    data-animation="fadeInRight"
                    data-delay=".9s"
                  >
                    Details
                  </a>
                </Link>
              </div>
              <div className="event-timer">
                <div className="mt-40" data-countdown="2019/04/01">
                  <span className="cdown days">
                    <span className="time-count">0</span> <p>Days</p>
                  </span>{" "}
                  <span className="cdown hour">
                    <span className="time-count">0</span> <p>Hour</p>
                  </span>{" "}
                  <span className="cdown minutes">
                    <span className="time-count">00</span> <p>Min</p>
                  </span>{" "}
                  <span className="cdown second">
                    {" "}
                    <span>
                      <span className="time-count">00</span> <p>Sec</p>
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingProduct;
