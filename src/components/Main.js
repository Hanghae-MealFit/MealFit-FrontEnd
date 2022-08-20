import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Sidebar from "./Sidebar";
import Cards from "../elements/Cards";

const Main = () => {
  const data = useSelector((state) => state.card.post);
  // console.log("나야나", data);

  const [time, setTime] = React.useState(new Date());
  const interval = React.useRef(null)

  const auth = {
      authorization: sessionStorage.getItem("accessToken"),
      refresh_token: sessionStorage.getItem("refreshToken")
    };

  const GetUser = async () => {
    if(auth.authorization !== null && auth.refresh_token !== null) {
      try {
        const res = await axios.get("http://13.125.227.9:8080/user/info",
        {
          headers: {
            Authorization: `Bearer ${auth.authorization}`,
            refresh_token: `Bearer ${auth.refresh_token}`
          },
        })
        console.log(res)
      } catch(error) {
        console.log(error)
      }
    }
  }

  const GetWeight = async () => {
    if(auth.authorization !== null && auth.refresh_token !== null) {
      try {
        const res = await axios.get("http://13.125.227.9:8080/api/bodyInfo",
        {
          headers: {
            Authorization: `Bearer ${auth.authorization}`,
            refresh_token: `Bearer ${auth.refresh_token}`
          },
        })
        console.log(res)
      } catch(error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    GetUser()
    GetWeight()
  }, [])

  useEffect(() => {
    interval.current = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval.current)
  }, []);
  const Year = time.getFullYear();
  const Month = time.getMonth() + 1;
  const Day = time.getDate();
  const Hour = time.getHours();
  const Minute = time.getMinutes();
  const Second = time.getSeconds();
  const TodaySecond = 86400;
  const NowSecond = (((Hour * 60) + Minute) * 60) + Second
  const TodayPer = ((NowSecond / TodaySecond) * 100).toFixed(1)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Wrap>
      <Sidebar />
      <Container>
        <div style={{ display: "flex", width: "100%", height: "55%", backgroundColor: "#fff" }}>
          <Item1>
            <CircleWrap>
              <InsideCircle>
                <TopText>
                  <p>{Year}년 {Month < 10 ? '0' + Month : Month}월 {Day < 10 ? '0' + Day : Day}일</p>
                  <p>{Hour < 10 ? '0' + Hour : Hour} : {Minute < 10 ? '0' + Minute : Minute} : {Second < 10 ? '0' + Second : Second}</p>
                  <p>지금은 단식시간 입니다.</p>
                </TopText>
                <BottomText>
                  <p>단식 시간 : 13시 ~ 08시</p>
                  <p>음식 섭취 가능 시간 : 08시 ~ 13시</p>
                </BottomText>
              </InsideCircle>
            </CircleWrap>
          </Item1>
          <GrapWrap>
            <Item2>몸무게 변화량</Item2>
            <Item3>체지방 변화량</Item3>
          </GrapWrap>
        </div>
        <div style={{ width: "100%", height: "45%"}}>
          <Item4>
            <H2>오늘의 식단</H2>
            <CardList>
              {data.map((v, idx) => (
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

const H2 = styled.div`
  font-size: 20px;
  height: 12%;
  // margin: 40px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
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

const TopText = styled.div`
  color: #ffffff;
  font-size: 24px;
  text-shadow: -1px 0 #FE7770, 0 1px #FE7770, 1px 0 #FE7770, 0 -1px #FE7770;
`;

const BottomText = styled.div`
`;

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