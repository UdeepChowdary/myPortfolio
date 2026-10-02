import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Brain, Zap, ShieldCheck, Award, CheckCircle2 } from 'lucide-react';
import { certsData } from '../data/certifications';
import './Certifications.css';

const getCertIcon = (iconName) => {
    switch (iconName) {
        case 'Brain':
        case '🧠':
            return <Brain size={24} style={{ color: 'var(--accent-cyan)' }} />;
        case 'Zap':
        case '⚡':
            return <Zap size={24} style={{ color: 'var(--accent-violet)' }} />;
        default:
            return <Award size={24} style={{ color: 'var(--accent-cyan)' }} />;
    }
};

const Certifications = () => {
    return (
        <section id="certifications" className="certifications-section">
            <div className="container">
                <div className="cert-section-header">
                    <h2 className="section-title">
                        Verified Credentials & Certifications
                    </h2>
                    <p className="cert-section-desc">
                        Official Google & Coursera verified credentials in generative AI, applied machine learning, and prompt architecture.
                    </p>
                </div>
                
                <div className="cert-grid">
                    {certsData.map((cert, index) => (
                        <motion.div 
                            className="cert-card glass-panel" 
                            key={cert.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: index * 0.12 }}
                            whileHover={{ y: -4 }}
                        >
                            <div className="cert-header">
                                <div className="cert-icon-box">
                                    {getCertIcon(cert.iconName || cert.icon)}
                                </div>
                                <div className="cert-badges">
                                    <span className="cert-date">{cert.date}</span>
                                    <span className="cert-verified-pill">
                                        <ShieldCheck size={12} /> Verified
                                    </span>
                                </div>
                            </div>
                            
                            <div className="cert-content">
                                <h3 className="cert-title">{cert.title}</h3>
                                <div className="cert-issuer">
                                    <Award size={14} />
                                    <span>{cert.issuer}</span>
                                    {cert.credentialId && (
                                        <span className="cert-id-badge">ID: {cert.credentialId}</span>
                                    )}
                                </div>
                                <p className="cert-desc">{cert.description}</p>

                                {cert.skillsCovered && (
                                    <div className="cert-skills-list">
                                        {cert.skillsCovered.map((skill, sIdx) => (
                                            <span key={sIdx} className="cert-skill-pill">
                                                <CheckCircle2 size={11} className="cert-check" /> {skill}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            <a 
                                href={cert.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="cert-link btn btn-outline"
                                aria-label={`View verified credential for ${cert.title}`}
                            >
                                Verify Credential <ExternalLink size={14} />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
