import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          © {currentYear} Udeep. Built with React + Vite.
        </p>
        <div className="social-links">
          <a href="https://github.com/UdeepChowdary" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/udeep-chowdary-naripeddi"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://app.kalvium.community/showcase/udeepchowdary5194"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kalvium Showcase
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
