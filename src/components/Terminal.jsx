import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { COMMANDS } from '../data/terminalCommands';
import './Terminal.css';

// ============================================
// MATRIX RAIN COMPONENT
// ============================================
const MatrixRain = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const columns = Math.floor(canvas.width / 20) + 1;
        const yPositions = Array(columns).fill(0);

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Digital green style
            ctx.fillStyle = '#00ffcc';
            ctx.font = '15px monospace';

            for (let i = 0; i < yPositions.length; i++) {
                // Random characters
                const text = String.fromCharCode(33 + Math.floor(Math.random() * 93));
                const x = i * 20;
                const y = yPositions[i];

                ctx.fillText(text, x, y);

                if (y > 100 + Math.random() * 10000) {
                    yPositions[i] = 0;
                } else {
                    yPositions[i] = y + 20;
                }
            }
        };

        const loop = () => {
            draw();
            animationId = requestAnimationFrame(loop);
        };
        loop();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas 
            ref={canvasRef} 
            className="matrix-rain" 
            style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                width: '100vw', 
                height: '100vh', 
                zIndex: 0, 
                pointerEvents: 'none',
                opacity: 0.75
            }} 
        />
    );
};

// ============================================
// CLASSIC SNAKE GAME COMPONENT
// ============================================
const SnakeGame = ({ onExit }) => {
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('snakeHighScore') || '0', 10));
    const [gameOver, setGameOver] = useState(false);
    
    const canvasRef = useRef(null);
    const directionRef = useRef('RIGHT');
    const snakeRef = useRef([[5, 5], [4, 5], [3, 5]]);
    const foodRef = useRef([10, 10]);
    const gameIntervalRef = useRef(null);

    const restartGame = useCallback(() => {
        snakeRef.current = [[5, 5], [4, 5], [3, 5]];
        directionRef.current = 'RIGHT';
        foodRef.current = [Math.floor(Math.random() * 19), Math.floor(Math.random() * 19)];
        setScore(0);
        setGameOver(false);
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', ' '].includes(e.key)) {
                e.preventDefault(); // Stop page scrolling
            }
            
            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                    if (directionRef.current !== 'DOWN') directionRef.current = 'UP';
                    break;
                case 'ArrowDown':
                case 's':
                    if (directionRef.current !== 'UP') directionRef.current = 'DOWN';
                    break;
                case 'ArrowLeft':
                case 'a':
                    if (directionRef.current !== 'RIGHT') directionRef.current = 'LEFT';
                    break;
                case 'ArrowRight':
                case 'd':
                    if (directionRef.current !== 'LEFT') directionRef.current = 'RIGHT';
                    break;
                case 'Escape':
                    onExit();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onExit]);

    // Game physics loop
    useEffect(() => {
        if (gameOver) return;

        const moveSnake = () => {
            const head = [...snakeRef.current[0]];
            const dir = directionRef.current;

            if (dir === 'UP') head[1] -= 1;
            else if (dir === 'DOWN') head[1] += 1;
            else if (dir === 'LEFT') head[0] -= 1;
            else if (dir === 'RIGHT') head[0] += 1;

            const gridCount = 20;
            const hitWall = head[0] < 0 || head[0] >= gridCount || head[1] < 0 || head[1] >= gridCount;
            const hitSelf = snakeRef.current.some(segment => segment[0] === head[0] && segment[1] === head[1]);

            if (hitWall || hitSelf) {
                setGameOver(true);
                return;
            }

            const newSnake = [head, ...snakeRef.current];

            // Eat food detection
            if (head[0] === foodRef.current[0] && head[1] === foodRef.current[1]) {
                const newScore = score + 10;
                setScore(newScore);
                if (newScore > highScore) {
                    setHighScore(newScore);
                    localStorage.setItem('snakeHighScore', String(newScore));
                }
                
                // Spawn food in empty space
                let newFood;
                while (true) {
                    newFood = [Math.floor(Math.random() * 19), Math.floor(Math.random() * 19)];
                    const onSnake = snakeRef.current.some(seg => seg[0] === newFood[0] && seg[1] === newFood[1]);
                    if (!onSnake) break;
                }
                foodRef.current = newFood;
            } else {
                newSnake.pop();
            }

            snakeRef.current = newSnake;
        };

        gameIntervalRef.current = setInterval(moveSnake, 110);
        return () => clearInterval(gameIntervalRef.current);
    }, [gameOver, score, highScore]);

    // Canvas drawing loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const gridCount = 20;
        const cellSize = canvas.width / gridCount;

        const draw = () => {
            // Retro background
            ctx.fillStyle = '#06060c';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Subdued gridlines
            ctx.strokeStyle = '#10101d';
            ctx.lineWidth = 0.5;
            for (let i = 0; i <= gridCount; i++) {
                ctx.beginPath();
                ctx.moveTo(i * cellSize, 0);
                ctx.lineTo(i * cellSize, canvas.height);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(0, i * cellSize);
                ctx.lineTo(canvas.width, i * cellSize);
                ctx.stroke();
            }

            // Food (Neon Red Sphere)
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#f43f5e';
            ctx.fillStyle = '#f43f5e';
            ctx.beginPath();
            const foodX = foodRef.current[0] * cellSize + cellSize / 2;
            const foodY = foodRef.current[1] * cellSize + cellSize / 2;
            ctx.arc(foodX, foodY, cellSize / 2 - 2, 0, 2 * Math.PI);
            ctx.fill();

            // Snake Body (Neon Purple/Teal shades)
            ctx.shadowColor = '#00ffcc';
            ctx.shadowBlur = 6;
            snakeRef.current.forEach((segment, index) => {
                ctx.fillStyle = index === 0 ? '#00ffcc' : '#a855f7';
                ctx.fillRect(
                    segment[0] * cellSize + 1,
                    segment[1] * cellSize + 1,
                    cellSize - 2,
                    cellSize - 2
                );
            });
            ctx.shadowBlur = 0; // reset
        };

        draw();
    }, [gameOver, score]);

    return (
        <div className="term-snake-container">
            <div className="game-status-bar">
                <span>Score: <b className="gradient-text">{score}</b></span>
                <span>High Score: <b className="gradient-text">{highScore}</b></span>
                <button className="game-exit-btn" onClick={onExit}>Exit [ESC]</button>
            </div>
            <div className="game-board-area">
                <canvas ref={canvasRef} width="340" height="340" className="game-canvas" />
                {gameOver && (
                    <div className="game-over-modal">
                        <h3>GAME OVER</h3>
                        <p>Your Score: {score}</p>
                        <button className="game-play-btn" onClick={restartGame}>Play Again</button>
                    </div>
                )}
            </div>
            <div className="game-controls-legend">
                <span>🎮 Move: <b>W, A, S, D</b> or <b>Arrow Keys</b></span>
            </div>
        </div>
    );
};

// ============================================
// MAIN TERMINAL COMPONENT
// ============================================
const Terminal = ({ isOpen, onClose, onOpen }) => {
    const [history, setHistory] = useState([
        { type: 'output', text: 'Welcome to UdeepOS v1.0.0.' },
        { type: 'output', text: 'Type "help" for a list of available commands.' }
    ]);
    const [input, setInput] = useState('');
    const [isMatrixActive, setIsMatrixActive] = useState(false);
    const [isSnakeActive, setIsSnakeActive] = useState(false);

    const endRef = useRef(null);
    const inputRef = useRef(null);

    // Auto scroll to bottom
    useEffect(() => {
        if (endRef.current) {
            endRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history, isOpen, isSnakeActive]);

    // Lock body scroll when terminal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

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

    // Trap focus inside terminal window when open
    useEffect(() => {
        if (!isOpen) return;

        const handleFocusTrap = (e) => {
            if (e.key !== 'Tab') return;

            const focusableElements = [
                document.querySelector('.term-btn.close'),
                inputRef.current
            ].filter(Boolean);

            if (focusableElements.length === 0) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

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
    }, [isOpen]);

    // Handle autofocus when opened
    useEffect(() => {
        if (isOpen && !isSnakeActive) {
            const timer = setTimeout(() => {
                inputRef.current?.focus();
            }, 50);
            return () => clearTimeout(timer);
        }
    }, [isOpen, isSnakeActive]);

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
            } else if (cmd === 'matrix') {
                setIsMatrixActive(prev => {
                    const active = !prev;
                    newHistory.push({ 
                        type: 'output', 
                        text: active 
                            ? 'Matrix digital rain backdrop activated. Type "matrix" again to turn it off.' 
                            : 'Matrix digital rain backdrop deactivated.' 
                    });
                    return active;
                });
            } else if (cmd === 'snake') {
                setIsSnakeActive(true);
                newHistory.push({ type: 'output', text: 'Launching classic Snake game...' });
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
                    {isMatrixActive && <MatrixRain />}

                    <motion.div 
                        className="terminal-window"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        onClick={(e) => e.stopPropagation()}
                        style={{ zIndex: 10 }}
                    >
                        <div className="terminal-header">
                            <div className="terminal-buttons">
                                <button className="term-btn close" onClick={onClose} aria-label="Close terminal window"><X size={10} /></button>
                                <button className="term-btn minimize" tabIndex="-1" aria-hidden="true" disabled></button>
                                <button className="term-btn maximize" tabIndex="-1" aria-hidden="true" disabled></button>
                            </div>
                            <div className="terminal-title">
                                <TerminalIcon size={14} /> udeep-portfolio - bash {isSnakeActive && ' - snake.sh'}
                            </div>
                        </div>
                        
                        <div className="terminal-body" onClick={() => !isSnakeActive && inputRef.current?.focus()}>
                            {isSnakeActive ? (
                                <SnakeGame onExit={() => setIsSnakeActive(false)} />
                            ) : (
                                <>
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
                                            aria-label="Terminal command input"
                                        />
                                    </div>
                                    <div ref={endRef} />
                                </>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Terminal;
