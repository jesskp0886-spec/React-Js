import { Link } from 'react-router-dom';
import { formatDate } from '../../utils/format';

export default function BlogCard({ blog }) {
  return (
    <div className="col-lg-6 blog_col">
      <div className="blog_post">
        <div className="blog_post_image_container">
          <div className="blog_post_image">
            <Link to={`/blog/${blog.id}`}>
              <img src={blog.image || '/images/blog_1.jpg'} alt={blog.title} />
            </Link>
          </div>
          <div className="blog_post_date">
            <Link to={`/blog/${blog.id}`}>{formatDate(blog.createdAt)}</Link>
          </div>
        </div>
        <div className="blog_post_content">
          <div className="blog_post_title">
            <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
          </div>
          <div className="blog_post_info">
            <ul className="d-flex flex-row align-items-center justify-content-start">
              <li>
                by <span>{blog.author}</span>
              </li>
              <li>
                in <span>{blog.category}</span>
              </li>
            </ul>
          </div>
          <div className="blog_post_text">
            <p>{blog.excerpt}</p>
            <Link to={`/blog/${blog.id}`} className="read_more">
              Read more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
