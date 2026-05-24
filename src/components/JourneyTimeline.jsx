import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Trophy, Award, Sparkles } from 'lucide-react';
import { journeyData } from '../data/journey';
import './JourneyTimeline.css';

const getIcon = (iconName) => {
    const props = { size: 20 };
    switch (iconName) {
        case 'GraduationCap': return <GraduationCap {...props} />;
        case 'Trophy': return <Trophy {...props} />;
        case 'Award': return <Award {...props} />;
        case 'Sparkles': return <Sparkles {...props} />;
        default: return <Sparkles {...props} />;
    }
};

const JourneyTimeline = () => {
    return (
        <section id="journey" className="journey-section">
            <div className="container">
                <h2 className="section-title">My <span className="gradient-text">Journey</span></h2>
                
                <div className="journey-timeline">
                    {/* Glowing vertical path line */}
                    <div className="timeline-glow-line"></div>
                    
                    {journeyData.map((item, index) => {
                        const isEven = index % 2 === 0;
                        return (
                            <div key={item.id} className={`journey-item ${isEven ? 'left' : 'right'}`}>
                                {/* Animated center node */}
                                <motion.div 
                                    className="timeline-node"
                                    initial={{ scale: 0, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                                >
                                    <div className="node-icon-wrapper">
                                        {getIcon(item.icon)}
                                    </div>
                                </motion.div>
                                
                                {/* Timeline Card */}
                                <motion.div 
                                    className="journey-card-wrapper"
                                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                >
                                    <div className="journey-card glass-panel">
                                        <div className="card-badge-container">
                                            <span className="card-year">{item.year}</span>
                                            <span className={`card-type-badge ${item.type}`}>
                                                {item.type}
                                            </span>
                                        </div>
                                        
                                        <div className="card-meta">
                                            <h3 className="card-title">{item.title}</h3>
                                            <h4 className="card-subtitle gradient-text">{item.subtitle}</h4>
                                            <span className="card-date-range">{item.dateRange}</span>
                                        </div>
                                        
                                        <p className="card-desc">{item.description}</p>
                                        
                                        <ul className="card-highlights">
                                            {item.highlights.map((h, i) => (
                                                <li key={i}>{h}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default JourneyTimeline;
