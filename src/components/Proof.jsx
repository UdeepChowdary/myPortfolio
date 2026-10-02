import React from 'react';
import './Proof.css';

const proofs = [
    { value: '1ST',  qualifier: 'PLACE',      label: 'IEEE Genesis 2026 · AI/ML Track' },
    { value: '₹10K', qualifier: 'PRIZE',      label: 'National Hackathon Winner'       },
    { value: '9.15', qualifier: 'CGPA',       label: 'SRM University AP'               },
    { value: '4×',   qualifier: 'HACKATHONS', label: 'Top 5 Finishes'                  },
];

const Proof = () => (
    <section className="proof-section">
        <div className="container">
            <div className="section-header">
                <span className="section-number">03</span>
                <h2 className="section-title">PROOF</h2>
                <div className="section-header-rule" />
            </div>

            <div className="proof-grid">
                {proofs.map((proof, index) => (
                    <div key={index} className="proof-item">
                        <div className="proof-value">
                            {proof.value}
                            <span className="proof-qualifier">{proof.qualifier}</span>
                        </div>
                        <div className="proof-label">{proof.label}</div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Proof;
