import React from 'react';
import useInViewAnimation from '../hooks/useInViewAnimation';

const About = () => {
  const { ref, isVisible } = useInViewAnimation();

  return (
    <section
      id="about"
      ref={ref}
      className={`about-section reveal ${isVisible ? 'reveal-visible' : ''}`}
    >
      <h2>About Me</h2>
      <p>
        I’m a Computer Science Engineering student at SRM University, currently part of the Kalvium program — an
        industry-aligned track focused on real-world software engineering from day one. I have a solid foundation in
        full-stack development (React, JavaScript, Python, Java, MySQL), but my main focus now is on AI, Large Language
        Models (LLMs), and Data Science.
      </p>
      <p>
        I enjoy exploring how Generative AI and LLMs can be used to build practical, meaningful products — from
        intelligent assistants to tools that augment human creativity and decision-making. I like working on projects
        that blend clean, functional interfaces with powerful AI-driven backends.
      </p>
      <div className="skills">
        <strong>Skills:</strong>
        <span>Python</span>
        <span>Data Science</span>
        <span>AI / ML</span>
        <span>LLMs</span>
        <span>React</span>
        <span>JavaScript</span>
        <span>SQL / MySQL</span>
        <span>Git</span>
      </div>
    </section>
  );
};

export default About;
