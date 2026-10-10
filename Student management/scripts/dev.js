// Starts json-server and Vite together without needing a shell (cmd.exe).
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const bin = (...parts) => path.join(root, 'node_modules', ...parts);

const tasks = [
  { name: 'api', args: [bin('json-server', 'lib', 'cli', 'bin.js'), '--watch', 'db.json', '--port', '3001'] },
  { name: 'web', args: [bin('vite', 'bin', 'vite.js')] },
];

const children = tasks.map(({ name, args }) => {
  const child = spawn(process.execPath, args, { cwd: root, stdio: 'inherit' });
  child.on('exit', (code) => {
    console.log(`[${name}] exited with code ${code}`);
    children.forEach((c) => c.kill());
    process.exit(code ?? 0);
  });
  return child;
});

const stop = () => children.forEach((c) => c.kill());
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
