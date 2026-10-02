import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import './Skills.css';

const DISCIPLINES = [
    {
        number: '01',
        category: 'AI & INTELLIGENT SYSTEMS',
        headline: 'Computer Vision, RAG & Predictive Models',
        proof: 'Validated in Derm.AI (2nd Runner-Up) & Emotion Support Engine',
        skills: [
            { name: 'Gemini API', role: 'Multimodal Agents & Vision', highlight: true },
            { name: 'TensorFlow.js', role: 'Client-Side Neural Graphs', highlight: false },
            { name: 'Computer Vision', role: 'OpenCV & Preprocessing', highlight: false },
            { name: 'RAG & Vector Search', role: 'Retrieval Augmented Gen', highlight: true },
            { name: 'BiLSTM + BERT', role: 'Hybrid NLP Pipelines', highlight: false },
            { name: 'Scikit-Learn', role: 'Predictive Classifiers', highlight: false }
        ]
    },
    {
        number: '02',
        category: 'FULL-STACK PLATFORMS',
        headline: 'High-Throughput Web & Reactive Systems',
        proof: 'Engineered in CampusHub & AlgoViz Studio (60 FPS Engine)',
        skills: [
            { name: 'React 19 & Next.js', role: 'Modern Component Systems', highlight: true },
            { name: 'Python', role: 'FastAPI & Streamlit Backends', highlight: true },
            { name: 'Node.js & Express', role: 'RESTful Microservices', highlight: false },
            { name: 'Tailwind CSS', role: 'Responsive Design Tokens', highlight: false },
            { name: 'Framer Motion', role: 'Editorial Physics & Motion', highlight: false },
            { name: 'Vite & Web APIs', role: 'Low-Latency Bundling', highlight: false }
        ]
    },
    {
        number: '03',
        category: 'SYSTEMS, AIOps & FOUNDATIONS',
        headline: 'Autonomous Telemetry & Core Engineering',
        proof: '1st Place Winner (AI/ML Track) · IEEE Genesis 2026 for OpsPilot',
        skills: [
            { name: 'AIOps Automation', role: 'Predictive Anomaly Remediation', highlight: true },
            { name: 'DSA & Algorithms', role: 'Graphs, DP & Optimization', highlight: false },
            { name: 'Java & OOP', role: 'Object-Oriented Architecture', highlight: false },
            { name: 'SQL & MongoDB', role: 'Relational & Document DBMS', highlight: false },
            { name: 'Git & CI/CD', role: 'Branching & Automation', highlight: false },
            { name: 'Linux / POSIX CLI', role: 'Shell Scripting & Workflows', highlight: false }
        ]
    }
];

const Skills = () => {
    return (
        <section id="skills" className="skills-section">
            <div className="container">
                {/* 05 SECTION HEADER */}
                <div className="section-header">
                    <span className="section-number">05</span>
                    <h2 className="section-title">CAPABILITIES</h2>
                    <div className="section-header-rule" />
                </div>

                {/* ARCHITECTURAL META BAR */}
                <div className="skills-meta-bar">
                    <span className="skills-meta-tag">[ SPEC SHEET // 2026 ]</span>
                    <span className="skills-meta-center">APPLIED MACHINE LEARNING &amp; PRODUCTION RUNTIMES</span>
                    <span className="skills-meta-status">
                        <span className="skills-meta-dot" /> VERIFIED STACK
                    </span>
                </div>

                {/* EDITORIAL DISCIPLINE ROWS */}
                <div className="skills-matrix">
                    {DISCIPLINES.map((discipline, dIdx) => (
                        <motion.div 
                            key={discipline.number}
                            className="discipline-row"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-60px' }}
                            transition={{ duration: 0.5, delay: dIdx * 0.1 }}
                        >
                            {/* LEFT COLUMN: Number, Category, Proof */}
                            <div className="discipline-meta">
                                <div className="discipline-num-box">
                                    <span className="discipline-num">{discipline.number}</span>
                                    <span className="discipline-slash">/</span>
                                    <span className="discipline-category">{discipline.category}</span>
                                </div>
                                <div className="discipline-proof">
                                    <span className="proof-label">SOURCE</span>
                                    <p className="proof-text">{discipline.proof}</p>
                                </div>
                            </div>

                            {/* RIGHT COLUMN: Headline & Technical Grid */}
                            <div className="discipline-content">
                                <h3 className="discipline-headline">{discipline.headline}</h3>
                                
                                <div className="skills-grid">
                                    {discipline.skills.map((skill, sIdx) => (
                                        <div 
                                            key={sIdx} 
                                            className={`skill-cell ${skill.highlight ? 'skill-cell--highlight' : ''}`}
                                        >
                                            <div className="skill-cell-top">
                                                <span className="skill-name">{skill.name}</span>
                                                <ArrowUpRight size={13} className="skill-arrow" />
                                            </div>
                                            <span className="skill-role">{skill.role}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
