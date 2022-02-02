import React from "react";
import Layout from "../src/layout/Layout";
import PageTitle from "../src/layout/PageTitle";

export default function Policy() {
  return (
    <Layout news={4} logoLeft layout={2} paymentOption>
      <PageTitle
        active={"Privacy Policy"}
        pageTitle={"Privacy Policy"}
        navigation={false}
      />
      <div className="row justify-content-center my-5">
        <div className="col-8">
          <p
            style={{
              fontSize: "1rem",
              textAlign: "justify",
            }}>
            Bilgi Toplama ve Kullanım
            <br />
            Hizmetlerimiz, lütfen sizden herhangi bir kişisel bilgi
            istenmemektedir.
            <br />
            <br />
            Çerezler ve Push Bildirimleri
            <br />
            Çerezler, anonim benzersiz bir tanımlayıcı içerebilen çok az veri
            içeren dosyalardır. Çerezler, bir web sitesinden tarayıcınıza sabit
            diskinizde saklanır. "Hizmetler" kullanılır.
            <br />
            <br />
            Güvenlik
            <br />
            Kişisel Bilgilerinizin güvenliği bizim için gereklidir ancak
            internet üzerinden aktarım yöntemi veya elektronik saklama yöntemi
            %100 güvenli olmamalıdır. Kişisel bilgilerinizin saklanmasını
            sağlar.
            <br />
            <br />
            <br />
            Veri Koruma Haklarınız
            <br />
            Verilerinizi toplamadığımız için bu sorunla ilgili bir sorun
            yaşamazsınız. Oyun içeriği veri toplamaz.
            <br />
            Bu Gizlilik Politikasındaki Değişiklikler
            <br />
            Bu Gizlilik Politikasını herhangi bir zamanda güncelleme veya
            değiştirme hakkını saklı tutarız ve bu Gizlilik Politikasını
            periyodik olarak kontrol etmelisiniz. Sizi e-posta adresinizle veya
            Hizmetimize önemli bir bildirim göndererek bilgilendireceğiz.
            <br />
            Bize Ulaşın
            <br />
            Bu Gizlilik Politikası hakkında daha fazla bilgi için lütfen bizimle
            iletişime geçin.
          </p>
        </div>
      </div>
    </Layout>
  );
}
