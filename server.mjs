import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { resolve, extname, sep } from 'node:path';

const root = resolve(process.argv[2] || '.');
const port = Number(process.env.PORT || 5173);
const host = process.env.HOST || '127.0.0.1';
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif', '.mp4': 'video/mp4' };

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const relative = decodeURIComponent(url.pathname).replace(/^\/+/, '') || 'index.html';
    let file = resolve(root, relative);
    if (!(file === root || file.startsWith(root + sep))) { res.writeHead(403); res.end('Forbidden'); return; }
    let info = await stat(file);
    if (info.isDirectory()) { file = resolve(file, 'index.html'); info = await stat(file); }
    if (!info.isFile()) throw new Error('Not a file');
    // HTML5 video playback needs HTTP byte-range support for seeking.
    if (extname(file) === '.mp4') {
      const range = req.headers.range;
      const match = range?.match(/^bytes=(\d*)-(\d*)$/);
      let start = 0;
      let end = info.size - 1;
      if (range && !match) {
        res.writeHead(416, { 'Content-Range': `bytes */${info.size}` });
        res.end();
        return;
      }
      if (match) {
        if (match[1] === '' && match[2] === '') {
          res.writeHead(416, { 'Content-Range': `bytes */${info.size}` });
          res.end();
          return;
        }
        if (match[1] === '') {
          const suffixBytes = Number(match[2]);
          start = Math.max(0, info.size - suffixBytes);
        } else {
          start = Number(match[1]);
          if (match[2] !== '') end = Math.min(end, Number(match[2]));
        }
        if (!Number.isSafeInteger(start) || !Number.isSafeInteger(end) || start > end || start >= info.size) {
          res.writeHead(416, { 'Content-Range': `bytes */${info.size}` });
          res.end();
          return;
        }
      }
      const headers = {
        'Content-Type': 'video/mp4',
        'Accept-Ranges': 'bytes',
        'Content-Length': end - start + 1,
        'Cache-Control': 'no-cache'
      };
      if (match) headers['Content-Range'] = `bytes ${start}-${end}/${info.size}`;
      res.writeHead(match ? 206 : 200, headers);
      if (req.method === 'HEAD') return res.end();
      createReadStream(file, { start, end }).pipe(res);
      return;
    }
    res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(await readFile(file));
  } catch { res.writeHead(404); res.end('Not found'); }
});
server.listen(port, host, () => console.log(`Portfolio ready at http://${host}:${port}`));
