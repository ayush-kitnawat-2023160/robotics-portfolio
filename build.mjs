import { cp, mkdir, rm } from 'node:fs/promises';
import './render-projects.mjs';

await rm('dist', { recursive: true, force: true });
await mkdir('dist');
for (const path of ['index.html', 'styles.css', 'project-pages.css', 'main.js', 'assets', 'projects']) {
  await cp(path, `dist/${path}`, { recursive: true });
}
console.log('Built static site to dist/');
