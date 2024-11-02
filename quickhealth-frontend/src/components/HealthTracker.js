import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HealthTracker = () => {
  const [metrics, setMetrics] = useState({ weight: '', exerciseMinutes: '', waterIntake: '' });
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(''); // State to hold error messages

  const logMetrics = async () => {
    // Validation logic
    if (!metrics.weight || !metrics.exerciseMinutes || !metrics.waterIntake) {
      setError('Please fill out all fields.');
      return;
    }
    if (metrics.weight <= 0 || metrics.exerciseMinutes < 0 || metrics.waterIntake < 0) {
      setError('Please enter valid positive values.');
      return;
    }

    // Clear error message if validation passes
    setError('');

    try {
      await axios.post('http://localhost:5000/api/health/log', metrics);
      fetchMetrics();
      // Reset the form fields after successful logging
      setMetrics({ weight: '', exerciseMinutes: '', waterIntake: '' });
    } catch (error) {
      console.error('Error logging health metrics:', error);
      setError('Failed to log metrics. Please try again.');
    }
  };

  const fetchMetrics = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/health/userId'); // Replace 'userId' with actual user ID
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching health metrics:', error);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return (
    <div>
      <h2>Health Tracker</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error messages */}
      <input
        type="number"
        value={metrics.weight}
        onChange={(e) => setMetrics({ ...metrics, weight: e.target.value })}
        placeholder="Weight (kg)"
      />
      <input
        type="number"
        value={metrics.exerciseMinutes}
        onChange={(e) => setMetrics({ ...metrics, exerciseMinutes: e.target.value })}
        placeholder="Exercise Minutes"
      />
      <input
        type="number"
        value={metrics.waterIntake}
        onChange={(e) => setMetrics({ ...metrics, waterIntake: e.target.value })}
        placeholder="Water Intake (L)"
      />
      <button onClick={logMetrics}>Log Metrics</button>
      <h3>History:</h3>
      {history.map((item, index) => (
        <p key={index}>{JSON.stringify(item)}</p>
      ))}
    </div>
  );
};

export default HealthTracker;
