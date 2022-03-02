import React from "react";
import AppointmentForm from "../src/components/form/AppointmentForm";
import Layout from "../src/layout/Layout";

export default function Appointment() {
  return (
    <Layout news={4} logoLeft layout={2} paymentOption>
      {/* <h2 className="text-center mt-3">Appointment Page</h2>
      <h4 className="text-center fs-4 text-danger">
        Our sales representers will contact you at the specified time once you
        filled the form.
      </h4> */}
      <div className="d-flex align-items-center justify-content-center">
        <AppointmentForm />
      </div>
    </Layout>
  );
}
