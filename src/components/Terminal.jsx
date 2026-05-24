import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { COMMANDS } from '../data/terminalCommands';
import './Terminal.css';

const Terminal = ({ isOpen, onClose, onOpen }) => {
    const [history, setHistory] = useState([
        { type: 'output', text: 'Welcome to UdeepOS v1.0.0.' },
        { type: 'output', text: 'Type "help" for a list of available commands.' }
    ]);
    const [input, setInput] = useState('');
    const endRef = useRef(null);
    const inputRef = useRef(null);

    // Auto scroll to bottom
    useEffect(() => {
        if (endRef.current) {
            endRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history, isOpen]);

    // Handle keyboard shortcut (Ctrl+`)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey && e.key === '`') {
                e.preventDefault();
                if (isOpen) onClose();
                else onOpen();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose, onOpen]);

    // Handle autofocus when opened
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            let newHistory = [...history, { type: 'input', text: `visitor@udeep-portfolio:~$ ${cmd}` }];
            
            if (cmd === '') {
                // Do nothing
            } else if (cmd === 'clear') {
                newHistory = [];
            } else if (cmd === 'exit') {
                onClose();
                setInput('');
                return;
            } else if (COMMANDS[cmd]) {
                newHistory.push({ type: 'output', text: COMMANDS[cmd] });
            } else {
                newHistory.push({ type: 'error', text: `bash: ${cmd}: command not found` });
            }

            setHistory(newHistory);
            setInput('');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    className="terminal-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div 
                        className="terminal-window"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="terminal-header">
                            <div className="terminal-buttons">
                                <button className="term-btn close" onClick={onClose}><X size={10} /></button>
                                <button className="term-btn minimize"></button>
                                <button className="term-btn maximize"></button>
                            </div>
                            <div className="terminal-title">
                                <TerminalIcon size={14} /> udeep-portfolio - bash
                            </div>
                        </div>
                        
                        <div className="terminal-body" onClick={() => inputRef.current?.focus()}>
                            {history.map((line, i) => (
                                <div key={i} className={`term-line ${line.type}`}>
                                    {line.text.split('\n').map((str, idx) => (
                                        <div key={idx}>{str}</div>
                                    ))}
                                </div>
                            ))}
                            
                            <div className="term-input-line">
                                <span className="term-prompt">visitor@udeep-portfolio:~$</span>
                                <input 
                                    ref={inputRef}
                                    id="term-input"
                                    type="text" 
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleCommand}
                                    autoComplete="off"
                                    spellCheck="false"
                                />
                            </div>
                            <div ref={endRef} />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Terminal;
