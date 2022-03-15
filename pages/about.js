import axios from "axios";
import Head from "next/head";

import { chooseContent } from "../src/utils/utils";
import Layout from "../src/layout/Layout";
import PageTitle from "../src/layout/PageTitle";
import AboutLayout from "../src/layout/AboutLayout";

export default function About({ aboutData }) {
  return (
    <>
      <Head>
        <title>Sola Store | {aboutData.header}</title>
      </Head>
      <Layout news={4} logoLeft layout={2} paymentOption>
        <PageTitle
          active={aboutData.header}
          pageTitle={aboutData.header}
          navigation={false}
        />
        <AboutLayout />
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const { data } = await axios.get(
    `https://api.solastore.com.tr/api/Helpers/GetCorporates?id=1&sourceProof=${process.env.SOURCE_PROOF}`
  );

  return {
    props: {
      aboutData: chooseContent({
        data: data.data,
        locale: locale,
      }),
    },
  };
}
