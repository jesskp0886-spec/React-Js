import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import usePageStyles from '../hooks/usePageStyles';
import { pageStyles } from '../styles';
import PageHero from '../components/layout/PageHero';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import StatusBadge from '../components/common/StatusBadge';
import { clearCurrent, fetchBlogById } from '../features/blogs/blogsSlice';
import { formatDate, splitParagraphs } from '../utils/format';

export default function BlogDetail() {
  usePageStyles(pageStyles.blog);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { current: blog, currentStatus, error } = useSelector((s) => s.blogs);

  useEffect(() => {
    dispatch(fetchBlogById(id));
    return () => dispatch(clearCurrent());
  }, [dispatch, id]);

  return (
    <>
      <PageHero
        image={blog?.image || '/images/blog.jpg'}
        subtitle={blog ? blog.category : 'The Venue'}
        title={blog ? blog.title : 'Blog'}
      />
      <div className="blog_section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              {currentStatus === 'loading' && <Loader label="Loading post..." />}
              {currentStatus === 'failed' && (
                <ErrorMessage message={error === 'The requested item was not found.' ? 'This post does not exist.' : error} />
              )}

              {currentStatus === 'succeeded' && blog && (
                <article className="post_detail">
                  <div className="post_meta">
                    <span>{formatDate(blog.createdAt)}</span>
                    <span>by {blog.author}</span>
                    <span>in {blog.category}</span>
                    {blog.status !== 'published' && <StatusBadge status={blog.status} />}
                  </div>
                  <img className="post_image" src={blog.image} alt={blog.title} />
                  <p className="post_lead">{blog.excerpt}</p>
                  {splitParagraphs(blog.content).map((para, i) => (
                    <p key={i} className="post_paragraph">
                      {para}
                    </p>
                  ))}
                  <div className="post_actions">
                    <Link to="/blog" className="btn btn-outline-secondary mr-2">
                      &larr; Back to blog
                    </Link>
                    <Link to={`/admin/blogs/${blog.id}/edit`} className="btn btn-venue">
                      Edit post
                    </Link>
                  </div>
                </article>
              )}

              {currentStatus === 'failed' && (
                <div className="text-center mt-3">
                  <Link to="/blog" className="btn btn-venue">
                    Back to blog
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
