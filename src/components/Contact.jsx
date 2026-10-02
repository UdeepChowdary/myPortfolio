import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <section id="contact" className="contact-section">
            <div className="container contact-container">
                <div className="contact-main">
                    <h2 className="contact-heading">
                        <span className="contact-heading-line">LET'S</span>
                        <span className="contact-heading-line text-red">BUILD</span>
                        <span className="contact-heading-line">SOMETHING</span>
                        <span className="contact-heading-line">USEFUL.</span>
                    </h2>
                </div>
                
                <div className="contact-links">
                    <div className="contact-rule"></div>
                    <div className="contact-links-grid">
                        <a href="mailto:udeepchowdary06@gmail.com" className="contact-link">
                            <span className="link-label">EMAIL</span>
                            <span className="link-value">udeepchowdary06@gmail.com</span>
                        </a>
                        <a href="https://github.com/UdeepChowdary" target="_blank" rel="noopener noreferrer" className="contact-link">
                            <span className="link-label">GITHUB</span>
                            <span className="link-value">@UdeepChowdary</span>
                        </a>
                        <a href="https://www.linkedin.com/in/udeep-chowdary-naripeddi-99908627b" target="_blank" rel="noopener noreferrer" className="contact-link">
                            <span className="link-label">LINKEDIN</span>
                            <span className="link-value">Udeep Chowdary Naripeddi</span>
                        </a>
                        <a href="/UdeepChowdaryNaripeddi_resume.pdf" download="UdeepChowdaryNaripeddi_Resume.pdf" className="contact-link">
                            <span className="link-label">RESUME</span>
                            <span className="link-value">Download PDF</span>
                        </a>
                    </div>
                    <div className="contact-rule"></div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
