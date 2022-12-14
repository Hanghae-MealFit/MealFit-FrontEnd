import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import './App.css';
import './fonts/fonts.css'
import { MemoizedSidebar } from './components/Sidebar';
import MyPage from './components/MyPage';
import MyPageChange from './components/MyPageChange';
import PasswordChange from './components/PasswordChange';
import Main from './components/Main';
import Signup from './components/Signup';
import SignupSNS from './components/SignupSNS';
import FindMyInfo from './components/FindMyInfo';
import Login from './components/Login';
import SocialUserCheck from './components/SocialUserCheck';
import EmailVerify from './components/EmailVerify';
import Record from './components/Record';
import Post from './components/Post';
import PostUp from './components/PostUp';
import PostView from './components/PostView';


function App() {
  return (
    <Wrap>
      <MemoizedSidebar />
      <Routes>
        <Route path="/" element = { <Main /> } />
        <Route path="user/info" element = { <MyPage /> } />
        <Route path="user/info/edit" element = { <MyPageChange /> } />
        <Route path="user/info/password" element = { <PasswordChange /> } />
        <Route path="user/signup" element = { <Signup /> } />
        <Route path="user/signupsns" element = { <SignupSNS /> } />
        <Route path="user/login" element = { <Login /> } />
        <Route path="user/find" element = { <FindMyInfo /> } />
        <Route path="oauth2/redirect" element = { <SocialUserCheck /> } />
        <Route path="user/verify" element = { <EmailVerify /> } />
        <Route path="record" element = { <Record /> } />
        <Route path="post/all" element = { <Post /> } />
        <Route path="post" element = { <PostUp /> } />
        <Route path="post/:postId/edit" element = { <PostUp /> } />
        <Route path="post/:postId" element = { <PostView /> } />
      </Routes>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default App;