import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, BookOpen } from 'lucide-react';
import './GithubStats.css';

const SkeletonCard = () => (
    <div className="skeleton-card glass-panel">
        <div className="skeleton-icon skeleton-shimmer" />
        <div className="stat-info">
            <div className="skeleton-text-h3 skeleton-shimmer" />
            <div className="skeleton-text-p skeleton-shimmer" />
        </div>
    </div>
);

const GithubStats = () => {
    const [stats, setStats] = useState({
        repos: 0,
        followers: 0,
        following: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.github.com/users/UdeepChowdary')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`GitHub API returned status ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                if(data && !data.message) {
                    setStats({
                        repos: data.public_repos || 18,
                        followers: data.followers || 8,
                        following: data.following || 10,
                    });
                } else {
                    // Fallback to static values if rate limited
                    setStats({
                        repos: 18,
                        followers: 8,
                        following: 10,
                    });
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to fetch GitHub stats:', err);
                // Fallback to static values on network error
                setStats({
                    repos: 18,
                    followers: 8,
                    following: 10,
                });
                setLoading(false);
            });
    }, []);

    return (
        <section id="github-stats" className="github-stats-section">
            <div className="container">
                <h2 className="section-title">GitHub <span className="gradient-text">Activity</span></h2>
                
                <div className="native-stats-grid">
                    {loading ? (
                        <>
                            <SkeletonCard />
                            <SkeletonCard />
                        </>
                    ) : (
                        <>
                            {/* Repositories Card */}
                            <motion.a 
                                href="https://github.com/UdeepChowdary?tab=repositories"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="native-stat-card glass-panel"
                                whileHover={{ y: -5 }}
                            >
                                <div className="stat-icon-wrapper">
                                    <BookOpen size={28} className="stat-icon" />
                                </div>
                                <div className="stat-info">
                                    <h3>{stats.repos}</h3>
                                    <p>Public Repositories</p>
                                </div>
                            </motion.a>

                            {/* Main Profile Card */}
                            <motion.a 
                                href="https://github.com/UdeepChowdary"
                                target="_blank"
                                rel="noopener noreferrer"
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
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default GithubStats;
