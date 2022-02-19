import useTranslation from "next-translate/useTranslation";
import React from "react";

import {
  contact_sidebar,
  sub_title,
  contact_info_wrap,
  icon,
  content,
  content_phone,
  circle_icon,
} from "./ContactInfo.module.css";

export default function ContactInfo() {
  const { t } = useTranslation("contact");

  return (
    <div className={`${contact_sidebar}`}>
      <a
        href="https://www.google.com/maps?ll=41.007997,28.958228&z=14&t=m&hl=tr&gl=TR&mapclient=embed&cid=1563881826297615043"
        target="_blank">
        <div className="mb-20">
          <h6 className={`${sub_title} text-center`}>{t("info.address")}</h6>
        </div>
      </a>
      <div className={contact_info_wrap}>
        <ul>
          <li className="d-flex align-items-center my-3">
            <div className={icon}>
              <i class={`fas fa-compass ${circle_icon}`} />
            </div>
            <div className={`${content} ${content_phone}`}>
              <h5>{t("info.titleAddress")}</h5>
              <p
                style={{
                  maxWidth: "200px",
                }}>
                <a
                  href="https://www.google.com/maps?ll=41.007997,28.958228&z=14&t=m&hl=tr&gl=TR&mapclient=embed&cid=1563881826297615043"
                  target="_blank">
                  Mimar Kemalettin, Mesihpaşa Cd. No:60, 34050 Fatih/İstanbul
                </a>
              </p>
            </div>
          </li>
          <li className="d-flex align-items-center my-3">
            <div className={icon}>
              <i class={`fas fa-phone ${circle_icon}`} />
            </div>
            <div className={`${content} ${content_phone}`}>
              <h5>{t("info.titlePhone")}</h5>
              <p>
                <a href="tel:+9002124584500">+90 (0212) 458 45 00</a>
              </p>
              <p>
                <a href="tel:+9005554000005">+90 (0555) 400 00 05</a>
              </p>
              <p>
                <a href="tel:+9005554000011">+90 (0555) 400 00 11</a>
              </p>
            </div>
          </li>
          <li className="d-flex align-items-center my-3">
            <div className={icon}>
              <i class={`fas fa-envelope ${circle_icon}`} />
            </div>
            <div className={content}>
              <h5>{t("info.titleEmail")}</h5>
              <p>
                <a href="mailto:info@solastore.com.tr">info@solastore.com.tr</a>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
