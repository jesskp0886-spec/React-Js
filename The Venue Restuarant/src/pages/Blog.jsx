import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usePageStyles from '../hooks/usePageStyles';
import { pageStyles } from '../styles';
import PageHero from '../components/layout/PageHero';
import BlogCard from '../components/blog/BlogCard';
import BlogFilters from '../components/blog/BlogFilters';
import Pagination from '../components/common/Pagination';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { fetchBlogs, resetFilters, setFilters } from '../features/blogs/blogsSlice';
import { PUBLIC_PAGE_SIZE } from '../utils/constants';

export default function Blog() {
  usePageStyles(pageStyles.blog);
  const dispatch = useDispatch();
  const { items, total, filters, listStatus, error } = useSelector((s) => s.blogs);

  // start with clean public filters each time the page opens
  useEffect(() => {
    dispatch(resetFilters({ limit: PUBLIC_PAGE_SIZE }));
  }, [dispatch]);

  // reload whenever a filter changes (previous in-flight request is aborted)
  useEffect(() => {
    if (filters.limit !== PUBLIC_PAGE_SIZE) return undefined;
    const request = dispatch(fetchBlogs('public'));
    return () => request.abort();
  }, [dispatch, filters]);

  const loading = listStatus === 'loading' || listStatus === 'idle';

  return (
    <>
      <PageHero image="/images/blog.jpg" subtitle="The Venue" title="Our Blog" />
      <div className="blog">
        <div className="container">
          <BlogFilters />

          {error && <ErrorMessage message={error} onRetry={() => dispatch(fetchBlogs('public'))} />}
          {loading && !error && <Loader label="Loading posts..." />}

          {!loading && !error && items.length === 0 && (
            <div className="text-center py-5">
              <h4>No posts found</h4>
              <p>Try a different search term or category.</p>
            </div>
          )}

          {!error && items.length > 0 && (
            <>
              <p className="results_count">
                Showing {items.length} of {total} {total === 1 ? 'post' : 'posts'}
              </p>
              <div className="row blog_grid">
                {items.map((b) => (
                  <BlogCard key={b.id} blog={b} />
                ))}
              </div>
              <Pagination
                page={filters.page}
                total={total}
                limit={filters.limit}
                onChange={(page) => {
                  dispatch(setFilters({ page }));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
