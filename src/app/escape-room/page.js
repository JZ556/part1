"use client";

import { useState, useEffect } from 'react';

export default function EscapeRoom() {
    // Game state management
    const [gameState, setGameState] = useState('waiting'); // 'waiting', 'playing', 'won', 'lost'
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const [currentStage, setCurrentStage] = useState(1);

    // Timer effect
    useEffect(() => {
        if (gameState === 'playing' && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setGameState('lost');
        }
    }, [gameState, timeLeft]);

    // Format time as MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    // Start game function
    const startGame = () => {
        setGameState('playing');
        setTimeLeft(300);
        setCurrentStage(1);
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
                        <p className="text-white">Challenge content will go here...</p>
                        <button className="btn btn-primary">Submit Answer</button>
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