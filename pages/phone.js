import EnterNumberLayout from "../src/layout/EnterNumberLayout";
import Layout from "../src/layout/Layout";

export default function PhonePage() {
  return (
    <Layout news={4} logoLeft layout={2} paymentOption>
      <EnterNumberLayout />
    </Layout>
  );
}
