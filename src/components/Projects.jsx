import React, { useState } from 'react';
<<<<<<< HEAD
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
=======
import { motion, AnimatePresence } from 'framer-motion';
>>>>>>> c322091c069aaf3d0816be0be72238ad6da503ec
import { ExternalLink, Github } from 'lucide-react';
import { projectsData } from '../data/projects';
import './Projects.css';

<<<<<<< HEAD
const ProjectCard = ({ project, handleMouseMove }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Map mouse position to degree rotations
    const rotateX = useTransform(y, [-150, 150], [15, -15]);
    const rotateY = useTransform(x, [-150, 150], [-15, 15]);

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

        // Update the background glow cursor variables
        handleMouseMove(e);
    };

    const onMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div 
            className="project-card glass-panel" 
            layout
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            style={{
                rotateX: rotateXSpring,
                rotateY: rotateYSpring,
                transformStyle: "preserve-3d"
            }}
            whileHover={{ 
                z: 15,
                boxShadow: "0 20px 50px rgba(99, 102, 241, 0.25)" 
            }}
        >
            <div className="project-content" style={{ transform: "translateZ(30px)" }}>
                <div className="project-header">
                    <h3>{project.title}</h3>
                    <div className="project-links">
                        <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source code on GitHub`}><Github size={20} /></a>
                        <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title} live demo website`}><ExternalLink size={20} /></a>
                    </div>
                </div>
                <p>{project.description}</p>
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

=======
>>>>>>> c322091c069aaf3d0816be0be72238ad6da503ec
const Projects = () => {
    const [filter, setFilter] = useState('All');

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    };

    const filters = ['All', 'React', 'Python', 'Node.js'];
    const filteredProjects = filter === 'All' ? projectsData : projectsData.filter(p => p.tags.includes(filter));

    return (
        <section id="projects" className="projects-section">
            <div className="container">
                <h2 className="section-title">Featured <span className="gradient-text">Work</span></h2>

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
<<<<<<< HEAD
                            <ProjectCard 
                                key={project.title}
                                project={project}
                                handleMouseMove={handleMouseMove}
                            />
=======
                            <motion.div 
                                className="project-card glass-panel" 
                                key={project.title}
                                layout
                                onMouseMove={handleMouseMove}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4 }}
                            whileHover={{ y: -10, scale: 1.02, boxShadow: "0 16px 48px rgba(99, 102, 241, 0.25)" }}
                        >
                            <div className="project-content">
                                <div className="project-header">
                                    <h3>{project.title}</h3>
                                    <div className="project-links">
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`View ${project.title} source code on GitHub`}><Github size={20} /></a>
                                        <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title} live demo website`}><ExternalLink size={20} /></a>
                                    </div>
                                </div>
                                <p>{project.description}</p>
                                <div className="tags">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="card-glow"></div>
                        </motion.div>
>>>>>>> c322091c069aaf3d0816be0be72238ad6da503ec
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
