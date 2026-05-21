import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CursorTrail = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 30,
        height: 30,
        borderRadius: '50%',
        border: '2px solid #00f0ff',
        pointerEvents: 'none',
        zIndex: 9999,
        boxShadow: '0 0 15px #00f0ff, inset 0 0 10px #00f0ff',
        mixBlendMode: 'screen'
      }}
      animate={{
        x: mousePosition.x - 15,
        y: mousePosition.y - 15,
      }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 150,
        mass: 0.5,
      }}
    />
  );
};

export default CursorTrail;
