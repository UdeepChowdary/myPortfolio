import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, Calendar } from 'lucide-react';
import './Education.css';

const Education = () => {
    return (
        <section id="education" className="education-section">
            <div className="container">
                <h2 className="section-title">My <span className="gradient-text">Education</span></h2>
                
                <div className="education-timeline">
                    {/* Timeline Line */}
                    <div className="timeline-line"></div>
                    
                    {/* Single Education Item */}
                    <motion.div 
                        className="timeline-item"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="timeline-dot">
                            <GraduationCap size={20} />
                        </div>
                        <div className="timeline-content glass-panel">
                            <div className="timeline-header">
                                <h3>SRM University AP</h3>
                                <span className="timeline-date"><Calendar size={14} /> Aug 2024 – May 2028</span>
                            </div>
                            <h4 className="gradient-text">B.Tech in CSE (AI & Future Technologies)</h4>
                            
                            <div className="timeline-details">
                                <p className="gpa"><Award size={16} /> <strong>CGPA:</strong> 9.16 / 10</p>
                                <p className="coursework">
                                    <strong>Relevant Coursework:</strong> Data Structures & Algorithms, DBMS, OOP, Operating Systems, Computer Networks
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Education;
