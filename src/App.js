import React from 'react';
import { Routes, Route } from 'react-router-dom'
import styled from 'styled-components'

import './App.css';
import './fonts/fonts.css'
import Signup from './components/Signup';
import FindMyInfo from './components/FindMyInfo';
import Login from './components/Login';


function App() {
  return (
    <Wrap>
      <Routes>
        <Route path="user/signup" element = { <Signup /> } />
        <Route path="user/login" element = { <Login /> } />
        <Route path="user/find" element = { <FindMyInfo /> } />
      </Routes>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default App;