import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import './Projects.css';

const projectsData = [
    {
        title: 'Derm-AI',
        description: '🏆 3rd Place at AIFT Summer Challenge. An AI-powered skin disease detector using Computer Vision to analyze images and provide health insights.',
        tags: ['Python', 'TensorFlow', 'React', 'Computer Vision'],
        link: 'https://derm-ai-eight-ashen.vercel.app/',
        github: 'https://github.com/UdeepChowdary/derm_ai'
    },
    {
        title: 'Sync-Board',
        description: 'A real-time collaborative whiteboard allows multiple users to draw, plan, and brainstorm on a shared canvas instantly.',
        tags: ['React', 'Socket.io', 'Node.js', 'Canvas API'],
        link: 'https://sync-board-blush.vercel.app/',
        github: 'https://github.com/UdeepChowdary/SyncBoard'
    },
    {
        title: 'AtomicBid',
        description: 'A real-time bidding platform with atomic transaction handling to prevent race conditions in high-pressure scenarios. Features synchronized countdowns and auto-bidding.',
        tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
        link: 'https://atomic-bid.vercel.app',
        github: 'https://github.com/UdeepChowdary/AtomicBid'
    }
];

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
                        {filteredProjects.map((project, index) => (
                            <motion.div 
                                className="project-card glass-panel" 
                                key={project.title}
                                layout
                                onMouseMove={handleMouseMove}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4 }}
                            whileHover={{ y: -10, scale: 1.02, boxShadow: "0 12px 40px rgba(0,240,255,0.2)" }}
                        >
                            <div className="project-content">
                                <div className="project-header">
                                    <h3>{project.title}</h3>
                                    <div className="project-links">
                                        <a href={project.github} target="_blank" rel="noopener noreferrer"><Github size={20} /></a>
                                        <a href={project.link} target="_blank" rel="noopener noreferrer"><ExternalLink size={20} /></a>
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
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
