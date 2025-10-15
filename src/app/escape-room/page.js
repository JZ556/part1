"use client";

import { useState, useEffect } from 'react';

export default function EscapeRoom() {
    // Game state management
    const [gameState, setGameState] = useState('waiting'); // 'waiting', 'playing', 'won', 'lost'
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const [currentStage, setCurrentStage] = useState(1);

    // User data
    const [username, setUsername] = useState('');
    const [gameResult, setGameResult] = useState(null); // 'pass' or 'fail'

    // Stage 1 - HTML Formatting
    const [stage1Answer, setStage1Answer] = useState('');
    const [stage1Correct, setStage1Correct] = useState(false);

    // Stage 2 - Debug Challenge
    const [stage2Answer, setStage2Answer] = useState('');
    const [stage2Correct, setStage2Correct] = useState(false);

    // Timer effect
    useEffect(() => {
        if (gameState === 'playing' && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setGameState('lost');
            setGameResult('fail'); // Set result to fail
            console.log(`Game Result: ${username} - fail`);
        }
    }, [gameState, timeLeft, username]);

    // Format time as MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    // Start game function
    const startGame = () => {
        if (!username.trim()) {
            alert('Please enter your username!');
            return;
        }
        setGameState('playing');
        setTimeLeft(300);
        setCurrentStage(1);
        setGameResult(null); // Reset result
    };

    // Complete game function (when all stages are done)
    const completeGame = () => {
        setGameState('won');
        setGameResult('pass');
        console.log(`Game Result: ${username} - pass`);
    };

    // Stage 1: Check HTML formatting
    const checkStage1Answer = () => {
        const answer = stage1Answer.toLowerCase().trim();
        // Check if answer contains required HTML elements (basic structure)
        const hasDoctype = answer.includes('<!doctype html>');
        const hasHtml = answer.includes('<html>');
        const hasHead = answer.includes('<head>');
        const hasBody = answer.includes('<body>');

        if (hasDoctype && hasHtml && hasHead && hasBody) {
            setStage1Correct(true);
            alert('✅ Correct! Moving to Stage 2!');
            setCurrentStage(2);
            setStage1Answer(''); // Clear answer
        } else {
            alert('Incorrect! Make sure your HTML includes: <!DOCTYPE html>, <html>, <head>, and <body>');
        }
    };

    // Stage 2: Check calculation answer
    const checkStage2Answer = () => {
        const answer = stage2Answer.trim();
        // Check if answer is 20 (4 * 5)
        if (answer === '20') {
            setStage2Correct(true);
            alert('✅ Correct! Moving to Stage 3!');
            setCurrentStage(3);
            setStage2Answer(''); // Clear answer
        } else {
            alert('Incorrect! Calculate: 4 × 5 = ?');
        }
    };

    return (
        <div
            className="min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                backgroundImage: 'url("/escape-room-image.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}
        >
            <div className="container py-5 text-center">
                {/* Timer Display - Big and Prominent */}
                <div className="mb-4">
                    <h1 className="display-1 text-white fw-bold">
                        {formatTime(timeLeft)}
                    </h1>
                </div>

                {/* Game Content Based on State */}
                {gameState === 'waiting' && (
                    <div>
                        <h2 className="text-white mb-4">Escape Room Challenge</h2>
                        <p className="text-white mb-4">Complete 3 coding challenges to escape!</p>

                        {/* Username Input */}
                        <div className="mb-4">
                            <input
                                type="text"
                                className="form-control form-control-lg text-center"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={{ maxWidth: '300px', margin: '0 auto' }}
                            />
                        </div>

                        <button
                            className="btn btn-success btn-lg"
                            onClick={startGame}
                        >
                            Start Game
                        </button>
                    </div>
                )}

                {gameState === 'playing' && (
                    <div>
                        <h2 className="text-white mb-4">Stage {currentStage} of 3</h2>

                        {/* Stage 1: HTML Formatting Challenge */}
                        {currentStage === 1 && (
                            <div>
                                <h4 className="text-white mb-3">🔧 Basic HTML Structure Challenge</h4>
                                <p className="text-white mb-3">
                                    Write the basic HTML document structure with these 4 essential elements:
                                </p>
                                <ul className="text-white mb-3">
                                    <li>&lt;!DOCTYPE html&gt;</li>
                                    <li>&lt;html&gt;</li>
                                    <li>&lt;head&gt;</li>
                                    <li>&lt;body&gt;</li>
                                </ul>

                                <textarea
                                    className="form-control mb-3"
                                    rows="8"
                                    placeholder="Write your HTML code here..."
                                    value={stage1Answer}
                                    onChange={(e) => setStage1Answer(e.target.value)}
                                    style={{ maxWidth: '500px', margin: '0 auto' }}
                                />

                                <button
                                    className="btn btn-primary me-2"
                                    onClick={checkStage1Answer}
                                >
                                    Submit Answer
                                </button>
                            </div>
                        )}

                        {/* Stage 2: Calculation Challenge */}
                        {currentStage === 2 && (
                            <div>
                                <h4 className="text-white mb-3"> Calculation Challenge</h4>
                                <p className="text-white mb-3">
                                    Calculate the result of this function call:
                                </p>

                                <div className="bg-dark p-3 mb-3 rounded" style={{ maxWidth: '400px', margin: '0 auto' }}>
                                    <p className="text-white mb-0 font-monospace">
                                        calculateArea = (length, width) =&gt; length * width<br /><br />
                                        console.log(calculateArea(4, 5))
                                    </p>
                                </div>

                                <p className="text-white mb-3">What is the result? Enter the number:</p>

                                <input
                                    type="text"
                                    className="form-control mb-3 text-center"
                                    placeholder="Enter your answer..."
                                    value={stage2Answer}
                                    onChange={(e) => setStage2Answer(e.target.value)}
                                    style={{ maxWidth: '200px', margin: '0 auto' }}
                                />

                                <button
                                    className="btn btn-primary me-2"
                                    onClick={checkStage2Answer}
                                >
                                    Submit Answer
                                </button>
                            </div>
                        )}

                        {/* Stage 3 - Coming Next */}
                        {currentStage > 2 && (
                            <div>
                                <p className="text-white mb-3">Stage {currentStage} content coming next...</p>
                                <button
                                    className="btn btn-warning btn-sm"
                                    onClick={completeGame}
                                >
                                    🧪 Test: Complete All Stages
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {gameState === 'won' && (
                    <div>
                        <h2 className="text-success">🎉 ESCAPED! 🎉</h2>
                        <p className="text-white">Congratulations! You completed all challenges!</p>
                        <button
                            className="btn btn-success"
                            onClick={() => setGameState('waiting')}
                        >
                            Play Again
                        </button>
                    </div>
                )}

                {gameState === 'lost' && (
                    <div>
                        <h2 className="text-danger">⏰ TIME'S UP! ⏰</h2>
                        <p className="text-white">You didn't escape in time. Try again!</p>
                        <button
                            className="btn btn-warning"
                            onClick={() => setGameState('waiting')}
                        >
                            Try Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}