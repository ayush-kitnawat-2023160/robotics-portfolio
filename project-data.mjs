// Project narratives are grounded in Ayush's resume, public project repositories,
// and labeled offline evaluation visuals. Do not present illustrations as photographs.
export const projects = [
  {
    slug: 'autonomous-golf-cart',
    number: '01', label: 'AUTONOMOUS SYSTEMS / LOCALIZATION',
    title: 'Autonomous golf cart localization',
    short: 'Making a campus vehicle understand where it is — and recognizing when its estimate cannot be trusted.',
    date: 'Jan 2026 — ongoing', affiliation: 'IIIT Delhi Vision Lab',
    role: 'Research intern · localization benchmarking, sensor analysis & mapping',
    hero: '../../assets/media/golfcart-map.png', heroAlt: 'Actual offline odometry and keyframe overview from a campus recording', heroCaption: 'OFFLINE EXPERIMENT / ODOMETRY KEYFRAME OVERVIEW',
    intro: 'A research project to help an autonomous campus golf cart estimate its position reliably, even when individual sensors become less dependable.',
    businessProblem: 'A self-driving golf cart must know where it is before it can plan a safe route. On campus, trees, buildings, pedestrians and changing light can cause localization to drift or fail. An incorrect position could lead to unsafe decisions.',
    projectGoal: 'Build and evaluate a localization system that combines short-term motion estimates with position checks against a campus map, while detecting when its estimate should not be trusted.',
    practicalValue: 'More dependable localization is a foundation for campus autonomy. This work is still being validated on recorded sensor data; it is not presented as an approved autonomous-driving safety system.',
    scope: 'Real-sensor recordings and ROS-based experiments; offline and shadow-mode engineering, not a claim of validated autonomous fallback driving.',
    contribution: [
      'Compared LVI-SAM, FAST-LIO2, FAST-LIVO2, ORB-SLAM3 and related sensor pipelines for trajectory drift, robustness and recovery behavior.',
      'Worked on synchronization, coordinate frames, map/odom separation, trajectory alignment and 3D LiDAR mapping.',
      'Developed and tested map-referenced LiDAR localization ideas using GPS-proximal map tiles and local scan correspondence, rather than treating local odometry as global pose.',
      'Investigated visual localization / camera odometry paths and sensor-health signals as candidates for graceful degradation when primary sensing becomes unreliable.'
    ],
    pipeline: [
      { title: 'Observe', body: 'Receive timestamped LiDAR scans, camera frames, inertial data and GPS in known sensor frames.' },
      { title: 'Estimate motion', body: 'Run a LiDAR-inertial estimator such as FAST-LIVO2 for continuous local odometry.' },
      { title: 'Anchor to the map', body: 'Use map-referenced scan matching, nearby map tiles and validation gates to estimate map-frame alignment.' },
      { title: 'Check confidence', body: 'Compare sensor health, pose freshness and consistency before trusting corrections or proposing fallback behavior.' }
    ],
    challenges: [
      { tag: '01 / SENSOR REALITY', title: 'A sensor works — until conditions change', problem: 'Visual tracking can degrade in low light, under bridges or when the camera sees mostly repetitive road texture; LiDAR-inertial estimates may also drift or deteriorate.', response: 'I compared algorithms on the same recordings, inspected drift and failure sequences, and separated short-term odometry quality from long-term map localization. The aim is to detect failure rather than quietly accept a bad pose.', evidence: 'Comparative trajectory and visual/LiDAR diagnostic plots below.' },
      { tag: '02 / GEOMETRY', title: 'Frames and map assumptions can invalidate good estimates', problem: 'A different LiDAR mounting orientation or an incorrect transform can make old maps and new scans inconsistent. A delayed pose update can produce a similar visible mismatch.', response: 'I checked extrinsic conventions, transforms and timing separately, and treated mounting changes and delayed updates as distinct causes to be diagnosed — not one catch-all explanation.', evidence: 'Transformation/calibration checks and timed pose diagnostics in the research workspace.' },
      { tag: '03 / RECOVERY', title: 'Continuous odometry is not global localization', problem: 'A vehicle can keep moving smoothly in odom while losing reliable alignment to the campus map.', response: 'I worked with a local-odometry plus map-relocalization separation: GPS narrows candidate map tiles, then scan correspondences provide candidate map alignment subject to geometric validation.', evidence: 'Recorded map overview and trajectory overlays; ongoing validation before vehicle control.' }
    ],
    outcomes: [
      { big: '5', small: 'Core SLAM / odometry families evaluated' },
      { big: 'ROS', small: 'Real sensor streams and repeatable bag evaluation' },
      { big: 'R&D', small: 'Robust fallback remains under validation' }
    ],
    takeaway: 'The hardest part of localization is not obtaining a pose — it is knowing when that pose is stale, inconsistent or only locally correct.',
    media: [
      { src: '../../assets/media/golfcart-camera-frame.jpg', label: 'Actual camera frame · Campus', caption: 'Recorded front-facing camera frame used during campus visual localization experiments.', type:'real' },
      { src: '../../assets/media/golfcart-map.png', label: 'Actual experiment · Keyframes', caption: 'Unoptimized odometry keyframes from a fresh campus run; not aligned to the Lanelet map.', type:'real' },
      { src: '../../assets/media/golfcart-trajectory.png', label: 'Actual experiment · Trajectory', caption: 'Trajectory overlay used for LiDAR global-localization evaluation.', type:'real' },
      { src: '../../assets/media/golfcart-visual-matches.jpg', label: 'Actual experiment · Feature matching', caption: 'Visual 2D–3D correspondences investigated for visual relocalization.', type:'real' },
      { src: '../../assets/media/golfcart-visual-lidar.png', label: 'Actual experiment · Comparison', caption: 'Visual branch and LiDAR-referenced trajectory comparison on a recorded sequence.', type:'real' }
    ],
    links: [{text:'Selected code repository',url:'https://github.com/ayush-kitnawat-2023160/ALIVE_Autonomus_vehicle', kind:'code'}],
    photoSuggestion:'Add a photo of the physical golf cart, sensor placement and an RViz screenshot with the final verified map overlay.',
    demoNote: 'The on-cart system and some experiments are in a private research workspace; public video footage has not been added here yet.',
    disclaimer:'The plotted outputs are from offline research runs. Neither these plots nor this page imply a validated production-grade LiDAR-to-camera fallback for autonomous vehicle control.'
  },
  {
    slug:'enhanced-kinectfusion', number:'02',label:'3D VISION / DENSE RECONSTRUCTION',
    title:'Enhanced KinectFusion', short:'Recovering a stable 3D scene when RGB-D tracking and geometry become noisy.',
    date:'Jan — Apr 2026', affiliation:'Computer vision project · team of four',
    role:'RGB-D tracking, feature-based pose initialization & reconstruction evaluation',
    hero:'../../assets/media/kinect-reconstruction.jpg',heroAlt:'Actual 3D reconstruction of an indoor scene from the KinectFusion project slides',heroCaption:'REAL PROJECT RESULT / ENHANCED 3D RECONSTRUCTION',
    intro:'A 3D reconstruction project focused on creating more consistent models from a moving RGB-D camera.',
    businessProblem:'3D scans are useful for digital twins, inspection and robot mapping, but camera-motion errors and noisy depth can produce broken or distorted models. A reconstruction pipeline must estimate camera movement accurately before combining frames.',
    projectGoal:'Improve the KinectFusion pipeline using visual feature matching to initialize camera motion, ICP to refine alignment, and confidence checks to reduce the influence of unreliable frames.',
    practicalValue:'A more stable reconstruction pipeline can reduce manual cleanup and make camera-based scene capture more useful. Our reported TUM RGB-D reconstruction RMSE decreased from 1.20 m to 0.27 m.',
    scope:'TUM RGB-D benchmark evaluation and project experiments.',
    contribution:[
      'Integrated SuperPoint/LightGlue feature correspondences with PnP to give geometric tracking a better initial camera pose.',
      'Combined feature-based pose initialization with multi-scale ICP refinement and TSDF fusion.',
      'Worked on depth completion, confidence-based filtering and reconstruction evaluation, including the reported TUM RGB-D RMSE comparison.',
      'Explored Gaussian Splatting as an additional representation for visually expressive reconstruction, distinct from the tracking core.'
    ],
    pipeline:[
      {title:'RGB-D input',body:'Take color and aligned depth frames, with calibrated camera intrinsics.'},
      {title:'Visual warm start',body:'Match features across frames and solve for an initial relative pose using PnP.'},
      {title:'Geometric refinement',body:'Refine alignment with multi-scale point-to-plane ICP; reject weak updates.'},
      {title:'Fuse & inspect',body:'Integrate trusted depth into a TSDF surface model and evaluate the 3D result.'}
    ],
    challenges:[
      {tag:'01 / TRACKING',title:'ICP alone is sensitive to initialization',problem:'Point-to-plane ICP can converge to a poor alignment when the camera moves too far or the depth geometry is ambiguous.',response:'Used learned RGB feature matches and a PnP warm start so ICP begins closer to the expected inter-frame transform.',evidence:'The repository documents feature warm-start controls and a pure-ICP ablation switch.'},
      {tag:'02 / DEPTH',title:'Not every RGB-D frame deserves to be fused',problem:'Incomplete or noisy depth can damage the integrated surface and accumulate reconstruction errors.',response:'Experimented with depth completion and confidence-based frame selection, then evaluated reconstructed geometry instead of relying on attractive renders alone.',evidence:'Project repository confidence plot and benchmark summary.'},
      {tag:'03 / DRIFT',title:'Small pose errors become large 3D artifacts',problem:'Frame-to-frame errors propagate into TSDF fusion and can distort rooms and surfaces.',response:'Combined visual correspondences, multi-scale geometric refinement and loop-consistency experiments to constrain drift.',evidence:'Reported TUM RGB-D RMSE improvement on the project resume.'}
    ],
    outcomes:[{big:'1.20 → 0.27 m',small:'Reported reconstruction RMSE on TUM RGB-D'},{big:'RGB-D',small:'TSDF fusion with visual + geometric tracking'},{big:'3DGS',small:'Additional reconstruction visualization explored'}],
    takeaway:'Good reconstruction starts with trustworthy pose estimation; more fused frames are not always better if their poses are wrong.',
    media:[
      {src:'../../assets/media/kinect-baseline.jpg',label:'Report figure · Baseline',caption:'Fragmented 3D reconstruction from the baseline KinectFusion pipeline. Source: CV project presentation, Results & Visualizations (slide 8).',type:'real'},
      {src:'../../assets/media/kinect-reconstruction.jpg',label:'Report figure · Enhanced result',caption:'Reconstruction from the enhanced pipeline, showing a more coherent room scene. Source: CV project presentation (slide 8).',type:'real'},
      {src:'../../assets/media/kinect-comparison.png',label:'Project report · Qualitative comparison',caption:'The combined figure compares input/depth processing and the baseline (lower left) with the enhanced reconstruction (lower right). Source: interim report, Figure 3 (page 4).',type:'real',wide:true},
      {src:'../../assets/media/kinect-baseline-architecture.png',label:'Architecture · Original KinectFusion',caption:'The original KinectFusion flow: filtered depth, ICP tracking, TSDF fusion and raycasting. Source: interim report, Figure 1 (page 3).',type:'real',wide:true,diagram:true},
      {src:'../../assets/media/kinect-enhanced-architecture.png',label:'Architecture · Enhanced pipeline',caption:'The team’s expanded pipeline with depth completion, feature-guided tracking, loop closure and semantic fusion. Source: interim report, Figure 2 (page 3).',type:'real',wide:true,diagram:true},
      {src:'../../assets/media/kinect-scenes.jpg',label:'Project presentation · Additional scenes',caption:'Additional reconstruction examples from the project presentation, Results & Visualizations (slide 9).',type:'real',wide:true},
      {src:'../../assets/media/kinectfusion-confidence.png',label:'Project repository · Evaluation plot',caption:'Confidence-related evaluation plot committed with the project source.',type:'real',wide:true}
    ],
    links:[{text:'View project code',url:'https://github.com/ayushk-1801/CV-Project-KinectFusion',kind:'code'}],
    demoNote:'The source repository includes runnable KinectFusion examples. A personal screen recording or reconstruction video can be added to this page.',
    disclaimer:'The RMSE is a reported project figure from the resume; this site does not independently rerun the benchmark. Figures are drawn from the team presentation and interim report. The enhanced architecture describes the team pipeline, not solely my individual implementation.'
  },
  {
    slug:'vision-guided-arm',number:'03',label:'ROBOTICS / VISION-GUIDED MANIPULATION',
    title:'Vision-guided robotic arm',short:'Taking an object detected by a camera and turning it into a reachable robot target.',
    date:'Feb — May 2026',affiliation:'Robotics project · team of eight',
    role:'Camera calibration, marker-based localization & camera-to-robot transformations',
    hero:'../../assets/media/arm-system-overview.jpg',heroAlt:'Real robotic arm, camera and laptop from the downloaded project video',heroCaption:'REAL PROJECT VIDEO FRAME / ROBOTIC ARM',
    intro:'A robotic manipulation project that connects what a camera sees to where a real robot arm moves.',
    businessProblem:'In repetitive sorting and pick-and-place tasks, objects may not always be at fixed positions. A robot cannot act on a camera detection directly because the camera and arm use different coordinate systems.',
    projectGoal:'Use camera calibration and marker-based pose estimation to locate targets, convert their positions into the robot base frame, and send suitable motion commands to an xArm.',
    practicalValue:'The approach allows a robot to respond to visually located targets rather than relying only on hard-coded positions. The linked team demonstration shows the physical setup.',
    scope:'xArm robotic hardware + camera calibration and ArUco-based observations.',
    contribution:[
      'Calibrated the camera and worked on estimating marker/object pose using OpenCV and ArUco fiducials.',
      'Computed camera-to-robot frame transforms to express perceived object poses relative to the manipulator base.',
      'Integrated estimated target poses with Python xArm API commands for end-effector positioning.',
      'Participated in system tests aligning image-space observations with physical robot actions.'
    ],
    pipeline:[
      {title:'Observe',body:'Capture the workspace and detect ArUco markers or target objects.'},
      {title:'Estimate',body:'Recover a 3D pose from calibrated camera geometry and marker observations.'},
      {title:'Transform',body:'Apply camera-to-base extrinsic transforms to obtain the robot-frame target.'},
      {title:'Act',body:'Use the xArm Python API to move toward a validated target pose.'}
    ],
    challenges:[
      {tag:'01 / FRAMES',title:'Pixel coordinates are not robot coordinates',problem:'A pose expressed in the camera optical frame cannot be sent directly to a manipulator expecting base-frame coordinates.',response:'Calibrated camera geometry and implemented explicit homogeneous transformations from camera frame to robot base.',evidence:'The central implementation responsibility documented in the resume.'},
      {tag:'02 / RELIABILITY',title:'Visual estimates jitter, but hardware needs stable targets',problem:'Marker visibility, depth uncertainty and calibration error affect how confidently a position can be used.',response:'Used pose estimation from known marker geometry and careful transformation checks before using target estimates in robot commands.',evidence:'Project demonstration shows the physical perception-to-action pipeline.'},
      {tag:'03 / INTEGRATION',title:'Perception and actuation have different interfaces',problem:'Computer vision returns detections and transforms; the arm controller needs feasible target poses and explicit motion commands.',response:'Built the connection from estimated target pose to xArm API calls, keeping visual localization and actuation as separate stages.',evidence:'The demonstration and project code are linked below.'}
    ],
    outcomes:[{big:'6-DoF',small:'Camera-to-robot pose transformation'},{big:'ArUco',small:'Marker-referenced object localization'},{big:'xArm',small:'Robot API integration'}],
    takeaway:'A working robotics pipeline lives or dies by calibration and frame conventions, not by detection accuracy alone.',
    media:[
      {src:'../../assets/media/arm-system-overview.jpg',label:'Video frame · Full setup',caption:'The robotic arm, fixed camera, laptop interface and marked workspace during a recorded test.',type:'real'},
      {src:'../../assets/media/arm-object-interaction.jpg',label:'Video frame · Positioning',caption:'Arm positioned above the marked tabletop during an object-manipulation sequence.',type:'real'},
      {src:'../../assets/media/arm-vision-monitor.jpg',label:'Video frame · Perception interface',caption:'The laptop shows a camera view with detected workspace objects and the physical arm beside it.',type:'real'},
      {src:'../../assets/media/arm-test-run.jpg',label:'Video frame · Hardware run',caption:'Another recorded robot pose during a live demonstration.',type:'real'}
    ],
    links:[{text:'View team repository',url:'https://github.com/vermavinay982/Autonomous-Object-Perception-Manipulation',kind:'code'},{text:'Google Drive demo backup',url:'https://drive.google.com/file/d/1_gH-eMLU9dsza4KSZNG2K8226SaciRYQ/view?usp=sharing',kind:'demo'}],
    demoNote:'The full project video is playable directly on this page. A Google Drive backup is also linked.',
    disclaimer:'The linked team repository contains a broader sorting system. The personal contributions described here are limited to the calibration, transformations and arm-control work stated in the resume.'
  },
  {
    slug:'edgefusion',number:'04',label:'EDGE AI / DISTRIBUTED TRACKING',
    title:'EdgeFusion multi-camera tracking',short:'Deploying real-time AI detection across camera-equipped Jetson devices, with a shared tracking server.',
    date:'Monsoon 2025',affiliation:'IIIT Delhi · Independent Project, Vision Lab',
    role:'IP contributor · Jetson benchmarking, TensorRT deployment & distributed architecture',
    hero:'../../assets/media/edgefusion-ip-architecture.svg',heroAlt:'Recreated system-design diagram with camera groups, Jetson edge units, router and central DeepSORT tracker',heroCaption:'SYSTEM ARCHITECTURE / RECREATED FROM MY IP REPORT',
    intro:'My independent project investigated how multiple smart camera nodes could detect objects locally and feed a central multi-camera tracking system.',
    businessProblem:'As camera networks grow, running object detection on every stream at one PC becomes computationally demanding. A scalable system must balance inference speed, camera count and the information exchanged between edge devices and the tracking server.',
    projectGoal:'Deploy optimized YOLO11n and YOLOv8n detection on NVIDIA Jetson Orin Nano units; benchmark one to four simultaneous streams; design multi-camera sensing units that communicate detections and images to a central DeepSORT tracker.',
    practicalValue:'The IP report documents how FPS changes with camera count, resolution and FP16/INT8 precision, helping size the edge hardware. It demonstrates a distributed inference pipeline, but does not provide measured bandwidth savings, end-to-end latency, or cross-camera identity accuracy.',
    scope:'Independent Project · 2025 · NVIDIA Jetson Orin Nano, FLIR Firefly USB3 cameras, Spinnaker SDK/PySpin, YOLO11n & YOLOv8n, TensorRT, ZeroMQ, central DeepSORT.',
    contribution:[
      'Benchmarked YOLO11n and YOLOv8n on the Jetson Orin Nano across 1–4 cameras, 640×640 or 1440×1080 input, and FP16 versus INT8 TensorRT precision.',
      'Deployed and tested optimized YOLO detection on Jetson edge hardware, including its camera input and frame-processing pipeline.',
      'Helped design distributed sensing units (three cameras plus one Jetson in the report’s proposed unit) with a central tracking PC and high-speed network connection.',
      'Worked on the edge-to-server data pipeline: detection boxes/classes/confidences, encoded full frames and object crops serialized into JSON, then published using ZeroMQ PUSH.'
    ],
    pipeline:[
      {title:'1 · Capture',body:'FLIR Firefly USB3 cameras stream to a Jetson. Spinnaker SDK/PySpin manages acquisition, auto-exposure and white balance.'},
      {title:'2 · Detect',body:'YOLO11n / YOLOv8n TensorRT engines run on the edge, producing boxes, class IDs and confidence values.'},
      {title:'3 · Package & send',body:'The reported implementation Base64-encodes full frames and detection crops, combines them with metadata in JSON, then uses a ZeroMQ PUSH socket.'},
      {title:'4 · Track centrally',body:'A central server receives the sensing-unit outputs. DeepSORT-based identity association is the tracking component described in the report.'}
    ],
    challenges:[
      {tag:'01 / REAL-TIME PERFORMANCE',title:'How many streams can one Jetson handle?',problem:'A single model may run quickly, but camera streams compete for limited device compute and memory as their count grows.',response:'I benchmarked both YOLO model variants at two resolutions and two precision settings, recording per-camera FPS for one, two, three and four concurrent streams.',evidence:'IP report, pp. 3–5: 32 model / resolution / precision / camera-count configurations and FPS plots.'},
      {tag:'02 / EDGE MODEL DEPLOYMENT',title:'Inference speed depends on precision and input size',problem:'The practical throughput changes when the detector uses FP16 versus INT8 or processes higher-resolution images.',response:'I deployed TensorRT versions of YOLO11n and YOLOv8n and compared the resulting FPS. For YOLO11n at 640×640 with one camera, INT8 reached 20.39 FPS versus 18.92 FPS in FP16.',evidence:'IP report, p. 3, YOLO11n FPS table. These are measured configurations, not a generalized speedup claim.'},
      {tag:'03 / DISTRIBUTED INTEGRATION',title:'Connecting camera nodes to one tracker',problem:'Each Jetson must capture images, run detection, and send records that a central server can understand across multiple camera feeds.',response:'I helped architect sensing units and a ZeroMQ PUSH/JSON exchange carrying detection metadata and encoded full frames plus crops. The central system was designed around DeepSORT.',evidence:'IP report, pp. 1–2 and 5–6. Network bandwidth, end-to-end latency and cross-camera ID metrics are not reported.'}
    ],
    outcomes:[{big:'20.42 FPS',small:'YOLOv8n INT8 · 640×640 · one camera'},{big:'32',small:'Benchmarked configurations across two models'},{big:'1–4',small:'Concurrent camera streams in the published tables'}],
    takeaway:'A distributed vision system needs measured throughput and a well-defined data path—not just a fast detector benchmark.',
    media:[
      {src:'../../assets/media/edgefusion-ip-architecture.svg',label:'Architecture · Sensing units & tracker',caption:'Recreated from my 2025 IP report (pp. 5–6): camera-connected Jetson nodes use ZeroMQ to communicate with a central tracking PC. The written design defines a three-camera sensing unit; four-camera runs were also benchmarked.',type:'real',wide:true,diagram:true},
      {src:'../../assets/media/edgefusion-ip-benchmarks.svg',label:'Measurements · Jetson throughput',caption:'Chart redrawn from the IP report tables (pp. 3–4). Each point is the mean of the individual camera FPS entries in that configuration; it is NOT aggregate FPS across all cameras.',type:'real',wide:true,diagram:true}
    ],
    benchmarkRows:[
      {model:'YOLO11n',resolution:'640 × 640',precision:'FP16',one:'18.92',four:'11.79 · 11.26 · 10.83 · 10.84'},
      {model:'YOLO11n',resolution:'640 × 640',precision:'INT8',one:'20.39',four:'14.29 · 12.10 · 11.69 · 11.62'},
      {model:'YOLO11n',resolution:'1440 × 1080',precision:'FP16',one:'11.83',four:'7.37 · 7.81 · 7.34 · 6.36'},
      {model:'YOLO11n',resolution:'1440 × 1080',precision:'INT8',one:'12.55',four:'8.39 · 8.37 · 8.34 · 8.54'},
      {model:'YOLOv8n',resolution:'640 × 640',precision:'FP16',one:'18.92',four:'11.38 · 11.20 · 10.48 · 10.61'},
      {model:'YOLOv8n',resolution:'640 × 640',precision:'INT8',one:'20.42',four:'12.87 · 12.23 · 11.98 · 11.95'},
      {model:'YOLOv8n',resolution:'1440 × 1080',precision:'FP16',one:'13.31',four:'7.90 · 7.72 · 7.58 · 7.66'},
      {model:'YOLOv8n',resolution:'1440 × 1080',precision:'INT8',one:'13.72',four:'9.62 · 9.60 · 9.56 · 9.45'}
    ],
    nextSteps:[
      'Move identity tracking onto Jetson nodes instead of only the central PC.',
      'Transmit compact identity embeddings in place of cropped/full images when feasible.',
      'Add a message broker, higher-capacity networking and a camera watchdog for larger-scale deployments.'
    ],
    benchmarkNote:'All figures are as recorded in my IP report (2025, pp. 3–4). Four-camera values list FPS for each of the four streams—not a combined total. The report mentions possible 7–8 camera scaling but does not include equivalent benchmark tables beyond four cameras. The report schematic depicts four cameras per Jetson while its written unit design specifies three; this illustration follows the written unit definition.',
    links:[],
    showExploreFurther:false,
    demoNote:null,
    disclaimer:'Source: “EdgeFusion Multi-Camera Tracking System,” Independent Project Report, IIIT Delhi, Monsoon 2025 (Ayush Kitnawat and Suyash Pathak, guided by Prof. Saket Anand and Prof. Sanjit Kaul). FPS describes detector throughput in specific configurations. The report does not quantify bandwidth reduction, transmission latency, re-identification accuracy or production readiness. Future-work proposals are not claimed as implemented.'
  },
  {
    slug:'rocket-avionics',number:'05',label:'EMBEDDED SYSTEMS / TELEMETRY',
    title:'Model rocketry · avionics & telemetry',short:'From onboard sensors to real-time flight data on a ground-station screen.',
    date:'Oct 2024 — Aug 2025',affiliation:'IIIT Delhi model rocket project',
    role:'Avionics & telemetry lead · embedded integration and ground-station software',
    hero:'../../assets/media/rocket-launch-display.jpg',heroAlt:'Actual upright model rocket displayed at an outdoor event',heroCaption:'REAL PROJECT PHOTO / MODEL ROCKET',
    intro:'An embedded-systems project to measure and monitor a model rocket’s flight from the ground.',
    businessProblem:'During flight and testing, a rocket cannot be connected to a laptop by a cable. The team needs live information about its altitude, orientation and system behavior to understand what is happening and investigate faults.',
    projectGoal:'Build an STM32-based onboard sensing and telemetry system, send flight measurements over LoRa, and display the readings through a Python ground station.',
    practicalValue:'Makes flight data visible during experiments and available for review afterward. No verified radio range or flight reliability metric is claimed here.',
    scope:'Embedded microcontroller, onboard sensing, wireless telemetry and Python ground station.',
    contribution:[
      'Designed and implemented STM32 firmware integration for flight-related sensor readings.',
      'Integrated onboard measurements of altitude, orientation and other flight telemetry.',
      'Implemented LoRa-based data communication between the onboard system and a ground station.',
      'Built a Python pipeline for live visualization, monitoring and post-flight analysis.'
    ],
    pipeline:[
      {title:'Measure',body:'Collect flight-related signals using onboard sensors and an STM32.'},
      {title:'Package',body:'Represent key readings as telemetry suitable for the wireless link.'},
      {title:'Transmit',body:'Send packets from the vehicle over LoRa to the receiver.'},
      {title:'Visualize',body:'Decode and display live values in a Python ground station for inspection and analysis.'}
    ],
    challenges:[
      {tag:'01 / EMBEDDED',title:'Hardware delivers different sensor signals',problem:'A flight controller needs to bring together multiple measurements at a useful update cadence.',response:'Built STM32-side sensor integration and a consistent stream of altitude, orientation and flight data.',evidence:'Avionics and telemetry implementation described in the resume.'},
      {tag:'02 / LINK',title:'The receiver is not next to the rocket',problem:'A telemetry system must communicate over a wireless long-range channel instead of relying on a cable.',response:'Selected LoRa for telemetry transport and built corresponding reception handling at the ground station.',evidence:'LoRa hardware and software integration.'},
      {tag:'03 / DIAGNOSTICS',title:'Raw serial values are hard to interpret during testing',problem:'Flight telemetry is more useful when operators can inspect trends while it arrives.',response:'Implemented Python-based live monitoring and a post-flight analysis path rather than storing unstructured logs alone.',evidence:'Ground-station visualization and monitoring software.'}
    ],
    outcomes:[{big:'STM32',small:'Onboard sensing and microcontroller integration'},{big:'LoRa',small:'Long-range wireless telemetry'},{big:'Python',small:'Live ground station and analysis'}],
    takeaway:'Reliable robotics also depends on the invisible engineering: synchronized measurements, understandable packets and useful diagnostics.',
    media:[
      {src:'../../assets/media/rocket-launch-display.jpg',label:'Project photo · Full rocket',caption:'The team’s model rocket on display at an outdoor event. Photo from the project collection.',type:'real'},
      {src:'../../assets/media/rocket-launch-portrait.jpg',label:'Project photo · Rocket on stand',caption:'An upright view of the completed rocket and launch/event setup.',type:'real'},
      {src:'../../assets/media/rocket-hardware-closeup.jpg',label:'Project photo · Rocket body',caption:'Close view of the rocket body, fins and nearby electronics at the display.',type:'real'},
      {src:'../../assets/media/rocket-side-view.jpg',label:'Project photo · Rocket body and fins',caption:'Additional display angle showing the rocket body, fins and nearby hardware.',type:'real'}
    ],
    links:[],
    demoNote:'Flight video and ground-station screenshots have not been supplied for public use.',
    disclaimer:'No flight range, packet-loss rate or field-performance metric is claimed without a published test.'
  },
  {
    slug:'wildlife-classification',number:'06',label:'COMPUTER VISION / FEATURE ANALYSIS',
    title:'Wildlife classification & feature analysis',short:'Understanding not only which animal a model predicts, but how it organizes visual concepts.',
    date:'Feb 2025',affiliation:'Individual computer vision project',
    role:'End-to-end dataset experiments, transfer learning & embedding analysis',
    hero:'../../assets/project-kinectfusion.svg',heroAlt:'Abstract feature-space artwork serving as placeholder illustration',heroCaption:'ILLUSTRATION / VISUAL REPRESENTATIONS',
    intro:'An individual computer vision project to classify wildlife images and study what the models learn.',
    businessProblem:'Reviewing large wildlife image collections by hand takes time. Automated species recognition could support image organization and biodiversity research, but models must handle changes in lighting, background and appearance.',
    projectGoal:'Train and compare CNN and fine-tuned ResNet-18 classifiers for ten species, then use DINOv2 features to inspect how images group in feature space.',
    practicalValue:'A research prototype for classification and model understanding, not a deployed wildlife monitoring service. The supplied results do not establish a production accuracy figure.',
    scope:'Ten-species wildlife image dataset and repeatable training experiments.',
    contribution:[
      'Built image-classification experiments with custom CNNs and fine-tuned ResNet-18.',
      'Applied image augmentation and transfer learning to improve robustness and generalization.',
      'Extracted DINOv2 embeddings and explored category structure through t-SNE and K-Means clustering.',
      'Tracked experiments, model variants and metrics using Weights & Biases.'
    ],
    pipeline:[
      {title:'Prepare',body:'Clean and augment a ten-species image dataset.'},
      {title:'Train',body:'Compare CNN baselines with fine-tuned ResNet-18.'},
      {title:'Represent',body:'Extract visual feature embeddings with DINOv2.'},
      {title:'Inspect',body:'Visualize with t-SNE, cluster with K-Means and compare experiments.'}
    ],
    challenges:[
      {tag:'01 / GENERALIZATION',title:'A classifier can memorize the wrong visual cues',problem:'Limited datasets and variable backgrounds can cause a model to depend on shortcuts rather than animal appearance.',response:'Used augmentation, pretrained features and comparisons against simpler CNNs to investigate robustness.',evidence:'Training pipeline and augmentation experiments from the project summary.'},
      {tag:'02 / INTERPRETATION',title:'Accuracy does not explain representation quality',problem:'A class label says little about how the visual model arranges similar or dissimilar species internally.',response:'Used DINOv2 features, t-SNE and K-Means to inspect structure in feature space.',evidence:'Feature-space analysis documented in the resume.'},
      {tag:'03 / EXPERIMENTS',title:'Comparisons need repeatable records',problem:'Without run tracking, architecture and augmentation changes are hard to compare fairly.',response:'Logged training runs and metrics in Weights & Biases to retain experimental context.',evidence:'Experiment-management setup described in the resume.'}
    ],
    outcomes:[{big:'10',small:'Wildlife categories studied'},{big:'ResNet-18',small:'Fine-tuned transfer-learning model'},{big:'DINOv2',small:'Representation analysis'}],
    takeaway:'A useful vision experiment asks what the representation learned — not just what the final accuracy number was.',
    media:[{src:'../../assets/project-kinectfusion.svg',label:'Illustration · Visual embeddings',caption:'Placeholder conceptual artwork until confusion matrices and feature plots are added.',type:'illustration'}],
    photoSuggestion:'Add class sample grids, confusion matrix, t-SNE visualizations and K-Means feature plots.',
    links:[],
    demoNote:'Public notebook, result screenshots and dataset sample images have not yet been supplied.',
    disclaimer:'No validation accuracy or benchmark claim is made because the supplied resume does not give one.'
  }
];
