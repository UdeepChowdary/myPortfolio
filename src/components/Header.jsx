import React from 'react';

const Header = () => {
  return (
    <header className="hero">
      <div className="hero-top-row">
        <div className="hero-logo">Udeep</div>
        <nav className="hero-nav" aria-label="Primary">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
      <div className="hero-main">
        <div className="hero-heading-group">
          <div className="hero-pill">Full Stack Developer</div>
          <h1>Udeep</h1>
          <p className="subtitle">Full Stack Developer & Creative Enthusiast</p>
        </div>
        <div className="hero-intro">
          <p>
            I’m a Full Stack Developer who loves turning ideas into delightful, usable web experiences. I focus on
            component-driven React apps, clean responsive layouts, and accessible UI. I enjoy learning new tools,
            shipping projects, and solving problems — whether it’s building a responsive website or crafting a small,
            performant web app.
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
