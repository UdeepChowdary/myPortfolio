import React from 'react';

const FeaturedProject = () => {
  return (
    <section id="featured" className="featured-section reveal reveal-visible">
      <h2 className="section-heading">
        <span className="section-icon section-icon-warm" aria-hidden="true" />
        Featured Project
      </h2>
      <article className="card featured-card">
        <div className="card-content">
          <div className="hero-pill">Featured</div>
          <h3 className="card-title">Derm AI</h3>
          <p className="card-description">
            Derm AI is an AI-powered skin condition detector. It combines a clean, focused UI with a machine
            learning-powered backend to help analyze skin images and suggest possible conditions in real time.
          </p>
          <div className="card-tags">
            <span className="tag">Next.js</span>
            <span className="tag">TensorFlow.js</span>
            <span className="tag">Tailwind CSS</span>
            <span className="tag">Radix UI</span>
            <span className="tag">Lucide Icons</span>
          </div>
          <div className="featured-links">
            <a
              href="https://derm-ai-eight-ashen.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="hero-btn primary"
            >
              View Live App
            </a>
            <a
              href="https://github.com/UdeepChowdary/derm_ai"
              target="_blank"
              rel="noreferrer"
              className="hero-btn subtle"
            >
              View Source on GitHub
            </a>
          </div>
        </div>
      </article>
    </section>
  );
};

export default FeaturedProject;
