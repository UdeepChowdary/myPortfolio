import React from 'react';
import './About.css';

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="container">
                <div className="section-header">
                    <span className="section-number">04</span>
                    <h2 className="section-title">ABOUT</h2>
                    <div className="section-header-rule"></div>
                </div>

                <div className="grid-12">
                    <div className="about-statement-col">
                        <h3 className="about-statement">
                            I build intelligent systems where machine learning meets practical software engineering.
                        </h3>
                    </div>
                    <div className="about-text-col">
                        <p className="about-paragraph">
                            I am an Applied AI Engineer and Computer Science undergraduate at SRM University AP. 
                            My focus lies in building scalable, real-time AI systems—ranging from autonomous AIOps 
                            engines capable of predictive anomaly detection to sophisticated learning support platforms 
                            that analyze emotional telemetry.
                        </p>
                        <p className="about-paragraph">
                            With a strong foundation in Deep Learning, Computer Vision, and RAG architectures, 
                            I bridge the gap between advanced research models and production-ready web applications. 
                            I deliver robust full-stack solutions using Python, React, Next.js, and modern cloud infrastructures, 
                            ensuring intelligent technologies are both accessible and highly performant.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
