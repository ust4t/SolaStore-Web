import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import BlogSideBar from "../../src/components/blog/BlogSideBar";
import VideoPopUp from "../../src/components/VideoPopUp";
import Layout from "../../src/layout/Layout";
import PageTitle from "../../src/layout/PageTitle";
import { getBlog, getSingleBlog } from "../../src/redux/action/blog";

const BlogDetails = ({ getSingleBlog, getBlog, blogs, blog }) => {
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    getBlog();
    getSingleBlog(id);
  }, [id]);
  const [popUp, setPopUp] = useState(false);
  return (
    <Layout sticky container textCenter footerBg>
      <main>
        <PageTitle
          pageTitle={blog ? blog.title : "404 Not Found"}
          active="Blog"
        />
        {blog ? (
          <div className="blog-area pt-100 pb-60">
            <div className="container">
              {popUp && (
                <VideoPopUp
                  closePopup={() => setPopUp(false)}
                  video={blog.video}
                />
              )}
              <div className="row">
                <div className="col-lg-8">
                  <article className="postbox post format-image mb-40">
                    {blog.video ? (
                      <div className="postbox__video mb-35">
                        <img src={blog.img} alt="Blog" />
                        <a
                          className="popup-video video-btn"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            setPopUp(true);
                          }}
                        >
                          <i className="fas fa-play" />
                        </a>
                      </div>
                    ) : (
                      blog.img && (
                        <div className="postbox__thumb mb-35">
                          <img src={blog.img} alt="blog image" />
                        </div>
                      )
                    )}

                    <div className="postbox__text bg-none">
                      <div className="post-meta mb-15">
                        {blog.date && (
                          <span>
                            <i className="far fa-calendar-check" /> {blog.date}{" "}
                          </span>
                        )}
                        {blog.author && (
                          <span>
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              <i className="far fa-user" /> {blog.author.name}
                            </a>
                          </span>
                        )}
                        {blog.comments && (
                          <span>
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              <i className="far fa-comments" />{" "}
                              {blog.comments.length} Comments
                            </a>
                          </span>
                        )}
                      </div>
                      {blog.title && (
                        <h3 className="blog-title">{blog.title}</h3>
                      )}

                      {blog.des && (
                        <div className="post-text mb-20">
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo.
                          </p>
                          <p>
                            Bccaecat cupidatat non proident, sunt in culpa qui
                            officia deserunt mollit anim id est laborum. Sed ut
                            perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium doloremque laudantium, totam
                            rem aperiam, eaque ipsa quae ab illo inventore
                            veritatis et quasi architecto beatae vitae dicta
                            sunt explicabo. Nemo enim ipsam voluptatem quia
                            voluptas sit aspernatur aut odit aut fugit, sed quia
                            consequuntur magni dolores eos qui ratione
                            voluptatem sequi nesciunt. Neque porro quisquam est,
                            qui dolorem ipsum quia dolor sit amet, consectetur,
                            adipisci velit, sed quia non numquam eius modi
                            tempora incidunt ut labore et dolore magnam aliquam
                            quaerat voluptatem.
                          </p>
                          <blockquote>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur cing elit,
                              sed do eiusmod tempor.
                            </p>
                            <footer>- Rosalina Pong</footer>
                          </blockquote>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt.
                          </p>
                          {blog.des.div.div[0].img && (
                            <div className="blog-inner-img mb-30 mt-30">
                              <img
                                src={blog.des.div.div[0].img.src}
                                alt="blog image"
                              />
                            </div>
                          )}
                          <div className="inner-content">
                            <h4>A cleansing hot shower or bath</h4>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit, sed do eiusmod tempor incididunt
                              ut labore et dolore magna aliqua. Ut enim ad minim
                              veniam, quis nostrud exercitation ullamco laboris
                              nisi ut aliquip ex ea commodo consequat. Duis aute
                              irure dolor in reprehenderit in voluptate velit
                              esse cillum dolore eu fugiat nulla pariatur.
                              Excepteur sint occaecat cupidatat non proident,
                              sunt in culpa qui officia.
                            </p>
                          </div>
                          <div className="inner-content">
                            <h4>Setting the mood with incense</h4>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur
                              adipisicing elit, sed do eiusmod tempor incididunt
                              ut labore et dolore magna aliqua. Ut enim ad minim
                              veniam, quis nostrud exercitation ullamco laboris
                              nisi ut aliquip ex ea commodo consequat. Duis aute
                              irure dolor in reprehenderit in voluptate velit
                              esse cillum dolore eu fugiat nulla pariatur.
                              Excepteur sint occaecat cupidatat non proident,
                              sunt in culpa qui officia.
                            </p>
                          </div>
                        </div>
                      )}
                      <div className="row mt-50">
                        <div className="col-xl-8 col-lg-8 col-md-8 mb-15">
                          <div className="blog-post-tag">
                            <span>Releted Tags</span>
                            {blog.tags &&
                              blog.tags.map((tag) => (
                                <a
                                  href="#"
                                  onClick={(e) => e.preventDefault()}
                                  key={tag}
                                >
                                  {tag}
                                </a>
                              ))}
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4 mb-15">
                          <div className="blog-share-icon text-left text-md-right">
                            <span>Share: </span>
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              <i className="fab fa-facebook-f" />
                            </a>
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              <i className="fab fa-twitter" />
                            </a>
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              <i className="fab fa-instagram" />
                            </a>
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              <i className="fab fa-google-plus-g" />
                            </a>
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              <i className="fab fa-vimeo-v" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="navigation-border pt-50 mt-40" />
                        </div>

                        <div className="col-xl-5 col-lg-5 col-md-5">
                          {blog.id !== 1 && (
                            <div className="bakix-navigation b-next-post text-left mb-30">
                              <span>
                                <Link href={`/blog/${blog.id - 1}`}>
                                  <a>Prev Post</a>
                                </Link>
                              </span>
                              <h4>
                                <Link href={`/blog/${blog.id - 1}`}>
                                  <a>
                                    {blogs &&
                                      blogs[blog.id - 2] &&
                                      blogs[blog.id - 2].title.slice(0, 20)}
                                  </a>
                                </Link>
                              </h4>
                            </div>
                          )}
                        </div>

                        <div className="col-xl-2 col-lg-2 col-md-2 ">
                          {/* <div className="bakix-filter text-left text-md-center mb-30">
                            <a href="#" onClick={e=>e.preventDefault()}>
                              <img src="/img/icon/filter.png" alt="filter" />
                            </a>
                          </div> */}
                        </div>
                        <div className="col-xl-5 col-lg-5 col-md-5">
                          {blogs && blogs.length !== blog.id && (
                            <div className="bakix-navigation b-next-post text-left text-md-right  mb-30">
                              <span>
                                <Link href={`/blog/${blog.id + 1}`}>
                                  <a>Next Post</a>
                                </Link>
                              </span>
                              <h4>
                                <Link href={`/blog/${blog.id + 1}`}>
                                  <a>
                                    {blogs && blogs.length !== blog.id
                                      ? blogs[blog.id].title.slice(0, 20)
                                      : ""}
                                  </a>
                                </Link>
                              </h4>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {blog.author && (
                      <div className="author mt-80 mb-40">
                        <div className="author-img text-center">
                          <img src={blog.author.img} alt="Author image" />
                        </div>
                        <div className="author-text text-center">
                          <h3>MD. Salim Rana</h3>
                          <div className="author-icon">
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              <i className="fab fa-facebook-f" />
                            </a>
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              <i className="fab fa-twitter" />
                            </a>
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              <i className="fab fa-behance-square" />
                            </a>
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              <i className="fab fa-youtube" />
                            </a>
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              <i className="fab fa-vimeo-v" />
                            </a>
                          </div>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequa aute irure dolor.{" "}
                          </p>
                        </div>
                      </div>
                    )}
                    <div className="post-comments">
                      <div className="blog-coment-title mb-30">
                        <h2>
                          {blog && blog.comments.length <= 9
                            ? `0${blog.comments.length}`
                            : blog.comments.length}{" "}
                          Comments
                        </h2>
                      </div>
                      <div className="latest-comments">
                        <ul>
                          {blog &&
                            blog.comments.map((comment, i) => (
                              <li key={i}>
                                <div className="comments-box">
                                  <div className="comments-avatar">
                                    <img
                                      src={comment.profilePic}
                                      alt="profilePic"
                                    />
                                  </div>
                                  <div className="comments-text">
                                    <div className="avatar-name">
                                      <h5>{comment.author}</h5>
                                      <span>{comment.date}</span>
                                      <a className="reply" href="#">
                                        <i className="fas fa-reply" />
                                        Reply
                                      </a>
                                    </div>
                                    <p>{comment.text}</p>
                                  </div>
                                </div>
                                {comment.replay && (
                                  <ul>
                                    {comment.replay.map((replay, r) => (
                                      <li className="children" key={r}>
                                        <div
                                          className="comments-box"
                                          style={{
                                            padding: "30px 0",
                                            borderTop: "1px solid #eaedff",
                                          }}
                                        >
                                          <div className="comments-avatar">
                                            <img
                                              src={replay.profilePic}
                                              alt="Profile Pic"
                                            />
                                          </div>
                                          <div className="comments-text">
                                            <div className="avatar-name">
                                              <h5>{replay.author}</h5>
                                              <span>{replay.date}</span>
                                              <a className="reply" href="#">
                                                <i className="fas fa-reply" />
                                                Reply
                                              </a>
                                            </div>
                                            <p>{replay.text}</p>
                                          </div>
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                    <div className="post-comments-form">
                      <div className="post-comments-title">
                        <h2>Post Comments</h2>
                      </div>
                      <form
                        id="contacts-form"
                        className="conatct-post-form"
                        action="#"
                        onSubmit={(e) => e.preventDefault()}
                      >
                        <div className="row">
                          <div className="col-xl-12">
                            <div className="contact-icon contacts-message">
                              <textarea
                                name="comments"
                                id="comments"
                                cols={30}
                                rows={10}
                                placeholder="Your Comments...."
                                defaultValue={""}
                              />
                            </div>
                          </div>
                          <div className="col-xl-12">
                            <div className="contact-icon contacts-name">
                              <input type="text" placeholder="Your Name.... " />
                            </div>
                          </div>
                          <div className="col-xl-12">
                            <div className="contact-icon contacts-email">
                              <input
                                type="email"
                                placeholder="Your Email...."
                              />
                            </div>
                          </div>
                          <div className="col-xl-12">
                            <div className="contact-icon contacts-website">
                              <input
                                type="text"
                                placeholder="Your Website...."
                              />
                            </div>
                          </div>
                          <div className="col-xl-12">
                            <button
                              className="bt-btn s-btn__square"
                              type="submit"
                            >
                              Post comment
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </article>
                </div>
                <BlogSideBar blog={blog} blogs={blogs} />
              </div>
            </div>
          </div>
        ) : (
          <h1 className="text-center blog-area pt-100 pb-60">Blog Not Found</h1>
        )}
      </main>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  blogs: state.blog.blogs,
  blog: state.blog.singleBlog,
});

export default connect(mapStateToProps, { getSingleBlog, getBlog })(
  BlogDetails
);
