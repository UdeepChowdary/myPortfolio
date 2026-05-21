import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const Skills = () => {
    const categories = [
        {
            title: "Core & Languages",
            skills: [
                { name: "Java (OOP)", icon: "☕" },
                { name: "Python", icon: "🐍" },
                { name: "JavaScript (ES6+)", icon: "🟨" },
                { name: "Prompt Engineering", icon: "🧠" }
            ]
        },
        {
            title: "Full Stack (MERN)",
            skills: [
                { name: "React.js", icon: "⚛️" },
                { name: "Node.js", icon: "🟩" },
                { name: "Express", icon: "🚂" },
                { name: "MongoDB", icon: "🍃" },
                { name: "Figma", icon: "🎨" }
            ]
        },
        {
            title: "Data & AI Fundamentals",
            skills: [
                { name: "SQL", icon: "🗄️" },
                { name: "Vector Databases", icon: "🔮" },
                { name: "NoSQL", icon: "📦" },
                { name: "Git & GitHub", icon: "🐙" }
            ]
        }
    ];

    return (
        <section id="skills" className="skills-section">
            <div className="container">
                <h2 className="section-title">Technical <span className="gradient-text">Skills</span></h2>

                <div className="skills-grid">
                    {categories.map((category, idx) => (
                        <motion.div
                            className="skill-category glass-panel"
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.2 }}
                            whileHover={{ y: -5, boxShadow: "0 12px 30px rgba(138,43,226,0.2)" }}
                        >
                            <h3>{category.title}</h3>
                            <div className="skill-list">
                                {category.skills.map((skill, sIdx) => (
                                    <div className="skill-item" key={sIdx}>
                                        <span className="skill-emoji">{skill.icon}</span>
                                        <span>{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
