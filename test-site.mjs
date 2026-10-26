import { readFile, stat } from 'node:fs/promises';
import { dirname, resolve, extname } from 'node:path';
import { projects } from './project-data.mjs';

const pages = ['index.html', ...projects.map((p) => `projects/${p.slug}/index.html`)];
let checked = 0;
const mistakes = [];
for (const project of projects) {
  const page = await readFile(`projects/${project.slug}/index.html`, 'utf8');
  const cards = [...page.matchAll(/<span class="pipeline-count">(\d{2})<\/span><div><h3>([^<]+)<\/h3>/g)];
  if (cards.length !== project.pipeline.length) {
    mistakes.push(`${project.slug}: expected ${project.pipeline.length} numbered How it works cards, got ${cards.length}`);
  }
  for (const [i, step] of project.pipeline.entries()) {
    if (/^\d{1,2}\s*[·.:\-]\s*/.test(step.title)) mistakes.push(`${project.slug}: number duplicated in step title ${step.title}`);
    if (cards[i]?.[1] !== String(i + 1).padStart(2, '0')) mistakes.push(`${project.slug}: wrong step number at position ${i + 1}`);
    if (/^\d{1,2}\s*[·.:\-]\s*/.test(cards[i]?.[2] || '')) mistakes.push(`${project.slug}: rendered card heading repeats number`);
  }
}
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
const contactMarkup = home.match(/<section class="contact section-pad"[\s\S]*?<\/section>/)?.[0] || '';
if (!contactMarkup.includes('contact-actions') ||
    !contactMarkup.includes('contact-brand-icon') ||
    !contactMarkup.includes('Get in touch') ||
    !contactMarkup.includes('href="mailto:ayush23160@iiitd.ac.in?subject=') ||
    !contactMarkup.includes('class="button button-light contact-action contact-github" href="https://github.com/ayush-kitnawat-2023160"') ||
    !contactMarkup.includes('class="button button-light contact-action contact-linkedin" href="https://www.linkedin.com/in/ayush-kitnawat-81046b2a1/"')) {
  mistakes.push('Contact actions must show Gmail email button, GitHub link and matching LinkedIn button');
}
if (contactMarkup.includes('class="contact-email"') || contactMarkup.includes('class="contact-social"')) {
  mistakes.push('Old contact email text or unstyled LinkedIn link remains');
}
if ((contactMarkup.match(/class="button button-light contact-action(?: contact-(?:github|linkedin))?"/g) || []).length !== 3) {
  mistakes.push('All three contact actions should use matching buttons');
}
if (!home.includes('id="skills"')) mistakes.push('Homepage missing Skills section');
for (const detail of ['Curious by','THERE\'S MORE TO ME','Away from the keyboard']) {
  if (!home.includes(detail)) mistakes.push(`Homepage About section missing: ${detail}`);
}
if (home.includes('class="personal-interests"') || home.includes('class="interest-tile"')) {
  mistakes.push('About section still contains the removed interest cards');
}
for (const p of projects.filter(p => p.slug !== 'wildlife-classification')) {
  if (!home.includes(`projects/${p.slug}/index.html`)) mistakes.push(`Homepage missing ${p.slug} link`);
}
if (!home.includes('class="project-card project-card-rocketry reveal"')) {
  mistakes.push('Model Rocketry is not a main-grid project card');
}
const projectPhotoLinks = [
  ['project-feature-visual', 'autonomous-golf-cart', 'golfcart-latest-poster.jpg'],
  ['project-visual', 'enhanced-kinectfusion', 'kinect-reconstruction.jpg'],
  ['project-visual', 'vision-guided-arm', 'arm-system-overview.jpg'],
  ['project-wide-visual', 'edgefusion', 'edgefusion-architecture.svg'],
  ['project-visual', 'rocket-avionics', 'rocket-launch-display.jpg']
];
for (const [visualClass, slug, asset] of projectPhotoLinks) {
  const pattern = new RegExp(
    `<a class="[^"]*\\b${visualClass}\\b[^"]*\\bproject-image-link\\b[^"]*" href="\\./projects/${slug}/index\\.html"[^>]*><img[^>]*src="\\./assets/media/${asset.replaceAll('.', '\\.')}[^"]*"[^>]*>`
  );
  if (!pattern.test(home)) mistakes.push(`Project photo does not link to ${slug} case study`);
}
if (home.indexOf('Smarter tracking,<br />closer to the edge.') > home.indexOf('Model Rocketry &amp; Telemetry')) {
  mistakes.push('EdgeFusion must appear before Model Rocketry on the homepage');
}
if (home.includes('class="more-work reveal"') || home.includes('MORE EXPLORATIONS') || home.includes('Beyond the screen.')) {
  mistakes.push('The removed More Explorations section is still on the homepage');
}
if (home.includes('./projects/wildlife-classification/index.html')) {
  mistakes.push('Wildlife Classification should remain a standalone case study, not a homepage project');
}
if (!home.includes('ayush-professional-portrait.webp') || !home.includes('class="hero-art hero-photo-art"')) {
  mistakes.push('Homepage is missing the new professional portrait');
}
if (/portrait-scan|portrait-sensor-label|portrait-orbit|portrait-grid|portrait-previews|portrait-art|portrait-side-label|ayush-portrait-cutout\.webp/.test(home)) {
  mistakes.push('Homepage portrait still contains old photo, artwork, or project overlays');
}
const heroPhoto = home.match(/<div class="hero-art hero-photo-art">([\s\S]*?)<\/div>/)?.[1] || '';
if ((heroPhoto.match(/<img\b/g) || []).length !== 1 || /<(?:a|span|svg|canvas)\b/i.test(heroPhoto)) {
  mistakes.push('Portrait hero must contain the new photo only, with no decorative elements');
}
if (home.includes('ONE OF MY PROJECTS') || home.includes('FIG. 001 / ROBOT PERCEPTION')) {
  mistakes.push('Homepage still shows the old LiDAR illustration labeling');
}
const armPage = await readFile('projects/vision-guided-arm/index.html', 'utf8');
if (armPage.includes('Video frame ·') || armPage.includes('class="evidence-grid"') ||
    armPage.includes('Real outputs are marked as such. Illustrations explain the concept')) {
  mistakes.push('Robotic arm page still shows redundant video-frame photo gallery');
}
if (!armPage.includes('Watch the <em>robot in action.</em>')) {
  mistakes.push('Robotic arm page needs a focused video demonstration heading');
}
const golfPage = await readFile('projects/autonomous-golf-cart/index.html','utf8');
for (const text of ['id="evolution"', 'id="zenoh"', 'id="golf-benchmarks"', 'golfcart-early-drive.mp4', 'golfcart-latest-demo.mp4','golfcart-zenoh-bridge.mp4', 'golfcart-benchmark-clean.jpg','golfcart-benchmark-rain.jpg','golfcart-fusion-architecture.jpg','ROS1', 'ROS2','Zenoh', '0.521 m', '0.640 m', 'pseudo-ground-truth', 'reverse', 'delayed pose', 'RealSense', 'ZED X', 'TEB']) {
  if (!golfPage.toLowerCase().includes(text.toLowerCase())) mistakes.push(`Flagship golf cart case study missing: ${text}`);
}
for (const asset of ['golfcart-early-drive.mp4','golfcart-latest-demo.mp4','golfcart-zenoh-bridge.mp4','golfcart-early-poster.jpg','golfcart-latest-poster.jpg','golfcart-zenoh-poster.jpg']) {
  try { if (!(await stat(`assets/media/${asset}`)).size) mistakes.push(`Empty golf cart media: ${asset}`); }
  catch { mistakes.push(`Missing golf cart media: ${asset}`); }
}
if (!home.includes('FLAGSHIP RESEARCH PROJECT') || !home.includes('Zenoh integration') || !home.includes('golfcart-latest-poster.jpg')) mistakes.push('Homepage golf-cart spotlight is not updated');
if (golfPage.includes('More project photos & demo frames welcome') || golfPage.includes('DEMO STATUS')) mistakes.push('Flagship golf-cart page still contains stale media placeholders');
if (golfPage.includes('Why companies care') || golfPage.includes('Explore further') || golfPage.includes('Selected code repository')) mistakes.push('Golf-cart page still contains unwanted marketing or repository panels');
if (!golfPage.includes('SYSTEM INTEGRATION TAKEAWAY') || !golfPage.includes('golf-integration-takeaway')) mistakes.push('Golf-cart page missing technical integration takeaway');
const fusionImage = 'golfcart-fusion-architecture.jpg';
if (!golfPage.includes(fusionImage)) {
  mistakes.push('Golf-cart architecture gallery must preserve the fusion diagram');
}
if (golfPage.includes('golfcart-floam-architecture.jpg') || golfPage.includes('earlier FLOAM architecture')) {
  mistakes.push('Golf-cart page still includes the removed FLOAM architecture');
}
if (golfPage.includes('golfcart-tentative-localization-architecture.jpg') || golfPage.includes('TENTATIVE DESIGN') || golfPage.includes('Next Step — Implementation')) {
  mistakes.push('Golf-cart page still contains the removed Next Step architecture');
}
const linkedin = 'https://www.linkedin.com/in/ayush-kitnawat-81046b2a1/';
if ((home.match(/https:\/\/www\.linkedin\.com\/in\/ayush-kitnawat-81046b2a1\//g) || []).length < 4) {
  mistakes.push('LinkedIn should appear in homepage metadata, hero, contact, and footer');
}
for (const p of projects) {
  const page = await readFile(`projects/${p.slug}/index.html`, 'utf8');
  if (!page.includes(linkedin)) mistakes.push(`LinkedIn footer missing on ${p.slug} case study`);
}
if (golfPage.indexOf('01 / NOW') < 0 || golfPage.indexOf('02 / THEN') < 0 || golfPage.indexOf('01 / NOW') > golfPage.indexOf('02 / THEN') || golfPage.indexOf('golfcart-latest-demo.mp4') > golfPage.indexOf('golfcart-early-drive.mp4')) {
  mistakes.push('Golf-cart demos should show latest / NOW first, then early / THEN');
}
for (const detail of [
  'Vision-guided sorting robot',
  'tabletop',
  'color',
  'visual mark',
  'AprilTag',
  'YOLO',
  'homography',
  'xArm Lite6',
  'top-down',
  'Vision-guided sorting · Hardware demonstration'
]) {
  if (!armPage.toLowerCase().includes(detail.toLowerCase())) mistakes.push(`Sorting robot page missing: ${detail}`);
}
if (/linked team repository contains a broader sorting system|personal contributions described here are limited to|stated in the resume|class="detail-disclaimer"|vision.language.action|\bVLA\b/i.test(armPage)) {
  mistakes.push('Sorting robot page still contains the removed disclaimer or unsupported VLA claims');
}
if (!home.includes('Vision-guided sorting robot') || !home.includes('color and visual marks')) {
  mistakes.push('Homepage sorting robot summary is not aligned with the actual project');
}
const kinect = await readFile('projects/enhanced-kinectfusion/index.html', 'utf8');
if (kinect.includes('DEMO STATUS') || kinect.includes('The source repository includes runnable KinectFusion examples') || kinect.includes('The RMSE is a reported project figure from the resume') || kinect.includes('class="detail-disclaimer"')) {
  mistakes.push('KinectFusion still displays unwanted demo status or disclaimer text');
}
for (const term of ['QUANTITATIVE RESULTS','77.5%','1.20 m','0.27 m','12.57 GB','16.74 GB','14.36','8.34','0.8 FPS','0.6 FPS','fr1/room']) {
  if (!kinect.includes(term)) mistakes.push(`KinectFusion metrics missing: ${term}`);
}
if (!home.includes('77.5% lower')) mistakes.push('Homepage KinectFusion RMSE summary missing reduction');
if (armPage.includes('kinect-metrics-grid')) mistakes.push('KinectFusion-specific metrics appeared on robotic arm page');
if (!armPage.includes('<video') || !armPage.includes('id="demo"') || !armPage.includes('vision-guided-arm-demo.mp4')) {
  mistakes.push('Robotic arm page is missing its local HTML5 demo player');
}
const rocketPage = await readFile('projects/rocket-avionics/index.html', 'utf8');
for (const term of ['Kalman filter', 'IMU', 'sensor fusion', 'LoRa', 'STM32']) {
  if (!rocketPage.toLowerCase().includes(term.toLowerCase())) mistakes.push(`Rocketry missing technical detail: ${term}`);
}
if (/Explore further|Public code and demo links can be added here|DEMO STATUS|Flight video and ground-station screenshots have not been supplied/i.test(rocketPage)) {
  mistakes.push('Rocketry still contains the removed Explore further or Demo status placeholder');
}
if (!home.includes('Kalman-filter-based sensor fusion') || !home.includes('rocket-avionics/index.html')) {
  mistakes.push('Homepage Model Rocketry card missing sensor fusion or case-study link');
}
const galleryChecks = {
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
  'edgefusion-architecture.svg',
  'edgefusion-benchmarks.svg',
  'id="benchmarks"',
  '20.42 FPS',
  'YOLO11n',
  'YOLOv8n',
  '1440 × 1080',
  'Base64',
  'FUTURE WORK · NOT YET IMPLEMENTED'
]) {
  if (!edge.includes(detail)) mistakes.push(`EdgeFusion project section missing: ${detail}`);
}
if (edge.includes('More project photos & demo frames welcome') || edge.includes('Explore further') || edge.includes('Public code and demo links can be added here when available.')) {
  mistakes.push('EdgeFusion has unwanted placeholder sections');
}
if (/\bIP report\b|\bindependent project report\b|\binterim report\b|\breport schematic\b|\bthis report\b/i.test(edge)) {
  mistakes.push('EdgeFusion contains document/report references instead of portfolio project descriptions');
}
const arch = await readFile('assets/media/edgefusion-architecture.svg', 'utf8');
const graph = await readFile('assets/media/edgefusion-benchmarks.svg', 'utf8');
if (/\bIP report\b|\bindependent project report\b|\breport\b/i.test(arch + graph)) {
  mistakes.push('EdgeFusion diagrams still contain report labels');
}
if (/\bIP report\b|\bindependent project report\b/i.test(home)) {
  mistakes.push('Homepage still mentions the EdgeFusion source document');
}
if (mistakes.length) {
  console.error('Portfolio validation FAILED:\n' + mistakes.map((e) => ' - ' + e).join('\n'));
  process.exitCode = 1;
} else console.log(`Portfolio validation OK: ${pages.length} pages, ${checked} internal page/resource links, 6 case studies, explicit Skills section.`);
