import Layout from "../Layout";
import {
  container,
  img404,
  textContainer,
  title,
  imgContainer,
} from "./Custom404.module.css";

export default function Custom404Layout() {
  return (
    <Layout news={4} logoLeft layout={2} paymentOption>
      <div className={container}>
        <div className={imgContainer}>
          <img src="/images/404.jpg" className={img404} />
          <div className={textContainer}>
            <h1 className={`text-center fw-bold text-white ${title}`}>404</h1>
            <h2 className="text-center fw-bold fs-2 text-white">
              Page Not Found
            </h2>
          </div>
        </div>
      </div>
    </Layout>
  );
}
