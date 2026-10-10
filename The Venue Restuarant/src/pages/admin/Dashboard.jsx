import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import usePageStyles from '../../hooks/usePageStyles';
import { pageStyles } from '../../styles';
import PageHero from '../../components/layout/PageHero';
import StatCard from '../../components/blog/StatCard';
import BlogFilters from '../../components/blog/BlogFilters';
import BlogTable from '../../components/blog/BlogTable';
import Pagination from '../../components/common/Pagination';
import ConfirmModal from '../../components/common/ConfirmModal';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import {
  deleteBlog,
  fetchBlogs,
  fetchStats,
  resetFilters,
  setFilters,
  toggleBlogStatus,
} from '../../features/blogs/blogsSlice';
import { ADMIN_PAGE_SIZE } from '../../utils/constants';

export default function Dashboard() {
  usePageStyles(pageStyles.blog);
  const dispatch = useDispatch();
  const { items, total, stats, filters, listStatus, error } = useSelector((s) => s.blogs);
  const [toDelete, setToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    dispatch(resetFilters({ limit: ADMIN_PAGE_SIZE }));
    dispatch(fetchStats());
  }, [dispatch]);

  useEffect(() => {
    if (filters.limit !== ADMIN_PAGE_SIZE) return undefined;
    const request = dispatch(fetchBlogs('admin'));
    return () => request.abort();
  }, [dispatch, filters]);

  // if the last post on a page was removed, step back one page
  useEffect(() => {
    if (listStatus === 'succeeded' && items.length === 0 && total > 0 && filters.page > 1) {
      dispatch(setFilters({ page: filters.page - 1 }));
    }
  }, [dispatch, listStatus, items.length, total, filters.page]);

  const handleToggle = (blog) => {
    dispatch(toggleBlogStatus(blog))
      .unwrap()
      .then(() => dispatch(fetchStats()))
      .catch(() => {});
  };

  const confirmDelete = async () => {
    setDeleting(true);
    try {
      await dispatch(deleteBlog(toDelete.id)).unwrap();
      dispatch(fetchStats());
      dispatch(fetchBlogs('admin'));
    } catch {
      /* the error notice is shown by the slice */
    } finally {
      setDeleting(false);
      setToDelete(null);
    }
  };

  const loading = listStatus === 'loading' || listStatus === 'idle';

  return (
    <>
      <PageHero image="/images/blog.jpg" subtitle="The Venue" title="Admin Dashboard" />
      <div className="blog_section">
        <div className="container">
          <div className="row">
            <StatCard label="Total posts" value={stats.total} icon="fa-file-text-o" />
            <StatCard label="Published" value={stats.published} icon="fa-check-circle-o" />
            <StatCard label="Drafts" value={stats.draft} icon="fa-pencil-square-o" />
          </div>

          <div className="d-flex flex-wrap align-items-center justify-content-between my-4">
            <h3 className="admin_heading mb-0">Manage posts</h3>
            <Link to="/admin/blogs/new" className="btn btn-venue">
              <i className="fa fa-plus mr-1" aria-hidden="true"></i> Add new post
            </Link>
          </div>

          <BlogFilters showStatus />

          {error && <ErrorMessage message={error} onRetry={() => dispatch(fetchBlogs('admin'))} />}
          {loading && !error && <Loader label="Loading posts..." />}

          {!loading && !error && items.length === 0 && (
            <div className="text-center py-5">
              <h4>No posts match your filters</h4>
              <p>Adjust the filters or add a new post.</p>
            </div>
          )}

          {!error && items.length > 0 && (
            <>
              <BlogTable blogs={items} onToggle={handleToggle} onDelete={setToDelete} />
              <p className="results_count text-center">
                {total} {total === 1 ? 'post' : 'posts'} found
              </p>
              <Pagination
                page={filters.page}
                total={total}
                limit={filters.limit}
                onChange={(page) => dispatch(setFilters({ page }))}
              />
            </>
          )}
        </div>
      </div>

      {toDelete && (
        <ConfirmModal
          title="Delete post"
          message={`Are you sure you want to delete "${toDelete.title}"? This cannot be undone.`}
          busy={deleting}
          onConfirm={confirmDelete}
          onCancel={() => setToDelete(null)}
        />
      )}
    </>
  );
}
