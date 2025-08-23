

"use client";

import { useState } from 'react';

export default function Home() {
  const [tabs, setTabs] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTab = () => {
    if (inputValue.trim()) {
      const newTab = {
        id: Date.now(), // Simple unique ID
        title: inputValue,
        content: `Content for ${inputValue}`
      };
      setTabs([...tabs, newTab]);
      setInputValue(''); // Clear input
    }
  };

  const removeTab = (id) => {
    setTabs(tabs.filter(tab => tab.id !== id));
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
                    onKeyPress={(e) => e.key === 'Enter' && addTab()}
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
                  <p className="text-muted">No tabs created yet. Add your first tab above!</p>
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
              <h4 className="mb-0">Output & Preview</h4>
            </div>
            <div className="card-body">
              <p className="text-muted">This section will contain:</p>
              <ul>
                <li>HTML Output button</li>
                <li>Generated code preview</li>
                <li>Copy to clipboard functionality</li>
              </ul>
              <div className="alert alert-info">
                <strong>Coming soon!</strong> HTML5 code generation will appear here.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
