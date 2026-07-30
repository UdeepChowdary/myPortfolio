import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Trophy, Award, Sparkles, Calendar, Star, Code2 } from 'lucide-react';
import { journeyData } from '../data/journey';
import './JourneyTimeline.css';

const getIcon = (iconName) => {
    const props = { size: 19 };
    switch (iconName) {
        case 'GraduationCap': return <GraduationCap {...props} />;
        case 'Trophy': return <Trophy {...props} />;
        case 'Award': return <Award {...props} />;
        case 'Sparkles': return <Sparkles {...props} />;
        default: return <Sparkles {...props} />;
    }
};

const FILTER_TABS = [
    { id: 'all', label: 'All Path' },
    { id: 'education', label: 'Education' },
    { id: 'award', label: 'Hackathons & Awards' },
    { id: 'opensource', label: 'Open Source' }
];

const getTypeLabel = (type) => {
    switch (type) {
        case 'education': return 'Education';
        case 'award': return 'National Hackathon';
        case 'competition': return 'Class Competition';
        case 'opensource': return 'Open Source';
        default: return type;
    }
};

const JourneyTimeline = () => {
    const [activeTab, setActiveTab] = useState('all');

    const filteredData = journeyData.filter(item => {
        if (activeTab === 'all') return true;
        if (activeTab === 'award') return item.type === 'award' || item.type === 'competition';
        return item.type === activeTab;
    });

    return (
        <section id="journey" className="journey-section">
            <div className="container">
                <div className="journey-section-header">
                    <div className="journey-badge">
                        <Sparkles size={13} /> CAREER & ACADEMIC PATH
                    </div>
                    <h2 className="section-title">
                        My <span className="gradient-text">Journey</span>
                    </h2>
                </div>

                {/* Filter Pills */}
                <div className="journey-filter-pills">
                    {FILTER_TABS.map(tab => (
                        <button 
                            key={tab.id}
                            className={`filter-pill ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="journey-timeline">
                    {/* Glowing vertical path line */}
                    <div className="timeline-glow-line"></div>
                    
                    <AnimatePresence mode="popLayout">
                        {filteredData.map((item, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div 
                                    key={item.id} 
                                    className={`journey-item ${isEven ? 'left' : 'right'}`}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4 }}
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
                                                    <Calendar size={13} /> {item.year}
                                                </span>
                                                <span className={`card-type-badge ${item.type}`}>
                                                    {getTypeLabel(item.type)}
                                                </span>
                                            </div>
                                            
                                            <div className="card-meta">
                                                <h3 className="card-title">{item.title}</h3>
                                                <h4 className="card-subtitle gradient-text">{item.subtitle}</h4>
                                                <span className="card-date-range">{item.dateRange}</span>
                                            </div>
                                            
                                            <p className="card-desc">{item.description}</p>
                                            
                                            {item.skills && (
                                                <div className="journey-tags">
                                                    {item.skills.map((skill, i) => (
                                                        <span key={i} className="journey-tag">{skill}</span>
                                                    ))}
                                                </div>
                                            )}
                                            
                                            <ul className="card-highlights">
                                                {item.highlights.map((h, i) => (
                                                    <li key={i}>
                                                        <Star size={13} className="highlight-star" /> {h}
                                                    </li>
                                                ))}
                                            </ul>
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
