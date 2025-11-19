import React from 'react';

const Header = () => {
  return (
    <header className="hero">
      <div className="hero-top-row">
        <div className="hero-logo">Udeep Chowdary Naripeddi</div>
        <nav className="hero-nav" aria-label="Primary">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
      <div className="hero-main">
        <div className="hero-heading-group">
          <div className="hero-pill">CS student</div>
          <h1>Udeep</h1>
          <p className="subtitle">Computer Science Student exploring AI, LLMs & Data Science</p>
        </div>
        <div className="hero-intro">
          <p>
            I’m a Computer Science Engineering student at SRM University (Kalvium program), focusing on AI, Large
            Language Models (LLMs), and Data Science. I enjoy building projects that combine clean, thoughtful
            interfaces with powerful AI-driven backends — from intelligent assistants to tools that help people make
            better decisions.
          </p>
        </div>
        <div className="hero-actions">
          <a className="hero-btn primary" href="#projects">
            View Projects
          </a>
          <a className="hero-btn" href="mailto:udeepchowdary06@gmail.com">
            Say Hello
          </a>
          <a
            className="hero-btn subtle"
            href="https://app.kalvium.community/showcase/udeepchowdary5194"
            target="_blank"
            rel="noreferrer"
          >
            Kalvium Showcase
          </a>
          <button className="hero-btn ghost" type="button" disabled>
            CV (coming soon)
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
