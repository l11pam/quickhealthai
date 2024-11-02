import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SymptomChecker from './components/SymptomChecker';
import HealthTracker from './components/HealthTracker';
import './styles.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Home</Link> | <Link to="/symptom-checker">Symptom Checker</Link> | <Link to="/health-tracker">Health Tracker</Link>
        </nav>
        <Routes>
          <Route path="/" element={<h1>Welcome to QuickHealth AI</h1>} />
          <Route path="/symptom-checker" element={<SymptomChecker />} />
          <Route path="/health-tracker" element={<HealthTracker />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
