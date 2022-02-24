import React, { useEffect } from "react";
import useTranslation from "next-translate/useTranslation";

import Loader from "../../src/components/Loader";

export default function RedirectMap() {
  const { t } = useTranslation("common");

  useEffect(() => {
    setTimeout(() => {
      window.location.href =
        "https://www.google.com/maps?ll=41.007997,28.958228&z=14&t=m&hl=tr&gl=TR&mapclient=embed&cid=1563881826297615043";
    }, 500);
  }, []);

  return (
    <div className="row my-5 align-items-center justify-content-center">
      <div className="col-12">
        <h2 className="text-center">{t("redirect")}</h2>
        <Loader />
      </div>
    </div>
  );
}
