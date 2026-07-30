import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Brain, Zap, ShieldCheck, Award } from 'lucide-react';
import { certsData } from '../data/certifications';
import './Certifications.css';

const getCertIcon = (iconName) => {
    switch (iconName) {
        case '🧠': return <Brain size={26} style={{ color: 'var(--accent-primary)' }} />;
        case '⚡': return <Zap size={26} style={{ color: 'var(--accent-secondary)' }} />;
        default: return <Award size={26} style={{ color: 'var(--accent-secondary)' }} />;
    }
};

const Certifications = () => {
    return (
        <section id="certifications" className="certifications-section">
            <div className="container">
                <div className="cert-section-header">
                    <div className="cert-badge">
                        <ShieldCheck size={13} /> CREDENTIALS & CERTIFICATIONS
                    </div>
                    <h2 className="section-title">
                        Verified <span className="gradient-text">Certifications</span>
                    </h2>
                </div>
                
                <div className="cert-grid">
                    {certsData.map((cert, index) => (
                        <motion.div 
                            className="cert-card glass-panel" 
                            key={cert.id}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            whileHover={{ y: -6, scale: 1.02 }}
                        >
                            <div className="cert-sheen-effect"></div>

                            <div className="cert-header">
                                <div className="cert-icon-box">
                                    {getCertIcon(cert.icon)}
                                </div>
                                <div className="cert-badges">
                                    <span className="cert-date">{cert.date}</span>
                                    <span className="cert-verified-pill">
                                        <ShieldCheck size={12} /> Verified
                                    </span>
                                </div>
                            </div>
                            
                            <div className="cert-content">
                                <h3>{cert.title}</h3>
                                <div className="cert-issuer">
                                    <Award size={15} />
                                    <span>{cert.issuer}</span>
                                </div>
                                <p>{cert.description}</p>
                            </div>
                            
                            <a href={cert.url} target="_blank" rel="noopener noreferrer" className="cert-link btn btn-outline">
                                View Credential <ExternalLink size={15} />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
