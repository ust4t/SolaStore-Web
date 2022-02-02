import React from "react";
import Layout from "../src/layout/Layout";
import PageTitle from "../src/layout/PageTitle";

export default function About() {
  return (
    <Layout news={4} logoLeft layout={2} paymentOption>
      <PageTitle
        active={"About Us"}
        pageTitle={"About Us"}
        navigation={false}
      />
      <div className="row my-5">
        <div className="col-12 justify-content-center align-items-center">
          <p className="fs-6 text-center mx-2">
            Solastore, Mehmet Metin Sola tarafından 2002 yılında moda giyim
            sektöründe fark oluşturmak için kurulmuş kadın giyim markasıdır.
          </p>
          <p className="fs-6 text-center mx-2">
            Yenilikçi ve deneyimli kadrosu ile yurtdışı pazarında, kadın giyimin
            modern çizgilerini ve kadın giyimin şıklığının temsilcisi olma
            yolunda büyük adımlar atmaktadır.
          </p>
          <p className="fs-6 text-center mx-2">
            Modern ve giyimin her tarzından kadınların aradığı şıklığı, doğanın
            ilham veren renkleriyle bir araya getiren Sola Store, kadın toptan
            giyimde dünyada iddaalı bir markadır.
          </p>
          <p className="fs-6 text-center mx-2">
            Herhangi bir soru, şikayet ve görüşleriniz için bize iletişim
            numaralarımız üzerinden ulaşabileceğiniz gibi, sosyal medya
            hesaplarımız üzerinden de ulaşabilirsiniz.
          </p>
        </div>
      </div>
    </Layout>
  );
}
