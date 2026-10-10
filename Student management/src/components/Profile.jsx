import { useSelector } from 'react-redux';
import Avatar from './Avatar';

export default function Profile() {
  const user = useSelector((state) => state.auth.user);
  const total = useSelector((state) => state.students.items.length);

  return (
    <div className="mx-auto" style={{ maxWidth: 560 }}>
      <h1 className="page-title mb-4">Your profile</h1>
      <div className="panel p-4 d-flex align-items-center gap-4">
        <Avatar name={user.name} size={84} />
        <div>
          <h2 className="h4 mb-1">{user.name}</h2>
          <p className="mb-1 text-muted">{user.role}</p>
          <p className="mb-0"><i className="bi bi-envelope me-2" />{user.email}</p>
        </div>
      </div>
      <p className="text-muted mt-3">
        {total > 0 ? `You are managing ${total} students.` : 'Open the Students page to load your records.'}
      </p>
    </div>
  );
}
