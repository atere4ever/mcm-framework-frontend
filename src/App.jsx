import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dashboard from './components/Dashboard';
import CountryAssessment from './components/CountryAssessment';
import ReliabilityCalculator from './components/ReliabilityCalculator';
import './App.css';

// Your ACTUAL backend URL - this is CORRECT!
const API_BASE = 'https://mcm-framework-api.vercel.app';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    // Check API health - using your REAL backend
    axios.get(`${API_BASE}/api/health`)
      .then(() => setApiStatus('online'))
      .catch(() => setApiStatus('offline'));
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎯 MCM Framework</h1>
        <p>Modular Countermeasure Allocation for LMICs</p>
        <div className="api-status">
          API Status: <span className={apiStatus}>{apiStatus}</span>
          {apiStatus === 'online' && ' ✅ Backend Connected!'}
        </div>
      </header>

      <nav className="app-nav">
        <button 
          className={currentView === 'dashboard' ? 'active' : ''}
          onClick={() => setCurrentView('dashboard')}
        >
          📊 Dashboard
        </button>
        <button 
          className={currentView === 'assessment' ? 'active' : ''}
          onClick={() => setCurrentView('assessment')}
        >
          🎯 Country Assessment
        </button>
        <button 
          className={currentView === 'calculator' ? 'active' : ''}
          onClick={() => setCurrentView('calculator')}
        >
          ❄️ Cold Chain Calculator
        </button>
      </nav>

      <main className="app-main">
        {currentView === 'dashboard' && <Dashboard />}
        {currentView === 'assessment' && <CountryAssessment />}
        {currentView === 'calculator' && <ReliabilityCalculator />}
      </main>

      <footer className="app-footer">
        <p>MCM Framework • Built for LMIC Epidemic Response • Your Novel Research</p>
      </footer>
    </div>
  );
}

export default App;
