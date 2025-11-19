import React from 'react';
import useInViewAnimation from '../hooks/useInViewAnimation';

const Contact = () => {
  const { ref, isVisible } = useInViewAnimation();

  return (
    <section
      id="contact"
      ref={ref}
      className={`contact-section reveal ${isVisible ? 'reveal-visible' : ''}`}
    >
      <h2 className="section-heading">
        <span className="section-icon section-icon-alt" aria-hidden="true" />
        Let’s build something together
      </h2>
      <p>
        Interested in collaborating, hiring, or just saying hi? I’m always open to discussing new projects, ideas, and
        opportunities.
      </p>
      <p className="contact-helper">Best way to reach me is via email — I usually respond within a day.</p>
      <a href="mailto:udeepchowdary06@gmail.com" className="cta-button">
        Contact Me
      </a>
    </section>
  );
};

export default Contact;
