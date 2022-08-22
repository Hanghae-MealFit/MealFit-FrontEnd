import React from "react";
import styled from "styled-components";
import axios from 'axios';

import Sidebar from "./Sidebar";

const MyPage = () => {
    return (
    <Wrap>
        <Sidebar />
        <div>마이페이지</div>
    </Wrap>
)
}

const Wrap = styled.div`
position: absolute;
width: 700px;
height: 860px;
left: 40%;
margin: 0 auto;
border-radius: 30px;
background-color: white;
box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

export default MyPage;