import { mkdir, writeFile } from 'node:fs/promises';
import { projects } from './project-data.mjs';

const esc = (s = '') => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const tags = (items) => items.map((t) => `<span>${esc(t)}</span>`).join('');
const external = (link, cls = 'button button-dark') => `<a class="${cls}" href="${esc(link.url)}" target="_blank" rel="noopener noreferrer">${esc(link.text)} <span aria-hidden="true">↗</span></a>`;
const linkText = (link) => `<a class="project-link" href="${esc(link.url)}" target="_blank" rel="noopener noreferrer">${esc(link.text)} <span aria-hidden="true">↗</span></a>`;
const root = '../../';

function render(project, index) {
  const next = projects[(index + 1) % projects.length];
  const prev = projects[(index + projects.length - 1) % projects.length];
  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3);
  const armDemo = project.slug === 'vision-guided-arm';
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#f7f8f4" />
  <meta name="description" content="${esc(project.short)} — a project case study by Ayush Kitnawat." />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${esc(project.title)} | Ayush Kitnawat" />
  <meta property="og:description" content="${esc(project.short)}" />
  <meta property="og:image" content="../../assets/og-cover.svg" />
  <link rel="icon" href="../../assets/favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../../styles.css" />
  <link rel="stylesheet" href="../../project-pages.css" />
  <title>${esc(project.title)} | Ayush Kitnawat</title>
</head>
<body>
<a href="#main" class="skip-link">Skip to main content</a>
<div class="site-shell">
  <header class="site-header" id="top">
    <div class="container header-inner">
      <a class="wordmark" href="../../index.html" aria-label="Ayush Kitnawat, homepage">ayush<span class="mark-dot">.</span><span class="wordmark-sub">kitnawat</span></a>
      <nav class="desktop-nav" aria-label="Main navigation"><a href="../../index.html#projects">Projects</a><a href="../../index.html#experience">Experience</a><a href="../../index.html#skills">Skills</a><a href="../../index.html#about">About</a></nav>
      <a class="header-contact" href="mailto:ayush23160@iiitd.ac.in">Let's talk <span aria-hidden="true">↗</span></a>
      <button class="mobile-menu-toggle" type="button" aria-label="Open menu" aria-controls="mobile-nav" aria-expanded="false"><span></span><span></span></button>
    </div>
    <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" hidden><a href="../../index.html#projects">Projects</a><a href="../../index.html#experience">Experience</a><a href="../../index.html#skills">Skills</a><a href="../../index.html#about">About</a><a href="../../index.html#contact">Contact</a></nav>
  </header>
  <main id="main">
    <section class="detail-hero">
      <div class="container">
        <nav class="breadcrumbs" aria-label="Breadcrumb"><a href="../../index.html#projects">← All projects</a><span aria-hidden="true">/</span><span>Case study ${esc(project.number)}</span></nav>
        <div class="detail-hero-layout">
          <div>
            <p class="eyebrow detail-kicker">${esc(project.label)}</p>
            <h1>${esc(project.title)}<span class="h1-stop">.</span></h1>
            <p class="detail-deck">${esc(project.short)}</p>
            <div class="detail-meta">
              <div><span class="small-label">MY ROLE</span><strong>${esc(project.role)}</strong></div>
              <div><span class="small-label">WHEN / WHERE</span><strong>${esc(project.date)}<br />${esc(project.affiliation)}</strong></div>
            </div>
            <div class="detail-hero-actions"><a class="button button-dark" href="#story">Read the case study <span aria-hidden="true">↓</span></a>${project.links.filter((l) => l.kind === 'demo').map((l) => external(l, 'text-link')).join('')}</div>
          </div>
          <figure class="detail-cover">
            <img src="${esc(project.hero)}" alt="${esc(project.heroAlt)}" width="900" height="600" />
            <figcaption>${esc(project.heroCaption)}</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <div class="container detail-layout" id="story">
      <aside class="detail-rail" aria-label="On this page"><span class="eyebrow">IN THIS CASE STUDY</span><a href="#overview">01 / Overview</a><a href="#contributions">02 / My contributions</a><a href="#architecture">03 / How it works</a><a href="#problems">04 / Problems & solutions</a><a href="#evidence">05 / Media & evidence</a><a href="#results">06 / Results & learnings</a></aside>
      <div class="detail-article">
        <section class="detail-section" id="overview">
          <span class="detail-section-index">01 / THE PROJECT</span>
          <h2>What was this <em>about?</em></h2>
          <p class="detail-lead">${esc(project.intro)}</p>
          <div class="detail-scope"><span class="scope-mark">⌖</span><div><strong>Project context</strong><p>${esc(project.scope)}</p></div></div>
        </section>
        <section class="detail-section" id="contributions">
          <span class="detail-section-index">02 / OWNERSHIP</span>
          <h2>What I actually <em>worked on.</em></h2>
          <p class="detail-subheading">My responsibilities — distinguished from everything the wider team or research project may have explored.</p>
          <div class="contribution-list">${project.contribution.map((s, i) => `<div class="contribution"><span>${String(i + 1).padStart(2, '0')}</span><p>${esc(s)}</p></div>`).join('')}</div>
        </section>
        <section class="detail-section" id="architecture">
          <span class="detail-section-index">03 / SYSTEM DESIGN</span>
          <h2>How the pipeline <em>fits together.</em></h2>
          <div class="pipeline-list">${project.pipeline.map((s, i) => `<div class="pipeline-step"><span class="pipeline-count">${String(i + 1).padStart(2, '0')}</span><div><h3>${esc(s.title)}</h3><p>${esc(s.body)}</p></div></div>`).join('')}</div>
        </section>
        <section class="detail-section" id="problems">
          <span class="detail-section-index">04 / THE ENGINEERING</span>
          <h2>The problems & <em>how I approached them.</em></h2>
          <p class="detail-subheading">The interesting part isn't just a working screenshot; it's the decisions behind the implementation.</p>
          <div class="challenge-list">${project.challenges.map((c) => `<article class="challenge-card"><span class="detail-tiny-label">${esc(c.tag)}</span><h3>${esc(c.title)}</h3><div class="challenge-contrast"><div><span class="challenge-label">THE PROBLEM</span><p>${esc(c.problem)}</p></div><div><span class="challenge-label">MY APPROACH</span><p>${esc(c.response)}</p></div></div><p class="challenge-proof"><strong>Evidence / boundary:</strong> ${esc(c.evidence)}</p></article>`).join('')}</div>
        </section>
        <section class="detail-section" id="evidence">
          <span class="detail-section-index">05 / FROM THE WORKBENCH</span>
          <h2>See the <em>work.</em></h2>
          <p class="detail-subheading">Real outputs are marked as such. Illustrations explain the concept and are not presented as project photographs.</p>
          <div class="evidence-grid">${project.media.map((m) => `<figure class="evidence-item"><a href="${esc(m.src)}" target="_blank" rel="noopener" title="Open full image"><img loading="lazy" src="${esc(m.src)}" alt="${esc(m.caption)}" /><span class="evidence-expand">View full size ↗</span></a><figcaption><strong>${esc(m.label)}</strong><span>${esc(m.caption)}</span></figcaption></figure>`).join('')}</div>
          ${project.photoSuggestion ? `<div class="photo-request"><span class="photo-icon">▧</span><div><strong>More project photos & demo frames welcome</strong><p>${esc(project.photoSuggestion)}</p><small>Existing charts are authentic; other artwork is explicitly labeled as illustrative.</small></div></div>` : ''}
          ${armDemo ? `<div class="demo-embed"><div class="demo-heading"><strong>Project demo · Real robotic arm</strong><a href="https://drive.google.com/file/d/1_gH-eMLU9dsza4KSZNG2K8226SaciRYQ/view?usp=sharing" target="_blank" rel="noopener noreferrer">Open on Google Drive ↗</a></div><iframe loading="lazy" src="https://drive.google.com/file/d/1_gH-eMLU9dsza4KSZNG2K8226SaciRYQ/preview" title="Vision-guided robotic arm demo video" allow="autoplay; fullscreen" allowfullscreen referrerpolicy="no-referrer"></iframe><p class="embed-note">If the embedded player is restricted, use the Google Drive link above.</p></div>` : ''}
          ${!armDemo ? `<div class="demo-note"><span class="eyebrow">DEMO STATUS</span><p>${esc(project.demoNote)}</p></div>` : ''}
        </section>
        <section class="detail-section" id="results">
          <span class="detail-section-index">06 / OUTCOMES</span>
          <h2>What came <em>out of it.</em></h2>
          <div class="detail-stats">${project.outcomes.map((o) => `<div><strong>${esc(o.big)}</strong><span>${esc(o.small)}</span></div>`).join('')}</div>
          <blockquote class="detail-takeaway">“${esc(project.takeaway)}”</blockquote>
          <p class="detail-disclaimer">${esc(project.disclaimer)}</p>
        </section>
        <div class="detail-links"><h3>Explore further</h3><div>${project.links.length ? project.links.map((l) => external(l)).join('') : '<p>Public code and demo links can be added here when available.</p>'}</div></div>
      </div>
    </div>

    <section class="other-projects"><div class="container"><div class="other-heading"><span class="eyebrow">KEEP EXPLORING</span><h2>More <em>engineering stories.</em></h2></div><div class="related-projects">${related.map((p) => `<a class="related-card" href="../${esc(p.slug)}/index.html"><span class="detail-tiny-label">${esc(p.label)}</span><h3>${esc(p.title)}</h3><span class="related-arrow">Read case study ↗</span></a>`).join('')}</div><div class="project-pagination"><a href="../${esc(prev.slug)}/index.html">← Previous project</a><a href="../${esc(next.slug)}/index.html">Next project →</a></div></div></section>
  </main>
  <footer class="site-footer"><div class="container footer-inner"><a class="footer-wordmark" href="../../index.html">ayush<span>.</span></a><p>Robotics, vision, systems, and real-world iteration.</p><div class="footer-links"><a href="../../index.html#projects">Projects ↗</a><a href="mailto:ayush23160@iiitd.ac.in">Email ↗</a><a href="#top">Back to top ↑</a></div><span class="copyright">© <span id="year">2026</span> Ayush Kitnawat</span></div></footer>
</div>
<script defer src="../../main.js"></script>
</body></html>`;
}

for (const [index, project] of projects.entries()) {
  const dir = `projects/${project.slug}`;
  await mkdir(dir, { recursive: true });
  await writeFile(`${dir}/index.html`, render(project, index));
}
console.log(`Generated ${projects.length} project case-study pages.`);
