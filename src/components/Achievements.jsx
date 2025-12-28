import React from 'react';
import { Trophy, Award } from 'lucide-react';
import './Achievements.css';

const achievementsData = [
  {
    title: 'Hack MSC 2.0 - National Level Hackathon',
    place: '5th Place',
    description: 'Competed against top teams nationally to build innovative solutions under tight deadlines.',
    icon: <Trophy size={32} className="achievement-icon gold" />
  },
  {
    title: 'AIFT Summer Challenge 2025',
    place: '3rd Place',
    description: 'Awarded for "Derm-AI", recognizing excellence in AI application for healthcare diagnostics.',
    icon: <Award size={32} className="achievement-icon silver" />
  }
];

const Achievements = () => {
  return (
    <section id="achievements" className="achievements-section">
      <div className="container">
        <h2 className="section-title">Honors & <span className="gradient-text">Awards</span></h2>

        <div className="achievements-grid">
          {achievementsData.map((item, index) => (
            <div className="achievement-card glass-panel" key={index}>
              <div className="icon-box">
                {item.icon}
              </div>
              <div className="achievement-content">
                <span className="place-badge">{item.place}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
              <div className="shine-effect"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
