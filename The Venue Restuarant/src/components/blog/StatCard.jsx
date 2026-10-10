export default function StatCard({ label, value, icon }) {
  return (
    <div className="col-md-4 mb-3">
      <div className="stat_card">
        <i className={`fa ${icon}`} aria-hidden="true"></i>
        <div>
          <div className="stat_value">{value}</div>
          <div className="stat_label">{label}</div>
        </div>
      </div>
    </div>
  );
}
