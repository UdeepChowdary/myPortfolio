import React from 'react';
import { Github, Linkedin, Mail, Terminal } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import './Footer.css';

const Footer = ({ onTerminalClick }) => {
    return (
        <footer className="footer-section">
            <div className="container">
                <div className="footer-content">
                    
                    <div className="footer-left">
                        <span className="footer-brand">UDEEP.</span>
                        <span className="footer-meta">© {new Date().getFullYear()} Udeep Chowdary Naripeddi.</span>
                        <span className="footer-meta">Engineered with React.</span>
                    </div>
                    
                    <div className="footer-right">
                        <div className="footer-socials">
                            <a href="https://github.com/UdeepChowdary" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <Github size={16} />
                            </a>
                            <a href="https://www.linkedin.com/in/udeep-chowdary-naripeddi-99908627b" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <Linkedin size={16} />
                            </a>
                            <a href="mailto:udeepchowdary06@gmail.com" aria-label="Email">
                                <Mail size={16} />
                            </a>
                        </div>
                        
                        <div className="footer-controls">
                            <ThemeToggle />
                            {onTerminalClick && (
                                <button className="footer-cmd-btn" onClick={onTerminalClick} aria-label="Open Command Palette">
                                    <Terminal size={14} /> <span>CMD + K</span>
                                </button>
                            )}
                        </div>
                    </div>
                    
                </div>
            </div>
        </footer>
    );
};

export default Footer;
