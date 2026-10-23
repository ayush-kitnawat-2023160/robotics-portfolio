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
    intro: 'An autonomous vehicle needs both a smooth local estimate of movement and a reliable answer to where it is on a previously built map. My work evaluates localization from LiDAR, cameras, IMU and GPS, investigates failure cases, and develops the pieces of a more resilient localization stack for an autonomous golf cart on campus roads.',
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
    hero:'../../assets/project-kinectfusion.svg',heroAlt:'Original illustrative point-cloud artwork representing the reconstruction pipeline',heroCaption:'ILLUSTRATION / 3D RECONSTRUCTION',
    intro:'KinectFusion integrates RGB-D measurements into a volumetric TSDF model. This project explored improving the front-end pose estimate and the quality of the fused reconstruction by combining learned visual correspondences, geometric alignment and confidence-based frame acceptance.',
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
      {src:'../../assets/media/kinectfusion-confidence.png',label:'Project repository · Evaluation plot',caption:'Confidence-related evaluation plot committed with the project source.',type:'real'},
      {src:'../../assets/project-kinectfusion.svg',label:'Illustration · Geometry',caption:'Conceptual dense scene visualization (not an experimental reconstruction).',type:'illustration'}
    ],
    links:[{text:'View project code',url:'https://github.com/ayushk-1801/CV-Project-KinectFusion',kind:'code'}],
    photoSuggestion:'Add before/after point-cloud reconstructions, a TUM RGB-D scene render and screenshots comparing ICP-only versus warm-start tracking.',
    demoNote:'The source repository includes runnable KinectFusion examples. A personal screen recording or reconstruction video can be added to this page.',
    disclaimer:'The RMSE is a reported project figure from the resume; this site does not independently rerun the benchmark. The illustration is not ground-truth reconstruction output.'
  },
  {
    slug:'vision-guided-arm',number:'03',label:'ROBOTICS / VISION-GUIDED MANIPULATION',
    title:'Vision-guided robotic arm',short:'Taking an object detected by a camera and turning it into a reachable robot target.',
    date:'Feb — May 2026',affiliation:'Robotics project · team of eight',
    role:'Camera calibration, marker-based localization & camera-to-robot transformations',
    hero:'../../assets/media/arm-demo-thumbnail.jpg',heroAlt:'Real robotic arm hardware and calibration markers visible in the project demonstration',heroCaption:'REAL PROJECT DEMO / ROBOT SETUP',
    intro:'A camera knows where an object appears in its own coordinate frame; the arm needs a target in robot-base coordinates. This project connected visual detection, calibrated transforms and robot API commands in a vision-guided manipulation workflow.',
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
    media:[{src:'../../assets/media/arm-demo-thumbnail.jpg',label:'Real demo · Robot hardware',caption:'Actual team-demo thumbnail showing the robotic arm, camera and marked workspace.',type:'real'},{src:'../../assets/project-arm.svg',label:'Illustration · System concept',caption:'The camera, marker and manipulator relationship — conceptual artwork.',type:'illustration'}],
    photoSuggestion:'Add higher-resolution photos of the arm and camera calibration setup, a close-up marker view and a successful pick-and-place run.',
    links:[{text:'View team repository',url:'https://github.com/vermavinay982/Autonomous-Object-Perception-Manipulation',kind:'code'},{text:'Watch project demo',url:'https://drive.google.com/file/d/1_gH-eMLU9dsza4KSZNG2K8226SaciRYQ/view?usp=sharing',kind:'demo'}],
    demoNote:'There is a recorded project demo — use the Watch project demo button to see the real setup.',
    disclaimer:'The linked team repository contains a broader sorting system. The personal contributions described here are limited to the calibration, transformations and arm-control work stated in the resume.'
  },
  {
    slug:'edgefusion',number:'04',label:'EDGE AI / DISTRIBUTED TRACKING',
    title:'EdgeFusion multi-camera tracking',short:'Running detection near cameras and transmitting useful signals instead of every video frame.',
    date:'Aug — Nov 2025',affiliation:'IIIT Delhi IRAS HUB',
    role:'Undergraduate researcher · edge inference and distributed tracking pipeline',
    hero:'../../assets/project-edgefusion.svg',heroAlt:'Illustrative pipeline showing edge cameras and centralized tracking',heroCaption:'ILLUSTRATION / DISTRIBUTED PERCEPTION',
    intro:'Streaming every camera frame to a single server wastes network bandwidth and can add latency. EdgeFusion explores a more practical architecture: run fast object detection on Jetson nodes, transfer cropped detections and metadata, then perform cross-camera tracking centrally.',
    scope:'NVIDIA Jetson Orin Nano edge devices, multi-camera experiments.',
    contribution:[
      'Optimized YOLO11n/YOLOv8n inference on Jetson hardware with TensorRT FP16/INT8 acceleration.',
      'Designed a ZeroMQ pipeline for sending object crops and metadata instead of full video streams.',
      'Integrated centralized tracking with DeepSORT and cross-camera identity association.',
      'Benchmarked inference throughput for single-camera and multi-stream operation.'
    ],
    pipeline:[
      {title:'At each camera',body:'Capture frames and run optimized object detection locally on Jetson.'},
      {title:'Compress the signal',body:'Extract detection crops, labels and metadata rather than raw full-resolution video.'},
      {title:'Transmit',body:'Send lightweight messages through ZeroMQ to a central tracking node.'},
      {title:'Associate',body:'Use DeepSORT and camera-level information to maintain object identities across observations.'}
    ],
    challenges:[
      {tag:'01 / COMPUTE',title:'Full neural inference on an edge device is expensive',problem:'Jetson resource limits constrain the number of camera streams and frame rate.',response:'Applied TensorRT FP16/INT8 optimization to YOLO detectors and measured throughput instead of assuming desktop performance.',evidence:'20 FPS single-camera and 7–8 FPS multi-stream as reported in the resume.'},
      {tag:'02 / BANDWIDTH',title:'Multi-camera video is a costly thing to move',problem:'Shipping unfiltered full video over the network increases bandwidth demand.',response:'Changed the architecture to transmit object crops and compact metadata via ZeroMQ, keeping heavier image processing near the camera.',evidence:'Distributed inference architecture implemented during IRAS HUB research.'},
      {tag:'03 / ASSOCIATION',title:'One object appears under different cameras',problem:'Individual detections do not automatically maintain a consistent identity across time or camera boundaries.',response:'Used centralized DeepSORT-based tracking and cross-camera association to maintain object tracks beyond a single frame.',evidence:'Research pipeline implementation; identity accuracy is not claimed without an evaluation report.'}
    ],
    outcomes:[{big:'20 FPS',small:'Reported single-camera optimized inference'},{big:'7–8 FPS',small:'Reported multi-stream throughput'},{big:'ZeroMQ',small:'Distributed crop + metadata messaging'}],
    takeaway:'Moving less data can matter as much as making a detector faster — especially for edge systems.',
    media:[{src:'../../assets/project-edgefusion.svg',label:'Illustration · Architecture',caption:'Conceptual visualization of cameras, Jetson nodes and central tracking.',type:'illustration'}],
    photoSuggestion:'Add a photo of the Jetson Orin Nano setup, multi-camera view and a cross-camera tracking screen capture.',
    links:[],
    demoNote:'An externally accessible tracking demo or repository has not been supplied. A verified video can be added without redesigning the page.',
    disclaimer:'Frame-rate figures reflect reported research measurements under the project configuration, not a general guarantee across hardware.'
  },
  {
    slug:'rocket-avionics',number:'05',label:'EMBEDDED SYSTEMS / TELEMETRY',
    title:'Model rocketry · avionics & telemetry',short:'From onboard sensors to real-time flight data on a ground-station screen.',
    date:'Oct 2024 — Aug 2025',affiliation:'IIIT Delhi model rocket project',
    role:'Avionics & telemetry lead · embedded integration and ground-station software',
    hero:'../../assets/hero-lidar.svg',heroAlt:'Abstract sensing system visualization used as illustrative cover art',heroCaption:'ILLUSTRATION / EMBEDDED TELEMETRY',
    intro:'A small flight system needs an onboard computer that samples sensors, packages useful measurements, and gets those measurements to a ground station. I led avionics and telemetry development on an STM32-based model rocket system using LoRa wireless communication.',
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
    media:[{src:'../../assets/hero-lidar.svg',label:'Illustration · Sensor system',caption:'Generic sensing artwork used until hardware photos are added.',type:'illustration'}],
    photoSuggestion:'Add avionics PCB/wiring photos, the LoRa transmitter/receiver, and a screenshot of the ground station.',
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
    intro:'Trained image classifiers for ten wildlife species, then studied the learned representations with pretrained DINOv2 embeddings. The work combined practical supervised classification with an exploratory look into how feature spaces separate categories.',
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
