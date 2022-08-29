import React, { useEffect } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { MemoizedSidebar } from "./Sidebar";
import Cards from "../elements/Cards";
import Circle from "../elements/Circle";
import Dimmed from "../elements/DimmedLayer";

import { loadMainUserDB } from '../redux/modules/userinfo'
import { loadUserWeightDB } from '../redux/modules/userweight';
import { loadPostDB } from "../redux/modules/post";

const Main = () => {
  const data = useSelector((state) => state.post.post.content);
  const MainData = data.sort((a,b) => (b.view - a.view)).slice(0, 4)

  const weight = useSelector((state) => state.userweight.data.data);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = React.useState(false);

  const LoginCheck = () => {
    const Token = {
      authorization: sessionStorage.getItem("accessToken"),
      refresh_token: sessionStorage.getItem("refreshToken")
    }
    // console.log(Token)
    if (Token.authorization !== null && Token.refresh_token !== null) {
      setIsLogin(true)
    }
  }

  useEffect(() => {
    dispatch(loadMainUserDB())
    dispatch(loadUserWeightDB())
    dispatch(loadPostDB())
    LoginCheck()
  }, [])

  return (
    <Wrap>
      <MemoizedSidebar />
      <Container>
        <div style={{ display: "flex", width: "100%", height: "55%", backgroundColor: "#fff", position: "relative" }}>
          {
            !isLogin ? (
              <Dimmed />
            ) : (
              null
            )
          }
          <Item1 style={{ filter: !isLogin ? "blur(6px)" : "none" }}>
            <Circle />
          </Item1>
          <GrapWrap style={{ filter: !isLogin ? "blur(6px)" : "none" }}>
            <Item2>
              <Titlebar>
                <Titletag>
                  <p>몸무게 변화량</p>
                </Titletag>
              </Titlebar>
            </Item2>
            <Item3>
              <Titlebar>
                <Titletag>
                  <p>체지방 변화량</p>
                </Titletag>
              </Titlebar>
            </Item3>
          </GrapWrap>
        </div>
        <div style={{ width: "100%", height: "45%" }}>
          <Item4>
            <Titlebar>
              <Titletag>
                <p>오늘의 식단</p>
              </Titletag>
            </Titlebar>
            <CardList>
              {MainData.map((v, idx) => (
                <CardsBox
                  onClick={() => {
                    navigate(`/post/${v.postId}`);
                  }}
                  key={idx}
                >
                  <Cards post={v} />
                </CardsBox>
              ))}
            </CardList>
          </Item4>
        </div>
      </Container>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  // background-color: yellow;
`;

const Titlebar = styled.div`
  width: calc(100% - 260px);
  height: 10%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background-color: red;
`;


const Titletag = styled.div`
  width: 130px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0px 0px 15px 0px;
  background-color: #ccc;
  p {
  font-size: 18px;
  font-weight: bold;
  height: 12%;
  display: flex;
  align-items: center;
  justify-content: center;
  }
`;

const Container = styled.div`
  // border: 5px solid blue;
  width: calc(100% - 260px);
  height: 100%;
  margin-left: 260px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
`;

const Item1 = styled.div`
  // border: 5px solid green;
  width: 50%;
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const GrapWrap = styled.div`
    width: 50%;
    height: 100%;
    // background-color: yellow;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;

const Item2 = styled.div`
    width: 80%;
    height: 40%;
    // border: 5px solid pink;
    // background-color: lightgray;
    // position: relative;
 `;

const Item3 = styled.div`
    width: 80%;
    // border: 5px solid hotpink;
    height: 40%;
    // background-color: lightgray;
    // position: relative;
 `;

const Item4 = styled.div`
    // border: 5px solid red;
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: space-evenly;
    // background-color: lightgray;
 `;


const CircleWrap = styled.div`
  position: relative;
  // 포지션 값을 가지고 있고 너가 쓰겠다면 부모가 되겠다
  // absolute; 부모에 맞춰서 위치를 옮기겠다
  display: flex;
  align-items: center;
  width: 420px;
  height: 420px;
  background: #F6EAE0;
  border-radius: 50%;
  // border: 3px solid #FFB0AC;
`

const InsideCircle = styled.div`
position: absolute;
width: 380px;
height: 380px;
left: calc(50% - 190px);
top: calc(50% - 190px);
border-radius: 50%;
background: #FFB0AC;
display: flex;
justify-content: center;
text-align: center;
flex-direction: column;
z-index: 100;
font-weight: 700;
font-size: 16px;
line-height: 14px;
`

const CardList = styled.div`
  width: 100%;
  height: 88%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;

// flex-basis: 33.3%;
// flex-wrap : wrap;
// border: 5px solid red;
// background-color: blue;
`;

const CardsBox = styled.div`
  width: 320px;
  height: 80%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  // border: 5px solid red;
  // background-color: blue;
`;

export default Main;