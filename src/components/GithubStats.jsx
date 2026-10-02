import React, { useState, useEffect } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { Github, ExternalLink, GitCommit } from 'lucide-react';
import './GithubStats.css';

const GithubStats = () => {
    const [currentTheme, setCurrentTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return document.documentElement.getAttribute('data-theme') || 'dark';
        }
        return 'dark';
    });

    useEffect(() => {
        const updateTheme = () => {
            const theme = document.documentElement.getAttribute('data-theme') || 'dark';
            setCurrentTheme(theme);
        };

        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme']
        });

        return () => observer.disconnect();
    }, []);

    // Editorial Redline palette for calendar blocks
    const selectTheme = {
        light: ['#EEEEEA', '#FCA5A5', '#EF4444', '#B91C1C', '#D71920'],
        dark: ['#171717', '#450A0A', '#7F1D1D', '#B91C1C', '#FF2B2B'],
    };

    return (
        <section id="github" className="github-section">
            <div className="container">
                {/* 07 SECTION HEADER */}
                <div className="section-header">
                    <span className="section-number">07</span>
                    <h2 className="section-title">GITHUB HEATMAP</h2>
                    <div className="section-header-rule" />
                </div>

                {/* EDITORIAL ACTIVITY DOSSIER */}
                <div className="github-dossier">
                    {/* DOSSIER HEADER BAR */}
                    <div className="github-topbar">
                        <div className="github-identity">
                            <Github size={16} className="github-icon" />
                            <span className="github-handle">UDEEPCHOWDARY</span>
                            <span className="github-sep">/</span>
                            <span className="github-sub">COMMIT TELEMETRY</span>
                        </div>

                        <div className="github-actions">
                            <span className="github-status">
                                <span className="github-pulse-dot" />
                                LIVE FEED
                            </span>
                            <a 
                                href="https://github.com/UdeepChowdary" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="github-link-btn"
                                aria-label="Visit GitHub Profile"
                            >
                                PROFILE <ExternalLink size={12} />
                            </a>
                        </div>
                    </div>

                    {/* HEATMAP CALENDAR WRAPPER */}
                    <div className="github-calendar-wrapper">
                        <GitHubCalendar 
                            username="UdeepChowdary" 
                            colorScheme={currentTheme === 'light' ? 'light' : 'dark'}
                            theme={selectTheme}
                            blockSize={13}
                            blockMargin={4}
                            fontSize={12}
                        />
                    </div>

                    {/* DOSSIER FOOTER METADATA */}
                    <div className="github-footer-bar">
                        <div className="github-footer-item">
                            <GitCommit size={14} className="text-red" />
                            <span>SOURCE REPOSITORIES &amp; OPEN CODE</span>
                        </div>
                        <div className="github-footer-item meta-right">
                            <span>YEAR-ROUND ENGINEERING ACTIVITY</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GithubStats;
