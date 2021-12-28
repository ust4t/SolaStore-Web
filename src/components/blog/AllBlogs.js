import Link from "next/link";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Layout from "../../layout/Layout";
import PageTitle from "../../layout/PageTitle";
import { getBlog } from "../../redux/action/blog";
import { dblock } from "../../utils/utils";
import Paggination from "../Paggination";
import VideoPopUp from "../VideoPopUp";
import BlogSideBar from "./BlogSideBar";

const AllBlogs = ({ getBlog, blogs, sidebarLeft, noSidebar }) => {
  useEffect(() => {
    getBlog();
  }, []);
  const [opup, setOpup] = useState(false);
  const [active, setActive] = useState(0);
  return (
    <Layout sticky textCenter footerBg container>
      <main>
        <PageTitle active="Blog" pageTitle="Blog" />
        <section className="blog-area pt-120 pb-80">
          <div className="container">
            <div className={`row ${noSidebar ? "justify-content-center" : ""}`}>
              {!noSidebar && sidebarLeft && (
                <BlogSideBar blogs={blogs} blog={blogs && blogs[0]} />
              )}
              <div className="col-lg-8">
                {blogs &&
                  blogs.map((blog, i) => (
                    <article
                      className={`postbox post format-image mb-40 ${dblock(
                        active,
                        i,
                        3
                      )}`}
                      key={blog.id}
                    >
                      {blog.video ? (
                        <div className="postbox__video">
                          {opup && (
                            <VideoPopUp
                              video={blog.video}
                              closePopup={() => setOpup(false)}
                            />
                          )}
                          <img src={blog.img} alt="blog image" />
                          <a
                            className="popup-video video-btn"
                            //    href="https://www.youtube.com/watch?v=Y6MlVop80y0"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setOpup(true);
                            }}
                          >
                            <i className="fas fa-play" />
                          </a>
                        </div>
                      ) : (
                        <div className="postbox__thumb">
                          <Link href={`/blog/${blog.id}`}>
                            <img src={blog.img} alt="blog image" />
                          </Link>
                        </div>
                      )}

                      <div className="postbox__text p-50">
                        <div className="post-meta mb-15">
                          <span>
                            <i className="far fa-calendar-check" /> {blog.date}{" "}
                          </span>
                          <span>
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              <i className="far fa-user" />
                              {blog.author.name}
                            </a>
                          </span>
                          <span>
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              <i className="far fa-comments" />{" "}
                              {blog.comments.length} Comments
                            </a>
                          </span>
                        </div>
                        <h3 className="blog-title">
                          <Link href={`/blog/${blog.id}`}>
                            <a>{blog.title}</a>
                          </Link>
                        </h3>
                        <div className="post-text mb-20">
                          {blog.des.div.p && (
                            <p>{String(blog.des.div.p).slice(0, 400)}.</p>
                          )}
                        </div>
                        <div className="read-more mt-30">
                          <Link href={`/blog/${blog.id}`}>
                            <a className="bt-btn s-btn__square">read more</a>
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                <article className="postbox post format-quote mb-40">
                  <div className="post-text">
                    <blockquote>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur cing elit, sed
                        do eiusmod tempor.
                      </p>
                      <footer>- Rosalina Pong</footer>
                    </blockquote>
                  </div>
                </article>
                <Paggination
                  active={active}
                  setActive={setActive}
                  sort={3}
                  length={blogs && blogs.length}
                />
              </div>
              {!noSidebar && !sidebarLeft && (
                <BlogSideBar blogs={blogs} blog={blogs && blogs[0]} />
              )}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  blogs: state.blog.blogs,
});

export default connect(mapStateToProps, { getBlog })(AllBlogs);
