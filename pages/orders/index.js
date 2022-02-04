import React from "react";

import Layout from "../../src/layout/Layout";
import OrderPhoneLayout from "../../src/layout/OrderPhoneLayout/OrderPhoneLayout";

export default function Order() {
  return (
    <Layout news={4} logoLeft layout={2} paymentOption>
      <OrderPhoneLayout />
    </Layout>
  );
}
