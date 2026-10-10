import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../features/blogs/blogsSlice';
import useDebounce from '../../hooks/useDebounce';
import { CATEGORIES, SORT_OPTIONS } from '../../utils/constants';

// Search + category + sort (+ optional status) controls bound to the Redux filters.
export default function BlogFilters({ showStatus = false }) {
  const dispatch = useDispatch();
  const filters = useSelector((s) => s.blogs.filters);
  const [text, setText] = useState(filters.search);
  const debounced = useDebounce(text, 400);

  // push the debounced search term into the store
  useEffect(() => {
    if (debounced !== filters.search) dispatch(setFilters({ search: debounced }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  // keep the input in sync when filters are reset elsewhere
  useEffect(() => {
    if (filters.search === '') setText('');
  }, [filters.search]);

  const colClass = showStatus ? 'col-lg-3 col-md-6' : 'col-lg-4 col-md-6';
  const onClear = () => {
    setText('');
    dispatch(setFilters({ search: '', category: 'all', status: 'all', sort: 'newest' }));
  };

  return (
    <div className="blog_filters mb-4">
      <div className="form-row">
        <div className={`${colClass} mb-3`}>
          <label className="sr-only" htmlFor="blog-search">
            Search posts
          </label>
          <input
            id="blog-search"
            type="search"
            className="form-control"
            placeholder="Search by title..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className={`${colClass} mb-3`}>
          <label className="sr-only" htmlFor="blog-category">
            Category
          </label>
          <select
            id="blog-category"
            className="form-control"
            value={filters.category}
            onChange={(e) => dispatch(setFilters({ category: e.target.value }))}
          >
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        {showStatus && (
          <div className={`${colClass} mb-3`}>
            <label className="sr-only" htmlFor="blog-status">
              Status
            </label>
            <select
              id="blog-status"
              className="form-control"
              value={filters.status}
              onChange={(e) => dispatch(setFilters({ status: e.target.value }))}
            >
              <option value="all">All statuses</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        )}
        <div className={`${colClass} mb-3`}>
          <label className="sr-only" htmlFor="blog-sort">
            Sort
          </label>
          <select
            id="blog-sort"
            className="form-control"
            value={filters.sort}
            onChange={(e) => dispatch(setFilters({ sort: e.target.value }))}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button type="button" className="btn btn-link p-0 clear_filters" onClick={onClear}>
        Clear filters
      </button>
    </div>
  );
}
