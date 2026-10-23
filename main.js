const menuButton = document.querySelector('.mobile-menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

function setMenu(open) {
  if (!menuButton || !mobileNav) return;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  mobileNav.hidden = !open;
  document.body.classList.toggle('menu-open', open);
}

menuButton?.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});
mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); });
window.matchMedia('(min-width: 761px)').addEventListener('change', (event) => { if (event.matches) setMenu(false); });

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Remember the viewer's theme choice while respecting the operating system on first visit.
const themeButton = document.querySelector('.theme-toggle');
const storedTheme = localStorage.getItem('portfolio-theme');
const initialTheme = storedTheme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.body.dataset.theme = initialTheme;

function setTheme(theme) {
  document.body.dataset.theme = theme;
  localStorage.setItem('portfolio-theme', theme);
  const dark = theme === 'dark';
  themeButton?.setAttribute('aria-pressed', String(dark));
  themeButton?.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  const label = themeButton?.querySelector('.theme-toggle-label');
  if (label) label.textContent = dark ? 'Light mode' : 'Dark mode';
}
setTheme(initialTheme);
themeButton?.addEventListener('click', () => setTheme(document.body.dataset.theme === 'dark' ? 'light' : 'dark'));

const projectInfo = {
  golfcart: {
    title: 'Autonomous golf cart localization', category: 'ROBOTICS / LOCALIZATION',
    description: 'Comparing LiDAR, camera and inertial approaches to help a campus vehicle estimate where it is. The work focuses on mapping, trajectory alignment and identifying when an estimate becomes unreliable.',
    image: './assets/media/golfcart-map.png', alt: 'Keyframe map from a campus vehicle localization recording',
    tags: ['ROS', 'LiDAR', 'IMU', 'SLAM'], page: './projects/autonomous-golf-cart/index.html',
    flow: ['LiDAR · Camera · IMU', 'Motion estimate', 'Map alignment', 'Pose confidence']
  },
  kinect: {
    title: 'Enhanced KinectFusion', category: 'COMPUTER VISION / 3D RECONSTRUCTION',
    description: 'A team project exploring how visual feature matching can improve RGB-D tracking before geometric refinement and volumetric fusion. The page includes the evaluation plot and the reported benchmark result.',
    image: './assets/media/kinectfusion-confidence.png', alt: 'Confidence evaluation plot from the KinectFusion project',
    tags: ['OpenCV', 'SuperPoint', 'ICP', 'TSDF'], page: './projects/enhanced-kinectfusion/index.html',
    flow: ['RGB-D frames', 'Feature matches', 'Pose + ICP', 'TSDF model']
  },
  edgefusion: {
    title: 'EdgeFusion multi-camera tracking', category: 'VISION / EDGE AI',
    description: 'A distributed perception pipeline that runs detection close to the cameras, then sends object crops and compact metadata for centralized identity tracking.',
    image: './assets/project-edgefusion.svg', alt: 'Diagram of a multi-camera edge AI tracking system',
    tags: ['Jetson Orin', 'TensorRT', 'ZeroMQ', 'DeepSORT'], page: './projects/edgefusion/index.html',
    flow: ['Camera feeds', 'Edge detection', 'Crops + metadata', 'Track identities']
  },
  rocket: {
    title: 'Rocket avionics & telemetry', category: 'EMBEDDED / TELEMETRY',
    description: 'An embedded sensing and telemetry project using STM32 hardware, a LoRa link and a Python ground station to inspect flight data as it arrives.',
    image: './assets/hero-lidar.svg', alt: 'Illustrative sensor scene representing embedded telemetry',
    tags: ['STM32', 'Sensors', 'LoRa', 'Python'], page: './projects/rocket-avionics/index.html',
    flow: ['Flight sensors', 'STM32 controller', 'LoRa packets', 'Ground station']
  },
  wildlife: {
    title: 'Wildlife classification', category: 'MACHINE LEARNING / COMPUTER VISION',
    description: 'Comparing CNN models and visual embeddings for wildlife image recognition, then inspecting how the learned features group species in the feature space.',
    image: './assets/project-kinectfusion.svg', alt: 'Illustration of visual features used in image classification',
    tags: ['PyTorch', 'ResNet-18', 'DINOv2', 't-SNE'], page: './projects/wildlife-classification/index.html',
    flow: ['Wildlife images', 'CNN / DINOv2', 'Feature vectors', 'Class + clusters']
  },
  arm: {
    title: 'Vision-guided robotic arm', category: 'ROBOTICS / MANIPULATION',
    description: 'A camera identifies an object and estimates its pose; calibration transforms that target into the robot frame before the arm moves. This team project focused on camera calibration, marker-based localization and coordinate transforms.',
    video: 'https://drive.google.com/file/d/1_gH-eMLU9dsza4KSZNG2K8226SaciRYQ/preview',
    videoLink: 'https://drive.google.com/file/d/1_gH-eMLU9dsza4KSZNG2K8226SaciRYQ/view?usp=sharing',
    image: './assets/media/arm-demo-thumbnail.jpg', alt: 'Vision-guided robotic arm project demonstration',
    tags: ['OpenCV', 'ArUco', 'Calibration', 'xArm'], page: './projects/vision-guided-arm/index.html',
    flow: ['Camera image', 'Object pose', 'Camera → robot frame', 'Arm target']
  }
};

const dialog = document.querySelector('.project-dialog');
const dialogMedia = document.getElementById('dialog-media');
const dialogTitle = document.getElementById('dialog-title');
const dialogCategory = document.getElementById('dialog-category');
const dialogDescription = document.getElementById('dialog-description');
const dialogTags = document.getElementById('dialog-tags');
const dialogFlow = document.getElementById('architecture-flow');
const caseLink = document.getElementById('dialog-case-link');
let returnFocus = null;

function openProject(key, trigger) {
  const project = projectInfo[key];
  if (!project || !dialog) return;
  returnFocus = trigger;
  dialogTitle.textContent = project.title;
  dialogCategory.textContent = project.category;
  dialogDescription.textContent = project.description;
  dialogTags.replaceChildren(...project.tags.map((tag) => {
    const chip = document.createElement('span'); chip.textContent = tag; return chip;
  }));
  dialogFlow.replaceChildren(...project.flow.map((step, index) => {
    const node = document.createElement('div');
    node.className = 'architecture-node';
    node.innerHTML = `<span>0${index + 1}</span><b></b>`;
    node.querySelector('b').textContent = step;
    if (index < project.flow.length - 1) {
      const arrow = document.createElement('i'); arrow.className = 'architecture-arrow'; arrow.textContent = '→'; node.append(arrow);
    }
    return node;
  }));
  if (project.video) {
    dialogMedia.innerHTML = `<iframe src="${project.video}" title="${project.title} demo video" allow="autoplay; fullscreen" referrerpolicy="no-referrer"></iframe><a class="media-fallback" href="${project.videoLink}" target="_blank" rel="noopener noreferrer">Open video on Google Drive ↗</a>`;
  } else {
    const image = document.createElement('img'); image.src = project.image; image.alt = project.alt; dialogMedia.replaceChildren(image);
  }
  caseLink.href = project.page;
  dialog.showModal();
  document.body.classList.add('dialog-open');
  dialog.querySelector('.dialog-close').focus();
}

document.querySelectorAll('.project-row').forEach((row) => {
  const key = row.dataset.project;
  row.querySelectorAll('.project-open, .project-row-media').forEach((button) => {
    button.addEventListener('click', () => openProject(key, button));
  });
  row.addEventListener('click', (event) => {
    if (event.target.closest('button')) return;
    openProject(key, row);
  });
});

const filterButtons = document.querySelectorAll('.filter-button');
const filterCount = document.querySelector('.filter-count');
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    let visible = 0;
    filterButtons.forEach((option) => {
      const active = option === button;
      option.classList.toggle('is-active', active);
      option.setAttribute('aria-pressed', String(active));
    });
    document.querySelectorAll('.project-row').forEach((row) => {
      const show = filter === 'all' || row.dataset.categories.split(' ').includes(filter);
      row.hidden = !show;
      if (show) visible += 1;
    });
    if (filterCount) filterCount.textContent = `Showing ${visible} project${visible === 1 ? '' : 's'}`;
  });
});

dialog?.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
dialog?.addEventListener('close', () => {
  dialogMedia.replaceChildren();
  document.body.classList.remove('dialog-open');
  returnFocus?.focus();
});

if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -25px 0px' });
  document.querySelectorAll('.motion-in').forEach((element) => observer.observe(element));
}
