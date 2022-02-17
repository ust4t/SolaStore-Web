import axios from "axios";
import React from "react";
import Layout from "../src/layout/Layout";
import PageTitle from "../src/layout/PageTitle";
import { chooseContent } from "../src/utils/utils";

export default function Kvkk({ staticData }) {
  return (
    <Layout news={4} logoLeft layout={2} paymentOption>
      <PageTitle
        active={staticData.header}
        pageTitle={staticData.header}
        navigation={false}
      />
      <div className="row justify-content-center my-5">
        <div className="col-8">
          <p
            style={{
              fontSize: "1rem",
              textAlign: "justify",
            }}>
            {staticData.content}
          </p>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps({ locale }) {
  const { data } = await axios.get(
    `https://api.solastore.com.tr/api/Helpers/GetCorporates?id=4&sourceProof=${process.env.SOURCE_PROOF}`
  );

  return {
    props: {
      staticData: chooseContent({
        data: data.data,
        locale: locale,
      }),
    },
  };
}
