import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Users, BookOpen } from 'lucide-react';
import './GithubStats.css';

const GithubStats = () => {
    const [stats, setStats] = useState({
        repos: 0,
        followers: 0,
        following: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.github.com/users/UdeepChowdary')
            .then(res => res.json())
            .then(data => {
                if(data && !data.message) {
                    setStats({
                        repos: data.public_repos || 0,
                        followers: data.followers || 0,
                        following: data.following || 0,
                    });
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <section id="github-stats" className="github-stats-section">
            <div className="container">
                <h2 className="section-title">GitHub <span className="gradient-text">Activity</span></h2>
                
                <div className="native-stats-grid">
                    <motion.a 
                        href="https://github.com/UdeepChowdary?tab=repositories"
                        target="_blank"
                        rel="noreferrer"
                        className="native-stat-card glass-panel"
                        whileHover={{ y: -5 }}
                    >
                        <div className="stat-icon-wrapper">
                            <BookOpen size={28} className="stat-icon" />
                        </div>
                        <div className="stat-info">
                            <h3>{loading ? '...' : stats.repos}</h3>
                            <p>Public Repositories</p>
                        </div>
                    </motion.a>



                    <motion.a 
                        href="https://github.com/UdeepChowdary"
                        target="_blank"
                        rel="noreferrer"
                        className="native-stat-card glass-panel"
                        whileHover={{ y: -5 }}
                    >
                        <div className="stat-icon-wrapper">
                            <Github size={28} className="stat-icon" />
                        </div>
                        <div className="stat-info">
                            <h3>@UdeepChowdary</h3>
                            <p>View Profile &rarr;</p>
                        </div>
                    </motion.a>
                </div>
            </div>
        </section>
    );
};

export default GithubStats;
