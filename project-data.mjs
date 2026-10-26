// Project narratives are grounded in Ayush's resume, public project repositories,
// and labeled offline evaluation visuals. Do not present illustrations as photographs.
export const projects = [
  {
    slug: 'autonomous-golf-cart',
    number: '01', label: 'AUTONOMOUS SYSTEMS / ROBOTICS R&D',
    title: 'ALIVE · Autonomous Golf Cart',
    short: 'From SLAM benchmarking and global relocalization to online planning, camera integration, and ROS1 ↔ ROS2 interoperability.',
    date: 'Jan 2026 — ongoing', affiliation: 'IIIT Delhi Vision Lab',
    role: 'Research intern · localization, system integration, sensor debugging & planning',
    hero: '../../assets/media/golfcart-latest-poster.jpg', heroAlt: 'Latest real golf-cart demonstration with localization point cloud, online path planning and vehicle camera feeds', heroCaption: 'LATEST REAL VEHICLE DEMO / LOCALIZATION · PLANNING · STEERING',
    intro: 'I worked on the autonomous golf cart as an evolving robotics system, not just one SLAM algorithm: benchmarking localization, rebuilding map alignment, integrating cameras, bridging ROS generations and diagnosing real navigation failures.',
    businessProblem: 'A campus autonomous vehicle must estimate its pose reliably, plan around moving obstacles, and run many software and hardware components together. Sensor drift, bad calibration, stale localization messages and brittle planners can all make a system look healthy while the vehicle behaves incorrectly.',
    projectGoal: 'Make the existing ROS-based golf cart more robust end to end: compare localization algorithms on repeatable data, keep FAST-LIVO2 local odometry aligned with a global map, investigate camera-based recovery, modernize planning and exchange data with ROS2 systems through Zenoh.',
    practicalValue: 'The work combines evaluation, integration and field debugging. In addition to localization research, the ROS1/ROS2 bridge allows newer ROS2-side components to interoperate with an existing ROS1 autonomy stack without rewriting it all at once. Live driving videos document progress; this is still a research vehicle, not a certified safety system.',
    scope: 'IIIT Delhi ALIVE · VLP-16 LiDAR, IMU/GPS, RealSense & ZED X cameras, ROS1/ROS2, FAST-LIVO2, map scan-matching, TEB, RViz and Zenoh. Benchmarks and on-cart experiments have different validation levels.',
    contribution: [
      'Benchmarked FAST-LIVO2, FAST-LIO2, LVI-SAM, FLOAM, ORB-SLAM3 and RTAB-Map using recorded trajectories and degradation tests; examined drift and failure cases instead of choosing an algorithm by a single run.',
      'Worked on a map-referenced localization pipeline that combines FAST-LIVO2 odometry with LiDAR global relocalization and confidence checks, separating smooth local motion from map-frame alignment.',
      'Integrated and debugged RealSense and ZED X data paths, camera extrinsics, LiDAR mount changes, timestamps and ROS frame conventions; investigated visual odometry and relocalization as fallback research.',
      'Built ROS1 ↔ ROS2 communication using a Zenoh bridge so the legacy NUC-side localization, planning and monitoring stack can exchange information with ROS2-side vehicle components.',
      'Participated in updating local navigation from roughly 7–8 precomputed candidate trajectories to online TEB planning and traced reverse-motion oscillation and delayed-pose behavior during tests.'
    ],
    pipeline: [
      { title: 'Acquire & calibrate', body: 'Timestamp and transform VLP-16 scans, IMU readings and RealSense/ZED X camera feeds into a consistent ROS frame tree.' },
      { title: 'Estimate local motion', body: 'Use FAST-LIVO2 for smooth local LiDAR–inertial–visual odometry in the odom frame.' },
      { title: 'Relocalize globally', body: 'Match recent LiDAR structure against the campus map, validate the alignment and maintain map-to-odom correction separately from odometry.' },
      { title: 'Monitor & investigate fallback', body: 'Check localization confidence, sensor health and pose age; evaluate camera-only recovery as research, not an authorized autonomous fallback.' },
      { title: 'Plan online', body: 'Feed pose and obstacles to the TEB local planner, replacing selection among a small set of fixed precomputed trajectories. Continue debugging reverse behavior and timing.' },
      { title: 'Bridge ROS generations', body: 'Use Zenoh-mediated ROS1 ↔ ROS2 data exchange between legacy compute and newer vehicle-side interfaces, avoiding an all-at-once rewrite.' }
    ],
    challenges: [
      { tag: '01 / LOCALIZATION BENCHMARKING', title: 'Which estimator actually survives bad sensing?', problem: 'A low-error path in clear weather says little about rain, fog, dropouts or poor visual texture; the E2O data also lack survey-grade ground truth.', response: 'I compared six estimation families against a LiDAR-derived pseudo-reference, stress-tested sensor perturbations and inspected trajectory overlays and recovery modes.', evidence: 'Clean FAST-LIVO2 overall RMSE: 0.521 m versus 0.640 m for FLOAM on the evaluated ALIVE sequence, relative to a pseudo-reference—not true absolute pose accuracy.' },
      { tag: '02 / REAL SENSOR DEBUGGING', title: 'Mounts, cameras and timestamps break otherwise sound geometry', problem: 'Reorienting the LiDAR invalidates old map-frame assumptions; RealSense depth and ZED X timing/extrinsics can degrade fusion, and recording can introduce latency.', response: 'I debugged coordinate transforms, recalibration needs, camera stream behavior, message timestamps and recording delays independently, including the impact of a changed LiDAR mount.', evidence: 'ROS bag replay, frame-tree inspections, camera/IMU synchronization tests and visual-versus-LiDAR trajectory checks.' },
      { tag: '03 / MAP ALIGNMENT', title: 'Locally smooth odometry can still be globally wrong', problem: 'FAST-LIVO2 produces relative motion, but a campus navigator also needs its correct position in a persistent map, including after drift or restart.', response: 'I separated FAST-LIVO2 odometry from global LiDAR scan-to-map relocalization and used geometric match validation before introducing map-frame corrections.', evidence: 'Campus map and scan matching experiments; live validation and safe automatic handover are separate milestones.' },
      { tag: '04 / SOFTWARE INTEROPERABILITY', title: 'Modernizing ROS without abandoning the old stack', problem: 'The existing localization and planning stack runs on ROS1 while newer cart-side integrations use ROS2. Rewriting every node risks losing tested behavior.', response: 'I integrated data exchange through Zenoh so ROS1-side components can communicate with ROS2-side systems while retaining their native ROS runtimes.', evidence: 'The accompanying October 2026 video visualizes the ROS1 NUC ↔ Zenoh ↔ ROS2 golf-cart architecture. It is an architecture walkthrough, not a latency benchmark.' },
      { tag: '05 / ONLINE PLANNING', title: 'The planner can get stuck in reverse / forward corrections', problem: 'Previously the cart selected the lowest-cost option from roughly 7–8 precomputed trajectories. That was less reactive. With live TEB planning, close obstacles can trigger repeated reversing and forward motion; delayed pose updates make control less predictable.', response: 'Moved toward live TEB trajectory optimization and traced the interaction among obstacle clearance, reverse permissions, stale pose timestamps and local goal selection. These remain active tuning and debugging tasks.', evidence: 'Latest driving video shows live planning; reverse oscillation and pose delay are open issues, not solved claims.' }
    ],
    outcomes: [
      { big: '6', small: 'Localization families included in the comparative evaluation' },
      { big: '0.521 m', small: 'FAST-LIVO2 clean overall RMSE versus LiDAR pseudo-reference, ALIVE data' },
      { big: 'ROS1 ↔ ROS2', small: 'Zenoh interoperability work across the compute/vehicle boundary' }
    ],
    takeaway: 'Real autonomy is not a single algorithm. It is the calibration, timestamps, maps, software interfaces and failure cases that make every part work together.',
    media: [
      { src: '../../assets/media/golfcart-fusion-architecture.jpg', label: 'Exploratory architecture · Sensor monitoring & fallback', caption: 'Separate conceptual fusion/switching architecture for sensor health, primary estimator selection and visual fallback. It does not imply verified automatic failover on the vehicle.', type:'real',wide:true,diagram:true },
      { src: '../../assets/media/golfcart-latest-poster.jpg', label: 'Latest field demo · Live navigation', caption: 'Actual multi-view recording showing LiDAR localization, online planning, exterior camera and steering feedback together.', type:'real',wide:true },
      { src: '../../assets/media/golfcart-benchmark-map.jpg', label: 'Benchmark study · Campus map and reference pipeline', caption: 'LiDAR-derived pseudo-reference, corrected trajectory and a high-level construction process from the localization benchmarking presentation. Not survey-grade ground truth.', type:'real',wide:true,diagram:true },
      { src: '../../assets/media/golfcart-benchmark-clean.jpg', label: 'Comparison · Clean recordings', caption: 'Overall RMSE and other errors for six methods on the ALIVE dataset. Values are relative to a pseudo-reference, not absolute ground truth.', type:'real',wide:true,diagram:true },
      { src: '../../assets/media/golfcart-benchmark-rain.jpg', label: 'Robustness · Simulated rain stress', caption: 'Sensor-perturbation comparison across methods under synthetic rain-like degradation. These are replay experiments, not certified all-weather tests.', type:'real',wide:true,diagram:true },
      { src: '../../assets/media/golfcart-benchmark-fog.jpg', label: 'Robustness · Simulated fog stress', caption: 'Relative localization errors under synthetic fog-like sensor perturbations, with visual tracking more vulnerable to degraded camera observations.', type:'real',wide:true,diagram:true },
      { src: '../../assets/media/golfcart-visual-matches.jpg', label: 'Visual relocalization · Feature matching', caption: 'Actual 2D–3D correspondence diagnostics from camera-based global localization experiments.', type:'real' },
      { src: '../../assets/media/golfcart-trajectory.png', label: 'LiDAR relocalization · Trajectory checks', caption: 'Recorded trajectory and map alignment diagnostic used in ongoing global localization work.', type:'real' }
    ],
    links: [{text:'Selected code repository',url:'https://github.com/ayush-kitnawat-2023160/ALIVE_Autonomus_vehicle', kind:'code'}],
    showExploreFurther:false,
    demoNote:null,
    disclaimer:'The localization RMSE values come from a recorded-data comparison against a LiDAR-derived pseudo-reference rather than survey ground truth. Rain and fog are simulated sensor degradations. The Zenoh video explains the interoperability design; no bridge latency or production safety certification is claimed. Automatic visual fallback, reverse-planner stability and pose-delay issues remain under evaluation.'
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
    measuredMetrics:{
      heading:'Measured performance',
      context:'Final team evaluation · TUM RGB-D fr1/room for reconstruction RMSE; separate hardware and memory tests for runtime costs.',
      cards:[
        {value:'77.5%',label:'Lower reconstruction RMSE',detail:'Baseline 1.20 m → Enhanced 0.27 m · TUM fr1/room'},
        {value:'12.57 GB',label:'Sparse-mode peak VRAM',detail:'Compared with 16.74 GB peak in dense mode · custom desk test'},
        {value:'0.8 FPS',label:'Full pipeline · RTX 3090',detail:'0.6 FPS on RTX 3070 Ti · not yet real-time'}
      ],
      footnote:'RMSE compares the complete enhanced team pipeline with baseline KinectFusion; it does not isolate the impact of a single tracking module. VRAM was 14.36–16.74 GB in dense mode and 8.34–12.57 GB in sparse mode. FPS values were measured on different GPUs and are not a same-hardware speedup comparison.'
    },
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
    demoNote:null,
    disclaimer:null
  },
  {
    slug:'vision-guided-arm',number:'03',label:'ROBOTICS / VISION-GUIDED SORTING',
    title:'Vision-guided sorting robot',short:'Detecting tabletop objects, identifying visual attributes, and picking and placing them into bins with a real robotic arm.',
    date:'Feb — May 2026',affiliation:'Robotics project · team of eight',
    role:'Camera calibration, workspace mapping & camera-to-robot integration',
    hero:'../../assets/media/arm-system-overview.jpg',heroAlt:'Real robotic arm, camera and laptop from the downloaded project video',heroCaption:'REAL PROJECT VIDEO FRAME / ROBOTIC ARM',
    intro:'We built a camera-guided tabletop sorting system that detects objects, checks their visual attributes, and directs a robotic arm to pick them up and place them in the appropriate bins.',
    businessProblem:'Manual sorting is repetitive, and the objects on a table do not always stay in fixed positions. For a robot to sort them, it has to locate each object, recognize its color and whether it has a visual mark, translate that observation into robot coordinates, and execute a reliable grasp.',
    projectGoal:'Connect object detection and visual-attribute checks to an explicit sorting pipeline: calibrate the camera and workspace, map detected objects into robot coordinates, select a destination using defined rules, and perform top-down pick-and-place with a robotic arm.',
    practicalValue:'The resulting pipeline connects perception with real robot actions. Instead of relying on fixed object positions, the arm uses the camera to find a target and move it to a designated bin. The recorded demo shows the real hardware in action.',
    scope:'UFactory xArm Lite6, Intel RealSense camera, AprilTag/ArUco workspace and bin references, YOLO object detection, color/mark checks, OpenCV mapping, and Python robot control.',
    contribution:[
      'Worked on camera calibration and detecting workspace reference markers to establish where the table and sorting bins were in the camera view.',
      'Computed the camera-to-robot mapping that converts detected object centers from image pixels into reachable robot-frame XY positions.',
      'Connected mapped object and bin positions to xArm Lite6 motion commands for top-down pick, lift, move, and release sequences.',
      'Tested the perception-to-motion integration on real hardware, checking that camera observations corresponded to physical arm targets.'
    ],
    pipeline:[
      {title:'Calibrate & map',body:'Calibrate the camera and use AprilTag/ArUco reference markers to locate the tabletop workspace and sorting bins. Build the image-to-robot mapping.'},
      {title:'Detect & classify',body:'Detect tabletop blocks in the camera feed with YOLO. Identify their color and check for a visual mark using image-based rules.'},
      {title:'Choose a bin',body:'Use deterministic sorting rules to select a destination bin for a detected object, keeping classification separate from robot motion.'},
      {title:'Convert coordinates',body:'Map the object center and selected bin from image pixels into robot-frame XY coordinates using the calibrated workspace homography.'},
      {title:'Pick & place',body:'Send xArm commands for a top-down approach, grasp, lift, move to the bin, release, and return. Handle arm-command errors with a safe recovery path.'}
    ],
    challenges:[
      {tag:'01 / CALIBRATION',title:'A pixel location is not a grasp position',problem:'The camera returns image coordinates, but the xArm needs target positions in its own workspace. Small mapping errors can lead to missed grasps.',response:'Used camera calibration and reference markers to establish a workspace homography, converting object and bin positions from pixels to robot XY.',evidence:'The robot receives target coordinates computed from camera observations rather than hard-coded object locations.'},
      {tag:'02 / PERCEPTION',title:'Finding the object is only half the task',problem:'The sorting task involves both object location and visual attributes. The workspace also contains reference markers used for calibration.',response:'Separated object detection, color recognition, visual-mark checks, and workspace-marker detection so each has a clear purpose in the pipeline.',evidence:'YOLO supplies block detections; image-based checks label color and mark presence; fiducial markers define the workspace and bins.'},
      {tag:'03 / HARDWARE INTEGRATION',title:'Turning a detection into a safe pick-and-place sequence',problem:'Even with a correct detection, the arm needs a sensible approach height, gripper timing, a bin target, and a way to respond to motion errors.',response:'Connected calibrated coordinates to xArm motion and gripper commands using a top-down approach, lift, transfer, and release sequence with error recovery.',evidence:'The real-hardware video shows the perception-to-motion integration and the physical sorting workspace.'}
    ],
    outcomes:[{big:'2 visual cues',small:'Object color and mark presence'},{big:'4 corner tags',small:'Workspace-to-robot planar mapping'},{big:'xArm Lite6',small:'Camera-guided pick-and-place integration'}],
    takeaway:'Getting a sorting robot to work is about connecting small, understandable steps—from what the camera sees to where the gripper actually moves.',
    media:[
      {src:'../../assets/media/arm-system-overview.jpg',label:'Video frame · Full setup',caption:'The robotic arm, fixed camera, laptop interface and marked workspace during a recorded test.',type:'real'},
      {src:'../../assets/media/arm-object-interaction.jpg',label:'Video frame · Positioning',caption:'Arm positioned above the marked tabletop during an object-manipulation sequence.',type:'real'},
      {src:'../../assets/media/arm-vision-monitor.jpg',label:'Video frame · Perception interface',caption:'The laptop shows a camera view with detected workspace objects and the physical arm beside it.',type:'real'},
      {src:'../../assets/media/arm-test-run.jpg',label:'Video frame · Hardware run',caption:'Another recorded robot pose during a live demonstration.',type:'real'}
    ],
    links:[{text:'View team repository',url:'https://github.com/vermavinay982/Autonomous-Object-Perception-Manipulation',kind:'code'},{text:'Google Drive demo backup',url:'https://drive.google.com/file/d/1_gH-eMLU9dsza4KSZNG2K8226SaciRYQ/view?usp=sharing',kind:'demo'}],
    demoNote:'The full project video is playable directly on this page. A Google Drive backup is also linked.',
    disclaimer:null
  },
  {
    slug:'edgefusion',number:'04',label:'EDGE AI / DISTRIBUTED TRACKING',
    title:'EdgeFusion multi-camera tracking',short:'Deploying real-time AI detection across camera-equipped Jetson devices, with a shared tracking server.',
    date:'Monsoon 2025',affiliation:'IIIT Delhi · Independent Project, Vision Lab',
    role:'IP contributor · Jetson benchmarking, TensorRT deployment & distributed architecture',
    hero:'../../assets/media/edgefusion-architecture.svg',heroAlt:'EdgeFusion system design showing camera groups, Jetson edge units, router and central DeepSORT tracker',heroCaption:'SYSTEM ARCHITECTURE / MULTI-CAMERA TRACKING',
    intro:'This project investigated how multiple smart camera nodes could detect objects locally and feed a central multi-camera tracking system.',
    businessProblem:'As camera networks grow, running object detection on every stream at one PC becomes computationally demanding. A scalable system must balance inference speed, camera count and the information exchanged between edge devices and the tracking server.',
    projectGoal:'Deploy optimized YOLO11n and YOLOv8n detection on NVIDIA Jetson Orin Nano units; benchmark one to four simultaneous streams; design multi-camera sensing units that communicate detections and images to a central DeepSORT tracker.',
    practicalValue:'By measuring how inference speed changes with camera count, resolution, and FP16/INT8 precision, I could understand the trade-offs involved in running multiple camera streams on edge hardware. Bandwidth savings, end-to-end latency, and cross-camera identity accuracy still need separate evaluation.',
    scope:'Independent Project · 2025 · NVIDIA Jetson Orin Nano, FLIR Firefly USB3 cameras, Spinnaker SDK/PySpin, YOLO11n & YOLOv8n, TensorRT, ZeroMQ, central DeepSORT.',
    contribution:[
      'Benchmarked YOLO11n and YOLOv8n on the Jetson Orin Nano across 1–4 cameras, 640×640 or 1440×1080 input, and FP16 versus INT8 TensorRT precision.',
      'Deployed and tested optimized YOLO detection on Jetson edge hardware, including its camera input and frame-processing pipeline.',
      'Helped design distributed sensing units with three cameras and one Jetson each, connected to a central tracking PC over a high-speed network.',
      'Worked on the edge-to-server data pipeline: detection boxes/classes/confidences, encoded full frames and object crops serialized into JSON, then published using ZeroMQ PUSH.'
    ],
    pipeline:[
      {title:'Capture',body:'FLIR Firefly USB3 cameras stream to a Jetson. Spinnaker SDK/PySpin manages acquisition, auto-exposure and white balance.'},
      {title:'Detect',body:'YOLO11n / YOLOv8n TensorRT engines run on the edge, producing boxes, class IDs and confidence values.'},
      {title:'Package & send',body:'Base64-encode full frames and detection crops, combine them with detection metadata in JSON, and send packets using a ZeroMQ PUSH socket.'},
      {title:'Track centrally',body:'A central server receives and decodes the sensing-unit outputs, with DeepSORT used for tracking and identity association.'}
    ],
    challenges:[
      {tag:'01 / REAL-TIME PERFORMANCE',title:'How many streams can one Jetson handle?',problem:'A single model may run quickly, but camera streams compete for limited device compute and memory as their count grows.',response:'I benchmarked both YOLO model variants at two resolutions and two precision settings, recording per-camera FPS for one, two, three and four concurrent streams.',evidence:'Tested 32 combinations of model, input resolution, inference precision, and camera count. The benchmark charts below show how throughput changes as streams are added.'},
      {tag:'02 / EDGE MODEL DEPLOYMENT',title:'Inference speed depends on precision and input size',problem:'The practical throughput changes when the detector uses FP16 versus INT8 or processes higher-resolution images.',response:'I deployed TensorRT versions of YOLO11n and YOLOv8n and compared the resulting FPS. For YOLO11n at 640×640 with one camera, INT8 reached 20.39 FPS versus 18.92 FPS in FP16.',evidence:'In this one-camera YOLO11n test, INT8 ran faster than FP16. Actual performance depends on the model, resolution, and number of active cameras.'},
      {tag:'03 / DISTRIBUTED INTEGRATION',title:'Connecting camera nodes to one tracker',problem:'Each Jetson must capture images, run detection, and send records that a central server can understand across multiple camera feeds.',response:'I helped architect sensing units and a ZeroMQ PUSH/JSON exchange carrying detection metadata and encoded full frames plus crops. The central system was designed around DeepSORT.',evidence:'The system defines how camera nodes send detections and images to the tracking PC. Network usage, end-to-end delay, and cross-camera identity accuracy require further measurement.'}
    ],
    outcomes:[{big:'20.42 FPS',small:'YOLOv8n INT8 · 640×640 · one camera'},{big:'32',small:'Benchmarked configurations across two models'},{big:'1–4',small:'Concurrent camera streams in the published tables'}],
    takeaway:'A distributed vision system needs measured throughput and a well-defined data path—not just a fast detector benchmark.',
    media:[
      {src:'../../assets/media/edgefusion-architecture.svg',label:'Architecture · Sensing units & tracker',caption:'Each sensing unit connects three cameras to a Jetson Orin Nano. ZeroMQ carries detection data and images to a central tracking PC. Performance tests also covered up to four simultaneous camera streams.',type:'real',wide:true,diagram:true},
      {src:'../../assets/media/edgefusion-benchmarks.svg',label:'Measurements · Jetson throughput',caption:'Measured FPS across one to four camera streams, comparing YOLO11n and YOLOv8n at two resolutions and FP16/INT8 precision. Each plotted value averages the FPS of the active camera streams; it is not their combined throughput.',type:'real',wide:true,diagram:true}
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
    benchmarkNote:'The four-camera column lists each camera’s FPS separately, not a combined total. The charts plot the mean per-camera FPS at each camera count. Benchmarks covered one to four streams; performance beyond four cameras has not been verified. The architecture illustrates the three-camera sensing-unit design.',
    links:[],
    showExploreFurther:false,
    demoNote:null,
    disclaimer:'The FPS measurements reflect detector performance in the tested Jetson configurations, not guaranteed real-world throughput. Bandwidth reduction, end-to-end latency, cross-camera re-identification accuracy, and production reliability have not yet been quantified. The improvements listed below are future work, not completed features.'
  },
  {
    slug:'rocket-avionics',number:'05',label:'EMBEDDED SYSTEMS / TELEMETRY',
    title:'Model rocketry · avionics & telemetry',short:'STM32 sensing, Kalman-filter-based sensor fusion, and live LoRa telemetry for a model rocket.',
    date:'Oct 2024 — Aug 2025',affiliation:'IIIT Delhi model rocket project',
    role:'Avionics & telemetry lead · embedded integration and ground-station software',
    hero:'../../assets/media/rocket-launch-display.jpg',heroAlt:'Actual upright model rocket displayed at an outdoor event',heroCaption:'REAL PROJECT PHOTO / MODEL ROCKET',
    intro:'We built avionics to collect flight measurements, handle noisy IMU readings, and send useful telemetry from a model rocket to a ground station.',
    businessProblem:'During flight and testing, a rocket cannot be connected to a laptop by a cable. Its onboard IMU readings can also be noisy and accumulate drift, making orientation estimates harder to trust. The team needed a way to process sensor data and monitor the rocket remotely.',
    projectGoal:'Integrate onboard sensors with an STM32, use Kalman-filter-based sensor fusion to reduce IMU estimation drift, transmit telemetry over LoRa, and visualize the measurements in a Python ground station.',
    practicalValue:'Combines onboard sensing, state estimation and wireless monitoring in one embedded pipeline, making flight behavior easier to inspect. Drift reduction and radio performance are not presented as quantified results.',
    scope:'STM32 firmware, IMU and onboard sensors, Kalman filtering, LoRa telemetry and Python ground-station software.',
    contribution:[
      'Designed and implemented STM32 firmware integration for flight-related sensor readings.',
      'Worked on Kalman-filter-based sensor fusion to make IMU-derived estimates more stable and address accumulated drift.',
      'Integrated onboard measurements of altitude, orientation and other flight telemetry.',
      'Implemented LoRa-based data communication between the onboard system and a ground station.',
      'Built a Python pipeline for live visualization, monitoring and post-flight analysis.'
    ],
    pipeline:[
      {title:'Read sensors',body:'Collect IMU and other flight-related sensor readings on the STM32.'},
      {title:'Estimate & fuse',body:'Apply Kalman filtering to combine sensor information and reduce noise and accumulated IMU drift in the estimated motion state.'},
      {title:'Prepare telemetry',body:'Package sensor readings and the estimated flight state into data suitable for transmission.'},
      {title:'Transmit',body:'Send telemetry packets from the rocket over LoRa to the ground receiver.'},
      {title:'Visualize',body:'Decode and display live values in a Python ground station for inspection and later analysis.'}
    ],
    challenges:[
      {tag:'01 / EMBEDDED',title:'Bringing multiple sensors into one system',problem:'Different onboard sensors produce different measurements that need to be collected and processed together.',response:'Integrated the sensor readings with STM32 firmware to provide altitude, orientation and other flight-related data.',evidence:'An integrated onboard sensing path feeding the rest of the avionics system.'},
      {tag:'02 / SENSOR FUSION',title:'IMU noise and drift affect the orientation estimate',problem:'Using raw IMU measurements alone can produce noisy estimates; small errors accumulate when angular motion is integrated over time.',response:'Worked on Kalman-filter-based sensor fusion to combine onboard measurements and correct the IMU-derived estimate, rather than relying on unfiltered data.',evidence:'A filtering and estimation stage added to the avionics workflow. No numerical drift-reduction benchmark is claimed.'},
      {tag:'03 / LINK',title:'The receiver is not next to the rocket',problem:'The rocket must send useful state information over a wireless link rather than relying on a cable.',response:'Used LoRa to transmit telemetry and handled reception on the ground-station side.',evidence:'LoRa communication between the onboard system and ground receiver.'},
      {tag:'04 / DIAGNOSTICS',title:'Raw readings are difficult to inspect during testing',problem:'Sensor data is more useful when the team can see how the estimates and measurements change over time.',response:'Built Python-based live monitoring and an analysis workflow for received telemetry.',evidence:'Ground-station visualization of flight-related measurements.'}
    ],
    outcomes:[{big:'Kalman filter',small:'IMU drift handling and sensor fusion'},{big:'STM32 + LoRa',small:'Onboard sensing and wireless telemetry'},{big:'Python',small:'Live ground station and analysis'}],
    takeaway:'A useful avionics system does more than read sensors: it must handle imperfect measurements, estimate the rocket’s state and make that information available on the ground.',
    media:[
      {src:'../../assets/media/rocket-launch-display.jpg',label:'Project photo · Full rocket',caption:'The team’s model rocket on display at an outdoor event. Photo from the project collection.',type:'real'},
      {src:'../../assets/media/rocket-launch-portrait.jpg',label:'Project photo · Rocket on stand',caption:'An upright view of the completed rocket and launch/event setup.',type:'real'},
      {src:'../../assets/media/rocket-hardware-closeup.jpg',label:'Project photo · Rocket body',caption:'Close view of the rocket body, fins and nearby electronics at the display.',type:'real'},
      {src:'../../assets/media/rocket-side-view.jpg',label:'Project photo · Rocket body and fins',caption:'Additional display angle showing the rocket body, fins and nearby hardware.',type:'real'}
    ],
    links:[],
    showExploreFurther:false,
    demoNote:null,
    disclaimer:'The Kalman-filter fusion work is described without claiming a measured reduction in IMU drift. Flight range, packet-loss rate and field-performance metrics are also not quantified.'
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
