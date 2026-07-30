import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Terminal, Clock, MapPin } from 'lucide-react';
import './Footer.css';

const Footer = ({ onTerminalClick }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setTime(new Date().toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="footer-section">
      <div className="container footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <span className="footer-logo">Udeep<span className="dot">.</span></span>
            <span className="footer-location">
              <MapPin size={14} className="pin-icon" /> India <span className="status-dot"></span>
            </span>
          </div>

          <div className="footer-clock glass-panel">
            <Clock size={14} className="clock-icon" />
            <span>{time || '10:10 AM'} IST</span>
          </div>

          <div className="footer-socials">
            <a href="https://github.com/UdeepChowdary" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" title="GitHub Profile">
              <Github size={19} />
            </a>
            <a href="https://www.linkedin.com/in/udeep-chowdary-naripeddi-99908627b" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" title="LinkedIn Profile">
              <Linkedin size={19} />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Udeep Chowdary. Built with React 19 & Vite.
          </p>
          <button 
            onClick={onTerminalClick} 
            className="footer-term-btn glass-panel"
            title="Open Developer Terminal"
            aria-label="Open retro developer terminal"
          >
            <Terminal size={14} /> <span>Open CLI</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
