import Link from "next/link";
const Blogs = ({ blogs, container }) => {
  // const { img, title, date, author, comments, des, id } = blog;
  return (
    <section className="latest-blog-area pt-95 pb-60 box-90">
      <div className={`${container ? "container" : "container-fluid"}`}>
        <div className="row">
          <div className="col-xl-12">
            <div className="area-title text-center mb-50">
              <h2>News Feeds</h2>
              <p>Check it out every updates</p>
            </div>
          </div>
        </div>
        <div className="row">
          {blogs &&
            blogs.map((blog) => (
              <div className="col-xl-4 col-lg-6 col-md-6" key={blog.id}>
                <div className="latest-news mb-40">
                  <div className="news__thumb mb-25">
                    <img src={blog.img} alt={blog.title} />
                  </div>
                  <div className="news__caption white-bg">
                    <div className="news-meta mb-15">
                      <span>
                        <i className="far fa-calendar-check" /> {blog.date}{" "}
                      </span>
                      <span>
                        <a href="#">
                          <i className="far fa-user" />{" "}
                          {blog.author && blog.author.name.split(" ")[0]}
                        </a>
                      </span>
                      <span>
                        <a href="#">
                          <i className="far fa-comments" />{" "}
                          {blog.comments && blog.comments.length} Comments
                        </a>
                      </span>
                    </div>
                    <h2>
                      <Link href={`/blog/${blog.id}`}>
                        <a>{blog.title}</a>
                      </Link>
                    </h2>
                    <p>{blog.des && blog.des.div.p[1].slice(1, 322)}...</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Blogs;
