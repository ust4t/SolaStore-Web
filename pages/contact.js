import React from "react";
import ContactInfo from "../src/components/ContactInfo";
import ContactForm from "../src/components/form/ContactForm";
import Layout from "../src/layout/Layout";

export default function Contact() {
  return (
    <Layout news={4} logoLeft layout={2} paymentOption>
      <main
        style={{
          background: "#f8f9f9",
        }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12043.154859121287!2d28.9582282!3d41.0079975!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x15b4063c372892c3!2sSola%20Store!5e0!3m2!1str!2str!4v1605777690361!5m2!1str!2str"
          width="100%"
          height="500"
          frameborder="0"
          style={{ border: 0 }}
          allowfullscreen=""
          ariaHidden="false"
          tabindex="0"
        />
        <div
          style={{
            maxWidth: "1300px",
            paddingRight: "15px",
            paddingLeft: "15px",
            marginRight: "auto",
            marginLeft: "auto",
          }}>
          <div className="row justify-content-center align-items-start mt-2">
            <div className="col-lg-8">
              <ContactForm />
            </div>
            <div className="col-lg-4 col-md-7">
              <ContactInfo />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
