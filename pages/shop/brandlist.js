import React from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";

import sources from "../../sources";
import Layout from "../../src/layout/Layout";
import { encodeURLString } from "../../src/utils/utils";

export default function AllBrands({ brands }) {
  const { t } = useTranslation("common");
  return (
    <>
      <Head>
        <title>Sola Store | {t("menu.brands")}</title>
      </Head>
      <Layout news={4} logoLeft layout={2} paymentOption>
        <main className="my-4">
          <section className="container">
            <div className="row gy-4">
              {brands ? (
                brands.map(({ brandID, brandName, guidName2 }) => (
                  <div className="col-6 col-md-4">
                    <Link
                      href={`/brands/${encodeURLString(brandName)}:${brandID}`}>
                      <Image
                        src={`${sources.brand}${guidName2}`}
                        width={200}
                        height={150}
                        layout="responsive"
                        className="cursor-pointer"
                      />
                    </Link>
                  </div>
                ))
              ) : (
                <h2 className="pt-100 pb-50 text-center w-100">
                  No Product Found
                </h2>
              )}
            </div>
          </section>
        </main>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const brandsRes = await fetch(
    `https://api.solastore.com.tr/api/Brand/GetAllBrands?sourceProof=${process.env.SOURCE_PROOF}`
  );
  const brands = await brandsRes.json();

  return {
    props: {
      brands,
    },
  };
}
