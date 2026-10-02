import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useTransform, useSpring, useScroll } from 'framer-motion';
import { 
    ExternalLink, Github, Trophy, X, ArrowRight,
    CheckCircle2, Eye, Zap, Activity,
    Sun, Moon
} from 'lucide-react';
import { projectsData } from '../data/projects';
import './Projects.css';

/* ─── Constants ──────────────────────────────────────────────── */
const SECTION_VH = 100; // each card "owns" 100vh of scroll space
const NAVBAR_H   = 80;  // px — top of viewport clear of navbar
const CARD_PEEK  = 18;  // px — how much each card peeks above the next

/* ─── Thumbnail ─────────────────────────────────────────────── */
const ProjectThumbnail = ({ project, className = '', forcedTheme = null }) => {
    if (project.imageLight && project.imageDark) {
        if (forcedTheme === 'light') return (
            <div className={`project-thumb-wrapper ${className}`}>
                <img src={project.imageLight} alt={`${project.title} — Light`} loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
        );
        if (forcedTheme === 'dark') return (
            <div className={`project-thumb-wrapper ${className}`}>
                <img src={project.imageDark} alt={`${project.title} — Dark`} loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
        );
        return (
            <div className={`project-thumb-wrapper ${className}`}>
                <img src={project.imageDark} alt={`${project.title} — Dark`}
                    className="project-thumb-dark" loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <img src={project.imageLight} alt={`${project.title} — Light`}
                    className="project-thumb-light" loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }} />
            </div>
        );
    }
    if (project.image) return (
        <div className={`project-thumb-wrapper ${className}`}>
            <img src={project.image} alt={project.title} loading="lazy"
                onError={(e) => { e.currentTarget.style.display = 'none'; }} />
        </div>
    );
    return (
        <div className={`project-thumb-placeholder ${className}`}>
            <span>{project.title.charAt(0)}</span>
        </div>
    );
};

/* ─── Tag accent map ─────────────────────────────────────────── */
const TAG_ACCENT = {
    'Python': 'cyan', 'Machine Learning': 'violet',
    'React': 'cyan', 'React.js': 'cyan', 'Next.js': 'cyan',
    'TensorFlow.js': 'amber', 'Streamlit': 'amber', 'DevOps': 'amber',
    'Gemini': 'violet', 'Gemini API': 'violet', 'Algorithms': 'violet',
    'Computer Vision': 'emerald', 'AIOps': 'emerald',
};

/* ─── Card content ───────────────────────────────────────────── */
const StackedProjectCard = ({ project, index, total, containerRef, onSelectProject }) => {
    const [cardThemePreview, setCardThemePreview] = useState(null);

    // Track the full container scroll progress (0 → 1)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    // Card i shrinks as card i+1 slides over it.
    // Card i occupies segment [i/N, (i+1)/N] of the scroll range.
    const segStart = index / total;
    const segEnd   = (index + 1) / total;

    const rawScale   = useTransform(scrollYProgress, [segStart, segEnd], [1,    0.88]);
    const rawOpacity = useTransform(scrollYProgress, [segStart, segEnd], [1,    0.5 ]);
    const rawY       = useTransform(scrollYProgress, [segStart, segEnd], ['0px', '-16px']);

    const scale   = useSpring(rawScale,   { stiffness: 120, damping: 30 });
    const opacity = useSpring(rawOpacity, { stiffness: 120, damping: 30 });
    const y       = useSpring(rawY,       { stiffness: 120, damping: 30 });

    /* Project-specific micro-features */
    const renderMicro = () => {
        switch (project.id) {
            case 'campushub': return (
                <div className="stack-micro-toolbar" onClick={(e) => e.stopPropagation()}>
                    <span className="micro-toolbar-label">Theme Preview:</span>
                    <button type="button"
                        className={`micro-theme-btn ${cardThemePreview === 'light' ? 'active' : ''}`}
                        onClick={() => setCardThemePreview(cardThemePreview === 'light' ? null : 'light')}
                        aria-label="Preview Light Theme">
                        <Sun size={12} /> Light
                    </button>
                    <button type="button"
                        className={`micro-theme-btn ${cardThemePreview === 'dark' ? 'active' : ''}`}
                        onClick={() => setCardThemePreview(cardThemePreview === 'dark' ? null : 'dark')}
                        aria-label="Preview Dark Theme">
                        <Moon size={12} /> Dark
                    </button>
                </div>
            );
            case 'emotion-detection': return (
                <div className="stack-micro-chips">
                    <span className="sentiment-chip positive">Focus: 68%</span>
                    <span className="sentiment-chip neutral">Confusion: 18%</span>
                    <span className="sentiment-chip alert">Frustration: 9%</span>
                </div>
            );
            case 'algoviz': return (
                <div className="stack-micro-chips">
                    <span className="algo-chip">Dijkstra</span>
                    <span className="algo-chip">A* Search</span>
                    <span className="algo-chip">QuickSort</span>
                </div>
            );
            case 'derm-ai': return (
                <div className="stack-micro-chips">
                    <span className="accuracy-chip"><CheckCircle2 size={11} /> Multi-Class Screening</span>
                </div>
            );
            case 'opspilot': return (
                <div className="stack-micro-chips">
                    <span className="algo-chip"><Activity size={11} /> Real-Time Telemetry</span>
                    <span className="algo-chip"><Zap size={11} /> Predictive ML</span>
                    <span className="algo-chip"><CheckCircle2 size={11} /> Auto Remediation</span>
                </div>
            );
            default: return null;
        }
    };

    return (
        <motion.div
            className="stack-card glass-panel"
            /* Last card never dims — it's always the top card */
            style={index === total - 1 ? {} : { scale, opacity, y }}
        >
            {/* Counter badge */}
            <div className="stack-card-counter">
                <span className="stack-index-num">{String(index + 1).padStart(2, '0')}</span>
                <span className="stack-total-num">/ {String(total).padStart(2, '0')}</span>
            </div>

            <div className="stack-card-inner">
                {/* Left: visual */}
                <div
                    className="stack-visual-col"
                    onClick={() => onSelectProject(project)}
                    role="button" tabIndex={0}
                    aria-label={`Inspect ${project.title} blueprint`}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            onSelectProject(project);
                        }
                    }}
                >
                    {project.award && (
                        <div className="stack-award-badge">
                            <Trophy size={13} /> {project.award}
                        </div>
                    )}
                    <ProjectThumbnail project={project} className="stack-thumb" forcedTheme={cardThemePreview} />
                    <div className="stack-visual-hover">
                        <Eye size={15} /> Technical Blueprint
                    </div>
                </div>

                {/* Right: content */}
                <div className="stack-content-col">
                    <div className="stack-header">
                        {project.tagline && <span className="stack-tagline">{project.tagline}</span>}
                        <h3 className="stack-title">{project.title}</h3>
                    </div>

                    {project.metrics && (
                        <div className="stack-metrics-strip">
                            <Zap size={13} className="stack-metrics-icon" />
                            <span>{project.metrics}</span>
                        </div>
                    )}

                    {renderMicro()}

                    <p className="stack-description">{project.description}</p>

                    {project.architecture && (
                        <ul className="stack-arch-list">
                            {project.architecture.slice(0, 2).map((point, i) => (
                                <li key={i}>
                                    <CheckCircle2 size={13} className="stack-arch-icon" />
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="stack-tags-strip">
                        {project.tags.map((tag, i) => (
                            <span key={i} className={`stack-tag-pill${TAG_ACCENT[tag] ? ` tag-${TAG_ACCENT[tag]}` : ''}`}>
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="stack-actions-row">
                        <button type="button" className="btn btn-primary stack-blueprint-btn"
                            onClick={() => onSelectProject(project)}>
                            Blueprint &amp; Specs <ArrowRight size={15} />
                        </button>
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer"
                                className="btn btn-outline" aria-label={`GitHub: ${project.title}`}>
                                <Github size={15} />
                            </a>
                        )}
                        {project.link && (
                            <a href={project.link} target="_blank" rel="noopener noreferrer"
                                className="btn btn-outline" aria-label={`Live: ${project.title}`}>
                                <ExternalLink size={15} />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

/* ─── Projects section ───────────────────────────────────────── */
const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);
    const containerRef = useRef(null);
    const N = projectsData.length;

    useEffect(() => {
        const handleKeyDown = (e) => { if (e.key === 'Escape') setSelectedProject(null); };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <section id="projects" className="projects-section">
            {/* Header */}
            <div className="container">
                <div className="projects-section-header">
                    <h2 className="section-title">Featured Systems &amp; Engineering</h2>
                    <p className="projects-section-desc">
                        Production-grade autonomous AI engines, multimodal neural pipelines,
                        and high-performance interactive architectures.
                    </p>
                </div>
                <div className="stack-scroll-hint">
                    <span>Scroll to explore projects</span>
                    <motion.span
                        className="stack-scroll-arrow"
                        animate={{ y: [0, 6, 0] }}
                        transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
                    >↓</motion.span>
                </div>
            </div>

            {/*
             * ── STACKED SCROLL MECHANISM ──────────────────────────────────
             *
             * The container is (N * 100vh) tall — each card "owns" 100vh of
             * scroll travel. Inside, each card gets its own absolutely-positioned
             * wrapper that starts at (index * 100vh) and extends ALL THE WAY to
             * the end of the container. Inside that tall wrapper, the card is
             * `position: sticky`, so it pins to the top of the viewport and
             * STAYS THERE while later cards slide up and stack on top.
             *
             * z-index grows with index so card 2 is visually above card 1, etc.
             */}
            <div
                ref={containerRef}
                className="stack-scroll-container"
                style={{ height: `${N * SECTION_VH}vh` }}
            >
                {projectsData.map((project, index) => (
                    <div
                        key={project.id}
                        className="stack-track-wrapper"
                        style={{
                            // Starts where this card "enters" the scroll sequence
                            top: `${index * SECTION_VH}vh`,
                            // Extends to the very bottom — keeps sticky alive until end
                            height: `${(N - index) * SECTION_VH}vh`,
                            // Later cards visually on top of earlier ones
                            zIndex: index + 1,
                        }}
                    >
                        {/* Sticky pin — sits at progressive top offsets creating the peek */}
                        <div
                            className="stack-sticky-pin"
                            style={{ top: NAVBAR_H + index * CARD_PEEK }}
                        >
                            <StackedProjectCard
                                project={project}
                                index={index}
                                total={N}
                                containerRef={containerRef}
                                onSelectProject={setSelectedProject}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Blueprint Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="project-modal-backdrop"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                        role="dialog" aria-modal="true"
                        aria-label={`${selectedProject.title} Technical Dossier`}
                    >
                        <motion.div
                            className="project-modal-card glass-panel"
                            initial={{ opacity: 0, scale: 0.94, y: 16 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.94, y: 16 }}
                            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="modal-close-btn" onClick={() => setSelectedProject(null)}
                                aria-label="Close project modal">
                                <X size={18} />
                            </button>

                            <div className="modal-split-layout">
                                <div className="modal-visual-column">
                                    <ProjectThumbnail project={selectedProject} className="modal-large-thumb" />
                                    {selectedProject.award && (
                                        <div className="modal-award-pill">
                                            <Trophy size={14} /> {selectedProject.award}
                                        </div>
                                    )}
                                </div>

                                <div className="modal-dossier-column">
                                    <div className="modal-heading-block">
                                        <span className="modal-tagline-kicker">{selectedProject.tagline}</span>
                                        <h3 className="modal-system-title">{selectedProject.title}</h3>
                                    </div>

                                    {selectedProject.metrics && (
                                        <div className="modal-telemetry-banner">
                                            <Zap size={14} className="telemetry-banner-icon" />
                                            <span>{selectedProject.metrics}</span>
                                        </div>
                                    )}

                                    <p className="modal-system-description">{selectedProject.description}</p>

                                    {selectedProject.architecture && (
                                        <div className="modal-architecture-block">
                                            <h4 className="architecture-heading">System Architecture &amp; Innovations:</h4>
                                            <ul className="architecture-list">
                                                {selectedProject.architecture.map((point, idx) => (
                                                    <li key={idx}>
                                                        <CheckCircle2 size={15} className="architecture-check-icon" />
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    <div className="modal-tags-grid">
                                        {selectedProject.tags.map((tag, idx) => (
                                            <span key={idx} className="modal-tech-pill">{tag}</span>
                                        ))}
                                    </div>

                                    <div className="modal-cta-row">
                                        {selectedProject.link && (
                                            <a href={selectedProject.link} target="_blank" rel="noopener noreferrer"
                                                className="btn btn-primary">
                                                Launch Live Demo <ExternalLink size={16} />
                                            </a>
                                        )}
                                        {selectedProject.github && (
                                            <a href={selectedProject.github} target="_blank" rel="noopener noreferrer"
                                                className="btn btn-outline">
                                                GitHub Repository <Github size={16} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
