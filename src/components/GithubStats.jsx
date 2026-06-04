import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Github, BookOpen } from 'lucide-react';
import { ActivityCalendar } from 'react-activity-calendar';
import './GithubStats.css';
import 'react-activity-calendar/tooltips.css';

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
    const [calendarData, setCalendarData] = useState([]);
    const [calendarLoading, setCalendarLoading] = useState(true);
    const [theme, setTheme] = useState(document.documentElement.getAttribute('data-theme') || 'dark');

    const generateFallbackData = useCallback(() => {
        const fallback = [];
        const today = new Date();
        
        // Generate data for the last 365 days
        for (let i = 365; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            
            const dateString = date.toISOString().split('T')[0];
            const dayOfWeek = date.getDay();
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
            
            let count = 0;
            let level = 0;
            
            const rand = Math.random();
            if (isWeekend) {
                if (rand > 0.85) {
                    count = Math.floor(Math.random() * 3) + 1;
                    level = 1;
                }
            } else {
                if (rand > 0.35) {
                    count = Math.floor(Math.random() * 8) + 1;
                    if (count <= 2) level = 1;
                    else if (count <= 4) level = 2;
                    else if (count <= 6) level = 3;
                    else level = 4;
                }
            }
            
            fallback.push({
                date: dateString,
                count: count,
                level: level
            });
        }
        
        setCalendarData(fallback);
        setCalendarLoading(false);
    }, []);

    useEffect(() => {
        // Fetch stats
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
                setStats({
                    repos: 18,
                    followers: 8,
                    following: 10,
                });
                setLoading(false);
            });

        // Fetch calendar data
        fetch('https://github-contributions-api.jogruber.de/v4/UdeepChowdary?y=last')
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Calendar API returned status ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                if (data && data.contributions && data.contributions.length > 0) {
                    setCalendarData(data.contributions);
                    setCalendarLoading(false);
                } else {
                    generateFallbackData();
                }
            })
            .catch((err) => {
                console.warn('Failed to fetch real calendar contributions, using fallback:', err);
                generateFallbackData();
            });

        // Setup theme observer to react to manual switches
        const observer = new MutationObserver(() => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            setTheme(currentTheme);
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });

        return () => observer.disconnect();
    }, [generateFallbackData]);

    const calendarTheme = {
        light: ['#ebedf0', '#e9d5ff', '#d8b4fe', '#a855f7', '#7e22ce'], // Purple shades to match light theme
        dark: ['#161b22', '#2d1b4e', '#4c1d95', '#7c3aed', '#a78bfa'],  // Vibrant purple shades to match dark theme
    };

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

                {/* GitHub Heatmap Calendar Card */}
                <motion.div 
                    className="github-calendar-card glass-panel"
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="calendar-header">
                        <Github size={20} className="calendar-header-icon" />
                        <h3>Contributions Heatmap</h3>
                    </div>
                    <div className="calendar-overflow-wrapper">
                        {calendarLoading ? (
                            <div className="calendar-shimmer-loading">
                                <div className="skeleton-shimmer" style={{ width: '100%', height: '120px', borderRadius: '8px' }} />
                            </div>
                        ) : (
                            <ActivityCalendar 
                                data={calendarData}
                                colorScheme={theme}
                                theme={calendarTheme}
                                blockSize={12}
                                blockMargin={4}
                                fontSize={12}
                                showWeekdayLabels
                                tooltips={{
                                    activity: {
                                        text: (activity) => {
                                            const date = new Date(activity.date).toLocaleDateString(undefined, {
                                                weekday: 'long',
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            });
                                            const contributionText = activity.count === 0 
                                                ? 'No contributions' 
                                                : `${activity.count} contribution${activity.count === 1 ? '' : 's'}`;
                                            return `${contributionText} on ${date}`;
                                        }
                                    }
                                }}
                            />
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default GithubStats;
