import React, { useEffect, useState, useRef } from 'react';
import { useLenis } from 'lenis/react';
import './SpotlightBackground.css';

const SpotlightBackground = () => {
    const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

    // Lenis scroll velocity — gives us how fast the user is scrolling
    // We use this to shift the ambient orbs slightly on scroll (parallax depth)
    const orbOffsetRef = useRef(0);
    const [orbOffset, setOrbOffset] = useState(0);

    useLenis(({ velocity }) => {
        // Accumulate a subtle vertical offset proportional to scroll velocity
        // Dampen it toward 0 so it bounces back when scroll stops
        orbOffsetRef.current = velocity * 6;
        setOrbOffset(orbOffsetRef.current);
    });

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
            {/* Ambient Background Aura Orbs — shift on scroll velocity for parallax depth */}
            <div
                className="ambient-orb ambient-orb-1"
                style={{ transform: `translateY(${orbOffset * 0.6}px)` }}
            />
            <div
                className="ambient-orb ambient-orb-2"
                style={{ transform: `translateY(${orbOffset * 1.0}px)` }}
            />
            <div
                className="ambient-orb ambient-orb-3"
                style={{ transform: `translateY(${orbOffset * 0.4}px)` }}
            />

            {/* Dynamic Interactive Mouse Spotlight Glow */}
            <div 
                className="spotlight-effect"
                style={{
                    background: `radial-gradient(650px circle at ${mousePosition.x}px ${mousePosition.y}px, var(--spotlight-color), transparent 45%)`
                }}
            />
            {/* Cyber Grid Mask */}
            <div className="spotlight-grid" />
        </div>
    );
};

export default SpotlightBackground;
