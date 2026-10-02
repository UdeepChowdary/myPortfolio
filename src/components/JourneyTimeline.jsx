import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, Trophy, Award, Sparkles, Calendar, CheckCircle2 } from 'lucide-react';
import { journeyData } from '../data/journey';
import './JourneyTimeline.css';

const getIcon = (iconName) => {
    const props = { size: 18 };
    switch (iconName) {
        case 'GraduationCap': return <GraduationCap {...props} />;
        case 'Trophy': return <Trophy {...props} />;
        case 'Award': return <Award {...props} />;
        case 'Sparkles': return <Sparkles {...props} />;
        default: return <Sparkles {...props} />;
    }
};

const FILTER_TABS = [
    { id: 'all', label: 'All Milestones' },
    { id: 'education', label: 'Education' },
    { id: 'award', label: 'Competitions & Hackathons' },
    { id: 'opensource', label: 'Open Source' }
];

const getTypeLabel = (type) => {
    switch (type) {
        case 'education': return 'Academic Rigor';
        case 'award': return 'National Hackathon';
        case 'competition': return 'Competition Winner';
        case 'opensource': return 'Open Source Contributor';
        default: return type;
    }
};

const JourneyTimeline = () => {
    const [activeTab, setActiveTab] = useState('all');
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    const filteredData = journeyData.filter(item => {
        if (activeTab === 'all') return true;
        if (activeTab === 'award') return item.type === 'award' || item.type === 'competition';
        return item.type === activeTab;
    });

    return (
        <section id="journey" className="journey-section">
            <div className="container">
                <div className="journey-section-header">
                    <h2 className="section-title">
                        My Journey & Milestones
                    </h2>
                    <p className="journey-section-desc">
                        A track record of theoretical mastery, competitive wins, and open-source contributions.
                    </p>
                </div>

                {/* Filter Pills */}
                <div className="journey-filter-pills" role="tablist" aria-label="Journey category filters">
                    {FILTER_TABS.map(tab => (
                        <button 
                            key={tab.id}
                            role="tab"
                            aria-selected={activeTab === tab.id}
                            className={`filter-pill ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="journey-timeline" ref={containerRef}>
                    {/* Base dim line */}
                    <div className="timeline-line-bg"></div>
                    
                    {/* Glowing vertical path line */}
                    <motion.div 
                        className="timeline-glow-line"
                        style={{ scaleY, transformOrigin: 'top' }}
                    ></motion.div>
                    
                    <AnimatePresence mode="popLayout">
                        {filteredData.map((item, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div 
                                    key={item.id} 
                                    className={`journey-item ${isEven ? 'left' : 'right'}`}
                                    layout
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.35 }}
                                >
                                    {/* Center node */}
                                    <div className="timeline-node">
                                        <div className="node-icon-wrapper">
                                            {getIcon(item.icon)}
                                        </div>
                                    </div>
                                    
                                    {/* Timeline Card */}
                                    <div className="journey-card-wrapper">
                                        <div className="journey-card glass-panel">
                                            <div className="card-badge-container">
                                                <span className="card-year">
                                                    <Calendar size={12} /> {item.year}
                                                </span>
                                                <span className={`card-type-badge ${item.type}`}>
                                                    {getTypeLabel(item.type)}
                                                </span>
                                            </div>
                                            
                                            <div className="card-meta">
                                                <h3 className="card-title">{item.title}</h3>
                                                <h4 className="card-subtitle">{item.subtitle}</h4>
                                                <span className="card-date-range">{item.dateRange}</span>
                                            </div>
                                            
                                            <p className="card-description">{item.description}</p>
                                            
                                            {item.highlights && item.highlights.length > 0 && (
                                                <div className="card-highlights">
                                                    {item.highlights.map((highlight, idx) => (
                                                        <div key={idx} className="highlight-row">
                                                            <CheckCircle2 size={13} className="highlight-bullet-icon" />
                                                            <span>{highlight}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {item.skills && (
                                                <div className="card-tags">
                                                    {item.skills.map((skill, idx) => (
                                                        <span key={idx} className="journey-tag">{skill}</span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default JourneyTimeline;
