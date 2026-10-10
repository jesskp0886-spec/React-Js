import axios from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Turn any axios failure into a friendly message.
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) return Promise.reject(error);
    if (!error.response) {
      error.friendlyMessage =
        'Cannot reach the API. Stop and restart the app with "npm run dev".';
    } else if (error.response.status === 404) {
      error.friendlyMessage = 'The requested item was not found.';
    } else {
      error.friendlyMessage = `Request failed (${error.response.status}). Please try again.`;
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
