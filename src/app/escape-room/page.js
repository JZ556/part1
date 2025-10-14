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
                        <p className="text-white mb-3">Challenge content will go here...</p>
                        <div className="mb-3">
                            <button className="btn btn-primary me-2">Submit Answer</button>
                        </div>
                        {/* Temporary button for testing - remove later */}
                        <button
                            className="btn btn-warning btn-sm"
                            onClick={completeGame}
                        >
                            🧪 Test: Complete All Stages
                        </button>
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