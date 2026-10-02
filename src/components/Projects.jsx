import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { projectsData } from '../data/projects';
import './Projects.css';

const N = projectsData.length; // 5

const StackedCard = ({ project, i, progress }) => {
    // Each card shrinks and fades slightly as you scroll past it, creating depth
    const start = i / N;
    const end = 1;
    
    // Scale down by a maximum of 4% per card behind
    const targetScale = 1 - (((N - 1) - i) * 0.04);
    const scale = useTransform(progress, [start, end], [1, targetScale]);
    
    // Fade out slightly
    const targetOpacity = 1 - (((N - 1) - i) * 0.15);
    const opacity = useTransform(progress, [start, end], [1, targetOpacity]);

    // Offset each card slightly lower than the previous one so they create a visible "stack" edge
    const topOffset = `calc(var(--nav-height) + 120px + ${i * 25}px)`;

    return (
        <div className="project-card-container" style={{ top: topOffset }}>
            <motion.div 
                className="project-card-inner" 
                style={{ scale, opacity, transformOrigin: 'top center' }}
            >
                {/* Text column */}
                <div className="pc-left">
                    <div className="pc-meta-row">
                        <span className="pc-num">0{i + 1}</span>
                        {project.award && <span className="pc-award">{project.award}</span>}
                    </div>
                    <h3 className="pc-title">{project.title}</h3>
                    <p className="pc-tagline">{project.tagline}</p>
                    <p className="pc-desc">{project.description}</p>
                    <div className="pc-tags">
                        {project.tags.map((tag, idx) => (
                            <span key={idx} className="pc-tag">{tag}</span>
                        ))}
                    </div>
                    <div className="pc-links">
                        {project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                VIEW DEMO <ExternalLink size={14} />
                            </a>
                        )}
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                                CODE <Github size={14} />
                            </a>
                        )}
                    </div>
                </div>

                {/* Image column */}
                <div className="pc-right">
                    <div className="pc-img-frame">
                        {project.imageLight && project.imageDark ? (
                            <>
                                <img src={project.imageLight} alt={project.title} className="pc-img pc-img--light" loading="lazy" />
                                <img src={project.imageDark}  alt={project.title} className="pc-img pc-img--dark"  loading="lazy" />
                            </>
                        ) : project.image ? (
                            <img src={project.image} alt={project.title} className="pc-img" loading="lazy" />
                        ) : (
                            <div className="pc-img-placeholder" />
                        )}
                    </div>
                    {project.metrics && <div className="pc-metrics">{project.metrics}</div>}
                </div>
            </motion.div>
        </div>
    );
};

const Projects = () => {
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        let idx = Math.floor(latest * N);
        if (idx >= N) idx = N - 1;
        if (idx < 0) idx = 0;
        setActiveIndex(idx);
    });

    return (
        <section id="projects" className="projects-section" ref={containerRef}>
            <header className="projects-header">
                <div className="projects-header-inner">
                    <div className="section-header projects-section-header">
                        <span className="section-number">02</span>
                        <h2 className="section-title">SELECTED WORK</h2>
                        <div className="section-header-rule" />
                    </div>

                    <div className="projects-progress">
                        <span className="progress-count">
                            {String(activeIndex + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
                        </span>
                        <div className="progress-ticks">
                            {projectsData.map((_, i) => (
                                <div
                                    key={i}
                                    className={`progress-tick ${i === activeIndex ? 'active' : ''}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </header>

            <div className="project-cards-wrap">
                {projectsData.map((project, i) => (
                    <StackedCard 
                        key={project.id} 
                        project={project} 
                        i={i} 
                        progress={scrollYProgress} 
                    />
                ))}
            </div>
        </section>
    );
};

export default Projects;
