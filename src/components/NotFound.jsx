import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import './NotFound.css';

const NotFound = () => {
    return (
        <section className="not-found-section">
            <div className="container">
                <motion.div 
                    className="not-found-content glass-panel"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="error-code gradient-text">404</h1>
                    <h2>Lost in Cyberspace?</h2>
                    <p>The page you are looking for doesn't exist or has been moved.</p>
                    
                    <Link to="/" className="btn btn-primary home-link">
                        <Home size={20} />
                        Return to Base
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default NotFound;
