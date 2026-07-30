import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Rocket, Code2, Zap } from 'lucide-react';
import './StatsCounter.css';

const useCountUp = (target, duration = 2000, startCounting) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!startCounting) return;

        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [target, duration, startCounting]);

    return count;
};

const stats = [
    {
        icon: <Trophy size={22} />,
        value: 1,
        suffix: '',
        label: 'Hackathon Award',
        sublabel: '3rd Place at AIFT',
    },
    {
        icon: <Rocket size={22} />,
        value: 3,
        suffix: '+',
        label: 'Projects Shipped',
        sublabel: 'Full-stack & AI',
    },
    {
        icon: <Code2 size={22} />,
        value: 3,
        suffix: '',
        label: 'Certifications',
        sublabel: 'Oracle, DeepLearning.AI',
    },
    {
        icon: <Zap size={22} />,
        value: 500,
        suffix: '+',
        label: 'GitHub Commits',
        sublabel: 'Active Contributor',
    }
];

const StatCard = ({ stat, index, isVisible }) => {
    const count = useCountUp(stat.value, 1800, isVisible);

    return (
        <motion.div
            className="stat-card glass-panel"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ y: -6 }}
        >
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-number">
                {count}
                <span className="stat-suffix">{stat.suffix}</span>
            </div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-sublabel">{stat.sublabel}</div>
        </motion.div>
    );
};

const StatsCounter = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section id="stats" className="stats-section" ref={sectionRef}>
            <div className="container">
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <StatCard
                            key={stat.label}
                            stat={stat}
                            index={index}
                            isVisible={isVisible}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsCounter;
