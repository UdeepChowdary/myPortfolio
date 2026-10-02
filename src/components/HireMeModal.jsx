import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Download, Sparkles } from 'lucide-react';
import './HireMeModal.css';

const HireMeModal = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="hire-modal-overlay">
                    <motion.div
                        className="hire-modal-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />
                    
                    <motion.div
                        className="hire-modal-content"
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    >
                        <button className="hire-modal-close" onClick={onClose} aria-label="Close modal">
                            <X size={20} />
                        </button>

                        <div className="hire-modal-grid">
                            {/* Left Side: Form */}
                            <div className="hire-form-section">
                                <div className="hire-availability">
                                    <Sparkles size={14} className="sparkle-icon" />
                                    AVAILABILITY • OPEN FOR WORK
                                </div>
                                
                                <h2 className="hire-title">Let's Build Together.</h2>
                                <p className="hire-subtitle">Have an ambitious vision or project in mind? Tell me about it.</p>
                                
                                <form 
                                    className="hire-form" 
                                    action="https://formspree.io/f/xzezlong" 
                                    method="POST"
                                >
                                    <div className="input-group">
                                        <label htmlFor="name">NAME <span className="required">*</span></label>
                                        <input type="text" id="name" name="name" placeholder="Alex Rivera" required />
                                    </div>
                                    
                                    <div className="input-group">
                                        <label htmlFor="email">EMAIL <span className="required">*</span></label>
                                        <input type="email" id="email" name="email" placeholder="alex@company.com" required />
                                    </div>
                                    
                                    <div className="input-group">
                                        <label htmlFor="message">WHAT ARE YOU LOOKING TO BUILD? <span className="required">*</span></label>
                                        <textarea id="message" name="message" rows="4" placeholder="Tell me about your product, timeline, vision, or role..." required></textarea>
                                    </div>
                                    
                                    <button type="submit" className="hire-submit-btn">
                                        SEND INQUIRY <Send size={16} />
                                    </button>
                                </form>

                                <p className="hire-direct-contact">
                                    Prefer direct contact? <a href="mailto:udeepchowdarynaripeddi@gmail.com">udeepchowdarynaripeddi@gmail.com</a>
                                </p>
                            </div>

                            {/* Right Side: Resume Preview */}
                            <div className="hire-resume-section">
                                <div className="resume-preview-container">
                                    {/* Using an iframe to preview the PDF directly */}
                                    <iframe 
                                        src="/UdeepChowdaryNaripeddi_resume.pdf#toolbar=0&navpanes=0&scrollbar=0" 
                                        className="resume-iframe"
                                        title="Resume Preview"
                                    />
                                    {/* Fallback overlay to ensure it clicks/scrolls nicely if needed, or just let the iframe handle it */}
                                </div>
                                <a 
                                    href="/UdeepChowdaryNaripeddi_resume.pdf" 
                                    download="Udeep_Chowdary_Resume.pdf" 
                                    className="resume-download-btn"
                                >
                                    <Download size={18} /> DOWNLOAD MY RESUME
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default HireMeModal;
