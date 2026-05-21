import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, CheckCircle } from 'lucide-react';
import './Certifications.css';

const certsData = [
    {
        id: 1,
        title: "Google AI Professional Certificate",
        issuer: "Coursera & Google",
        date: "May 2026",
        url: "https://coursera.org/verify/professional-cert/JPCE3SCS68EB",
        description: "7 courses covering AI Fundamentals, Brainstorming, Research, Writing, Content Creation, Data Analysis, and App Building. Built 20+ AI artifacts and vibe coded a custom AI app.",
        icon: "🧠"
    },
    {
        id: 2,
        title: "Google AI Essentials",
        issuer: "Coursera & Google",
        date: "May 2026",
        url: "https://coursera.org/verify/specialization/TO57ECI7XTAD",
        description: "5 courses covering Introduction to AI, Productivity with AI Tools, Prompt Engineering, Responsible AI, and Staying Ahead of AI Trends.",
        icon: "⚡"
    }
];

const Certifications = () => {
    return (
        <section id="certifications" className="certifications-section">
            <div className="container">
                <h2 className="section-title">Licenses & <span className="gradient-text">Certifications</span></h2>
                
                <div className="cert-grid">
                    {certsData.map((cert, index) => (
                        <motion.div 
                            className="cert-card glass-panel" 
                            key={cert.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{ y: -5 }}
                        >
                            <div className="cert-header">
                                <div className="cert-icon-box">
                                    <span className="cert-emoji">{cert.icon}</span>
                                </div>
                                <div className="cert-badges">
                                    <span className="cert-date">{cert.date}</span>
                                    <a href={cert.url} target="_blank" rel="noreferrer" className="cert-verify" title="Verify Credential">
                                        <CheckCircle size={16} /> Verify
                                    </a>
                                </div>
                            </div>
                            
                            <div className="cert-content">
                                <h3>{cert.title}</h3>
                                <div className="cert-issuer">
                                    <Award size={16} />
                                    <span>{cert.issuer}</span>
                                </div>
                                <p>{cert.description}</p>
                            </div>
                            
                            <a href={cert.url} target="_blank" rel="noreferrer" className="cert-link">
                                View Credential <ExternalLink size={16} />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
