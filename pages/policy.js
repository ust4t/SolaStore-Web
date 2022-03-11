import axios from "axios";
import Head from "next/head";

import Layout from "../src/layout/Layout";
import PageTitle from "../src/layout/PageTitle";
import { chooseContent } from "../src/utils/utils";

export default function Policy({ privacyPolicyData }) {
  return (
    <>
      <Head>
        <title>Sola Store | {privacyPolicyData.header}</title>
      </Head>
      <Layout news={4} logoLeft layout={2} paymentOption>
        <PageTitle
          active={privacyPolicyData.header}
          pageTitle={privacyPolicyData.header}
          navigation={false}
        />
        <div className="row justify-content-center my-5">
          <div className="col-8">
            <p
              style={{
                fontSize: "1rem",
                textAlign: "justify",
              }}>
              {privacyPolicyData.content}
            </p>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps({ locale }) {
  const { data } = await axios.get(
    `https://api.solastore.com.tr/api/Helpers/GetCorporates?id=6&sourceProof=${process.env.SOURCE_PROOF}`
  );
  return {
    props: {
      privacyPolicyData: chooseContent({
        data: data.data,
        locale: locale,
      }),
    },
  };
}
