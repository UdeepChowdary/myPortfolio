import React from 'react';
import { motion } from 'framer-motion';
<<<<<<< HEAD
import { Coffee, Terminal, Code2, Brain, Atom, Cpu, Database, Palette, Layers, GitBranch } from 'lucide-react';
=======
>>>>>>> c322091c069aaf3d0816be0be72238ad6da503ec
import './Skills.css';

const Skills = () => {
    const categories = [
        {
            title: "Core & Languages",
            skills: [
<<<<<<< HEAD
                { name: "Java (OOP)", icon: <Coffee size={18} style={{ color: 'var(--accent-primary)' }} /> },
                { name: "Python", icon: <Terminal size={18} style={{ color: 'var(--accent-secondary)' }} /> },
                { name: "JavaScript (ES6+)", icon: <Code2 size={18} style={{ color: 'var(--accent-primary)' }} /> },
                { name: "Prompt Engineering", icon: <Brain size={18} style={{ color: 'var(--accent-secondary)' }} /> }
=======
                { name: "Java (OOP)", icon: "☕" },
                { name: "Python", icon: "🐍" },
                { name: "JavaScript (ES6+)", icon: "🟨" },
                { name: "Prompt Engineering", icon: "🧠" }
>>>>>>> c322091c069aaf3d0816be0be72238ad6da503ec
            ]
        },
        {
            title: "Full Stack (MERN)",
            skills: [
<<<<<<< HEAD
                { name: "React.js", icon: <Atom size={18} style={{ color: 'var(--accent-secondary)' }} /> },
                { name: "Node.js", icon: <Cpu size={18} style={{ color: 'var(--accent-primary)' }} /> },
                { name: "Express", icon: <Terminal size={18} style={{ color: 'var(--accent-secondary)' }} /> },
                { name: "MongoDB", icon: <Database size={18} style={{ color: 'var(--accent-primary)' }} /> },
                { name: "Figma", icon: <Palette size={18} style={{ color: 'var(--accent-secondary)' }} /> }
=======
                { name: "React.js", icon: "⚛️" },
                { name: "Node.js", icon: "🟩" },
                { name: "Express", icon: "🚂" },
                { name: "MongoDB", icon: "🍃" },
                { name: "Figma", icon: "🎨" }
>>>>>>> c322091c069aaf3d0816be0be72238ad6da503ec
            ]
        },
        {
            title: "Data & AI Fundamentals",
            skills: [
<<<<<<< HEAD
                { name: "SQL", icon: <Database size={18} style={{ color: 'var(--accent-primary)' }} /> },
                { name: "Vector Databases", icon: <Brain size={18} style={{ color: 'var(--accent-secondary)' }} /> },
                { name: "NoSQL", icon: <Layers size={18} style={{ color: 'var(--accent-primary)' }} /> },
                { name: "Git & GitHub", icon: <GitBranch size={18} style={{ color: 'var(--accent-secondary)' }} /> }
=======
                { name: "SQL", icon: "🗄️" },
                { name: "Vector Databases", icon: "🔮" },
                { name: "NoSQL", icon: "📦" },
                { name: "Git & GitHub", icon: "🐙" }
>>>>>>> c322091c069aaf3d0816be0be72238ad6da503ec
            ]
        }
    ];

<<<<<<< HEAD
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 12 } }
    };

=======
>>>>>>> c322091c069aaf3d0816be0be72238ad6da503ec
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
<<<<<<< HEAD
                            <motion.div 
                                className="skill-list"
                                variants={containerVariants}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: "-50px" }}
                            >
                                {category.skills.map((skill, sIdx) => (
                                    <motion.div className="skill-item" key={sIdx} variants={itemVariants}>
                                        <span className="skill-emoji">{skill.icon}</span>
                                        <span>{skill.name}</span>
                                    </motion.div>
                                ))}
                            </motion.div>
=======
                            <div className="skill-list">
                                {category.skills.map((skill, sIdx) => (
                                    <div className="skill-item" key={sIdx}>
                                        <span className="skill-emoji">{skill.icon}</span>
                                        <span>{skill.name}</span>
                                    </div>
                                ))}
                            </div>
>>>>>>> c322091c069aaf3d0816be0be72238ad6da503ec
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
