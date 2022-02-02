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
          <p className="fs-6 px-3">
            Bilgi Toplama ve Kullanım Hizmetlerimiz, lütfen sizden herhangi bir
            kişisel bilgi istenmemektedir.
          </p>
          <p className="fs-6 px-3">
            Çerezler ve Push Bildirimleri Çerezler, anonim benzersiz bir
            tanımlayıcı içerebilen çok az veri içeren dosyalardır. Çerezler, bir
            web sitesinden tarayıcınıza sabit diskinizde saklanır. "Hizmetler"
            kullanılır.
          </p>
          <p className="fs-6 px-3">
            Güvenlik Kişisel Bilgilerinizin güvenliği bizim için gereklidir
            ancak internet üzerinden aktarım yöntemi veya elektronik saklama
            yöntemi %100 güvenli olmamalıdır. Kişisel bilgilerinizin
            saklanmasını sağlar.
          </p>

          <p className="fs-6 px-3">
            Veri Koruma Haklarınız Verilerinizi toplamadığımız için bu sorunla
            ilgili bir sorun yaşamazsınız. Oyun içeriği veri toplamaz. Bu
            Gizlilik Politikasındaki Değişiklikler Bu Gizlilik Politikasını
            herhangi bir zamanda güncelleme veya değiştirme hakkını saklı
            tutarız ve bu Gizlilik Politikasını periyodik olarak kontrol
            etmelisiniz. Sizi e-posta adresinizle veya Hizmetimize önemli bir
            bildirim göndererek bilgilendireceğiz. Bize Ulaşın Bu Gizlilik
            Politikası hakkında daha fazla bilgi için lütfen bizimle iletişime
            geçin.
          </p>
        </div>
      </div>
    </Layout>
  );
}
