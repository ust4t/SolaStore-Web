import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";

import { CHANGE_LANG } from "../../redux/action/type";

export const News_4 = () => {
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

  return (
    <div className="top-border-four">
      <div className="row align-items-center justify-content-center justify-content-lg-around rowss">
        <div className="col-xl-6 col-lg-5 col-md-12">
          <div className="header-top-offer">
            <p className="text-center text-lg-start">
              {" "}
              +90 (0212) 458 45 00 / +90 (0555) 400 00 05 / +90 (0555) 400 00 11
            </p>
          </div>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-6 ">
          <div className="flagright d-flex justify-content-center justify-content-lg-end">
            <a className="mx-1" href="#" onClick={() => changeLang("en")}>
              <Image
                src="/img/flags/uk.jpg"
                width="45"
                height="25"
                alt="https://www.solastore.com.tr"
                title="https://www.solastore.com.tr"
                priority
              />
            </a>
            <a className="mx-1" onClick={() => changeLang("fr")} href="#">
              <Image
                src="/img/flags/fr.jpg"
                width="45"
                height="25"
                alt="https://www.solastore.com.tr"
                title="https://www.solastore.com.tr"
                priority
              />
            </a>
            <a className="mx-1" onClick={() => changeLang("ar")} href="#">
              <Image
                src="/img/flags/sa.jpg"
                width="45"
                height="25"
                alt="https://www.solastore.com.tr"
                title="https://www.solastore.com.tr"
                priority
              />
            </a>
            <a className="mx-1" onClick={() => changeLang("ru")} href="#">
              <Image
                src="/img/flags/rs.jpg"
                width="45"
                height="25"
                alt="https://www.solastore.com.tr"
                title="https://www.solastore.com.tr"
                priority
              />
            </a>
            <a className="mx-1" onClick={() => changeLang("tr")} href="#">
              <Image
                src="/img/flags/tr.jpg"
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
          <div className="rightJS li">
            <div className="martext">
              {t("saleInfo")}{" "}
              <span className="marspantext">{t("saleInfoColored")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
