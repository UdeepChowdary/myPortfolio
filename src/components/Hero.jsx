import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';
import { 
    ArrowRight, Github, Linkedin, Mail, Download, Sparkles, Terminal, 
    Award, ShieldCheck, Activity, Send, RotateCcw, Bot, User, 
    ExternalLink, CheckCircle2, Zap, X, MessageCircle
} from 'lucide-react';
import Magnetic from './Magnetic';
import { askGeminiAssistant, isGeminiLive } from '../services/gemini';
import './Hero.css';

const SUGGESTIONS = [
    { label: "Why hire Udeep?",    query: "Why should we hire Udeep Chowdary?",                                         icon: Sparkles },
    { label: "1st Place OpsPilot", query: "Tell me about your 1st place IEEE Genesis project OpsPilot.",                icon: Zap },
    { label: "Core Tech Stack",    query: "What is your core technical stack and skills in AI/ML and Web?",             icon: Activity },
    { label: "Education & CGPA",   query: "What is your education, university, and CGPA?",                              icon: Award },
];

/* ── Inline markdown renderer (unchanged) ─────────────────────── */
const renderFormattedContent = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return null;

        const formatInlineTokens = (str) => {
            const parts = [];
            const regex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|`[^`]+`)/g;
            let lastIndex = 0, match;
            while ((match = regex.exec(str)) !== null) {
                if (match.index > lastIndex) parts.push(str.substring(lastIndex, match.index));
                const token = match[0];
                if (token.startsWith('**') && token.endsWith('**'))
                    parts.push(<strong key={parts.length}>{token.slice(2, -2)}</strong>);
                else if (token.startsWith('`') && token.endsWith('`'))
                    parts.push(<code key={parts.length} className="bubble-code">{token.slice(1, -1)}</code>);
                else if (token.startsWith('[') && token.includes('](')) {
                    const linkText = token.substring(1, token.indexOf(']('));
                    const url = token.substring(token.indexOf('](') + 2, token.length - 1);
                    parts.push(
                        <a key={parts.length} href={url}
                            target={url.startsWith('http') ? "_blank" : undefined}
                            rel={url.startsWith('http') ? "noopener noreferrer" : undefined}
                            className="bubble-inline-link">
                            {linkText}{url.startsWith('http') && <ExternalLink size={11} />}
                        </a>
                    );
                }
                lastIndex = regex.lastIndex;
            }
            if (lastIndex < str.length) parts.push(str.substring(lastIndex));
            return parts.length > 0 ? parts : str;
        };

        if (trimmed.startsWith('- ') || trimmed.startsWith('* '))
            return (
                <div key={idx} className="bubble-list-item">
                    <span className="bubble-bullet">›</span>
                    <span className="bubble-list-text">{formatInlineTokens(trimmed.substring(2))}</span>
                </div>
            );
        return <p key={idx} className="bubble-para">{formatInlineTokens(trimmed)}</p>;
    });
};

/* ── Stat capsule data ──────────────────────────────────────────── */
const STATS = [
    { icon: '🏆', text: '1st Place · IEEE Genesis',  color: 'gold'    },
    { icon: '⚡', text: '4th Runner-Up · Hack MSC',   color: 'cyan'    },
    { icon: '✦',  text: "GSSoC '26 Contributor",      color: 'violet'  },
    { icon: '📊', text: '9.15 / 10 CGPA',             color: 'emerald' },
];

/* ── Hero ───────────────────────────────────────────────────────── */
const Hero = ({ onTerminalClick }) => {
    const roles = [
        "RAG & Multimodal AI Architectures",
        "Deep Learning & Computer Vision",
        "Full-Stack Web Engineering",
        "Production ML Pipelines",
    ];
    const [roleIndex, setRoleIndex] = useState(0);
    const [chatOpen,  setChatOpen]  = useState(false);

    /* Scroll-linked parallax (Lenis) */
    const heroRef = useRef(null);
    const { scrollYProgress: heroScroll } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });
    const heroY  = useTransform(heroScroll, [0, 1], ['0%', '-22%']);
    const heroOp = useTransform(heroScroll, [0, 0.6], [1, 0]);

    /* AI chat state */
    const liveApiConfigured = isGeminiLive();
    const [messages, setMessages] = useState([{
        id: 'welcome', sender: 'bot',
        text: `Hello! I'm Udeep's portfolio assistant${liveApiConfigured ? ' powered by Gemini AI' : ''}. Ask me anything about his deep learning models, 9.15 CGPA at SRM AP, or hackathon wins!`,
        source: liveApiConfigured ? 'gemini' : 'offline',
        time: 'Just now',
    }]);
    const [inputText,  setInputText]  = useState('');
    const [isTyping,   setIsTyping]   = useState(false);
    const chatContainerRef = useRef(null);

    /* Role cycling */
    useEffect(() => {
        const t = setInterval(() => setRoleIndex(p => (p + 1) % roles.length), 3200);
        return () => clearInterval(t);
    }, [roles.length]);

    /* Auto-scroll chat */
    useEffect(() => {
        if (messages.length > 1 && chatContainerRef.current)
            chatContainerRef.current.scrollTo({ top: chatContainerRef.current.scrollHeight, behavior: 'smooth' });
    }, [messages, isTyping]);

    /* Close chat on Escape */
    useEffect(() => {
        const fn = (e) => { if (e.key === 'Escape') setChatOpen(false); };
        window.addEventListener('keydown', fn);
        return () => window.removeEventListener('keydown', fn);
    }, []);

    /* Chat handlers */
    const handleSendMessage = async (queryText) => {
        const query = queryText || inputText;
        if (!query.trim() || isTyping) return;
        const userMsg = { id: `user-${Date.now()}`, sender: 'user', text: query,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        const updatedHistory = [...messages, userMsg];
        setMessages(updatedHistory);
        setInputText('');
        setIsTyping(true);
        try {
            const res = await askGeminiAssistant(query, updatedHistory);
            setMessages(prev => [...prev, { id: `bot-${Date.now()}`, sender: 'bot',
                text: res.text, source: res.source,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
        } catch {
            setMessages(prev => [...prev, { id: `bot-${Date.now()}`, sender: 'bot',
                text: "Udeep is an Applied AI Engineer at SRM University AP (9.15 CGPA). He won 1st Place (AI/ML) at IEEE Genesis Hackathon 2026 for OpsPilot, and 4th Runner-Up at Hack MSC 2.0. Feel free to explore his projects below!",
                source: 'offline', time: 'Just now' }]);
        } finally { setIsTyping(false); }
    };

    const handleResetChat = () => {
        setMessages([{ id: `welcome-${Date.now()}`, sender: 'bot',
            text: "Chat cleared! Ask me anything about Udeep's AI models, academic record, or technical capabilities.",
            source: liveApiConfigured ? 'gemini' : 'offline', time: 'Just now' }]);
        setInputText('');
    };

    return (
        <section id="about" className="hero-section" ref={heroRef}>

            {/* ── Aurora background bloom ── */}
            <div className="hero-aurora" aria-hidden="true">
                <div className="aurora-orb aurora-cyan" />
                <div className="aurora-orb aurora-violet" />
            </div>

            {/* ── Animated grid overlay ── */}
            <div className="hero-grid-overlay" aria-hidden="true" />

            {/* ── All centred content ── */}
            <motion.div
                className="hero-centered"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                style={{ y: heroY, opacity: heroOp }}
            >
                {/* Top meta row */}
                <div className="hero-meta-row">
                    <div className="status-badge glass-panel">
                        <span className="dot-indicator" />
                        Available for AI/ML Roles
                    </div>
                    <span className="hero-dot-sep" aria-hidden="true">·</span>
                    <span className="academic-tag">SRM AP · 9.15 CGPA</span>
                </div>

                {/* Giant display heading */}
                <h1 className="hero-display-heading">
                    Udeep Chowdary <span className="hero-name-accent">Naripeddi</span>
                </h1>

                {/* Role line with rotating slot */}
                <div className="hero-role-row">
                    <span className="role-primary">AI &amp; Machine Learning Engineer</span>
                    <span className="role-em-dash" aria-hidden="true">—</span>
                    <div className="rotating-slot">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={roleIndex}
                                initial={{ y: 16, opacity: 0 }}
                                animate={{ y: 0,  opacity: 1 }}
                                exit={  { y: -16, opacity: 0 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="role-rotating"
                            >
                                {roles[roleIndex]}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Description */}
                <p className="hero-description">
                    Computer Science undergraduate specializing in applied Deep Learning, Computer
                    Vision diagnostics, and RAG architectures — backed by production Full Stack
                    engineering foundations.
                </p>

                {/* Stat capsule strip */}
                <div className="hero-stat-strip">
                    {STATS.map((s, i) => (
                        <motion.div
                            key={i}
                            className={`stat-capsule stat-${s.color}`}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, delay: 0.35 + i * 0.07, ease: 'easeOut' }}
                        >
                            <span className="stat-icon">{s.icon}</span>
                            <span className="stat-text">{s.text}</span>
                        </motion.div>
                    ))}
                </div>

                {/* Action buttons */}
                <div className="hero-actions">
                    <Magnetic>
                        <a href="#projects" className="btn btn-primary">
                            Explore Work <ArrowRight size={17} className="btn-icon" />
                        </a>
                    </Magnetic>
                    {onTerminalClick && (
                        <Magnetic>
                            <button onClick={onTerminalClick} className="btn btn-outline terminal-trigger-btn">
                                <Terminal size={16} /> Interactive Terminal
                            </button>
                        </Magnetic>
                    )}
                    <Magnetic>
                        <a href="/UdeepChowdaryNaripeddi_resume.pdf"
                            download="UdeepChowdaryNaripeddi_Resume.pdf"
                            className="btn btn-outline">
                            Resume <Download size={15} className="btn-icon" />
                        </a>
                    </Magnetic>
                </div>

                {/* Ask-me pill — triggers floating chat panel */}
                <motion.button
                    className="ask-me-pill"
                    onClick={() => setChatOpen(true)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                >
                    <MessageCircle size={15} className="ask-icon" />
                    Ask me anything about Udeep
                    <ArrowRight size={13} className="ask-arrow" />
                </motion.button>

                {/* Social icons */}
                <div className="hero-socials">
                    <Magnetic>
                        <a href="https://github.com/UdeepChowdary" target="_blank" rel="noopener noreferrer"
                            className="social-icon" aria-label="GitHub">
                            <Github size={18} />
                        </a>
                    </Magnetic>
                    <Magnetic>
                        <a href="https://www.linkedin.com/in/udeep-chowdary-naripeddi-99908627b"
                            target="_blank" rel="noopener noreferrer"
                            className="social-icon" aria-label="LinkedIn">
                            <Linkedin size={18} />
                        </a>
                    </Magnetic>
                    <Magnetic>
                        <a href="mailto:udeepchowdary06@gmail.com" className="social-icon" aria-label="Email">
                            <Mail size={18} />
                        </a>
                    </Magnetic>
                </div>
            </motion.div>

            {/* ═══════════════════════════════════════════════════════
                FLOATING AI CHAT PANEL (slide-up modal)
                Identical functionality — just repositioned
            ═══════════════════════════════════════════════════════ */}
            <AnimatePresence>
                {chatOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="chat-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setChatOpen(false)}
                        />

                        {/* Panel */}
                        <motion.div
                            className="chat-float-panel glass-panel"
                            initial={{ opacity: 0, y: 40, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0,  scale: 1    }}
                            exit={{   opacity: 0, y: 40, scale: 0.97 }}
                            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                            role="dialog" aria-modal="true" aria-label="Udeep AI Assistant"
                        >
                            {/* Header */}
                            <div className="chat-card-header">
                                <div className="chat-header-profile">
                                    <div className="chat-avatar-glow">
                                        <Sparkles size={15} className="chat-avatar-icon" />
                                    </div>
                                    <div className="chat-header-text">
                                        <div className="chat-title-row">
                                            <h3 className="chat-title">Udeep AI Assistant</h3>
                                            {liveApiConfigured ? (
                                                <span className="chat-verified-pill live"><Zap size={10} /> Gemini 2.5 Flash</span>
                                            ) : (
                                                <span className="chat-verified-pill">Portfolio Knowledge Base</span>
                                            )}
                                        </div>
                                        <div className="chat-status-sub">
                                            <span className={`chat-online-dot ${liveApiConfigured ? 'live-dot' : ''}`} />
                                            <span>{liveApiConfigured ? 'Live Generative AI · Context Grounded' : 'Smart Local Engine · 100% Uptime'}</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button type="button" className="chat-reset-btn" onClick={handleResetChat}
                                        title="Reset Conversation" aria-label="Reset">
                                        <RotateCcw size={14} />
                                    </button>
                                    <button type="button" className="chat-reset-btn" onClick={() => setChatOpen(false)}
                                        title="Close" aria-label="Close chat">
                                        <X size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Suggestion chips */}
                            <div className="chat-suggestions-strip">
                                {SUGGESTIONS.map((sug, i) => {
                                    const Icon = sug.icon;
                                    return (
                                        <button key={i} type="button" className="chat-sug-chip"
                                            onClick={() => handleSendMessage(sug.query)} disabled={isTyping}>
                                            {Icon && <Icon size={12} className="sug-icon" />}
                                            <span>{sug.label}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Messages */}
                            <div className="chat-messages-container" ref={chatContainerRef}>
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`chat-message-row ${msg.sender}`}>
                                        {msg.sender === 'bot' && <div className="msg-avatar bot"><Bot size={14} /></div>}
                                        <div className={`chat-bubble ${msg.sender}`}>
                                            <div className="bubble-formatted-content">
                                                {renderFormattedContent(msg.text)}
                                            </div>
                                            <div className="bubble-meta-footer">
                                                {msg.source === 'gemini' && (
                                                    <span className="source-badge gemini"><Sparkles size={9} /> Gemini</span>
                                                )}
                                                <span className="bubble-timestamp">{msg.time}</span>
                                            </div>
                                        </div>
                                        {msg.sender === 'user' && <div className="msg-avatar user"><User size={14} /></div>}
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="chat-message-row bot">
                                        <div className="msg-avatar bot"><Bot size={14} /></div>
                                        <div className="chat-bubble bot typing-bubble">
                                            <div className="typing-dots"><span/><span/><span/></div>
                                            <span className="typing-label">
                                                {liveApiConfigured ? 'Generating with Gemini AI...' : 'Searching portfolio knowledge base...'}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Input */}
                            <form className="chat-input-form" onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
                                <input type="text" className="chat-text-input"
                                    placeholder="Ask anything about Udeep…"
                                    value={inputText}
                                    onChange={(e) => setInputText(e.target.value)}
                                    disabled={isTyping}
                                    autoFocus
                                />
                                <button type="submit" className="chat-send-btn"
                                    disabled={!inputText.trim() || isTyping} aria-label="Send">
                                    <Send size={15} />
                                </button>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Hero;
