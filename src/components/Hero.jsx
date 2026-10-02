import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import './Hero.css';

const Hero = ({ onTerminalClick }) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                if (onTerminalClick) onTerminalClick();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onTerminalClick]);

    return (
        <section id="hero" className="hero-section">
            <div className="container hero-container">
                <div className="grid-12 hero-grid">

                    {/* ── LEFT: Identity text ── */}
                    <motion.div
                        className="hero-content"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="hero-role-label">AI / ML ENGINEER</div>

                        <h1 className="hero-title">
                            <span className="hero-title-line">UDEEP</span>
                            <span className="hero-title-line">CHOWDARY</span>
                            <span className="hero-title-line">NARIPEDDI</span>
                        </h1>

                        <p className="hero-subtitle">
                            I build intelligent systems where machine learning meets real software.
                        </p>

                        <div className="hero-actions">
                            <a href="#projects" className="btn btn-primary">
                                VIEW WORK <ArrowRight size={16} />
                            </a>
                            <a
                                href="/UdeepChowdaryNaripeddi_resume.pdf"
                                download="UdeepChowdaryNaripeddi_Resume.pdf"
                                className="btn btn-outline"
                            >
                                RESUME
                            </a>
                        </div>
                    </motion.div>

                    {/* ── RIGHT: Editorial identity composition ── */}
                    <motion.div
                        className="hero-visual"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.0, delay: 0.4 }}
                    >
                        <div className="hero-image-wrapper">
                            <img 
                                src="/projects/image copy.png" 
                                alt="Udeep Chowdary Profile" 
                                className="hero-profile-image img-light" 
                            />
                            <img 
                                src="/projects/image copy 2.png" 
                                alt="Udeep Chowdary Profile Dark" 
                                className="hero-profile-image img-dark" 
                            />
                        </div>
                    </motion.div>

                </div>
            </div>

            {onTerminalClick && (
                <button
                    className="cmd-k-trigger"
                    onClick={onTerminalClick}
                    title="Open Command Palette (Cmd/Ctrl + K)"
                    aria-label="Open Command Palette"
                >
                    <Terminal size={14} />
                    <span>CMD + K</span>
                </button>
            )}
        </section>
    );
};

export default Hero;
