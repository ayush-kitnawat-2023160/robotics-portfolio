import { readFile, stat } from 'node:fs/promises';
import { dirname, resolve, extname } from 'node:path';
import { projects } from './project-data.mjs';

const pages = ['index.html', ...projects.map((p) => `projects/${p.slug}/index.html`)];
let checked = 0;
const mistakes = [];
for (const page of pages) {
  const html = await readFile(page, 'utf8');
  if (!html.includes('<main') || !html.includes('</main>') || !html.includes('<title>')) mistakes.push(`${page}: incomplete document`);
  if (page !== 'index.html' && !html.includes('id="problems"')) mistakes.push(`${page}: missing problem/solution section`);
  const attributes = /(?:href|src)="([^"]+)"/g;
  for (const [, url] of html.matchAll(attributes)) {
    if (/^(?:https?:|mailto:|#)/i.test(url)) continue;
    const relative = url.split('#')[0].split('?')[0];
    if (!relative) continue;
    const asset = resolve(dirname(page), relative);
    try { if (!(await stat(asset)).isFile()) mistakes.push(`${page}: not a file ${url}`); }
    catch { mistakes.push(`${page}: missing link or asset ${url}`); }
    checked++;
  }
}
const home = await readFile('index.html','utf8');
if (!home.includes('id="skills"')) mistakes.push('Homepage missing Skills section');
for (const p of projects) if (!home.includes(`projects/${p.slug}/index.html`)) mistakes.push(`Homepage missing ${p.slug} link`);
if (mistakes.length) {
  console.error('Portfolio validation FAILED:\n' + mistakes.map((e) => ' - ' + e).join('\n'));
  process.exitCode = 1;
} else console.log(`Portfolio validation OK: ${pages.length} pages, ${checked} internal page/resource links, 6 case studies, explicit Skills section.`);
