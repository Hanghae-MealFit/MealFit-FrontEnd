import React from "react";
import styled from "styled-components";
import axios from 'axios';

import Sidebar from "./Sidebar";

const MyPage = () => {
    return (
    <Wrap>
        <Sidebar />
        <Container>
        <div>마이페이지</div>
        </Container>
    </Wrap>
)
}

const Wrap = styled.div`
  // background-color: yellow;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  `;

const Container = styled.div`
  // border: 5px solid blue;
  position: absolute;
  width: 700px;
  height: 860px;
  margin-left: 260px;
  border-radius: 30px;
  background-color: white;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  p {
    position: relative;
    bottom: -20px;
    font-size: 16px;
    color: #D9D9D9;
  }
  `;

export default MyPage;