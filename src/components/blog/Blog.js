import Link from "next/link";
import { dblock } from "../../utils/utils";

const Blog = ({ blog, active, sort, extraClass, column, id }) => {
  return (
    <div
      className={`col-lg-${column ? column : 6} col-md-6 ${extraClass} ${dblock(
        active,
        id,
        sort
      )}`}
    >
      <article className="postbox post format-image mb-40">
        <div className="postbox__thumb">
          <Link href={`/blog/${blog.id}`}>
            <a>
              <img src={blog.img} alt="blog image" />
            </a>
          </Link>
        </div>
        <div className="postbox__text p-30">
          <div className="post-meta mb-15">
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
          <h3 className="blog-title blog-title-sm">
            <Link href={`/blog/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </h3>
          <div className="post-text">
            <p>{blog.des && blog.des.div.p[1].slice(1, 322)}</p>
          </div>
          <div className="read-more">
            <Link href={`/blog/${blog.id}`}>
              <a className="read-more">
                read more <i className="far fa-long-arrow-alt-right" />
              </a>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default Blog;
