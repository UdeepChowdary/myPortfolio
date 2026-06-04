import React from 'react';
import { motion } from 'framer-motion';
<<<<<<< HEAD
import { Award, ExternalLink, CheckCircle, Brain, Zap } from 'lucide-react';
import { certsData } from '../data/certifications';
import './Certifications.css';

const getCertIcon = (iconName) => {
    switch (iconName) {
        case '🧠': return <Brain size={28} className="cert-icon-svg" style={{ color: 'var(--accent-primary)' }} />;
        case '⚡': return <Zap size={28} className="cert-icon-svg" style={{ color: 'var(--accent-secondary)' }} />;
        default: return <Award size={28} className="cert-icon-svg" />;
    }
};

=======
import { Award, ExternalLink, CheckCircle } from 'lucide-react';
import { certsData } from '../data/certifications';
import './Certifications.css';

>>>>>>> c322091c069aaf3d0816be0be72238ad6da503ec
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
<<<<<<< HEAD
                                    {getCertIcon(cert.icon)}
=======
                                    <span className="cert-emoji">{cert.icon}</span>
>>>>>>> c322091c069aaf3d0816be0be72238ad6da503ec
                                </div>
                                <div className="cert-badges">
                                    <span className="cert-date">{cert.date}</span>
                                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="cert-verify" title="Verify Credential">
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
                            
                            <a href={cert.url} target="_blank" rel="noopener noreferrer" className="cert-link">
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
