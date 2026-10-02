import React from 'react';
import { journeyData } from '../data/journey';
import './JourneyTimeline.css';

const JourneyTimeline = () => {
    // Reverse the data to show newest first, as that is standard for editorial timelines
    const sortedData = [...journeyData].reverse();

    return (
        <section id="journey" className="journey-section">
            <div className="container">
                <div className="section-header">
                    <span className="section-number">06</span>
                    <h2 className="section-title">JOURNEY</h2>
                    <div className="section-header-rule"></div>
                </div>

                <div className="timeline-container">
                    <div className="timeline-line"></div>
                    
                    <div className="timeline-events">
                        {sortedData.map((item, index) => (
                            <div key={item.id} className="timeline-event">
                                <div className="timeline-node"></div>
                                <div className="timeline-content">
                                    <div className="timeline-date">{item.dateRange}</div>
                                    <h3 className="timeline-title">{item.title}</h3>
                                    <div className="timeline-subtitle">{item.subtitle}</div>
                                    <p className="timeline-description">{item.description}</p>
                                    
                                    {item.highlights && item.highlights.length > 0 && (
                                        <div className="timeline-highlights">
                                            {item.highlights.map((highlight, idx) => (
                                                <div key={idx} className="timeline-highlight">
                                                    <span className="highlight-bullet">+</span>
                                                    <span>{highlight}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default JourneyTimeline;
