import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearNotice } from '../../features/blogs/blogsSlice';

export default function Notice() {
  const dispatch = useDispatch();
  const notice = useSelector((s) => s.blogs.notice);

  useEffect(() => {
    if (!notice) return undefined;
    const id = setTimeout(() => dispatch(clearNotice()), 3500);
    return () => clearTimeout(id);
  }, [notice, dispatch]);

  if (!notice) return null;
  return (
    <div
      className={`alert alert-${notice.type} shadow`}
      role="alert"
      style={{ position: 'fixed', top: 90, right: 20, zIndex: 3000, minWidth: 260 }}
    >
      {notice.message}
      <button type="button" className="close ml-3" aria-label="Close" onClick={() => dispatch(clearNotice())}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}
