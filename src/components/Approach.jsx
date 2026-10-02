import React from 'react';
import { motion } from 'framer-motion';
import './Approach.css';

const STEPS = [
    {
        num:   '01',
        verb:  '→',
        title: 'UNDERSTAND',
        body:  'Map the problem space before writing a single line. I study constraints, edge cases, and real user needs until the solution path is clear and the trade-offs are named.',
    },
    {
        num:   '02',
        verb:  '→',
        title: 'ENGINEER',
        body:  'Build for correctness first — clean abstractions, modular systems, tested interfaces. Optimize for speed and scale only where signals from production demand it.',
    },
    {
        num:   '03',
        verb:  '→',
        title: 'SHIP',
        body:  'Deploy early. Gather real signals from real users. Iterate fast. A shipped product with one flaw teaches more than a perfect design that never exists.',
    },
];

const CURRENTLY = [
    'Enrolled in OSCI 2026',
    'GSSoC 2026 Contributor',
    'B.Tech CSE @ SRM University AP',
    'Building AI Systems',
];

const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
    hidden:  { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Approach = () => (
    <section id="approach" className="approach-section">
        <div className="container">
            <div className="section-header">
                <span className="section-number">03</span>
                <h2 className="section-title">APPROACH</h2>
                <div className="section-header-rule" />
            </div>

            <motion.div
                className="approach-steps"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={container}
            >
                {STEPS.map((step) => (
                    <motion.div key={step.num} className="approach-step" variants={item}>
                        <div className="step-num-row">
                            <span className="step-num">{step.num}</span>
                            <span className="step-verb">{step.verb}</span>
                        </div>
                        <div className="step-rule" />
                        <h3 className="step-title">{step.title}</h3>
                        <p className="step-body">{step.body}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Currently strip */}
            <div className="currently-strip">
                <div className="currently-label">
                    <span className="currently-pulse" />
                    CURRENTLY
                </div>
                <div className="currently-items">
                    {CURRENTLY.map((item, i) => (
                        <React.Fragment key={i}>
                            <span className="currently-item">{item}</span>
                            {i < CURRENTLY.length - 1 && (
                                <span className="currently-sep" aria-hidden="true">·</span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

export default Approach;
