import React from 'react';
import './TechMarquee.css';

const techStack = [
  "React.js", "Node.js", "Express", "MongoDB", "Python", 
  "JavaScript", "TypeScript", "SQL", "Git", "Docker",
  "TensorFlow", "Tailwind CSS", "Next.js", "Vector Databases",
  "React.js", "Node.js", "Express", "MongoDB", "Python", 
  "JavaScript", "TypeScript", "SQL", "Git", "Docker",
  "TensorFlow", "Tailwind CSS", "Next.js", "Vector Databases"
];

const TechMarquee = () => {
  return (
    <div className="marquee-container">
      <div className="marquee-content">
        {techStack.map((tech, index) => (
          <div key={index} className="marquee-item glass-panel">
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechMarquee;
