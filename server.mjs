import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';

const root = resolve(process.argv[2] || '.');
const port = Number(process.env.PORT || 5173);
const host = process.env.HOST || '127.0.0.1';
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif' };

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const relative = decodeURIComponent(url.pathname).replace(/^\/+/, '') || 'index.html';
    let file = resolve(root, relative);
    if (!(file === root || file.startsWith(root + sep))) { res.writeHead(403); res.end('Forbidden'); return; }
    let info = await stat(file);
    if (info.isDirectory()) { file = resolve(file, 'index.html'); info = await stat(file); }
    if (!info.isFile()) throw new Error('Not a file');
    res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(await readFile(file));
  } catch { res.writeHead(404); res.end('Not found'); }
});
server.listen(port, host, () => console.log(`Portfolio ready at http://${host}:${port}`));
