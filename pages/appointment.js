import React from "react";
import AppointmentForm from "../src/components/form/AppointmentForm";
import Layout from "../src/layout/Layout";

export default function Appointment() {
  return (
    <Layout news={4} logoLeft layout={2} paymentOption>
      <div className="d-flex align-items-center justify-content-center">
        <AppointmentForm />
      </div>
    </Layout>
  );
}
