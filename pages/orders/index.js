import useTranslation from "next-translate/useTranslation";
import Head from "next/head";

import Layout from "../../src/layout/Layout";
import OrderPhoneLayout from "../../src/layout/OrderPhoneLayout/OrderPhoneLayout";

export default function Order() {
  const { t } = useTranslation("myorders");

  return (
    <>
      <Head>
        <title>SolaStore | {t("titleDetails")}</title>
      </Head>
      <Layout news={4} logoLeft layout={2} paymentOption>
        <OrderPhoneLayout />
      </Layout>
    </>
  );
}
