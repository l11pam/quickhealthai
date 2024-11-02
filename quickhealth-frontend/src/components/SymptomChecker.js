import React, { useState } from 'react';
import axios from 'axios';

const SymptomChecker = () => {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState('');

  const checkSymptoms = async () => {
    try {
      const response = await axios.post('http://localhost:8000/check-symptoms', { symptoms });
      setResult(response.data.prediction); // Adjust based on your API's response structure
    } catch (error) {
      console.error('Error checking symptoms:', error);
    }
  };

  return (
    <div>
      <h2>Symptom Checker</h2>
      <input
        type="text"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder="Enter your symptoms"
      />
      <button onClick={checkSymptoms}>Check Symptoms</button>
      <p>{result}</p>
    </div>
  );
};

export default SymptomChecker;
