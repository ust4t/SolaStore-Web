import Link from "next/link";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

export const DefaultFooter = ({ darkBg }) => {
  const { t } = useTranslation("footer");

  return (
    <footer className="bgblack">
      <div className={`footer-area pt-60 pb-55 ${darkBg ? "black-bg" : ""}`}>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div
                className={`footer-widget mb-30 ${
                  darkBg ? "widget-three" : ""
                }`}>
                <div className="footer-logo">
                  <Link href="/index">
                    <a>
                      <Image
                        src={
                          darkBg
                            ? "/images/footer/footer-logo3.png"
                            : "/images/footer/footer-logo.png"
                        }
                        alt="Logo"
                        width={130}
                        height={90}
                        layout="intrinsic"
                      />
                    </a>
                  </Link>
                </div>
                <div className="footer-text mt-45">
                  <h6>
                    {t("tel")}:
                    <a href="tel:+9002124584500"> +90 (0212) 458 45 00</a>
                  </h6>
                  <h6>
                    {t("tel")} 2:
                    <a href="tel:+9005554000005"> +90 (0555) 400 00 05</a>
                  </h6>
                  <h6>
                    {t("tel")} 3:
                    <a href="tel:+9005554000011"> +90 (0555) 400 00 11</a>
                  </h6>
                  <h6>
                    {t("address")}:{" "}
                    <span>
                      <a
                        href="https://www.google.com/maps?ll=41.007997,28.958228&z=14&t=m&hl=tr&gl=TR&mapclient=embed&cid=1563881826297615043"
                        target="_blank">
                        {t("address_desc")}
                      </a>
                    </span>
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div
                className={`footer-widget mb-30 ${
                  darkBg ? "widget-three" : ""
                }`}>
                <h5>{t("insti")}</h5>
                <ul className="links">
                  <li>
                    <Link href="/about">
                      <a>{t("about")}</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/policy">
                      <a>{t("privacy")}</a>
                    </Link>
                  </li>

                  <li>
                    <Link href="/SalesPolicy">
                      <a>{t("distancesales")}</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/kvkk">
                      <a>{t("kvkk")}</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact">
                      <a>{t("contact")}</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-6">
              <div
                className={`footer-widget mb-30 ${
                  darkBg ? "widget-three" : ""
                }`}>
                <h5>{t("account")}</h5>
                <ul className="links">
                  <li>
                    <Link href="/dashboard">
                      <a>{t("myprofile")}</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/dashboard">
                      <a>{t("myorders")}</a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div
                className={`footer-widget mb-30 ${
                  darkBg ? "widget-three" : ""
                }`}>
                <h5>{t("mobilapp")}</h5>
                <div className={`subscription ${darkBg ? "subs-three" : ""}`}>
                  <div className="footer-widget mb-20">
                    <div className="fw-link">
                      <a
                        href="https://play.google.com/store/apps/details?id=com.solastore.solastoreapp"
                        className="btn btn-primary btn-round mobil-foot">
                        <i className="fab fa-google-play" />
                        <span> Google Play</span>
                      </a>
                      <a
                        href="https://apps.apple.com/tr/app/sola-store/id1532399779?l=tr"
                        className="btn btn-primary btn-round mobil-foot">
                        <i className="fab fa-apple" />
                        <span> APP Store</span>
                      </a>
                    </div>
                  </div>

                  <div className="social-icon pt-15">
                    <span>Follow Us On:</span>
                    <Link href="https://www.facebook.com/solastore">
                      <a target="_blank">
                        <i className="fab fa-facebook-square" />
                      </a>
                    </Link>
                    <Link href="https://twitter.com/Solastoreonline">
                      <a target="_blank">
                        <i className="fab fa-twitter-square" />
                      </a>
                    </Link>
                    <Link href="https://www.linkedin.com/company/sola-store-tekstil/mycompany/">
                      <a target="_blank">
                        <i className="fab fa-linkedin" />
                      </a>
                    </Link>
                    <Link href="https://tr.pinterest.com/SolaStoreonline/">
                      <a target="_blank">
                        <i className="fab fa-pinterest-square" />
                      </a>
                    </Link>
                    <Link href="https://www.youtube.com/channel/UCO1EGdGpU-Moy8yJ8Hu3N2Q">
                      <a target="_blank">
                        <i className="fab fa-youtube-square" />
                      </a>
                    </Link>
                    <Link href="https://vk.com/solastoreonline">
                      <a target="_blank">
                        <i className="fab fa-vk" />
                      </a>
                    </Link>
                    <Link href="https://solastore.tumblr.com/">
                      <a target="_blank">
                        <i className="fab fa-tumblr" />
                      </a>
                    </Link>
                    <Link href="https://t.me/solastoreonline">
                      <a target="_blank">
                        <i className="fab fa-telegram" />
                      </a>
                    </Link>
                    <Link href="https://www.tiktok.com/@solastoreofficial">
                      <a target="_blank">
                        <i className="fab fa-tiktok" />
                      </a>
                    </Link>
                    <Link href="https://ru.foursquare.com/user/399137018">
                      <a target="_blank">
                        <i className="fab fa-foursquare" />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`copyright-two  ${darkBg ? "dark-bg" : "copyright-border"}`}>
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-12">
              <div className="copyright-text">
                <span className="fs-6">
                  Copyright {new Date().getFullYear()}
                </span>
              </div>
            </div>

            <div className="col-md-4 col-12 d-flex justify-content-center">
              <Image
                src="/images/footer/payment-four.png"
                width={330}
                height={27}
                alt=""
              />
            </div>
            <div className="col-md-4 col-12 copyright-text text-end">
              <span className="fs-6">All Right Reserved By Sola Store.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Footer_1 = () => {
  return (
    <footer>
      <div className="footer-area black-bg-dark pt-80 pb-45">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6">
              <div className="footer-widget-five mb-30">
                <div className="footer-logo mb-55">
                  <Link href="/">
                    <a>
                      <Image
                        src="/images/logo/logo3.png"
                        alt="Logo"
                        width={120}
                        height={80}
                        layout="intrinsic"
                      />
                    </a>
                  </Link>
                </div>
                <div className="widget-five-text">
                  <ul>
                    <li>
                      Telefon : <span>(+2) 1800 555 2022</span>
                    </li>
                    <li>
                      Address :
                      <div className="display-inline">
                        <span>Mimar Kemalettin, Mesihpaşa Cd. No:60,</span>
                        <span>34050 Fatih/İstanbul</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-md-6">
              <div className="footer-widget-five widget-five-border mb-30">
                <div className="widget-five-common">
                  <h6>Get To Know Us</h6>
                  <ul>
                    <li>
                      <a href="#">About Us</a>
                    </li>
                    <li>
                      <a href="#">Press Releases</a>
                    </li>
                    <li>
                      <a href="#">Retro Cares</a>
                    </li>
                    <li>
                      <a href="#">Gift a Smile</a>
                    </li>
                  </ul>
                </div>
                <div className="widget-five-common">
                  <h6>Let Us Help You</h6>
                  <ul>
                    <li>
                      <a href="#">Your Account</a>
                    </li>
                    <li>
                      <a href="#">Returns Centre</a>
                    </li>
                    <li>
                      <a href="#">Purchase Protection</a>
                    </li>
                    <li>
                      <a href="#">Retro Download</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="footer-widget-five ml-50 mb-30">
                <div className="customer-sapport mb-30">
                  <div className="sapport-icon">
                    <i className="fal fa-headphones" />
                  </div>
                  <div className="sapport-text">
                    <h6>Customer Support</h6>
                    <span>24/7 Online Helps</span>
                  </div>
                </div>
                <div className="customer-sapport">
                  <div className="sapport-icon">
                    <i className="fal fa-gift" />
                  </div>
                  <div className="sapport-text">
                    <h6>Free &amp; Fast Delivery</h6>
                    <span>All Order Over $100</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright-five black-bg-dark">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="copytext-five text-center">
                <span>Copyright © 2022 Retro Theme. All Rights Reserved.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
