import React, { useState, useEffect } from 'react';
import './App.css';
import MallForm from './components/MallForm';
import MallList from './components/MallList';

const App = () => {
  const [malls, setMalls] = useState([]);
  const [editingMall, setEditingMall] = useState(null);

  useEffect(() => {
    fetchMalls();
  }, []);

  const fetchMalls = async () => {
    try {
      // Updated API endpoint to the Mall service URL
      const response = await fetch('http://localhost:8080/mall');
      const data = await response.json();
      setMalls(data);
    } catch (error) {
      console.error('Error fetching malls:', error);
    }
  };

  return (
    <div className="App">
      <h1>Mall Management System</h1>
      <MallForm
        fetchMalls={fetchMalls}
        editingMall={editingMall}
        setEditingMall={setEditingMall}
      />
      <MallList
        malls={malls}
        fetchMalls={fetchMalls}
        setEditingMall={setEditingMall}
      />
    </div>
  );
};

export default App;