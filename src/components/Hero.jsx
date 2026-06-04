<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Download } from 'lucide-react';
import Magnetic from './Magnetic';
import './Hero.css';

const Hero = () => {
    // Words to cycle through in typewriter sliding panel
    const words = ["AI Engineer", "Full Stack Developer", "Open Source Contributor", "MERN Developer"];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // 3D Perspective Card Tilt Setup
    const cardX = useMotionValue(0);
    const cardY = useMotionValue(0);

    const cardRotateX = useTransform(cardY, [-200, 200], [20, -20]);
    const cardRotateY = useTransform(cardX, [-200, 200], [-20, 20]);

    const springConfig = { damping: 20, stiffness: 120 };
    const cardRotateXSpring = useSpring(cardRotateX, springConfig);
    const cardRotateYSpring = useSpring(cardRotateY, springConfig);

    const handleCardMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left - width / 2;
        const mouseY = e.clientY - rect.top - height / 2;
        cardX.set(mouseX);
        cardY.set(mouseY);
    };

    const handleCardMouseLeave = () => {
        cardX.set(0);
        cardY.set(0);
    };

=======
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, Download } from 'lucide-react';
import './Hero.css';

const Hero = () => {
>>>>>>> c322091c069aaf3d0816be0be72238ad6da503ec
    return (
        <section id="about" className="hero-section">
            <div className="container hero-content">
                <motion.div 
<<<<<<< HEAD
                    initial={{ opacity: 0, y: 25 }}
=======
                    initial={{ opacity: 0, y: 20 }}
>>>>>>> c322091c069aaf3d0816be0be72238ad6da503ec
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
<<<<<<< HEAD
                        <span className="rotating-text-container" style={{ 
                            display: 'inline-block', 
                            position: 'relative', 
                            height: '1.2em', 
                            verticalAlign: 'bottom', 
                            overflow: 'hidden', 
                            width: '100%' 
                        }}>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={index}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -20, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="gradient-text"
                                    style={{ position: 'absolute', left: 0, top: 0, whiteSpace: 'nowrap' }}
                                >
                                    {words[index]}
                                </motion.span>
                            </AnimatePresence>
                        </span>
                    </h1>
                    <p className="hero-description">
=======
                        <span className="gradient-text type-writer">AI Engineer</span>
                    </h1>
                    <p className="hero-description" style={{ opacity: 1, animation: 'none' }}>
>>>>>>> c322091c069aaf3d0816be0be72238ad6da503ec
                        Computer Science student proficient in MERN stack and Python.
                        Passionate about combining Full Stack development with emerging AI technologies
                        like Vector Databases and Prompt Engineering.
                    </p>

<<<<<<< HEAD
                    <div className="hero-actions">
                        <Magnetic>
                            <a href="#projects" className="btn btn-primary">
                                View Work <ArrowRight size={18} className="btn-icon" />
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <a
                                href="/Udeep_Chowdary_Resume.pdf"
                                download="Udeep_Chowdary_Resume.pdf"
                                className="btn btn-outline"
                            >
                                Resume <Download size={16} className="btn-icon" />
                            </a>
                        </Magnetic>
                        <div className="social-links">
                            <Magnetic>
                                <a href="https://github.com/UdeepChowdary" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub Profile">
                                    <Github size={20} />
                                </a>
                            </Magnetic>
                            <Magnetic>
                                <a href="https://www.linkedin.com/in/udeep-chowdary-naripeddi" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn Profile">
                                    <Linkedin size={20} />
                                </a>
                            </Magnetic>
                            <Magnetic>
                                <a href="mailto:udeepchowdary06@gmail.com" className="social-icon" aria-label="Send Email">
                                    <Mail size={20} />
                                </a>
                            </Magnetic>
=======
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
>>>>>>> c322091c069aaf3d0816be0be72238ad6da503ec
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
<<<<<<< HEAD
                    <motion.div 
                        className="code-card glass-panel"
                        onMouseMove={handleCardMouseMove}
                        onMouseLeave={handleCardMouseLeave}
                        style={{
                            rotateX: cardRotateXSpring,
                            rotateY: cardRotateYSpring,
                            transformStyle: "preserve-3d"
                        }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <div className="card-header" style={{ transform: "translateZ(25px)" }}>
=======
                    <div className="code-card glass-panel">
                        <div className="card-header">
>>>>>>> c322091c069aaf3d0816be0be72238ad6da503ec
                            <div className="circle red"></div>
                            <div className="circle yellow"></div>
                            <div className="circle green"></div>
                        </div>
<<<<<<< HEAD
                        <div className="code-content" style={{ transform: "translateZ(35px)" }}>
=======
                        <div className="code-content">
>>>>>>> c322091c069aaf3d0816be0be72238ad6da503ec
                            <div className="line"><span className="keyword">const</span> <span className="variable">developer</span> = <span className="brace">{'{'}</span></div>
                            <div className="line indent-1"><span className="property">name</span>: <span className="string">'Udeep'</span>,</div>
                            <div className="line indent-1"><span className="property">skills</span>: [<span className="string">'React'</span>, <span className="string">'Node.js'</span>, <span className="string">'AI'</span>],</div>
                            <div className="line indent-1"><span className="property">hardWorker</span>: <span className="boolean">true</span></div>
                            <div className="line"><span className="brace">{'}'}</span>;</div>
                        </div>
<<<<<<< HEAD
                    </motion.div>
=======
                    </div>
>>>>>>> c322091c069aaf3d0816be0be72238ad6da503ec
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
