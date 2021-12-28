import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Blog from "../../src/components/blog/Blog";
import Paggination from "../../src/components/Paggination";
import Layout from "../../src/layout/Layout";
import PageTitle from "../../src/layout/PageTitle";
import { getBlog } from "../../src/redux/action/blog";

const Col2 = ({ getBlog, blogs }) => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    getBlog();
  }, []);
  return (
    <Layout sticky footerBg textCenter container>
      <main>
        <PageTitle pageTitle="Blog 2 Column" active="Blog" />
        <section className="blog-area pt-100 pb-60">
          <div className="container">
            <div className="row">
              {blogs &&
                blogs.map((blog, i) => (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    id={i}
                    active={active}
                    sort={4}
                  />
                ))}
            </div>
            <Paggination
              active={active}
              setActive={setActive}
              sort={4}
              length={blogs && blogs.length}
            />
          </div>
        </section>
      </main>
    </Layout>
  );
};
const mapStateToProps = (state) => ({
  blogs: state.blog.blogs,
});
export default connect(mapStateToProps, { getBlog })(Col2);
