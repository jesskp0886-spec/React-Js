export default function StatusBadge({ status }) {
  const published = status === 'published';
  return <span className={`badge badge-${published ? 'success' : 'warning'}`}>{published ? 'Published' : 'Draft'}</span>;
}
