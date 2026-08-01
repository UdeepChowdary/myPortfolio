import React from 'react';
import { motion } from 'framer-motion';
import {
    ArrowRight, Github, Linkedin, Mail, Download,
    Trophy, ExternalLink
} from 'lucide-react';
import './Hero.css';

const PROOF_STATS = [
    { value: '3', label: 'Live Projects' },
    { value: '9.15', label: 'CGPA / 10' },
    { value: "GSSoC", label: "Contributor '26" },
];

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
});

const Hero = () => {
    return (
        <section id="about" className="hero-section">
            <div className="container hero-content">

                {/* ── Left: The Claim ── */}
                <motion.div
                    className="hero-text"
                    {...fadeUp(0.1)}
                >
                    {/* Identity label */}
                    <div className="hero-label">
                        <span className="hero-label-name">Udeep Chowdary</span>
                        <span className="hero-label-dot" aria-hidden="true">·</span>
                        <span className="hero-label-role">AI Engineer &amp; Builder</span>
                    </div>

                    {/* Display headline */}
                    <h1 className="hero-headline">
                        I build AI&nbsp;products
                        <br />
                        <span className="hero-headline-accent">that actually ship.</span>
                    </h1>

                    {/* Award anchor */}
                    <div className="hero-award" role="note" aria-label="Award: AIFT 2025 3rd Place National Winner">
                        <Trophy size={13} className="hero-award-icon" aria-hidden="true" />
                        <span>AIFT 2025 — <strong>3rd Place National Winner</strong></span>
                    </div>

                    {/* Value-first description */}
                    <p className="hero-description">
                        CS student at SRM University AP (CGPA&nbsp;9.15).
                        I ship production-ready AI applications—from TensorFlow
                        pipelines to full-stack MERN interfaces.
                    </p>

                    {/* CTAs */}
                    <div className="hero-actions">
                        <a href="#projects" className="btn btn-primary" aria-label="View my projects">
                            View My Work <ArrowRight size={15} aria-hidden="true" />
                        </a>
                        <a
                            href="/UdeepChowdaryNaripeddi_resume.pdf"
                            download="UdeepChowdaryNaripeddi_Resume.pdf"
                            className="btn btn-outline"
                            aria-label="Download resume"
                        >
                            Resume <Download size={14} aria-hidden="true" />
                        </a>
                    </div>

                    {/* Social links */}
                    <div className="hero-social">
                        <a
                            href="https://github.com/UdeepChowdary"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hero-social-link"
                            aria-label="GitHub profile"
                        >
                            <Github size={17} aria-hidden="true" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/udeep-chowdary-naripeddi-99908627b"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hero-social-link"
                            aria-label="LinkedIn profile"
                        >
                            <Linkedin size={17} aria-hidden="true" />
                        </a>
                        <a
                            href="mailto:udeepchowdary06@gmail.com"
                            className="hero-social-link"
                            aria-label="Send email"
                        >
                            <Mail size={17} aria-hidden="true" />
                        </a>
                    </div>
                </motion.div>

                {/* ── Right: The Proof ── */}
                <motion.div
                    className="hero-proof"
                    {...fadeUp(0.25)}
                >
                    <article className="proof-card glass-card" aria-label="Featured project: Derm-AI">

                        {/* Screenshot */}
                        <div className="proof-image-wrapper">
                            <img
                                src="/projects/dermAI.png"
                                alt="Derm-AI application interface — AI-powered skin disease detection"
                                className="proof-image"
                                loading="eager"
                            />
                            <div className="proof-image-overlay" aria-hidden="true">
                                <a
                                    href="https://derm-ai-eight-ashen.vercel.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="proof-overlay-btn"
                                    aria-label="Open Derm-AI live demo"
                                >
                                    Open Live Demo <ExternalLink size={12} />
                                </a>
                            </div>
                        </div>

                        {/* Card body */}
                        <div className="proof-body">

                            {/* Title + award */}
                            <div className="proof-meta">
                                <h2 className="proof-title">Derm-AI</h2>
                                <span className="proof-award-badge">
                                    <Trophy size={10} aria-hidden="true" />
                                    3rd Place · AIFT 2025
                                </span>
                            </div>

                            <p className="proof-desc">
                                Computer Vision system for AI-assisted skin disease detection.
                            </p>

                            {/* Stats row */}
                            <div className="proof-stats" role="list" aria-label="Key metrics">
                                {PROOF_STATS.map((stat) => (
                                    <div key={stat.label} className="proof-stat" role="listitem">
                                        <span className="proof-stat-value">{stat.value}</span>
                                        <span className="proof-stat-label">{stat.label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Action links */}
                            <div className="proof-actions">
                                <a
                                    href="https://github.com/UdeepChowdary/derm_ai"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="proof-action-btn"
                                    aria-label="View Derm-AI source code on GitHub"
                                >
                                    <Github size={13} aria-hidden="true" /> GitHub
                                </a>
                                <a
                                    href="https://derm-ai-eight-ashen.vercel.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="proof-action-btn proof-action-primary"
                                    aria-label="Open Derm-AI live demo"
                                >
                                    <ExternalLink size={13} aria-hidden="true" /> Live Demo
                                </a>
                            </div>
                        </div>
                    </article>
                </motion.div>

            </div>
        </section>
    );
};

export default Hero;
