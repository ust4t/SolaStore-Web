import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Blog from "../../src/components/blog/Blog";
import Paggination from "../../src/components/Paggination";
import Layout from "../../src/layout/Layout";
import PageTitle from "../../src/layout/PageTitle";
import { getMasBlog } from "../../src/redux/action/blog";

const ColMas2 = ({ blogs, getMasBlog }) => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    getMasBlog();
    setTimeout(() => {
      const Isotope = require("isotope-layout");
      new Isotope(".blog-masonry", {
        itemSelector: ".grid-item",
        percentPosition: true,
        masonry: {
          columnWidth: ".grid-item",
        },
      });
    }, 3000);
  }, []);
  return (
    <Layout sticky footerBg textCenter container>
      <main>
        <PageTitle pageTitle="Blog 2 Column Masonry" active="Blog" />
        <section className="blog-area pt-100 pb-60">
          <div className="container">
            <div className="row blog-masonry">
              {blogs &&
                blogs.map((blog, i) => (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    id={i}
                    active={active}
                    setActive={setActive}
                    sort={9}
                    extraClass="grid-item"
                  />
                ))}
            </div>
            <Paggination
              active={active}
              setActive={setActive}
              sort={9}
              length={blogs && blogs.length}
            />
          </div>
        </section>
      </main>
    </Layout>
  );
};

const mapStateToprops = (state) => ({
  blogs: state.blog.blogs,
});
export default connect(mapStateToprops, { getMasBlog })(ColMas2);
