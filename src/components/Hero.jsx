import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Download, Code2, Sparkles, Terminal, Copy, Check } from 'lucide-react';
import Magnetic from './Magnetic';
import './Hero.css';

const CODE_TABS = [
    {
        id: 'developer.ts',
        label: 'developer.ts',
        language: 'typescript',
        lines: [
            { text: "const developer = {", indent: 0 },
            { text: "  name: 'Udeep Chowdary',", indent: 1 },
            { text: "  role: 'AI & Full Stack Engineer',", indent: 1 },
            { text: "  cgpa: 9.15,", indent: 1 },
            { text: "  stack: ['React', 'Node.js', 'Python', 'Gemini AI'],", indent: 1 },
            { text: "  openToWork: true", indent: 1 },
            { text: "};", indent: 0 }
        ]
    },
    {
        id: 'derm_ai.py',
        label: 'derm_ai.py',
        language: 'python',
        lines: [
            { text: "# AIFT 2025 - 3rd Place National Winner", indent: 0 },
            { text: "import tensorflow as tf", indent: 0 },
            { text: "from derm_ai import ComputerVisionModel", indent: 0 },
            { text: "", indent: 0 },
            { text: "model = ComputerVisionModel(weights='imagenet')", indent: 0 },
            { text: "insight = model.diagnose(skin_image)", indent: 0 },
            { text: "print('Diagnosis:', insight.confidence)", indent: 0 }
        ]
    },
    {
        id: 'status.sh',
        label: 'status.sh',
        language: 'bash',
        lines: [
            { text: "$ echo 'System Readiness Check...'", indent: 0 },
            { text: "✓ React 19 Engine: ACTIVE", indent: 0 },
            { text: "✓ Vector DB & RAG: READY", indent: 0 },
            { text: "✓ GSSoC 2026 Contributor: ACTIVE", indent: 0 },
            { text: "⚡ Status: Available for High Impact Roles", indent: 0 }
        ]
    }
];

const Hero = () => {
    const words = [
        "Aspiring AI Engineer",
        "Building Intelligent Systems",
        "Full Stack Web Developer",
        "Deep Learning & RAG Specialist"
    ];
    const [index, setIndex] = useState(0);
    const [activeTab, setActiveTab] = useState(CODE_TABS[0]);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // 3D Card Hover Physics
    const cardX = useMotionValue(0);
    const cardY = useMotionValue(0);

    const cardRotateX = useTransform(cardY, [-200, 200], [15, -15]);
    const cardRotateY = useTransform(cardX, [-200, 200], [-15, 15]);

    const springConfig = { damping: 22, stiffness: 140 };
    const cardRotateXSpring = useSpring(cardRotateX, springConfig);
    const cardRotateYSpring = useSpring(cardRotateY, springConfig);

    const handleCardMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;
        cardX.set(mouseX);
        cardY.set(mouseY);
    };

    const handleCardMouseLeave = () => {
        cardX.set(0);
        cardY.set(0);
    };

    const handleCopyCode = () => {
        const codeText = activeTab.lines.map(l => l.text).join('\n');
        navigator.clipboard.writeText(codeText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="about" className="hero-section">
            <div className="container hero-content">
                {/* Left Text Block */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="hero-text"
                >
                    <div className="badge glass-panel">
                        <span className="dot-indicator"></span>
                        Available for Work
                    </div>

                    <h1>
                        Hi, I'm Udeep <br />
                        Chowdary Naripeddi <br />
                        <span className="rotating-text-container">
                            <span className="placeholder-text">Deep Learning & RAG Specialist</span>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={index}
                                    initial={{ y: 24, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -24, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="gradient-text active-rotating-text"
                                >
                                    {words[index]}
                                </motion.span>
                            </AnimatePresence>
                        </span>
                    </h1>

                    <p className="hero-description">
                        Computer Science student at <strong>SRM University AP</strong> (CGPA: 9.15/10).
                        Specializing in Full Stack MERN development, Deep Learning, and AI-driven applications.
                    </p>

                    <div className="hero-actions">
                        <Magnetic>
                            <a href="#projects" className="btn btn-primary">
                                View Work <ArrowRight size={18} className="btn-icon" />
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <a
                                href="/UdeepChowdaryNaripeddi_resume.pdf"
                                download="UdeepChowdaryNaripeddi_Resume.pdf"
                                className="btn btn-outline"
                            >
                                Resume <Download size={16} className="btn-icon" />
                            </a>
                        </Magnetic>

                        <div className="social-links">
                            <Magnetic>
                                <a href="https://github.com/UdeepChowdary" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub Profile">
                                    <Github size={19} />
                                </a>
                            </Magnetic>
                            <Magnetic>
                                <a href="https://www.linkedin.com/in/udeep-chowdary-naripeddi-99908627b" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn Profile">
                                    <Linkedin size={19} />
                                </a>
                            </Magnetic>
                            <Magnetic>
                                <a href="mailto:udeepchowdary06@gmail.com" className="social-icon" aria-label="Send Email">
                                    <Mail size={19} />
                                </a>
                            </Magnetic>
                        </div>
                    </div>
                </motion.div>

                {/* Right Interactive Code Editor + Floating Tech Orbs */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="hero-visual"
                >
                    <div className="glow-orb orb-1"></div>
                    <div className="glow-orb orb-2"></div>

                    {/* Floating Tech Badges around Card */}
                    <motion.div 
                        className="floating-tech-badge badge-react glass-panel"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <Code2 size={15} style={{ color: '#61dafb' }} /> React
                    </motion.div>

                    <motion.div 
                        className="floating-tech-badge badge-ai glass-panel"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    >
                        <Sparkles size={15} style={{ color: '#a855f7' }} /> Gemini AI
                    </motion.div>

                    <motion.div 
                        className="floating-tech-badge badge-py glass-panel"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                    >
                        <Terminal size={15} style={{ color: '#3776ab' }} /> Python
                    </motion.div>

                    {/* Interactive Code Window */}
                    <motion.div 
                        className="code-card glass-panel"
                        onMouseMove={handleCardMouseMove}
                        onMouseLeave={handleCardMouseLeave}
                        style={{
                            rotateX: cardRotateXSpring,
                            rotateY: cardRotateYSpring,
                            transformStyle: "preserve-3d"
                        }}
                    >
                        <div className="code-card-topbar">
                            <div className="window-dots">
                                <span className="circle red"></span>
                                <span className="circle yellow"></span>
                                <span className="circle green"></span>
                            </div>
                            <div className="code-tabs">
                                {CODE_TABS.map(tab => (
                                    <button 
                                        key={tab.id}
                                        className={`code-tab-btn ${activeTab.id === tab.id ? 'active' : ''}`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                            <button className="copy-code-btn" onClick={handleCopyCode} title="Copy Snippet">
                                {copied ? <Check size={14} style={{ color: '#27c93f' }} /> : <Copy size={14} />}
                            </button>
                        </div>

                        <div className="code-content">
                            <AnimatePresence mode="wait">
                                <motion.div 
                                    key={activeTab.id}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.25 }}
                                >
                                    {activeTab.lines.map((line, idx) => (
                                        <div key={idx} className="code-line" style={{ paddingLeft: `${line.indent * 1.2}rem` }}>
                                            <span className="line-num">{idx + 1}</span>
                                            <span className="line-text">{line.text}</span>
                                        </div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
