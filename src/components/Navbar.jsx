import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import HireMeModal from './HireMeModal';
import './Navbar.css';

// Defined outside the component so the reference is stable
const NAV_LINKS = [
    { name: 'WORK',    href: '#projects' },
    { name: 'ABOUT',   href: '#about'    },
    { name: 'STACK',   href: '#skills'   },
    { name: 'JOURNEY', href: '#journey'  },
    { name: 'CONTACT', href: '#contact'  },
];

const Navbar = () => {
    const [isScrolled,    setIsScrolled]    = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [mobileOpen,    setMobileOpen]    = useState(false);
    const [hireMeOpen,    setHireMeOpen]    = useState(false);

    // Scroll: add border shadow once user moves off top
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Active section via IntersectionObserver
    // Handles lazy-loaded sections by polling until all sections are found
    useEffect(() => {
        const handleIntersect = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) setActiveSection(entry.target.id);
            });
        };

        const observer = new IntersectionObserver(handleIntersect, {
            root: null,
            rootMargin: '-20% 0px -40% 0px',
            threshold: 0,
        });

        const ids = ['hero', ...NAV_LINKS.map(l => l.href.substring(1))];
        const observedElements = new Set();

        const checkElements = () => {
            ids.forEach(id => {
                if (!observedElements.has(id)) {
                    const el = document.getElementById(id);
                    if (el) {
                        observer.observe(el);
                        observedElements.add(id);
                    }
                }
            });
            if (observedElements.size === ids.length) {
                clearInterval(interval);
            }
        };

        const interval = setInterval(checkElements, 250);
        checkElements();

        return () => {
            clearInterval(interval);
            observer.disconnect();
        };
    }, []); // ✅ stable dep array

    // Close mobile menu on route-like scroll (any anchor click)
    const handleNavClick = useCallback(() => setMobileOpen(false), []);

    return (
        <>
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="nav-content">
                    <a href="#hero" className="logo" aria-label="Udeep Chowdary Home">
                        UDEEP<span className="logo-dot">.</span>
                    </a>

                    {/* Desktop links */}
                    <div className="nav-links-center" role="navigation" aria-label="Main navigation">
                        {NAV_LINKS.map((link) => {
                            const isActive = activeSection === link.href.substring(1);
                            return (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`nav-link ${isActive ? 'active' : ''}`}
                                >
                                    <span className="nav-link-text">{link.name}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-indicator"
                                            className="nav-indicator"
                                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                        />
                                    )}
                                </a>
                            );
                        })}
                    </div>

                    <div className="nav-actions">
                        <button className="hire-me-btn" onClick={() => setHireMeOpen(true)}>
                            <span className="hire-me-dot"></span>
                            HIRE ME
                        </button>
                        <ThemeToggle />
                        {/* Hamburger — mobile only */}
                        <button
                            className="nav-hamburger"
                            onClick={() => setMobileOpen(o => !o)}
                            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={mobileOpen}
                        >
                            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
                <div className="nav-border-bottom" />
            </nav>

            {/* Mobile drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="mobile-menu"
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        role="navigation"
                        aria-label="Mobile navigation"
                    >
                        {NAV_LINKS.map((link, i) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                className={`mobile-nav-link ${activeSection === link.href.substring(1) ? 'active' : ''}`}
                                onClick={handleNavClick}
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05, duration: 0.2 }}
                            >
                                <span className="mobile-link-num">0{i + 1}</span>
                                {link.name}
                            </motion.a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hire Me Modal */}
            <HireMeModal isOpen={hireMeOpen} onClose={() => setHireMeOpen(false)} />
        </>
    );
};

export default Navbar;
