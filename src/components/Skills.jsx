import React from 'react';
import './Skills.css';

const Skills = () => {
    const categories = [
        {
            title: "Core & Languages",
            skills: ["Java (OOP)", "Python", "JavaScript (ES6+)", "Prompt Engineering"]
        },
        {
            title: "Full Stack (MERN)",
            skills: ["React.js", "Node.js", "Express", "MongoDB", "Figma"]
        },
        {
            title: "Data & AI Fundamentals",
            skills: ["SQL", "Vector Databases", "NoSQL", "Git & GitHub"]
        }
    ];

    return (
        <section id="skills" className="skills-section">
            <div className="container">
                <h2 className="section-title">Technical <span className="gradient-text">Skills</span></h2>

                <div className="skills-grid">
                    {categories.map((category, idx) => (
                        <div className="skill-category glass-panel" key={idx}>
                            <h3>{category.title}</h3>
                            <div className="skill-list">
                                {category.skills.map((skill, sIdx) => (
                                    <div className="skill-item" key={sIdx}>
                                        <div className="skill-dot"></div>
                                        <span>{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
