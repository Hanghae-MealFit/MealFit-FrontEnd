import React from 'react';
import { Router, Routes, Route } from 'react-router-dom'
import './App.css';
import Signup from './components/Signup';

function App() {
  return (
    <Routes>
      <Route path="user/signup" element = { <Signup /> } />
    </Routes>
  );
}

export default App;