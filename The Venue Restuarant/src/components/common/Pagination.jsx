// Reusable Bootstrap pagination with a sliding window of page numbers.
export default function Pagination({ page, total, limit, onChange }) {
  const pages = Math.max(1, Math.ceil(total / limit));
  if (pages <= 1) return null;

  const windowSize = 5;
  let start = Math.max(1, page - Math.floor(windowSize / 2));
  const end = Math.min(pages, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);
  const numbers = [];
  for (let n = start; n <= end; n += 1) numbers.push(n);

  const go = (n) => {
    if (n >= 1 && n <= pages && n !== page) onChange(n);
  };

  return (
    <nav aria-label="Pagination" className="mt-4">
      <ul className="pagination justify-content-center flex-wrap">
        <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => go(page - 1)}>
            Previous
          </button>
        </li>
        {start > 1 && (
          <>
            <li className="page-item">
              <button className="page-link" onClick={() => go(1)}>
                1
              </button>
            </li>
            {start > 2 && (
              <li className="page-item disabled">
                <span className="page-link">&hellip;</span>
              </li>
            )}
          </>
        )}
        {numbers.map((n) => (
          <li key={n} className={`page-item ${n === page ? 'active' : ''}`}>
            <button className="page-link" onClick={() => go(n)} aria-current={n === page ? 'page' : undefined}>
              {n}
            </button>
          </li>
        ))}
        {end < pages && (
          <>
            {end < pages - 1 && (
              <li className="page-item disabled">
                <span className="page-link">&hellip;</span>
              </li>
            )}
            <li className="page-item">
              <button className="page-link" onClick={() => go(pages)}>
                {pages}
              </button>
            </li>
          </>
        )}
        <li className={`page-item ${page === pages ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => go(page + 1)}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}
