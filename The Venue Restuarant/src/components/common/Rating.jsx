export default function Rating({ stars = 5, className = '' }) {
  return (
    <div className={`rating_r rating_r_${stars} ${className}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <i key={i}></i>
      ))}
    </div>
  );
}
