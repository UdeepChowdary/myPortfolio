import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Preloader.css';

const Preloader = ({ onComplete }) => {
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        // Fast, cinematic counter from 0 to 100
        let count = 0;
        const interval = setInterval(() => {
            // Speed up the counter as it gets closer to 100
            const increment = Math.floor(Math.random() * 5) + 1;
            count += increment;
            
            if (count >= 100) {
                count = 100;
                setCounter(100);
                clearInterval(interval);
                // Pause at 100% for a split second before triggering onComplete
                setTimeout(() => {
                    onComplete();
                }, 400);
            } else {
                setCounter(count);
            }
        }, 30); // update every 30ms

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <motion.div 
            className="preloader-container"
            initial={{ y: 0 }}
            exit={{ 
                y: '-100vh', 
                transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } 
            }}
        >
            <div className="preloader-content">
                <div className="preloader-logs">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        [SYS.BOOT] INITIALIZING NEURAL KERNEL...
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: counter > 40 ? 1 : 0 }}
                    >
                        [MOD.LOAD] ALLOCATING MEMORY...
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: counter > 80 ? 1 : 0 }}
                    >
                        [NET.SYNC] ESTABLISHING HANDSHAKE...
                    </motion.div>
                </div>
                
                <div className="preloader-counter">
                    <span className="counter-number">{counter.toString().padStart(3, '0')}</span>
                    <span className="counter-percent">%</span>
                </div>

                <div className="preloader-progress-container">
                    <div 
                        className="preloader-progress-bar" 
                        style={{ width: `${counter}%` }}
                    ></div>
                </div>
            </div>
            
            {/* Cinematic corners */}
            <div className="pl-corner tl"></div>
            <div className="pl-corner tr"></div>
            <div className="pl-corner bl"></div>
            <div className="pl-corner br"></div>
        </motion.div>
    );
};

export default Preloader;
