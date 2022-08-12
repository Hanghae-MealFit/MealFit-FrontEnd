import React from 'react';
import { Routes, Route } from 'react-router-dom'

import './App.css';
import './fonts/fonts.css'
import Signup from './components/Signup';
import Login from './components/Login';


function App() {
  return (
    <Routes>
      <Route path="user/signup" element = { <Signup /> } />
      <Route path="user/login" element = { <Login /> } />
    </Routes>
  );
}

export default App;