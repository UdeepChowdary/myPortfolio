import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{
      padding: '2rem 0',
      textAlign: 'center',
      borderTop: 'var(--glass-border)',
      marginTop: 'auto',
      background: 'rgba(2, 2, 5, 0.7)',
      backdropFilter: 'blur(20px)'
    }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1rem' }}>
          <a href="https://github.com/UdeepChowdary" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}>
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/udeep-chowdary-naripeddi" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}>
            <Linkedin size={20} />
          </a>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          © {new Date().getFullYear()} Udeep. Built with React & Vite.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
