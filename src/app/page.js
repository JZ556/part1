

"use client";

import { useState, useEffect } from 'react';

export default function Home() {
  const [tabs, setTabs] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Load saved tabs on component mount
  useEffect(() => {
    const savedTabs = localStorage.getItem('tabs');
    if (savedTabs) {
      try {
        const parsedTabs = JSON.parse(savedTabs);
        setTabs(parsedTabs);
      } catch (error) {
        console.error('Error loading tabs from localStorage:', error);
        // If there's an error, start with empty array
        setTabs([]);
      }
    }
  }, []);

  const addTab = () => {
    if (inputValue.trim()) {
      const newTab = {
        id: Date.now(), // Simple unique ID
        title: inputValue,
        content: `Content for ${inputValue}`
      };
      const updatedTabs = [...tabs, newTab];
      setTabs(updatedTabs);
      
      // Save to localStorage
      localStorage.setItem('tabs', JSON.stringify(updatedTabs));
      
      setInputValue(''); // Clear input
    }
  };

  const removeTab = (id) => {
    const updatedTabs = tabs.filter(tab => tab.id !== id);
    setTabs(updatedTabs);
    
    // Save to localStorage
    localStorage.setItem('tabs', JSON.stringify(updatedTabs));
  };

  const [displayedCode, setDisplayedCode] = useState('');

  const code = `<!DOCTYPE html>
<html>
<head>
  <title>Simple HTML File</title>
</head>
<body>

  <h1 style="color: blue; font-family: 'Arial', sans-serif;">Hello, World!</h1>

</body>
</html>`;

  const generateCode = () => {
    setDisplayedCode(code);
  };

  return (
    <div className="container-fluid py-4">
      <div className="row">
        {/* Left Section - Tabs Management */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">Tabs Management</h4>
            </div>
            <div className="card-body">
              {/* Add Tab Input */}
              <div className="mb-3">
                <div className="input-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter tab name (e.g., Step 1)"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyUp={(e) => e.key === 'Enter' && addTab()}
                  />
                  <button 
                    className="btn btn-success" 
                    type="button"
                    onClick={addTab}
                  >
                    <i className="fas fa-plus"></i> Add Tab
                  </button>
                </div>
              </div>

              {/* Tabs List */}
              <div className="mb-3">
                <h6>Current Tabs:</h6>
                {tabs.length === 0 ? (
                  <p className="">No tabs created yet. Add your first tab above!</p>
                ) : (
                  <div className="list-group">
                    {tabs.map((tab) => (
                      <div key={tab.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span><strong>{tab.title}</strong></span>
                        <button 
                          className="btn btn-danger btn-sm"
                          onClick={() => removeTab(tab.id)}
                        >
                          <i className="fas fa-minus"></i> Remove
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Future Features */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">Output</h4>
            </div>
            <div className="card-body">
                 <button 
                   className="btn btn-success"
                   onClick={generateCode}
                 >
                   Generate Code 
                 </button>
               <p>HTML output with in-line css</p>
               <textarea 
                 className="form-control" 
                 rows="10" 
                 value={displayedCode}
                 onChange={(e) => setDisplayedCode(e.target.value)}
                 placeholder="Generated code will appear here..."
               >
               </textarea>
               
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
