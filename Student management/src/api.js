// Thin wrapper around fetch for the json-server backend.
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
  } catch {
    throw new Error('Cannot reach the server. Run "npm run server" and try again.');
  }
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.json();
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: 'POST', body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: 'DELETE' }),
};
