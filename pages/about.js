import axios from "axios";
import Head from "next/head";

import { chooseContent } from "../src/utils/utils";
import Layout from "../src/layout/Layout";
import PageTitle from "../src/layout/PageTitle";

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
        <div className="row my-5">
          <div className="col-12 justify-content-center align-items-center">
            <p className="fs-6 text-center mx-2">{aboutData.content}</p>
          </div>
        </div>
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
