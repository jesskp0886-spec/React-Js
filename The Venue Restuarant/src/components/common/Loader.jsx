export default function Loader({ label = 'Loading...' }) {
  return (
    <div className="text-center py-5" role="status">
      <div className="spinner-border" style={{ color: '#ffa07f' }}></div>
      <div className="mt-2">{label}</div>
    </div>
  );
}
