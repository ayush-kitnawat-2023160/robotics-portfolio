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
  const golf = project.slug === 'autonomous-golf-cart';
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
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../../styles.css" />
  <link rel="stylesheet" href="../../project-pages.css" />
  <title>${esc(project.title)} | Ayush Kitnawat</title>
</head>
<body>
<a href="#main" class="skip-link">Skip to main content</a>
<div class="site-shell">
  <header class="site-header" id="top">
    <div class="container header-inner">
      <a class="wordmark" href="../../index.html" aria-label="Ayush Kitnawat, homepage"><span>Ayush</span><span class="wordmark-sub">Kitnawat</span><span class="mark-dot">.</span></a>
      <nav class="desktop-nav" aria-label="Main navigation"><a href="../../index.html#about">About</a><a href="../../index.html#projects">Projects</a><a href="../../index.html#experience">Experience</a><a href="../../index.html#skills">Skills</a></nav>
      <a class="header-contact" href="mailto:ayush23160@iiitd.ac.in">Let's talk <span aria-hidden="true">↗</span></a>
      <button class="mobile-menu-toggle" type="button" aria-label="Open menu" aria-controls="mobile-nav" aria-expanded="false"><span></span><span></span></button>
    </div>
    <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" hidden><a href="../../index.html#about">About</a><a href="../../index.html#projects">Projects</a><a href="../../index.html#experience">Experience</a><a href="../../index.html#skills">Skills</a><a href="../../index.html#contact">Contact</a></nav>
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
            <div class="detail-hero-actions"><a class="button button-dark" href="#story">Read the case study <span aria-hidden="true">↓</span></a>${golf ? '<a class="text-link" href="#evolution">See the evolution <span aria-hidden="true">↓</span></a><a class="text-link" href="#zenoh">ROS1 ↔ ROS2 <span aria-hidden="true">↓</span></a>' : armDemo ? '<a class="text-link" href="#demo">Watch demo <span aria-hidden="true">↓</span></a>' : project.links.filter((l) => l.kind === 'demo').map((l) => external(l, 'text-link')).join('')}</div>
          </div>
          <figure class="detail-cover">
            <img src="${esc(project.hero)}" alt="${esc(project.heroAlt)}" width="900" height="600" />
            <figcaption>${esc(project.heroCaption)}</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <div class="container detail-layout" id="story">
      <aside class="detail-rail" aria-label="On this page"><span class="eyebrow">IN THIS CASE STUDY</span><a href="#overview">01 / Overview</a><a href="#contributions">02 / My contributions</a>${golf ? '<a href="#evolution">03 / Early → latest demo</a><a href="#zenoh">04 / ROS1 ↔ ROS2 + Zenoh</a><a href="#golf-benchmarks">05 / Benchmarks</a>' : ''}<a href="#architecture">How it works</a><a href="#problems">Engineering challenges</a><a href="#evidence">Photos & architecture</a>${project.benchmarkRows ? '<a href="#benchmarks">Benchmark data</a>' : ''}<a href="#results">Results & learnings</a></aside>
      <div class="detail-article">
        <section class="detail-section" id="overview">
          <span class="detail-section-index">01 / THE BIG PICTURE</span>
          <h2>The problem & <em>our solution.</em></h2>
          <p class="detail-lead">${esc(project.intro)}</p>
          <div class="problem-story">
            <div class="problem-story-card problem-story-primary"><span class="detail-tiny-label">THE REAL-WORLD PROBLEM</span><h3>Why was this needed?</h3><p>${esc(project.businessProblem)}</p></div>
            <div class="problem-story-card"><span class="detail-tiny-label">THE PROJECT GOAL</span><h3>What did we set out to build?</h3><p>${esc(project.projectGoal)}</p></div>
            <div class="problem-story-card"><span class="detail-tiny-label">PRACTICAL VALUE</span><h3>Why does it matter?</h3><p>${esc(project.practicalValue)}</p></div>
          </div>
          <div class="detail-scope"><span class="scope-mark">⌖</span><div><strong>Project context</strong><p>${esc(project.scope)}</p></div></div>
        </section>
        <section class="detail-section" id="contributions">
          <span class="detail-section-index">02 / OWNERSHIP</span>
          <h2>What I <em>worked on.</em></h2>
          <p class="detail-subheading">My contribution to the project, separate from the broader team's work.</p>
          <div class="contribution-list">${project.contribution.map((s, i) => `<div class="contribution"><span>${String(i + 1).padStart(2, '0')}</span><p>${esc(s)}</p></div>`).join('')}</div>
        </section>
        ${golf ? `
        <section class="detail-section golf-feature" id="evolution">
          <span class="detail-section-index">03 / EVOLUTION OF THE SYSTEM</span>
          <h2>Now vs. <em>then.</em></h2>
          <p class="detail-lead">Start with the latest integrated demo, then look back at an earlier field run. Compare the localization displays, planning visualization and the view from the vehicle to see how the system evolved. This is a progression of the engineering system, not a controlled before/after performance experiment.</p>
          <div class="golf-evolution-timeline" aria-label="Latest demonstration followed by earlier field run"><span>OCT 2026 / LATEST DEMO</span><b aria-hidden="true">→</b><span>MAR 2026 / EARLIER FIELD RUN</span></div>
          <div class="golf-demo-grid">
            <article class="golf-video-card golf-video-latest"><div class="golf-video-top"><span>01 / NOW</span><strong>Live integrated navigation</strong></div>
              <video controls preload="metadata" playsinline poster="../../assets/media/golfcart-latest-poster.jpg" aria-label="Latest golf-cart drive showing LiDAR localization, live path planning, external view and steering camera"><source src="../../assets/media/golfcart-latest-demo.mp4" type="video/mp4" /></video>
              <p>October 2026 · Synchronized presentation of LiDAR localization, updated live planning, external cart footage and steering view.</p></article>
            <article class="golf-video-card"><div class="golf-video-top"><span>02 / THEN</span><strong>Early on-cart experiment</strong></div>
              <video controls preload="metadata" playsinline poster="../../assets/media/golfcart-early-poster.jpg" aria-label="March 2026 golf-cart field test showing camera view and RViz"><source src="../../assets/media/golfcart-early-drive.mp4" type="video/mp4" /></video>
              <p>March 2026 · Vehicle camera and RViz views during an earlier run, with localization and the cart's motion shown together.</p></article>
          </div>
          <p class="golf-caveat">The later recording demonstrates system integration, not certified autonomous operation. Reverse-motion oscillation and delayed pose updates are among the issues still being debugged.</p>
        </section>
        <section class="detail-section" id="zenoh">
          <span class="detail-section-index">04 / DISTRIBUTED ROS INTEGRATION</span>
          <h2>Bridging ROS1 and ROS2 <em>with Zenoh.</em></h2>
          <p class="detail-lead">A valuable part of this project was getting a mature ROS1 autonomy stack to communicate with newer ROS2-side systems. Rather than rewrite working localization and planning nodes, we used a Zenoh bridge across the compute-to-vehicle boundary.</p>
          <div class="golf-zenoh-panel">
            <div class="golf-zenoh-header"><span>COMPATIBILITY WITHOUT A BIG-BANG REWRITE</span><strong>ROS1 ↔ ZENOH ↔ ROS2</strong></div>
            <div class="golf-bridge-flow">
              <div><span>LEGACY COMPUTE / NUC</span><strong>ROS1</strong><p>Localization<br/>Planning<br/>Monitoring</p></div>
              <div class="golf-bridge-middle"><span>INTEROPERABILITY LAYER</span><strong>Zenoh bridge</strong><p>Message / topic exchange<br/>across ROS environments</p></div>
              <div><span>VEHICLE-SIDE SYSTEMS</span><strong>ROS2</strong><p>Sensor interfaces<br/>Vehicle feedback<br/>Control-side integration</p></div>
            </div>
            <div class="golf-zenoh-video">
              <video controls preload="metadata" playsinline poster="../../assets/media/golfcart-zenoh-poster.jpg" aria-label="Zenoh ROS1 to ROS2 bridge architecture animation"><source src="../../assets/media/golfcart-zenoh-bridge.mp4" type="video/mp4" /></video>
              <p>October 23, 2026 · Architecture walkthrough supplied with the project. It illustrates the bridge topology; it is not a network-throughput or latency benchmark.</p>
            </div>
          </div>
          <div class="golf-integration-takeaway"><span class="detail-tiny-label">SYSTEM INTEGRATION TAKEAWAY</span><p>Using Zenoh allowed the existing ROS1 localization and planning software to communicate with ROS2 components without a complete rewrite. The integration also required careful handling of message compatibility, topic routing, timestamps, and consistent interpretation of sensor and control data across the two systems.</p></div>
        </section>
        <section class="detail-section" id="golf-benchmarks">
          <span class="detail-section-index">05 / REPRODUCIBLE LOCALIZATION EVALUATION</span>
          <h2>We benchmarked more than <em>a pretty trajectory.</em></h2>
          <p class="detail-lead">I helped compare six localization approaches on recorded data and applied synthetic degradation to test their behavior when sensors become unreliable. We examined absolute trajectory differences, drift, yaw and dropout rather than treating a single screenshot as proof.</p>
          <div class="golf-kpi-grid">
            <div><span>BEST CLEAN OVERALL RMSE</span><strong>0.521 <small>m</small></strong><p>FAST-LIVO2 · ALIVE sequence</p></div>
            <div><span>EXISTING FLOAM BASELINE</span><strong>0.640 <small>m</small></strong><p>Same comparison · clean recording</p></div>
            <div><span>COMPARISON COVERAGE</span><strong>6 <small>methods</small></strong><p>LiDAR, visual and multimodal pipelines</p></div>
          </div>
          <div class="golf-results-table-wrap" role="region" aria-label="Localization RMSE benchmark comparison; scroll horizontally if needed" tabindex="0">
            <table class="golf-results-table"><thead><tr><th>Estimator</th><th>Clean overall RMSE</th><th>Modality / observation</th></tr></thead>
              <tbody>
                <tr class="golf-best"><th>FAST-LIVO2</th><td>0.521 m</td><td>Best in this clean-run comparison</td></tr>
                <tr><th>LVI-SAM</th><td>0.547 m</td><td>LiDAR / vision / IMU fusion family</td></tr>
                <tr><th>FAST-LIO2</th><td>0.597 m</td><td>LiDAR + IMU</td></tr>
                <tr><th>FLOAM</th><td>0.640 m</td><td>Earlier LiDAR-only baseline</td></tr>
                <tr><th>ORB-SLAM3</th><td>1.096 m</td><td>Camera-based trajectory comparison</td></tr>
                <tr><th>RTAB-Map</th><td>26.145 m</td><td>Large deviation / localization dropout</td></tr>
              </tbody></table>
          </div>
          <div class="golf-conditions"><div><span>RAIN-LIKE PERTURBATION</span><strong>0.509 m</strong><p>FAST-LIVO2 vs 0.610 m FLOAM</p></div><div><span>FOG-LIKE PERTURBATION</span><strong>0.501 m</strong><p>FAST-LIVO2 vs 0.630 m FLOAM</p></div></div>
          <p class="golf-caveat"><strong>Reading the results correctly:</strong> These are comparative errors on recorded data against a LiDAR-derived pseudo-ground-truth reference—not independent survey-grade pose accuracy. Rain and fog were simulated by sensor perturbations, not measured in real storms or fog. The two tables and plots are from the localization benchmarking presentation.</p>
        </section>
        ` : ''}
        <section class="detail-section" id="architecture">
          <span class="detail-section-index">03 / SYSTEM DESIGN</span>
          <h2>How it <em>works.</em></h2>
          <div class="pipeline-list">${project.pipeline.map((s, i) => `<div class="pipeline-step"><span class="pipeline-count">${String(i + 1).padStart(2, '0')}</span><div><h3>${esc(s.title)}</h3><p>${esc(s.body)}</p></div></div>`).join('')}</div>
        </section>
        <section class="detail-section" id="problems">
          <span class="detail-section-index">04 / THE ENGINEERING</span>
          <h2>Challenges & <em>what I did.</em></h2>
          <p class="detail-subheading">What made the project difficult, and the choices I made while working through it.</p>
          <div class="challenge-list">${project.challenges.map((c) => `<article class="challenge-card"><span class="detail-tiny-label">${esc(c.tag)}</span><h3>${esc(c.title)}</h3><div class="challenge-contrast"><div><span class="challenge-label">THE PROBLEM</span><p>${esc(c.problem)}</p></div><div><span class="challenge-label">MY APPROACH</span><p>${esc(c.response)}</p></div></div><p class="challenge-proof"><strong>${project.benchmarkRows ? 'Key finding:' : project.slug === 'vision-guided-arm' ? 'Implementation detail:' : 'Evidence / boundary:'}</strong> ${esc(c.evidence)}</p></article>`).join('')}</div>
        </section>
        <section class="detail-section" id="evidence">
          <span class="detail-section-index">05 / FROM THE WORKBENCH</span>
          <h2>${project.benchmarkRows ? 'System design & <em>benchmarks.</em>' : armDemo ? 'Watch the <em>robot in action.</em>' : project.slug === 'rocket-avionics' ? 'The rocket in <em>photos.</em>' : golf ? 'Real experiments & <em>architecture.</em>' : 'Photos, plots & <em>demo.</em>'}</h2>
          <p class="detail-subheading">${project.benchmarkRows ? 'An overview of the multi-camera system and measured Jetson inference performance. The architecture shows how the sensing units and central tracker connect; the plots compare speed across camera counts and inference settings.' : armDemo ? 'The full demonstration shows the tabletop sorting setup, camera-based perception and robot arm moving between objects and bins.' : project.slug === 'rocket-avionics' ? 'Photographs of the team’s model rocket and hardware setup.' : golf ? 'An exploratory sensor-fusion architecture alongside actual vehicle recordings and localization experiments. The fusion diagram illustrates a design concept, not verified automatic failover.' : 'Real outputs are marked as such. Illustrations explain the concept and are not presented as project photographs.'}</p>
          ${project.media.length ? `<div class="evidence-grid">${project.media.map((m) => `<figure class="evidence-item${m.wide ? ' evidence-wide' : ''}${m.diagram ? ' evidence-diagram' : ''}"><a href="${esc(m.src)}" target="_blank" rel="noopener" title="Open full image"><img loading="lazy" src="${esc(m.src)}" alt="${esc(m.caption)}" /><span class="evidence-expand">View full size ↗</span></a><figcaption><strong>${esc(m.label)}</strong><span>${esc(m.caption)}</span></figcaption></figure>`).join('')}</div>` : ''}
          ${project.photoSuggestion ? `<div class="photo-request"><span class="photo-icon">▧</span><div><strong>More project photos & demo frames welcome</strong><p>${esc(project.photoSuggestion)}</p><small>Existing charts are authentic; other artwork is explicitly labeled as illustrative.</small></div></div>` : ''}
          ${armDemo ? `<div class="demo-embed" id="demo"><div class="demo-heading"><div><strong>Vision-guided sorting · Hardware demonstration</strong><span class="demo-subtitle">Real hardware · 2 min 49 sec · Camera-guided pick &amp; place</span></div><a href="https://drive.google.com/file/d/1_gH-eMLU9dsza4KSZNG2K8226SaciRYQ/view?usp=sharing" target="_blank" rel="noopener noreferrer">Google Drive backup ↗</a></div><video class="project-demo-video" controls preload="metadata" playsinline poster="../../assets/media/vision-guided-arm-poster.jpg" aria-label="Vision-guided sorting robot hardware demonstration"><source src="../../assets/media/vision-guided-arm-demo.mp4" type="video/mp4" />Your browser cannot play this video. <a href="../../assets/media/vision-guided-arm-demo.mp4">Open the recording</a>.</video><p class="embed-note">Captured during the team project. Use the player controls to play, pause, seek, or watch fullscreen.</p></div>` : ''}
          ${!armDemo && project.demoNote ? `<div class="demo-note"><span class="eyebrow">DEMO STATUS</span><p>${esc(project.demoNote)}</p></div>` : ''}
        </section>
        ${project.benchmarkRows ? `
        <section class="detail-section" id="benchmarks">
          <span class="detail-section-index">06 / MEASURED PERFORMANCE</span>
          <h2>What the tests <em>actually showed.</em></h2>
          <p class="detail-subheading">Measured single-camera and four-camera FPS across YOLO11n and YOLOv8n, two input resolutions, and FP16/INT8 inference. The four-camera column shows the individual stream rates, not their sum.</p>
          <div class="benchmark-scroll" role="region" tabindex="0" aria-label="EdgeFusion benchmark results table; scroll horizontally on smaller screens">
            <table class="benchmark-table">
              <thead><tr><th scope="col">Detector</th><th scope="col">Input</th><th scope="col">TensorRT</th><th scope="col">1 camera</th><th scope="col">4 cameras · each FPS</th></tr></thead>
              <tbody>${project.benchmarkRows.map((b) => `<tr><th scope="row">${esc(b.model)}</th><td>${esc(b.resolution)}</td><td><span class="precision-label">${esc(b.precision)}</span></td><td class="rate">${esc(b.one)} FPS</td><td class="camera-rates">${esc(b.four)}</td></tr>`).join('')}</tbody>
            </table>
          </div>
          <div class="benchmark-context"><span class="detail-tiny-label">HOW TO READ THIS</span><p>${esc(project.benchmarkNote)}</p></div>
        </section>` : ''}
        <section class="detail-section" id="results">
          <span class="detail-section-index">${project.benchmarkRows ? '07' : '06'} / OUTCOMES</span>
          <h2>Results & <em>takeaways.</em></h2>
          ${project.measuredMetrics ? `<div class="kinect-metrics" aria-label="${esc(project.measuredMetrics.heading)}">
            <div class="kinect-metrics-heading"><span class="detail-tiny-label">QUANTITATIVE RESULTS</span><h3>${esc(project.measuredMetrics.heading)}</h3><p>${esc(project.measuredMetrics.context)}</p></div>
            <div class="kinect-metrics-grid">${project.measuredMetrics.cards.map((m) => `<div class="kinect-metric-card"><strong>${esc(m.value)}</strong><span>${esc(m.label)}</span><p>${esc(m.detail)}</p></div>`).join('')}</div>
            <p class="kinect-metrics-footnote">${esc(project.measuredMetrics.footnote)}</p>
          </div>` : ''}
          <div class="detail-stats">${project.outcomes.map((o) => `<div><strong>${esc(o.big)}</strong><span>${esc(o.small)}</span></div>`).join('')}</div>
          <blockquote class="detail-takeaway">“${esc(project.takeaway)}”</blockquote>
          ${project.disclaimer ? `<p class="detail-disclaimer">${esc(project.disclaimer)}</p>` : ''}
          ${project.nextSteps ? `<div class="future-research"><span class="detail-tiny-label">FUTURE WORK · NOT YET IMPLEMENTED</span><h3>What I'd build next</h3><ul>${project.nextSteps.map((item) => `<li>${esc(item)}</li>`).join('')}</ul></div>` : ''}
        </section>
        ${project.showExploreFurther === false ? '' : `<div class="detail-links"><h3>Explore further</h3><div>${project.links.length ? project.links.map((l) => external(l)).join('') : '<p>Public code and demo links can be added here when available.</p>'}</div></div>`}
      </div>
    </div>

    <section class="other-projects"><div class="container"><div class="other-heading"><span class="eyebrow">KEEP EXPLORING</span><h2>More <em>engineering stories.</em></h2></div><div class="related-projects">${related.map((p) => `<a class="related-card" href="../${esc(p.slug)}/index.html"><span class="detail-tiny-label">${esc(p.label)}</span><h3>${esc(p.title)}</h3><span class="related-arrow">Read case study ↗</span></a>`).join('')}</div><div class="project-pagination"><a href="../${esc(prev.slug)}/index.html">← Previous project</a><a href="../${esc(next.slug)}/index.html">Next project →</a></div></div></section>
  </main>
  <footer class="site-footer"><div class="container footer-inner"><a class="footer-wordmark" href="../../index.html">Ayush Kitnawat<span>.</span></a><p>Robotics, vision, systems, and real-world iteration.</p><div class="footer-links"><a href="../../index.html#projects">Projects ↗</a><a href="https://www.linkedin.com/in/ayush-kitnawat-81046b2a1/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="mailto:ayush23160@iiitd.ac.in">Email ↗</a><a href="#top">Back to top ↑</a></div><span class="copyright">© <span id="year">2026</span> Ayush Kitnawat</span></div></footer>
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
