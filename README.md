# Ayush Kitnawat — Robotics & Computer Vision Portfolio

Minimal static portfolio with an explicit skills matrix and **six independent project case-study pages**. Plain HTML, CSS, JavaScript and SVG; no framework or third-party build packages.

The homepage introduces Ayush as a **robotics and computer vision engineer**, highlighting robotic manipulation, 3D perception, embedded AI, and autonomous systems. The LiDAR illustration is identified as just one representative project, not the sole focus of the portfolio.

## Open locally

```bash
cd ~/Desktop/My_website
npm run dev
```

Open http://localhost:5173. The site includes:

- Home: `index.html`
- Homepage order: **Hero → About Me → Projects → Experience → Skills → Contact**
- Skills: `index.html#skills`
- Project case studies: `projects/<slug>/index.html`
- Real experiment images: `assets/media/`
- Illustrative cover artwork: `assets/*.svg`

## Case studies

| Project | Page |
| --- | --- |
| Golf cart localization | `projects/autonomous-golf-cart/index.html` |
| Enhanced KinectFusion | `projects/enhanced-kinectfusion/index.html` |
| Vision-guided robotic arm | `projects/vision-guided-arm/index.html` |
| EdgeFusion multi-camera tracking | `projects/edgefusion/index.html` |
| Rocket avionics & telemetry | `projects/rocket-avionics/index.html` |
| Wildlife classification & features | `projects/wildlife-classification/index.html` |

Each project begins with a reader-friendly summary of the **real-world problem, project goal, and practical value**, followed by personal responsibilities, pipeline explanation, three concrete technical problems and approaches, media/gallery, bounded outcomes, and code/demo links where available. Research prototypes are not described as commercial deployments.

## Edit your projects and add REAL photos

**Edit `project-data.mjs`** to change the descriptions, contributions, challenges, diagrams, outcome claims, links, and media. This is the single source for all six generated pages. Then run:

```bash
npm run render
```

Each project object contains a `media` array. Put your own verified photo, GIF or screenshot in `assets/media/`, then add an item:

```js
{ src: '../../assets/media/my-robot-photo.jpg',
  label: 'Actual robot setup · Hardware test',
  caption: 'Robot, camera and calibration board during testing.',
  type: 'real' }
```

For public demos, add a `links` entry with `kind:'demo'`. The vision-guided arm page plays a **local MP4** directly in the browser (with Google Drive as a backup). The other projects do **not** have invented demos; the pages identify what's missing.

### Vision-guided robotic arm video

The local recording is in `assets/media/vision-guided-arm-demo.mp4`, with a still frame at `assets/media/vision-guided-arm-poster.jpg`. This is a browser-compatible H.264/AAC version of the MP4 from Downloads. It preserves the full ~2 min 49 sec runtime while keeping the website download small (~11 MB versus ~178 MB original). The original file in Downloads was **not** changed. Play it at `/projects/vision-guided-arm/index.html#demo`; the project's card on the homepage links to the same player.

The built-in dev server supports HTTP byte-range requests for MP4 files, so the native HTML5 video player supports seeking. Static hosts (Netlify, GitHub Pages, etc.) normally provide the same support.

Change homepage summaries, project-card links and the skills grid directly in `index.html`. Design variables are in `styles.css` and case-study styling in `project-pages.css`.

## Check and deploy

```bash
npm test
npm run build
```

The `dist/` directory is complete and can be hosted on GitHub Pages, Vercel, Netlify, or Cloudflare Pages. The developer server and build script are not needed in production.

## Evidence, privacy and accuracy

- The **golf cart** page includes actual **offline** evaluation imagery from the local research workspace: an RGB camera frame, odometry keyframes, trajectory plots, and visual/LiDAR diagnostics. Some are **not map-aligned or globally verified**; captions state the limits.
- The **KinectFusion** page includes a confidence evaluation plot from the linked public source repository.
- The **robotic-arm** page uses a real thumbnail from the linked team demo and offers an embedded player plus direct viewing link.

### Project photographs and source figures

- **Robotic arm:** The homepage photo and four stills in the case-study gallery were extracted from the original full-length robotic-arm demonstration downloaded to `~/Downloads/VID-20260508-WA0009.mp4`. The video remains embedded on the case-study page.
- **Model rocket:** Actual team rocket photographs from the downloaded `DSC_8041.JPG`, `DSC_8042.JPG`, `DSC_8055.JPG`, and `IMG_20251027_134822.jpg`. The homepage shows the upright rocket; the case study presents multiple views. These show the vehicle, not measured telemetry or a documented launch.
- **KinectFusion reconstruction:** Real baseline and enhanced reconstruction screenshots extracted from `CV-project-1.pdf`, slide 8, with an additional examples panel from slide 9.
- **KinectFusion diagrams:** Original KinectFusion (Figure 1) and enhanced team architecture (Figure 2) from `CV_Project_Internim_Report-1.pdf`, page 3; qualitative comparison (Figure 3) from page 4. Clicking a figure opens a larger version. Figures describe the **team** project and are not claimed to be individually authored.
- **Golf cart:** The homepage uses an actual campus camera frame from the localization experiment workspace, not a stylized LiDAR illustration.
- **EdgeFusion:** No genuine EdgeFusion setup photo was supplied, so the site uses newly redrawn **report-grounded** system architecture and benchmark illustrations, never unrelated stock imagery.

### EdgeFusion independent project report (2025)

The EdgeFusion page has been grounded in the uploaded `Ayush_Kitnawat_2023160_IP_report.pdf` (Independent Project, IIIT Delhi, Monsoon 2025). The report is an evidence source, **not** automatically published on this site.

- **Actual role:** Jetson benchmarking, TensorRT deployment, distributed system design. The report names Ayush Kitnawat and Suyash Pathak as contributors, supervised by Prof. Saket Anand and Prof. Sanjit Kaul.
- **Hardware/software:** FLIR Firefly USB3 cameras, Jetson Orin Nano, Spinnaker SDK/PySpin, YOLO11n/YOLOv8n, TensorRT FP16/INT8, ZeroMQ PUSH/JSON, centralized DeepSORT.
- **Important correction:** The recorded implementation transmits **Base64-encoded full frames and cropped detections**, plus metadata, instead of sending cropped objects alone. Claimed bandwidth/latency improvement is a design intention, not a measured result in this report.
- **Benchmarks:** 32 configurations across two models, two input resolutions, two precision settings and one to four cameras. The new interactive-page table retains the report's four individual per-camera FPS numbers for each four-camera configuration.
- **Figures:** `assets/media/edgefusion-ip-architecture.svg` is redrawn from the written three-camera sensing-unit design (the report's pictorial schematic shows four cameras per unit, while its text says three). `assets/media/edgefusion-ip-benchmarks.svg` recreates charts from pages 3–4; each plotted value is the arithmetic mean of simultaneous per-camera FPS, **not aggregate throughput**.
- **Rebuild source figures:** `python3 tools/make_edgefusion_figures.py` (Python standard library only).
- **Future work is separate:** Edge-side identity tracking, transmitting embeddings rather than images, message brokering, networking upgrades and watchdogs are not presented as accomplished.
- The empty **Explore further** and **More photos welcome** placeholders remain removed specifically for EdgeFusion.

The additional HEIC file in Downloads was decoded during review, but was intentionally **not** added to the public page: it is a group photograph containing identifiable team members. The rocket hardware JPEGs are included instead. No original Downloads files were changed.
- Other existing images are **original conceptual illustrations** and are explicitly labeled. Add personal photos and demo footage only with permission to publish.
- The RMSE and throughput figures are the numbers reported in the supplied resume; the website does not independently rerun those experiments.
- Any LiDAR-to-camera fallback **is not claimed safe for autonomous control**. The newly recorded bag checkout is not the same as a completed global map-localization deployment.
- **No street address or birth date** from the resume is included. Confirm code/demo permissions and identifiable people/vehicle images before publishing.
