import useTranslation from "next-translate/useTranslation";
import Head from "next/head";

import EnterNumberLayout from "../src/layout/EnterNumberLayout";
import Layout from "../src/layout/Layout";

export default function PhonePage() {
  const { t } = useTranslation("home");

  return (
    <>
      <Head>
        <title>Sola Store | {t("wheel.phone")}</title>
      </Head>
      <Layout news={4} logoLeft layout={2} paymentOption>
        <EnterNumberLayout />
      </Layout>
    </>
  );
}
