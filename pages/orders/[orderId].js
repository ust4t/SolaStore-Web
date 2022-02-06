import axios from "axios";

import OrderDetailLayout from "../../src/layout/OrderDetailLayout";
import Layout from "../../src/layout/Layout";

export default function OrderDetail({ orderDetails }) {
  return (
    <Layout news={4} logoLeft layout={2} paymentOption>
      <OrderDetailLayout orderData={orderDetails} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { orderId } = context.query;

  const { data } = await axios.get(
    `https://api.solastore.com.tr/api/Order/OrderLinesList?OrderID=${orderId}&sourceProof=${process.env.SOURCE_PROOF}`
  );

  return {
    props: {
      orderDetails: data,
    },
  };
}
