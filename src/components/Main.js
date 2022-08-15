import React from "react";
import styled from "styled-components";


    const Main = () => {
        return (
            <CircleWrap>
                <InsideCircle>
                    <TopText>
                    <p>2022년 8월 13일</p>
                    <p>지금은 단식시간 입니다.</p>
                    </TopText>
                    <BottomText>
                    <p>단식 시간 : 18시 ~ 10시</p>
                    <p>음식 섭취 가능 시간 : 10시 ~ 18시</p>
                    </BottomText>
                </InsideCircle>
            </CircleWrap>
        );
}

const CircleWrap = styled.div`
    margin: 150px auto;
    width: 490px;
    height: 490px;
    left: 330px;
    top: 64px;
    background: #fefcff;
    // position: absolute;
    border-radius: 50%;
    // border: 1px solid #cdcbd0;
`

const InsideCircle = styled.div`
    width: 440px;
    height: 440px;
    left: 330px;
    top: 64px;
    border-radius: 50%;
    background: #FFB0AC;
    line-height: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
    margin-top: 25px;
    margin-left: 25px;
    // position: absolute;
    z-index: 100;
    // font-weight: 700;
    font-size: 18px;
`


const TopText = styled.div`
    color: #ffffff;
    font-size: 22px;
    text-shadow: -1px 0 #FE7770, 0 1px #FE7770, 1px 0 #FE7770, 0 -1px #FE7770;
`;

const BottomText = styled.div`

`;

export default Main;