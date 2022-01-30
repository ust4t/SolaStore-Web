import Link from "next/link";
import Image from "next/image";

export const DefaultFooter = ({ darkBg }) => {
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
                            ? "/img/footer/footer-logo3.png"
                            : "/img/footer/footer-logo.png"
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
                    Telefon:<span> +90 (0212) 458 45 00</span>
                  </h6>
                  <h6>
                    Telefon 2:<span> +90 (0555) 400 00 05</span>
                  </h6>
                  <h6>
                    Telefon 3:<span> +90 (0555) 400 00 11</span>
                  </h6>
                  <h6>
                    Adres:<span> Mimar Kemalettin, Mesihpaşa Cd. No:60,</span>
                  </h6>
                  <span>34050 Fatih/İstanbul</span>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-6">
              <div
                className={`footer-widget mb-30 ${
                  darkBg ? "widget-three" : ""
                }`}>
                <h5>KURUMSAL</h5>
                <ul className="links">
                  <li>
                    <Link href="#">
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                        }}>
                        Hakkımızda
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                        }}>
                        Gizlilik politikası
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                        }}>
                        Site Haritası
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a>Mesafeli Satış Sözleşmesi</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a onClick={(e) => e.preventDefault()}>KVKK</a>
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
                <h5>HESABIM</h5>
                <ul className="links">
                  <li>
                    <Link href="#">
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                        }}>
                        Profilim
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                        }}>
                        Siparişlerim
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <a
                        onClick={(e) => {
                          e.preventDefault();
                        }}>
                        Hesaplarım
                      </a>
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
                <h5>MOBİL UYGULAMALARIMIZ</h5>
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
                    <Link href="#">
                      <a onClick={(e) => e.preventDefault()}>
                        <i className="fab fa-facebook-square" />
                      </a>
                    </Link>
                    <Link href="#">
                      <a onClick={(e) => e.preventDefault()}>
                        <i className="fab fa-twitter-square" />
                      </a>
                    </Link>
                    <Link href="#">
                      <a onClick={(e) => e.preventDefault()}>
                        <i className="fab fa-linkedin" />
                      </a>
                    </Link>
                    <Link href="#">
                      <a onClick={(e) => e.preventDefault()}>
                        <i className="fab fa-pinterest-square" />
                      </a>
                    </Link>
                    <Link href="#">
                      <a onClick={(e) => e.preventDefault()}>
                        <i className="fab fa-youtube-square" />
                      </a>
                    </Link>
                    <Link href="#">
                      <a onClick={(e) => e.preventDefault()}>
                        <i className="fab fa-behance-square" />
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
                <span>Copyright {new Date().getFullYear()}</span>
              </div>
            </div>

            <div className="footer-payment col-md-4 col-12 ta">
              <Link href="#">
                <a
                  onClick={(e) => {
                    e.preventDefault();
                  }}>
                  <Image
                    src="/img/footer/payment.png"
                    // className="img-fluid"
                    width={50}
                    height={4}
                    layout="responsive"
                    alt="payment"
                  />
                </a>
              </Link>
            </div>
            <div className="col-md-4 col-12">
              <div className="copyright-text text-end">
                <Image
                  src="/img/footer/payment-four.png"
                  width={50}
                  height={4}
                  layout="responsive"
                  alt=""
                />
                <span>All Right Reserved By Sola Store.</span>
              </div>
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
                        src="/img/logo/logo3.png"
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
