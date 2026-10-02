import React from 'react';
import './TechMarquee.css';

const techStack1 = [
  "Computer Vision", "TensorFlow & Keras", "Gemini 2.5 API", "RAG & Vector DBs", 
  "Python", "PyTorch", "Hugging Face", "React 19", "TypeScript", 
  "Node.js & Express", "Scikit-Learn", "Docker", "Git & GitHub", "REST & WebSockets",
  "Computer Vision", "TensorFlow & Keras", "Gemini 2.5 API", "RAG & Vector DBs", 
  "Python", "PyTorch", "Hugging Face", "React 19", "TypeScript", 
  "Node.js & Express", "Scikit-Learn", "Docker", "Git & GitHub", "REST & WebSockets"
];

// Shuffle or offset the second row for visual variety
const techStack2 = [
  "Docker", "Git & GitHub", "REST & WebSockets", "Computer Vision", "TensorFlow & Keras", 
  "Gemini 2.5 API", "RAG & Vector DBs", "Python", "PyTorch", "Hugging Face", 
  "React 19", "TypeScript", "Node.js & Express", "Scikit-Learn",
  "Docker", "Git & GitHub", "REST & WebSockets", "Computer Vision", "TensorFlow & Keras", 
  "Gemini 2.5 API", "RAG & Vector DBs", "Python", "PyTorch", "Hugging Face", 
  "React 19", "TypeScript", "Node.js & Express", "Scikit-Learn"
];

const TechMarquee = () => {
  return (
    <div className="tech-marquee-wrapper" aria-label="Technologies and frameworks I engineer with" role="marquee">
      
      <div className="marquee-3d-perspective">
        {/* Track 1 - Top track (moves left) */}
        <div className="marquee-track-container track-top">
          <div className="marquee-content scroll-left">
            {techStack1.map((tech, index) => (
              <div key={index} className="marquee-item glass-panel">
                <span className="marquee-dot"></span>
                {tech}
              </div>
            ))}
          </div>
        </div>

        {/* Track 2 - Bottom track (moves right) */}
        <div className="marquee-track-container track-bottom" aria-hidden="true">
          <div className="marquee-content scroll-right">
            {techStack2.map((tech, index) => (
              <div key={index} className="marquee-item glass-panel">
                <span className="marquee-dot violet-dot"></span>
                {tech}
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default TechMarquee;
