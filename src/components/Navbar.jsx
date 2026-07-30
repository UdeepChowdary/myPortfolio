import React, { useState, useEffect } from 'react';
import { Menu, X, Code2, User, Mail, FolderHeart, Terminal as TerminalIcon } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const Navbar = ({ onTerminalClick }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Trap focus inside mobile navigation menu when open
    useEffect(() => {
        if (!isMobileMenuOpen) return;

        const handleFocusTrap = (e) => {
            if (e.key !== 'Tab') return;

            const elements = [
                document.querySelector('.mobile-toggle'),
                ...document.querySelectorAll('.mobile-link')
            ].filter(Boolean);

            if (elements.length === 0) return;

            const firstElement = elements[0];
            const lastElement = elements[elements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        };

        window.addEventListener('keydown', handleFocusTrap);
        return () => window.removeEventListener('keydown', handleFocusTrap);
    }, [isMobileMenuOpen]);

    const navLinks = [
        { name: 'About', href: '#about', icon: <User size={18} /> },
        { name: 'Work', href: '#projects', icon: <FolderHeart size={18} /> },
        { name: 'Skills', href: '#skills', icon: <Code2 size={18} /> },
        { name: 'Contact', href: '#contact', icon: <Mail size={18} /> },
    ];

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="nav-content">
                <div className="logo-container">
                    <a href="#" className="logo" aria-label="Udeep Chowdary Home Page Logo">
                        U<span className="dot">.</span>
                    </a>
                    <div className="status-indicator">
                        <span className="pulse-dot"></span>
                        <span className="status-text">Available for Work</span>
                    </div>
                </div>

                <div className="desktop-nav">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="nav-link">
                            {link.name}
                        </a>
                    ))}
                </div>

                <div className="nav-actions">
                    <button 
                        className="terminal-toggle-btn"
                        onClick={onTerminalClick}
                        title="Open Developer Terminal"
                        aria-label="Open retro developer terminal"
                    >
                        <TerminalIcon size={20} />
                    </button>
                    <ThemeToggle />
                    <button
                        className="mobile-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                <div className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
                    <div className="mobile-nav-links">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="mobile-link"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {link.icon}
                                <span>{link.name}</span>
                            </a>
                        ))}
                    </div>
                    <div className="mobile-nav-footer">
                        <div className="mobile-socials">
                            <a href="https://github.com/UdeepChowdary" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg></a>
                            <a href="https://www.linkedin.com/in/udeep-chowdary-naripeddi-99908627b" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg></a>
                            <a href="mailto:udeepchowdary06@gmail.com" aria-label="Email"><Mail size={20} /></a>
                        </div>
                        <p>© {new Date().getFullYear()} Udeep Chowdary.</p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
