import React from 'react';
import useInViewAnimation from '../hooks/useInViewAnimation';

const Achievements = () => {
  const { ref, isVisible } = useInViewAnimation();

  return (
    <section
      id="achievements"
      ref={ref}
      className={`achievements-section reveal ${isVisible ? 'reveal-visible' : ''}`}
    >
      <h2>Achievements</h2>
      <ul className="achievements-list">
        <li className="achievement-item">
          <div className="achievement-main">
            <span className="achievement-year">2025</span>
            <h3 className="achievement-title">3rd place – AIFT Summer Challenge 2025 (Derm.AI)</h3>
          </div>
          <p className="achievement-description">
            Built Derm.AI, an AI-powered skin condition detection app using the Autoderm API, React, and machine
            learning. As part of Team Trivexa, achieved 2nd runner-up in Kalvium&apos;s AIFT Summer Challenge 2025.
          </p>
        </li>
      </ul>
    </section>
  );
};

export default Achievements;
