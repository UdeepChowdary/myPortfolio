import React from 'react';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    return (
        <section id="about" className="hero-section">
            <div className="container hero-content">
                <div className="hero-text">
                    <div className="badge glass-panel">
                        <span className="dot-indicator"></span>
                        Available for Freelance
                    </div>
                    <h1>
                        Hi, I'm Udeep <br />
                        Chowdary Naripeddi <br />
                        <span className="gradient-text type-writer">AI Engineer</span>
                    </h1>
                    <p className="hero-description">
                        Computer Science student proficient in MERN stack and Python.
                        Passionate about combining Full Stack development with emerging AI technologies
                        like Vector Databases and Prompt Engineering.
                    </p>

                    <div className="hero-actions">
                        <a href="#projects" className="btn btn-primary">
                            View Work <ArrowRight size={18} className="btn-icon" />
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
                </div>

                <div className="hero-visual">
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
                </div>
            </div>
        </section>
    );
};

export default Hero;
