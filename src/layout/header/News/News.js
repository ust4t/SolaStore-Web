import { useContext } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

import { CHANGE_LANG, CREATE_USER_ID } from "../../../redux/action/type";
import { martext, rightJS, menu, menu_btn } from "./News.module.css";
import { StoreContext } from "../../../context/StoreProvider";

export const News_4 = () => {
  const { wishListActions } = useContext(StoreContext);
  const user = useSelector((state) => state.auth);
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();
  const changeLang = (lang) => {
    dispatch({
      type: CHANGE_LANG,
      payload: lang,
    });
    router.push(router.asPath, router.asPath, {
      locale: lang,
    });
  };

  const handleLogOut = async () => {
    try {
      const { data } = await axios.get("/api/auth/logOut");
      dispatch({
        type: CREATE_USER_ID,
        payload: { ...data },
      });
      toast.success("Çıkış yapıldı");
      wishListActions.wishlistRefetch();
      router.push("/");
    } catch (e) {
      toast.error("Çıkış yapılırken hata oluştu");
    }
  };

  return (
    <div className="top-border-four">
      <div className="row align-items-center justify-content-center justify-content-lg-around rowss">
        <div className="col-xl-5 col-lg-5 col-md-12">
          <div className="header-top-offer">
            <p className="text-center text-lg-start">
              {" "}
              +90 (0212) 458 45 00 / +90 (0555) 400 00 05 / +90 (0555) 400 00 11
            </p>
          </div>
        </div>
        <div className="col-lg-3 d-none d-lg-block justify-content-center">
          {user.uid && user.state === "user_registered" && (
            <h6 className="text-center text-lg-start fw-bold">
              🎉{t("welcome")}, {user.name}
            </h6>
          )}
        </div>
        <div className="col-xl-3 col-lg-3 col-md-6">
          <div className="flagright d-flex align-items-center justify-content-center justify-content-lg-end">
            <div
              className={`${menu_btn} d-none d-lg-flex align-items-center position-relative me-1 shadow-none`}>
              <h6 className="me-1 cursor-pointer fw-bold">{t("myaccount")}</h6>
              <i className="fas fa-chevron-down cursor-pointer mb-1" />
              <ul className={menu}>
                {user.state === "user_registered" ? (
                  <>
                    <li>
                      <Link href="/dashboard">
                        <a>{t("profile")}</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/orders">
                        <a>{t("myorders")}</a>
                      </Link>
                    </li>
                    {/* <li>Adreslerim</li>
                    <li>İndirimlerim</li> */}
                    <li onClick={handleLogOut}>{t("logout")}</li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link href="/login">
                        <a>{t("loginhere")}</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/register">
                        <a>{t("signup")}</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/orders">
                        <a>{t("myorders")}</a>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <a className="mx-1" href="#" onClick={() => changeLang("en")}>
              <Image
                src="/images/flags/uk.jpg"
                width="45"
                height="25"
                alt="https://www.solastore.com.tr"
                title="https://www.solastore.com.tr"
                priority
              />
            </a>
            <a className="mx-1" onClick={() => changeLang("fr")} href="#">
              <Image
                src="/images/flags/fr.jpg"
                width="45"
                height="25"
                alt="https://www.solastore.com.tr"
                title="https://www.solastore.com.tr"
                priority
              />
            </a>
            <a className="mx-1" onClick={() => changeLang("ar")} href="#">
              <Image
                src="/images/flags/sa.jpg"
                width="45"
                height="25"
                alt="https://www.solastore.com.tr"
                title="https://www.solastore.com.tr"
                priority
              />
            </a>
            <a className="mx-1" onClick={() => changeLang("ru")} href="#">
              <Image
                src="/images/flags/rs.jpg"
                width="45"
                height="25"
                alt="https://www.solastore.com.tr"
                title="https://www.solastore.com.tr"
                priority
              />
            </a>
            <a className="mx-1" onClick={() => changeLang("tr")} href="#">
              <Image
                src="/images/flags/tr.jpg"
                width="45"
                height="25"
                alt="https://www.solastore.com.tr"
                title="https://www.solastore.com.tr"
                priority
              />
            </a>
          </div>
        </div>
        <div className="col-xl-12 col-lg-12 col-md-12 headhead black-bg d-none d-sm-block">
          <div className={rightJS}>
            <div className={martext}>
              {t("saleInfo")}{" "}
              <span className="marspantext">{t("saleInfoColored")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
