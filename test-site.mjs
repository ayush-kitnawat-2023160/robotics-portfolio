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
const armPage = await readFile('projects/vision-guided-arm/index.html', 'utf8');
if (!armPage.includes('<video') || !armPage.includes('id="demo"') || !armPage.includes('vision-guided-arm-demo.mp4')) {
  mistakes.push('Robotic arm page is missing its local HTML5 demo player');
}
const galleryChecks = {
  'vision-guided-arm': ['arm-system-overview.jpg','arm-object-interaction.jpg','arm-vision-monitor.jpg'],
  'rocket-avionics': ['rocket-launch-display.jpg','rocket-launch-portrait.jpg','rocket-hardware-closeup.jpg'],
  'enhanced-kinectfusion': ['kinect-reconstruction.jpg','kinect-baseline.jpg','kinect-baseline-architecture.png','kinect-enhanced-architecture.png','kinect-comparison.png']
};
for (const [slug, assets] of Object.entries(galleryChecks)) {
  const page = await readFile(`projects/${slug}/index.html`, 'utf8');
  for (const asset of assets) if (!page.includes(asset)) mistakes.push(`${slug}: gallery is missing ${asset}`);
}
for (const asset of ['kinect-reconstruction.jpg','arm-system-overview.jpg','rocket-launch-display.jpg']) {
  if (!home.includes(asset)) mistakes.push(`Homepage is missing real project photograph ${asset}`);
}
const edge = await readFile('projects/edgefusion/index.html', 'utf8');
for (const detail of [
  'edgefusion-ip-architecture.svg',
  'edgefusion-ip-benchmarks.svg',
  'id="benchmarks"',
  '20.42 FPS',
  'YOLO11n',
  'YOLOv8n',
  '1440 × 1080',
  'Base64',
  'FUTURE WORK · NOT IMPLEMENTED'
]) {
  if (!edge.includes(detail)) mistakes.push(`EdgeFusion report update missing: ${detail}`);
}
if (edge.includes('More project photos & demo frames welcome') || edge.includes('Explore further') || edge.includes('Public code and demo links can be added here when available.')) {
  mistakes.push('EdgeFusion has unwanted placeholder sections');
}
if (mistakes.length) {
  console.error('Portfolio validation FAILED:\n' + mistakes.map((e) => ' - ' + e).join('\n'));
  process.exitCode = 1;
} else console.log(`Portfolio validation OK: ${pages.length} pages, ${checked} internal page/resource links, 6 case studies, explicit Skills section.`);
