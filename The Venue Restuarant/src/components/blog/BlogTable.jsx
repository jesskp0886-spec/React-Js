import { Link } from 'react-router-dom';
import StatusBadge from '../common/StatusBadge';
import { formatDate } from '../../utils/format';

// Admin table: view / edit / publish-toggle / delete actions per row.
export default function BlogTable({ blogs, onToggle, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover admin_table align-middle">
        <thead>
          <tr>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Date</th>
            <th>Status</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((b) => (
            <tr key={b.id}>
              <td>
                <div className="d-flex align-items-center">
                  <img src={b.image} alt="" className="admin_thumb mr-3" />
                  <Link to={`/blog/${b.id}`} className="admin_title">
                    {b.title}
                  </Link>
                </div>
              </td>
              <td>{b.category}</td>
              <td>{b.author}</td>
              <td className="text-nowrap">{formatDate(b.createdAt)}</td>
              <td>
                <StatusBadge status={b.status} />
              </td>
              <td className="text-right text-nowrap">
                <Link to={`/blog/${b.id}`} className="btn btn-sm btn-outline-secondary mr-1" title="View">
                  <i className="fa fa-eye" aria-hidden="true"></i>
                  <span className="sr-only">View</span>
                </Link>
                <Link to={`/admin/blogs/${b.id}/edit`} className="btn btn-sm btn-outline-primary mr-1" title="Edit">
                  <i className="fa fa-pencil" aria-hidden="true"></i>
                  <span className="sr-only">Edit</span>
                </Link>
                <button
                  className="btn btn-sm btn-outline-success mr-1"
                  onClick={() => onToggle(b)}
                  title={b.status === 'published' ? 'Move to draft' : 'Publish'}
                >
                  <i className={`fa ${b.status === 'published' ? 'fa-toggle-on' : 'fa-toggle-off'}`} aria-hidden="true"></i>
                  <span className="sr-only">{b.status === 'published' ? 'Move to draft' : 'Publish'}</span>
                </button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(b)} title="Delete">
                  <i className="fa fa-trash" aria-hidden="true"></i>
                  <span className="sr-only">Delete</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
