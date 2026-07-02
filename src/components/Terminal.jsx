import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { COMMANDS, VIRTUAL_FS } from '../data/terminalCommands';
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
    const [tick, setTick] = useState(0);
    
    const canvasRef = useRef(null);
    const directionRef = useRef('RIGHT');
    const lastMovedDirectionRef = useRef('RIGHT');
    const snakeRef = useRef([[5, 5], [4, 5], [3, 5]]);
    const foodRef = useRef([10, 10]);

    const restartGame = useCallback(() => {
        snakeRef.current = [[5, 5], [4, 5], [3, 5]];
        directionRef.current = 'RIGHT';
        lastMovedDirectionRef.current = 'RIGHT';
        
        // Spawn food off initial snake body in full 20x20 grid
        let newFood;
        while (true) {
            newFood = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];
            const onSnake = [[5, 5], [4, 5], [3, 5]].some(seg => seg[0] === newFood[0] && seg[1] === newFood[1]);
            if (!onSnake) break;
        }
        foodRef.current = newFood;
        setScore(0);
        setGameOver(false);
        setTick(0);
    }, []);

    const handleDirectionChange = useCallback((newDir) => {
        if (gameOver) {
            restartGame();
            return;
        }
        const current = lastMovedDirectionRef.current;
        if (newDir === 'UP' && current !== 'DOWN') directionRef.current = 'UP';
        if (newDir === 'DOWN' && current !== 'UP') directionRef.current = 'DOWN';
        if (newDir === 'LEFT' && current !== 'RIGHT') directionRef.current = 'LEFT';
        if (newDir === 'RIGHT' && current !== 'LEFT') directionRef.current = 'RIGHT';
    }, [gameOver, restartGame]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D', ' '].includes(e.key)) {
                e.preventDefault(); // Stop page scrolling
            }
            
            if (gameOver) {
                if (e.key !== 'Escape') {
                    restartGame();
                    e.preventDefault();
                }
                return;
            }
            
            switch (e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    handleDirectionChange('UP');
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    handleDirectionChange('DOWN');
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    handleDirectionChange('LEFT');
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    handleDirectionChange('RIGHT');
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
    }, [onExit, gameOver, restartGame, handleDirectionChange]);

    // Self-contained physics function
    const moveSnake = useCallback(() => {
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
            setScore(prevScore => {
                const newScore = prevScore + 10;
                setHighScore(prevHigh => {
                    if (newScore > prevHigh) {
                        localStorage.setItem('snakeHighScore', String(newScore));
                        return newScore;
                    }
                    return prevHigh;
                });
                return newScore;
            });
            
            // Spawn food in empty space on full 20x20 grid
            let newFood;
            while (true) {
                newFood = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];
                const onSnake = snakeRef.current.some(seg => seg[0] === newFood[0] && seg[1] === newFood[1]);
                if (!onSnake) break;
            }
            foodRef.current = newFood;
        } else {
            newSnake.pop();
        }

        snakeRef.current = newSnake;
        lastMovedDirectionRef.current = dir;
        setTick(t => t + 1);
    }, []);

    // Game loop using setTimeout for dynamic speed difficulty scaling
    useEffect(() => {
        if (gameOver) return;

        // Base delay is 130ms, gets 5ms faster every 20 score points, capped at 60ms
        const delay = Math.max(60, 130 - Math.floor(score / 20) * 5);

        const timer = setTimeout(() => {
            moveSnake();
        }, delay);

        return () => clearTimeout(timer);
    }, [gameOver, score, tick, moveSnake]);

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

            // Food (Neon Red Sphere with pulsing glow effect)
            const pulse = 2 + Math.sin(tick * 0.5) * 1.5;
            ctx.shadowBlur = 8 + pulse;
            ctx.shadowColor = '#f43f5e';
            ctx.fillStyle = '#f43f5e';
            ctx.beginPath();
            const foodX = foodRef.current[0] * cellSize + cellSize / 2;
            const foodY = foodRef.current[1] * cellSize + cellSize / 2;
            ctx.arc(foodX, foodY, cellSize / 2 - pulse, 0, 2 * Math.PI);
            ctx.fill();

            // Snake Body (Neon Purple/Teal gradient shades)
            const dir = lastMovedDirectionRef.current;
            snakeRef.current.forEach((segment, index) => {
                ctx.shadowBlur = index === 0 ? 8 : 4;
                ctx.shadowColor = index === 0 ? '#00ffcc' : '#a855f7';
                
                if (index === 0) {
                    // Snake Head (Neon Teal with rounded corners)
                    const headX = segment[0] * cellSize;
                    const headY = segment[1] * cellSize;
                    ctx.fillStyle = '#00ffcc';
                    
                    if (ctx.roundRect) {
                        ctx.beginPath();
                        ctx.roundRect(headX + 1, headY + 1, cellSize - 2, cellSize - 2, 4);
                        ctx.fill();
                    } else {
                        ctx.fillRect(headX + 1, headY + 1, cellSize - 2, cellSize - 2);
                    }

                    // Draw eyes facing the direction of travel
                    ctx.fillStyle = '#000000';
                    ctx.shadowBlur = 0; // reset shadow for eye details
                    const eyeSize = 2.5;
                    const offset = 4;
                    if (dir === 'UP') {
                        ctx.fillRect(headX + offset, headY + offset, eyeSize, eyeSize);
                        ctx.fillRect(headX + cellSize - offset - eyeSize, headY + offset, eyeSize, eyeSize);
                    } else if (dir === 'DOWN') {
                        ctx.fillRect(headX + offset, headY + cellSize - offset - eyeSize, eyeSize, eyeSize);
                        ctx.fillRect(headX + cellSize - offset - eyeSize, headY + cellSize - offset - eyeSize, eyeSize, eyeSize);
                    } else if (dir === 'LEFT') {
                        ctx.fillRect(headX + offset, headY + offset, eyeSize, eyeSize);
                        ctx.fillRect(headX + offset, headY + cellSize - offset - eyeSize, eyeSize, eyeSize);
                    } else if (dir === 'RIGHT') {
                        ctx.fillRect(headX + cellSize - offset - eyeSize, headY + offset, eyeSize, eyeSize);
                        ctx.fillRect(headX + cellSize - offset - eyeSize, headY + cellSize - offset - eyeSize, eyeSize, eyeSize);
                    }
                } else {
                    // Snake Body segments with color gradient interpolation
                    const ratio = index / snakeRef.current.length;
                    const r = Math.floor(0 + (168 - 0) * ratio);
                    const g = Math.floor(255 + (85 - 255) * ratio);
                    const b = Math.floor(204 + (247 - 204) * ratio);
                    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                    
                    const segX = segment[0] * cellSize;
                    const segY = segment[1] * cellSize;
                    
                    if (ctx.roundRect) {
                        ctx.beginPath();
                        ctx.roundRect(segX + 1.5, segY + 1.5, cellSize - 3, cellSize - 3, 2);
                        ctx.fill();
                    } else {
                        ctx.fillRect(segX + 1.5, segY + 1.5, cellSize - 3, cellSize - 3);
                    }
                }
            });
            ctx.shadowBlur = 0; // reset
        };

        draw();
    }, [gameOver, score, tick]);

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
                        <button className="game-play-btn" onClick={restartGame}>Press Any Key to Restart</button>
                    </div>
                )}
            </div>
            <div className="game-dpad">
                <button className="dpad-btn up" onClick={() => handleDirectionChange('UP')}>▲</button>
                <div className="dpad-row">
                    <button className="dpad-btn left" onClick={() => handleDirectionChange('LEFT')}>◀</button>
                    <button className="dpad-btn down" onClick={() => handleDirectionChange('DOWN')}>▼</button>
                    <button className="dpad-btn right" onClick={() => handleDirectionChange('RIGHT')}>▶</button>
                </div>
            </div>
            <div className="game-controls-legend">
                <span>🎮 Keyboard: <b>WASD</b> or <b>Arrow Keys</b></span>
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
    const [currentDir, setCurrentDir] = useState('/');
    const [isSimulating, setIsSimulating] = useState(false);
    const simulationTimersRef = useRef([]);

    const endRef = useRef(null);
    const inputRef = useRef(null);

    const cancelSimulations = useCallback(() => {
        if (simulationTimersRef.current.length > 0) {
            simulationTimersRef.current.forEach(clearTimeout);
            simulationTimersRef.current = [];
        }
        setIsSimulating(false);
    }, []);

    // Clean up simulations when closed
    useEffect(() => {
        if (!isOpen) {
            cancelSimulations();
        }
    }, [isOpen, cancelSimulations]);

    // Clean up simulations on unmount
    useEffect(() => {
        return () => {
            if (simulationTimersRef.current.length > 0) {
                simulationTimersRef.current.forEach(clearTimeout);
            }
        };
    }, []);

    // Global listener for Ctrl+C to abort simulations when open
    useEffect(() => {
        if (!isOpen) return;

        const handleGlobalKeyDown = (e) => {
            if (e.ctrlKey && e.key.toLowerCase() === 'c') {
                cancelSimulations();
                setHistory(prev => [...prev, { type: 'input', text: '^C' }]);
                setInput('');
            }
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, [isOpen, cancelSimulations]);

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

    const runBuildSimulation = (currentHistory) => {
        setIsSimulating(true);
        const steps = [
            { text: "🚀 vite v7.2.4 building for production...", delay: 200 },
            { text: "⚡ transforming...", delay: 700 },
            { text: "✓ 142 modules transformed.", delay: 1200 },
            { text: "📦 rendering chunks...", delay: 1500 },
            { text: "dist/index.html                     1.92 kB │ gzip:  0.84 kB", delay: 1900 },
            { text: "dist/assets/index-D1f9_2v9.css      4.85 kB │ gzip:  1.62 kB", delay: 2100 },
            { text: "dist/assets/index-G5t4_9b3.js     214.30 kB │ gzip: 68.10 kB", delay: 2400 },
            { text: "✨ built in 1.42s", delay: 2800 }
        ];

        steps.forEach((step, idx) => {
            const timer = setTimeout(() => {
                setHistory(prev => [...prev, { type: 'raw', text: step.text }]);
                if (idx === steps.length - 1) {
                    setIsSimulating(false);
                }
            }, step.delay);
            simulationTimersRef.current.push(timer);
        });
    };

    const runDevSimulation = (currentHistory) => {
        setIsSimulating(true);
        const steps = [
            { text: "  VITE v7.2.4  ready in 234 ms", delay: 350 },
            { text: "  ➜  Local:   http://localhost:5173/", delay: 700 },
            { text: "  ➜  Network: use --host to expose", delay: 1000 },
            { text: "  ➜  press h + enter to show help", delay: 1250 },
            { text: "💡 Dev server active. Press Ctrl+C to terminate the process.", delay: 1550 }
        ];

        steps.forEach((step, idx) => {
            const timer = setTimeout(() => {
                setHistory(prev => [...prev, { type: 'raw', text: step.text }]);
                if (idx === steps.length - 1) {
                    setIsSimulating(false);
                }
            }, step.delay);
            simulationTimersRef.current.push(timer);
        });
    };

    const handleCommand = (e) => {
        if (isSimulating) return;

        if (e.ctrlKey && e.key.toLowerCase() === 'c') {
            e.preventDefault();
            cancelSimulations();
            const promptPath = currentDir === '/' ? '~' : '~/secrets';
            setHistory(prev => [...prev, { type: 'input', text: `visitor@udeep-portfolio:${promptPath}$ ${input}^C` }]);
            setInput('');
            return;
        }

        if (e.key === 'Enter') {
            const rawInput = input.trim();
            const promptPath = currentDir === '/' ? '~' : '~/secrets';
            const promptText = `visitor@udeep-portfolio:${promptPath}$ ${rawInput}`;

            if (rawInput === '') {
                setHistory(prev => [...prev, { type: 'input', text: promptText }]);
                setInput('');
                return;
            }

            const tokens = rawInput.split(/\s+/);
            const cmd = tokens[0].toLowerCase();
            const arg = tokens.slice(1).join(' ').trim();

            let newHistory = [...history, { type: 'input', text: promptText }];

            if (cmd === 'clear') {
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
            } else if (cmd === 'ls') {
                if (currentDir === '/') {
                    newHistory.push({ 
                        type: 'raw', 
                        text: "about_me.txt    contact.txt     projects.txt    secrets/        skills.txt" 
                    });
                } else if (currentDir === '/secrets') {
                    newHistory.push({ 
                        type: 'raw', 
                        text: "passcode.txt" 
                    });
                }
            } else if (cmd === 'cd') {
                if (!arg || arg === '~' || arg === '/') {
                    setCurrentDir('/');
                } else if (arg === 'secrets' || arg === './secrets' || arg === '/secrets') {
                    if (currentDir === '/') {
                        setCurrentDir('/secrets');
                    } else {
                        newHistory.push({ type: 'error', text: 'bash: cd: secrets: No such file or directory' });
                    }
                } else if (arg === '..' || arg === '../') {
                    if (currentDir === '/secrets') {
                        setCurrentDir('/');
                    }
                } else if (arg === 'about_me.txt' || arg === 'contact.txt' || arg === 'projects.txt' || arg === 'skills.txt' || arg === 'passcode.txt') {
                    newHistory.push({ type: 'error', text: `bash: cd: ${arg}: Not a directory` });
                } else {
                    newHistory.push({ type: 'error', text: `bash: cd: ${arg}: No such file or directory` });
                }
            } else if (cmd === 'cat') {
                if (!arg) {
                    newHistory.push({ type: 'error', text: 'cat: missing filename' });
                } else if (currentDir === '/') {
                    if (arg === 'secrets') {
                        newHistory.push({ type: 'error', text: 'cat: secrets: Is a directory' });
                    } else if (VIRTUAL_FS[arg]) {
                        newHistory.push({ type: 'raw', text: VIRTUAL_FS[arg] });
                    } else {
                        newHistory.push({ type: 'error', text: `cat: ${arg}: No such file or directory` });
                    }
                } else if (currentDir === '/secrets') {
                    if (VIRTUAL_FS.secrets[arg]) {
                        newHistory.push({ type: 'raw', text: VIRTUAL_FS.secrets[arg] });
                    } else if (arg === '..' || arg === '../') {
                        newHistory.push({ type: 'error', text: 'cat: ..: Is a directory' });
                    } else {
                        newHistory.push({ type: 'error', text: `cat: ${arg}: No such file or directory` });
                    }
                }
            } else if (rawInput.toLowerCase() === 'npm run build' || rawInput.toLowerCase() === 'vite build') {
                setHistory(newHistory);
                setInput('');
                runBuildSimulation(newHistory);
                return;
            } else if (rawInput.toLowerCase() === 'npm run dev' || rawInput.toLowerCase() === 'vite' || rawInput.toLowerCase() === 'npm start') {
                setHistory(newHistory);
                setInput('');
                runDevSimulation(newHistory);
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
                                        <span className="term-prompt">
                                            visitor@udeep-portfolio:{currentDir === '/' ? '~' : '~/secrets'}$
                                        </span>
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
                                            disabled={isSimulating}
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
