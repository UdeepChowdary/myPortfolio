import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import './Projects.css';

const projectsData = [
    {
        title: 'Derm-AI',
        description: 'An AI-powered skin disease detector using Computer Vision. Analyses skin images to provide preliminary diagnosis and health insights.',
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
        title: 'Java OOP System',
        description: 'A robust management system demonstrating complex Object-Oriented patterns, inheritance, and modular design in Java.',
        tags: ['Java', 'OOP', 'SQL', 'System Design'],
        link: '#',
        github: 'https://github.com/UdeepChowdary'
    }
];

const Projects = () => {
    return (
        <section id="projects" className="projects-section">
            <div className="container">
                <h2 className="section-title">Featured <span className="gradient-text">Work</span></h2>

                <div className="projects-grid">
                    {projectsData.map((project, index) => (
                        <div className="project-card glass-panel" key={index}>
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
