export const projectsData = [
    {
        id: 'opspilot',
        title: 'OpsPilot',
        tagline: 'Autonomous AIOps Engine',
        featured: true,
        description: '1st Place Winner in the AI/ML Track at IEEE Genesis Hackathon 2026. An autonomous AIOps system engineered for real-time telemetry analysis, predictive anomaly detection, and automated self-healing incident remediation.',
        image: '/projects/opspilot.png',
        tags: ['Python', 'Machine Learning', 'DevOps', 'AIOps'],
        link: 'https://github.com/UdeepChowdary/OPSPILOT_Udeep.git',
        github: 'https://github.com/UdeepChowdary/OPSPILOT_Udeep.git',
        award: '1st Place (AI/ML Track) · IEEE Genesis 2026',
        metrics: 'Autonomous Telemetry & Anomaly Remediation · Zero Downtime',
        architecture: [
            'Autonomous AIOps engine aggregating multi-stream infrastructure telemetry and logs.',
            'Machine learning models for early predictive anomaly detection and failure forecasting.',
            'Automated remediation action pipelines closing the loop without human intervention.'
        ]
    },
    {
        id: 'derm-ai',
        title: 'Derm.AI',
        tagline: 'AI Skin Condition Detector',
        featured: false,
        description: '2nd Runner-Up in the AIFT Summer Challenge 2025. An AI skin condition detector and clinical screening tool integrating TensorFlow.js deep learning models and the Autoderm API for fast, accessible dermatological insights.',
        image: '/projects/dermai.webp',
        tags: ['React', 'TensorFlow.js', 'Autoderm API', 'Computer Vision'],
        link: 'https://derm-ai-eight-ashen.vercel.app/',
        github: 'https://github.com/UdeepChowdary/derm_ai',
        award: '2nd Runner-Up · AIFT Summer Challenge 2025',
        metrics: 'Real-Time Diagnostic Screening · Client-Side Inference',
        architecture: [
            'Client-side image tensor preprocessing with responsive React frontend interface.',
            'TensorFlow.js and Autoderm API integration for multi-class dermatological screening.',
            'Confidence thresholding and diagnostic risk scoring to deliver rapid clinical health insights.'
        ]
    },
    {
        id: 'emotion-detection',
        title: 'Emotion Detection & Learning Support Engine',
        tagline: 'Hybrid BiLSTM & BERT Pipeline with Gemini API',
        featured: false,
        description: 'An AI-powered web platform that analyzes student emotional states and learning frustration signals using a hybrid BiLSTM and BERT pipeline, dynamically orchestrating Gemini API for adaptive pedagogical support.',
        image: '/projects/emotionDetection.webp',
        tags: ['Python', 'Streamlit', 'Gemini', 'Machine Learning'],
        link: 'https://emotiondetectionlearningsupportengine-ja6yagovp7z3ow6vjgme8p.streamlit.app/',
        github: 'https://github.com/UdeepChowdary/emotionDetectionLearningSupportEngine',
        award: 'Featured AI Educational System',
        metrics: 'Hybrid BiLSTM + BERT Pipeline · Dynamic Gemini Synthesis',
        architecture: [
            'Hybrid BiLSTM and BERT sentiment classification pipeline detecting cognitive frustration.',
            'Gemini context orchestration to synthesize personalized, empathetic micro-tutoring responses.',
            'Interactive Streamlit UI with low-latency state evaluation and pedagogical telemetry.'
        ]
    },
    {
        id: 'algoviz',
        title: 'AlgoViz Studio',
        tagline: 'Interactive DSA Visualizer',
        featured: false,
        description: 'An interactive data structures and algorithms visualization studio built with React.js, Vite, and Tailwind CSS. Features step-by-step playback for graph pathfinding (Dijkstra, A*), sorting, and tree traversals in 60 FPS real time.',
        image: '/projects/algoviz.webp',
        tags: ['React.js', 'Vite', 'Tailwind CSS', 'Algorithms'],
        link: 'https://algo-viz-zz.vercel.app/',
        github: 'https://github.com/UdeepChowdary/algoVizZZ',
        award: 'Interactive Engineering Tool',
        metrics: '60 FPS Canvas & DOM Engine · Step-by-Step Playback',
        architecture: [
            'Non-blocking async generator architecture enabling frame-by-frame execution control.',
            'Customizable obstacle grids, weighted nodes, speed throttles, and heuristic tuning.',
            'Tailwind CSS-styled responsive interface with modular visualizer components.'
        ]
    },
    {
        id: 'campushub',
        title: 'CampusHub',
        tagline: 'AI-Powered Campus Event & Activity Ecosystem',
        featured: false,
        description: 'A verified campus event discovery and clash-free scheduling web app engineered for SRM AP AIFT students and juniors. Co-developed with Mageshwaran, featuring client-side Gemini vision flyer parsing, manager verification studio, and dual light/dark themes.',
        image: '/projects/campushub-dark.png',
        imageLight: '/projects/campushub-light.png',
        imageDark: '/projects/campushub-dark.png',
        tags: ['React', 'Next.js', 'Gemini API', 'Tailwind CSS'],
        link: 'https://campus-hub-lilac.vercel.app/',
        github: 'https://github.com/UdeepChowdary/Kalvium_Projuct_MEEvErsion.git',
        award: 'Community & Academic Engineering',
        metrics: 'Gemini Vision Flyer Parsing · Zero Clash RSVP Guarantee',
        architecture: [
            'Centralized campus event discovery and organization platform built specifically for AIFT students and juniors, co-developed with Mageshwaran.',
            'Client-side Gemini API vision pipeline parsing physical event posters and extracting structured event metadata directly in browser storage.',
            'Three unified role workspaces: Student clash-free RSVP feed, Organizer Studio, and Manager Verification Studio.',
            'Adaptive dual light and dark theme design system engineered with Tailwind CSS and Next.js.'
        ]
    }
];
