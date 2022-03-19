import useTranslation from "next-translate/useTranslation";

import CustomStatusLayout from "../src/layout/CustomStatusLayout";

export default function Custom500() {
  const { t } = useTranslation("common");

  return (
    <CustomStatusLayout
      img="/images/500.jpg"
      statusCode="500"
      statusTitle={t("error")}
    />
  );
}
