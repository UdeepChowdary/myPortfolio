import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ExternalLink, Github, Trophy, X, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { projectsData } from '../data/projects';
import './Projects.css';

const ProjectCard = ({ project, handleMouseMove, onSelectProject }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-150, 150], [12, -12]);
    const rotateY = useTransform(x, [-150, 150], [-12, 12]);

    const springConfig = { damping: 25, stiffness: 150 };
    const rotateXSpring = useSpring(rotateX, springConfig);
    const rotateYSpring = useSpring(rotateY, springConfig);

    const onMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left - width / 2;
        const mouseY = e.clientY - rect.top - height / 2;
        x.set(mouseX);
        y.set(mouseY);
        handleMouseMove(e);
    };

    const onMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const isAwarded = project.title === 'Derm-AI';

    return (
        <motion.div 
            className={`project-card glass-panel ${isAwarded ? 'awarded-card' : ''}`}
            layout
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            style={{
                rotateX: rotateXSpring,
                rotateY: rotateYSpring,
                transformStyle: "preserve-3d"
            }}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={() => onSelectProject(project)}
        >
            {/* Award Sheen Badge */}
            {isAwarded && (
                <div className="award-ribbon">
                    <Trophy size={13} /> 3rd Place Winner
                </div>
            )}

            <div className="project-image-container">
                {project.image ? (
                    <img src={project.image} alt={project.title} />
                ) : (
                    <span className="project-placeholder">{project.title.charAt(0)}</span>
                )}
                <div className="image-overlay-hover">
                    <span className="quick-view-btn">
                        Quick Preview <ArrowRight size={14} />
                    </span>
                </div>
            </div>

            <div className="project-content">
                <div className="project-header">
                    <h3>{project.title}</h3>
                    <div className="project-links" onClick={(e) => e.stopPropagation()}>
                        <a href={project.github} target="_blank" rel="noopener noreferrer" title="View Source Code">
                            <Github size={18} />
                        </a>
                        <a href={project.link} target="_blank" rel="noopener noreferrer" title="Live Preview">
                            <ExternalLink size={18} />
                        </a>
                    </div>
                </div>
                <p className="project-desc">{project.description}</p>
                
                <div className="tags">
                    {project.tags.map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                    ))}
                </div>
            </div>
            <div className="card-glow"></div>
        </motion.div>
    );
};

const Projects = () => {
    const [filter, setFilter] = useState('All');
    const [selectedProject, setSelectedProject] = useState(null);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    };

    const filters = ['All', 'React', 'Python', 'Computer Vision'];
    const filteredProjects = filter === 'All' ? projectsData : projectsData.filter(p => p.tags.includes(filter));

    return (
        <section id="projects" className="projects-section">
            <div className="container">
                <div className="projects-section-header">
                    <div className="projects-badge">
                        <Sparkles size={13} /> PORTFOLIO SHOWCASE
                    </div>
                    <h2 className="section-title">
                        Featured <span className="gradient-text">Work</span>
                    </h2>
                </div>

                <div className="project-filters">
                    {filters.map(f => (
                        <button 
                            key={f} 
                            className={`filter-btn ${filter === f ? 'active' : ''}`}
                            onClick={() => setFilter(f)}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                <motion.div layout className="projects-grid">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <ProjectCard 
                                key={project.title}
                                project={project}
                                handleMouseMove={handleMouseMove}
                                onSelectProject={setSelectedProject}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Interactive Project Modal */}
                <AnimatePresence>
                    {selectedProject && (
                        <motion.div 
                            className="project-modal-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                        >
                            <motion.div 
                                className="project-modal-card glass-panel"
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ type: "spring", damping: 25, stiffness: 250 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>
                                    <X size={20} />
                                </button>

                                <div className="modal-image-wrapper">
                                    <img src={selectedProject.image} alt={selectedProject.title} />
                                    {selectedProject.title === 'Derm-AI' && (
                                        <div className="modal-award-tag">
                                            <Trophy size={14} /> 3rd Place - AIFT Summer Challenge
                                        </div>
                                    )}
                                </div>

                                <div className="modal-body">
                                    <h3>{selectedProject.title}</h3>
                                    <p className="modal-desc">{selectedProject.description}</p>

                                    <div className="modal-highlights">
                                        <h4>Key Features & Architecture:</h4>
                                        <ul>
                                            <li><CheckCircle2 size={15} className="check-icon" /> Built with production-ready full stack architecture & clean modular components.</li>
                                            <li><CheckCircle2 size={15} className="check-icon" /> Optimized for high performance, responsiveness, and real-time execution.</li>
                                        </ul>
                                    </div>

                                    <div className="modal-tags">
                                        {selectedProject.tags.map((t, idx) => (
                                            <span key={idx} className="modal-tag-pill">{t}</span>
                                        ))}
                                    </div>

                                    <div className="modal-actions">
                                        <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                            Launch Live Demo <ExternalLink size={16} />
                                        </a>
                                        <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                                            GitHub Repository <Github size={16} />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Projects;
