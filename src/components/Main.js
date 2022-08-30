import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { MemoizedSidebar } from "./Sidebar";
import Cards from "../elements/Cards";
import Circle from "../elements/Circle";
import Dimmed from "../elements/DimmedLayer";
import Rechart from "../elements/Rechart";

import { loadMainUserDB } from '../redux/modules/userinfo'
import { loadUserWeightDB } from '../redux/modules/userweight';
import { loadPostDB } from "../redux/modules/post";

const Main = () => {
  const data = useSelector((state) => state.post.post.content);
  const MainData = data.sort((a,b) => (b.view - a.view)).slice(0, 4)

  const weight = useSelector((state) => state.userweight.data.data);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ isLogin, setIsLogin ] = React.useState(false);
  const [ myWeightHover, setMyWeightHover ] = React.useState(false)
  const [ changeMyWeight, setChangeMyWeight ] = React.useState(false)
  const [ curWeight, setCurWeight ] = React.useState();
  const [ curInfoMsg, SetCurInfoMsg ] = React.useState(false);
  const [ curError, setCurError ] = React.useState("* 현재 체중을 입력해주세요.");

  const currentWeight_ref = React.useRef(null);
  const current_weight_err_ref = React.useRef(null);
  

  const Token = {
    authorization: sessionStorage.getItem("accessToken"),
    refresh_token: sessionStorage.getItem("refreshToken")
  }

  const LoginCheck = () => {  
    // console.log(Token)
    if (Token.authorization !== null && Token.refresh_token !== null) {
      setIsLogin(true)
    }
  }

  const WeightEnterMsg = () => {
    setMyWeightHover(true)
  }

  const WeightLeaveMsg = () => {
    setMyWeightHover(false)
  }

  const WeightModalOpen = () => {
    setChangeMyWeight(true)
    setMyWeightHover(false)
  }

  const WeightModalClose = () => {
    setChangeMyWeight(false)
  }

  const CurrentWeightChange = (e) => {
    // 체중 입력 시 숫자만 입력할 수 있도록 정규식 사용
    setCurWeight(e.target.value.replace(/[^0-9.]/g, ''))
    const regDot = /[\.]/g
    const regNum = /^(\d{0,3})[\.]?(\d{1})?$/g
    if(e.target.value.length === 0) {
      setCurError("* 현재 체중을 입력해주세요.")
      current_weight_err_ref.current.style.color = "#D9D9D9"
    } else if(!(regDot.test(e.target.value)) && e.target.value.length === 4) {
      setCurError("* 양식에 맞춰 작성해주세요.")
      current_weight_err_ref.current.style.color = "#FF0000";
    } else if(regNum.test(e.target.value) !== true) {
      setCurError("* 양식에 맞춰 작성해주세요.")
      current_weight_err_ref.current.style.color = "#FF0000";
    } else {
      setCurError('* 양식에 맞게 작성되었습니다.')
      current_weight_err_ref.current.style.color = "#81C147";
    }
  }

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength)
    }
  }

  let today = new Date();

  let year = today.getFullYear();
  let month = ('0' + (today.getMonth() + 1)).slice(-2);
  let day = ('0' + today.getDate()).slice(-2);

  let dateString = `${year}-${month}-${day}`;

  const SendChangeWeight = async () => {
    try {
      const res = await axios.post("http://43.200.174.111:8080/api/bodyInfo",{
        savedDate: dateString,
        weight: currentWeight_ref.current.value
      }, {
        headers: {
          Authorization: `Bearer ${Token.authorization}`,
          refresh_token: `Bearer ${Token.refresh_token}`
        },
      })
      console.log(res)
    } catch (error) {
      console.log(error)
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
              {
                changeMyWeight ?
                (
                  <WeightWrap>
                    <div className="weightWrap">
                      { curInfoMsg ? 
                        (
                          <HoverMsg>
                            정수 혹은 소수점 첫째자리까지 입력해주세요.<br />
                            <span>ex) 40 / 40.5 / 100.5</span>
                          </HoverMsg>
                        ) :
                        (
                          null
                        )
                      }
                      <h2>현재 몸무게 추가</h2>
                      <input ref={currentWeight_ref} maxLength={5} type="number" onInput={maxLengthCheck} onMouseEnter={() => SetCurInfoMsg(true)} onMouseLeave={() => SetCurInfoMsg(false)} placeholder='현재 체중을 입력해주세요.' onChange={(e) => {CurrentWeightChange(e)}} value={curWeight || ''} />
                      <span className='weight'>(kg)</span>
                      <p className="infomsg" ref={current_weight_err_ref}>{curError}</p>
                    </div>
                    <Button>
                      <CancleBtn onClick={WeightModalClose}>취소하기</CancleBtn>
                      <SignUpBtn onClick={SendChangeWeight}
                        disabled=
                        {
                          curError === "* 양식에 맞게 작성되었습니다."
                          ? false : true
                        }>추가하기</SignUpBtn>
                    </Button>
                  </WeightWrap>
                ) :
                (
                  <>
                    <Titlebar>
                      <p>몸무게 변화량</p>
                    </Titlebar>
                    <PlusBtn onMouseEnter={WeightEnterMsg} onMouseLeave={WeightLeaveMsg} onClick={WeightModalOpen}>
                      +
                      {
                        myWeightHover ?
                        (
                          <WeightModal>체중 입력하기</WeightModal>
                        ) :
                        (
                          null
                        )
                      }
                    </PlusBtn>
                    <Rechart weight={weight} />
                  </>
                )
              }
            </Item2>
            {/* <Item3>
              <Titlebar>
                <p>체지방 변화량</p>
              </Titlebar>
            </Item3> */}
          </GrapWrap>
        </div>
        <div style={{ width: "100%", height: "45%" }}>
          <Item4>
            <Titlebar>
              <p>오늘의 식단</p>
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
`;

const Titlebar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 140px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0px 0px 15px 0px;
  background-color: #ccc;
  p {
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const PlusBtn = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  height: 24px;
  background-color: transparent;
  border: 2px solid #FE7770;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
  box-sizing: border-box;
  &:hover {
    background-color: #FFB0AC;
    color: #fff;
    cursor: pointer;
  }
`

const WeightModal = styled.div`
  position: absolute;
  left: -90px;
  width: 80px;
  height: 30px;
  border-radius: 4px;
  font-size: 12px;
  background-color: #FE7770;
  color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  &::before {
    content: '';
    position: absolute;
    right: -4px;
    width: 8px;
    height: 8px;
    transform: rotate(45deg);
    background-color: #FE7770;
    box-sizing: border-box;
  }
`

const Container = styled.div`
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
    position: relative;
    width: 70%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    overflow: hidden;
    background-color: #F6EAE0;
 `;

const WeightWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  border: 2px solid #333;
  box-sizing: border-box;
  h2 {
    margin: 0 0 20px;
    font-size: 24px;
  }
  div.weightWrap {
    position: relative;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 30px 0;
  }
  div input {
    width: 100%;
    padding: 12px;
    border: none;
    border-bottom: 1px solid #9A9A9A;
    box-sizing: border-box;
    outline: none;
  }
  div input[type="number"]::-webkit-outer-spin-button,
  div input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  div span.weight {
    position: absolute;
    bottom: 12px;
    right: 10px;
    font-size: 12px;
    color: #9A9A9A;
  }
  div p.infomsg {
    position: absolute;
    bottom: -20px;
    left: 6px;
    margin: 0;
    font-size: 10px;
    color: #D9D9D9;
  }
`

const HoverMsg = styled.p`
  position: absolute;
  top: 35px;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 40px;
  font-size: 9px;
  background-color: white;
  border: 1px solid #FE7770;
  border-radius: 6px;
  padding: 4px;
  color: #333;
  /* box-sizing: border-box; */
  z-index: 5000;
  span {
    color: #81C147;
    font-size: 11px;
    margin-top: 6px;
  }
  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: 20px;
    width: 8px;
    height: 8px;
    border-bottom: 1px solid transparent;
    border-right: 1px solid transparent;
    border-top: 1px solid #FE7770;
    border-left: 1px solid #FE7770;
    box-sizing: border-box;
    background-color: white;
    transform: rotate(45deg);
  }
`

const Button = styled.div`
  width: 80%;
  height: 40px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    width: 46%;
    height: 100%;
    margin: 0;
    border: none;
    border-radius: 30px;
    color: #fff;
    font-size: 16px;
    font-weight: 900;
    font-family: 'GmarketM', 'sans-serif';
    cursor: pointer;
  }
`

const CancleBtn = styled.button`
  background-color: #C2C2C2;
`

const SignUpBtn = styled.button`
  background-color: #FE7770;
  &:disabled {
    background-color: #C2C2C2;
    cursor: default;
  }
`

const Item3 = styled.div`
    width: 80%;
    height: 40%;
 `;

const Item4 = styled.div`
    position: relative;
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: space-evenly;
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
`;

export default Main;