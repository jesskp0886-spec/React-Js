export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="alert alert-danger text-center" role="alert">
      <div>{message}</div>
      {onRetry && (
        <button className="btn btn-outline-danger btn-sm mt-2" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}
