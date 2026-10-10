import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsonServer from 'json-server';

const dbFile = path.resolve(path.dirname(fileURLToPath(import.meta.url)), 'db.json');

// Runs JSON Server inside the Vite dev server, so "npm run dev" starts
// the front end AND the API (available at /api/blogs). No second terminal needed.
function jsonServerApi() {
  const api = jsonServer.create();
  api.use(jsonServer.defaults({ logger: false }));
  api.use(jsonServer.router(dbFile));
  const attach = (server) => {
  server.middlewares.use('/api', api);
  };
  return {
    name: 'json-server-api',
    configureServer: attach,
    configurePreviewServer: attach,
  };
}

export default defineConfig({
  plugins: [react(), jsonServerApi()],
  server: {
    port: 5173,
    // the API writes to db.json, so don't let Vite react to those changes
    watch: { ignored: ['**/db.json'] },
  },
});
