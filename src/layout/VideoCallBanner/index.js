import Link from "next/link";

import { bannerContainer, bannerBtn } from "./VideoCallBanner.module.css";

export default function VideoCallBanner() {
  return (
    <div className={bannerContainer}>
      <h1
        style={{
          fontSize: "3rem",
        }}
        className="text-white text-center fw-bold mb-3">
        Need help? you can video call us!
      </h1>
      <h5
        style={{
          lineHeight: "1.5",
        }}
        className="text-white text-center fs-4">
        You can contact us 24/7 for more detailed help by our customer service
      </h5>
      <Link href="/appointment">
        <button className={`btn grenbtn1 rounded text-capitalize ${bannerBtn}`}>
          Book a meeting
        </button>
      </Link>
    </div>
  );
}
