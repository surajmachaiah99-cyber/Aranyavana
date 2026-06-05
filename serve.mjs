#!/usr/bin/env node
/**
 * Tiny zero-dependency static server for the Udyana single-file site.
 * Usage: node serve.mjs   (default port 3000, override with PORT env var)
 */
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';

const ROOT = resolve(process.cwd());
const PORT = Number(process.env.PORT) || 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

const safeJoin = (urlPath) => {
  // Strip query string
  const clean = urlPath.split('?')[0].split('#')[0];
  // Decode and resolve, then make sure we stayed under ROOT.
  const decoded = decodeURIComponent(clean);
  const candidate = resolve(join(ROOT, decoded));
  return candidate.startsWith(ROOT) ? candidate : null;
};

const server = http.createServer(async (req, res) => {
  const started = Date.now();
  let urlPath = req.url === '/' ? '/index.html' : req.url;
  let filePath = safeJoin(urlPath);

  if (!filePath) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('Forbidden');
  }

  try {
    const info = await stat(filePath);
    if (info.isDirectory()) filePath = join(filePath, 'index.html');
    const data = await readFile(filePath);
    const ext = extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] ?? 'application/octet-stream',
      'Cache-Control': 'no-cache',
    });
    res.end(data);
    log(req.method, urlPath, 200, Date.now() - started);
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
      log(req.method, urlPath, 404, Date.now() - started);
    } else {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server error');
      console.error('[serve]', err);
    }
  }
});

const log = (method, path, status, ms) => {
  console.log(`${method} ${path} ${status} ${ms}ms`);
};

server.listen(PORT, () => {
  console.log(`▲ Udyana static server`);
  console.log(`  Local:  http://localhost:${PORT}`);
  console.log(`  Root:   ${ROOT}`);
});
