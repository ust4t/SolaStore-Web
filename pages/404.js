import useTranslation from "next-translate/useTranslation";

import CustomStatusLayout from "../src/layout/CustomStatusLayout";

export default function Custom404() {
  const { t } = useTranslation("common");

  return (
    <CustomStatusLayout
      img="/images/404.jpg"
      statusCode="404"
      statusTitle={t("title404")}
    />
  );
}
