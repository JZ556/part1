"use client";

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load saved theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark-mode');
    }
  }, []);

  const handleDarkModeToggle = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    // Save to localStorage
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    // Apply dark mode to the html element
    document.documentElement.classList.toggle('dark-mode');
  };

  return (
    <nav className={`navbar navbar-expand-lg ${isDarkMode ? 'navbar-dark bg-dark' : 'bg-body-tertiary'}`}>
      <div className="container-fluid">
        {/* Navigation Links - Left Side */}
        <div className="navbar-nav me-auto">
          <a className="nav-link active" aria-current="page" href="/">Tabs</a>
          <a className="nav-link" href="/pre-lab">Pre-lab Questions</a>
          <a className="nav-link" href="/escape-room">Escape Room</a>
          <a className="nav-link" href="/coding-races">Coding Races</a>
          <a className="nav-link" href="/about">About</a>
        </div>
        
        {/* Right Side - Dark Mode Toggle + Hamburger */}
        <div className="d-flex align-items-center">
          {/* Dark Mode Toggle */}
          <div className="form-check form-switch me-5">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="darkModeSwitch"
              checked={isDarkMode}
              onChange={handleDarkModeToggle}
            />
            <label className="form-check-label" htmlFor="darkModeSwitch">
              Light Mode/Dark Mode
            </label>
          </div>
          
          {/* Hamburger Menu Button - Always Visible */}
          <button className={`btn ${isDarkMode ? 'btn-outline-light' : 'btn-outline-dark'}`} type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
