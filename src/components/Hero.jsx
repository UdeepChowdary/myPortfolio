import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Download } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    return (
        <section id="about" className="hero-section">
            <div className="container hero-content">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="hero-text"
                >
                    <div className="badge glass-panel">
                        <span className="dot-indicator"></span>
                        Available for Freelance
                    </div>
                    <h1>
                        Hi, I'm Udeep <br />
                        Chowdary Naripeddi <br />
                        <span className="gradient-text type-writer">AI Engineer</span>
                    </h1>
                    <p className="hero-description" style={{ opacity: 1, animation: 'none' }}>
                        Computer Science student proficient in MERN stack and Python.
                        Passionate about combining Full Stack development with emerging AI technologies
                        like Vector Databases and Prompt Engineering.
                    </p>

                    <div className="hero-actions" style={{ opacity: 1, animation: 'none' }}>
                        <a href="#projects" className="btn btn-primary">
                            View Work <ArrowRight size={18} className="btn-icon" />
                        </a>
                        <a
                            href="/Udeep_Chowdary_Resume.pdf"
                            download="Udeep_Chowdary_Resume.pdf"
                            className="btn btn-outline"
                        >
                            Resume <Download size={16} className="btn-icon" />
                        </a>
                        <div className="social-links">
                            <a href="https://github.com/UdeepChowdary" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <Github size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/udeep-chowdary-naripeddi" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <Linkedin size={20} />
                            </a>
                            <a href="mailto:udeepchowdary06@gmail.com" className="social-icon">
                                <Mail size={20} />
                            </a>
                        </div>
                    </div>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="hero-visual"
                >
                    <div className="glow-orb orb-1"></div>
                    <div className="glow-orb orb-2"></div>
                    <div className="code-card glass-panel">
                        <div className="card-header">
                            <div className="circle red"></div>
                            <div className="circle yellow"></div>
                            <div className="circle green"></div>
                        </div>
                        <div className="code-content">
                            <div className="line"><span className="keyword">const</span> <span className="variable">developer</span> = <span className="brace">{'{'}</span></div>
                            <div className="line indent-1"><span className="property">name</span>: <span className="string">'Udeep'</span>,</div>
                            <div className="line indent-1"><span className="property">skills</span>: [<span className="string">'React'</span>, <span className="string">'Node.js'</span>, <span className="string">'AI'</span>],</div>
                            <div className="line indent-1"><span className="property">hardWorker</span>: <span className="boolean">true</span></div>
                            <div className="line"><span className="brace">{'}'}</span>;</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
