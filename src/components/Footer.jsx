import React from 'react';
import { Github, Linkedin, Terminal } from 'lucide-react';
import './Footer.css';

const Footer = ({ onTerminalClick }) => {
  return (
    <footer>
      <div className="container">
        <div className="footer-socials">
          <a href="https://github.com/UdeepChowdary" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/udeep-chowdary-naripeddi" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
            <Linkedin size={20} />
          </a>
        </div>
        <p className="footer-copyright">
          © {new Date().getFullYear()} Udeep. Built with React & Vite. 
          <button 
            onClick={onTerminalClick} 
            className="footer-term-btn"
            title="Open Developer Terminal"
            aria-label="Open retro developer terminal"
          >
            <Terminal size={14} />
          </button>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
