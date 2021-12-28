import Link from "next/link";
import { filterBlog } from "../../utils/filterBlog";

const BlogSideBar = ({ blog, blogs }) => {
  return (
    <div className="col-lg-4">
      <div className="widget mb-40">
        <div className="widget-title-box mb-30">
          <span className="animate-border" />
          <h3 className="widget-title">About Me</h3>
        </div>
        {blog && blog.author && (
          <div className="about-me text-center">
            <img src={blog.author.img} alt="Profile" />
            <h4>{blog.author.name}</h4>
            <p>{blog.author.bio}</p>
            <div className="widget-social-icon">
              {blog.author.social &&
                blog.author.social.map((social, i) => (
                  <a href={social.link} key={i}>
                    <i className={`fab fa-${social.name}`} />
                  </a>
                ))}
            </div>
          </div>
        )}
      </div>
      <div className="widget mb-40">
        <div className="widget-title-box mb-30">
          <span className="animate-border" />
          <h3 className="widget-title">Popular Feeds</h3>
        </div>
        {blogs && (
          <ul className="recent-posts">
            {filterBlog(blog.categorie, blogs).map((b, i) => (
              <li
                key={i}
                className={`${
                  i <= 2 ? (b.id === blog.id ? "d-none" : "") : "d-none"
                }`}
              >
                <div className="widget-posts-image">
                  <Link href={`/blog/${b.id}`}>
                    <a>
                      <img src={b.img} alt="blog" />
                    </a>
                  </Link>
                </div>
                <div className="widget-posts-body">
                  <h6 className="widget-posts-title">
                    <Link href={`/blog/${b.id}`}>
                      <a>{b.title.slice(0, 35)}</a>
                    </Link>
                  </h6>
                  <div className="widget-posts-meta">{b.date}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="widget mb-40">
        <div className="widget-title-box mb-30">
          <span className="animate-border" />
          <h3 className="widget-title">Categories</h3>
        </div>
        <ul className="cat">
          <li>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Lifestyle <span className="f-right">78</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Travel <span className="f-right">42</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Fashion <span className="f-right">32</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Music <span className="f-right">85</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={(e) => e.preventDefault()}>
              Branding <span className="f-right">05</span>
            </a>
          </li>
        </ul>
      </div>
      {blog && blog.author.social && (
        <div className="widget mb-40">
          <div className="widget-title-box mb-30">
            <span className="animate-border" />
            <h3 className="widget-title">Social Profile</h3>
          </div>
          <div className="social-profile">
            {blog.author.social.map((social, i) => (
              <a href={`/${social.link}`} key={i}>
                <i className={`fab fa-${social.name}`} />
              </a>
            ))}
          </div>
        </div>
      )}
      <div className="widget mb-40">
        <div className="widget-title-box mb-30">
          <span className="animate-border" />
          <h3 className="widget-title">Instagram Feeds</h3>
        </div>
        <ul id="Instafeed" />
      </div>
      <div className="widget mb-40">
        <div className="widget-title-box mb-30">
          <span className="animate-border" />
          <h3 className="widget-title">Instagram Feeds</h3>
        </div>
        <div className="tag">
          <a href="#" onClick={(e) => e.preventDefault()}>
            Popular
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>
            desgin
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>
            usability
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>
            develop
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>
            consult
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>
            icon
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>
            HTML
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>
            ux
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>
            business
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>
            kit
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>
            keyboard
          </a>
          <a href="#" onClick={(e) => e.preventDefault()}>
            tech
          </a>
        </div>
      </div>
      <div className="widget mb-40 p-0 b-0">
        <div className="banner-widget">
          <a href="#" onClick={(e) => e.preventDefault()}>
            <img src="/img/blog/details/banner.jpg" alt="Banner" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BlogSideBar;
