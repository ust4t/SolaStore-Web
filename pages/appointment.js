import useTranslation from "next-translate/useTranslation";
import Head from "next/head";

import AppointmentForm from "../src/components/form/AppointmentForm";
import Layout from "../src/layout/Layout";

export default function Appointment() {
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>Sola Store | {t("appointmentTitle")}</title>
      </Head>
      <Layout news={4} logoLeft layout={2} paymentOption>
        <div className="d-flex align-items-center justify-content-center">
          <AppointmentForm />
        </div>
      </Layout>
    </>
  );
}
