import React, { useEffect, useState } from 'react';
import './SpotlightBackground.css';

const SpotlightBackground = () => {
    const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

    useEffect(() => {
        let requestRef = null;
        let lastPosition = { x: -1000, y: -1000 };

        const updatePosition = () => {
            setMousePosition(lastPosition);
            requestRef = null;
        };

        const handleMouseMove = (e) => {
            lastPosition = { x: e.clientX, y: e.clientY };
            if (!requestRef) {
                requestRef = requestAnimationFrame(updatePosition);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (requestRef) {
                cancelAnimationFrame(requestRef);
            }
        };
    }, []);

    return (
        <div className="spotlight-wrapper">
            <div 
                className="spotlight-effect"
                style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, var(--spotlight-color), transparent 40%)`
                }}
            />
            <div className="spotlight-grid" />
        </div>
    );
};

export default SpotlightBackground;
