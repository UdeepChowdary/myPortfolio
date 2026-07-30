import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Coffee, Terminal, Code2, Brain, Atom, Cpu, Database, Palette, 
    GitBranch, Sparkles, Server, Globe, Wrench, Zap, Layers, Network, Monitor, Code, Cloud
} from 'lucide-react';
import './Skills.css';

const SKILLS_CATEGORIES = [
    {
        id: "languages",
        title: "Languages & Core CS",
        icon: Code2,
        skills: [
            { name: "Python", iconName: "Terminal", color: "#3776ab" },
            { name: "Java", iconName: "Coffee", color: "#e76f51" },
            { name: "JavaScript", iconName: "Code2", color: "#f7df1e" },
            { name: "SQL", iconName: "Database", color: "#336791" },
            { name: "Data Structures & Algorithms", iconName: "Layers", color: "#00f0ff" },
            { name: "OOP Principles", iconName: "Code2", color: "#e76f51" }
        ]
    },
    {
        id: "fullstack",
        title: "Full Stack Web",
        icon: Atom,
        skills: [
            { name: "React.js", iconName: "Atom", color: "#61dafb" },
            { name: "Next.js", iconName: "Globe", color: "#00f0ff" },
            { name: "Node.js", iconName: "Cpu", color: "#339933" },
            { name: "Express.js", iconName: "Server", color: "#a8b2d1" },
            { name: "REST APIs & WebSockets", iconName: "Network", color: "#ff9900" },
            { name: "HTML5 & CSS3", iconName: "Palette", color: "#e34f26" }
        ]
    },
    {
        id: "ai-data",
        title: "AI & Data Systems",
        icon: Sparkles,
        skills: [
            { name: "Gemini API", iconName: "Sparkles", color: "#8e75ff" },
            { name: "Anthropic Claude & Code", iconName: "Brain", color: "#d97757" },
            { name: "Prompt Engineering", iconName: "Sparkles", color: "#ec4899" },
            { name: "TensorFlow.js", iconName: "Brain", color: "#ff6f00" },
            { name: "MongoDB & MySQL", iconName: "Database", color: "#47a248" },
            { name: "DBMS Fundamentals", iconName: "Database", color: "#336791" }
        ]
    },
    {
        id: "tools-systems",
        title: "Tools & OS Systems",
        icon: Wrench,
        skills: [
            { name: "Git & GitHub", iconName: "GitBranch", color: "#f05032" },
            { name: "Linux / CLI", iconName: "Terminal", color: "#fbcb2b" },
            { name: "Postman & VS Code", iconName: "Wrench", color: "#ff6c37" },
            { name: "Vercel Deployment", iconName: "Cloud", color: "#00f0ff" },
            { name: "Operating Systems", iconName: "Monitor", color: "#3776ab" },
            { name: "Computer Networks", iconName: "Network", color: "#a855f7" }
        ]
    }
];

const renderIcon = (iconName, color) => {
    const props = { size: 18, style: { color } };
    switch (iconName) {
        case 'Coffee': return <Coffee {...props} />;
        case 'Terminal': return <Terminal {...props} />;
        case 'Code2': return <Code2 {...props} />;
        case 'Brain': return <Brain {...props} />;
        case 'Atom': return <Atom {...props} />;
        case 'Cpu': return <Cpu {...props} />;
        case 'Database': return <Database {...props} />;
        case 'Palette': return <Palette {...props} />;
        case 'Layers': return <Layers {...props} />;
        case 'GitBranch': return <GitBranch {...props} />;
        case 'Sparkles': return <Sparkles {...props} />;
        case 'Server': return <Server {...props} />;
        case 'Globe': return <Globe {...props} />;
        case 'Wrench': return <Wrench {...props} />;
        case 'Network': return <Network {...props} />;
        case 'Monitor': return <Monitor {...props} />;
        case 'Code': return <Code {...props} />;
        case 'Cloud': return <Cloud {...props} />;
        default: return <Code2 {...props} />;
    }
};

const FILTER_TABS = [
    { id: 'all', label: 'All Stack' },
    { id: 'languages', label: 'Languages & CS' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'ai-data', label: 'AI & Data' },
    { id: 'tools-systems', label: 'Tools & Systems' }
];

const Skills = () => {
    const [activeTab, setActiveTab] = useState('all');

    const filteredCategories = SKILLS_CATEGORIES.filter(cat => 
        activeTab === 'all' || cat.id === activeTab
    );

    return (
        <section id="skills" className="skills-section">
            <div className="container">
                {/* Header */}
                <div className="skills-header">
                    <motion.div 
                        className="skills-badge"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Zap size={13} /> TECH STACK & CAPABILITIES
                    </motion.div>
                    
                    <h2 className="section-title">
                        Technical <span className="gradient-text">Skills</span>
                    </h2>
                </div>

                {/* Filter Pills */}
                <div className="skills-filter-pills">
                    {FILTER_TABS.map(tab => (
                        <button 
                            key={tab.id}
                            className={`filter-pill ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Category Cards Grid (4 Symmetrical Cards: 2x2) */}
                <div className={`skills-category-grid ${filteredCategories.length === 1 ? 'single-category' : ''}`}>
                    {filteredCategories.map((category, idx) => {
                        const CategoryIcon = category.icon;
                        return (
                            <motion.div 
                                key={category.id}
                                className="skills-category-card glass-panel"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                            >
                                <div className="category-card-header">
                                    <div className="category-icon-box">
                                        <CategoryIcon size={18} />
                                    </div>
                                    <h3>{category.title}</h3>
                                </div>

                                <div className="skills-chip-grid">
                                    {category.skills.map((skill) => (
                                        <motion.div 
                                            key={skill.name}
                                            className="skill-chip"
                                            whileHover={{ y: -3, scale: 1.03 }}
                                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                        >
                                            <span className="skill-chip-icon">
                                                {renderIcon(skill.iconName, skill.color)}
                                            </span>
                                            <span className="skill-chip-name">{skill.name}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;
