import React, { useState, useEffect, useRef } from 'react'
import styled from "styled-components";
import TokenInstance from '../axios/TokenInstance'

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';

import Cards from "../elements/Cards";
import Circle from "../elements/Circle";
import DimmedLayer from "../elements/DimmedLayer";
import Rechart from "../elements/Rechart";

import { loadMainUserDB } from "../redux/modules/userinfo";
import { loadUserWeightDB } from '../redux/modules/userweight';
import { loadPostDB } from "../redux/modules/post";

const Main = () => {
  const data = useSelector((state) => state.post.post);
  const MainData = data?.sort((a,b) => (b.view - a.view)).slice(0, 4)
  const weight = useSelector((state) => state.userweight.data.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ isLogin, setIsLogin ] = useState(false);
  const [ myWeightHover, setMyWeightHover ] = useState(false);
  const [ changeMyWeight, setChangeMyWeight ] = useState(false);
  const [ curWeight, setCurWeight ] = useState();
  const [ curInfoMsg, SetCurInfoMsg ] = useState(false);
  const [ curError, setCurError ] = useState("* 현재 체중을 입력해주세요.");
  const [ weightCheck, setWeightCheck ] = useState(false);
  const [ timeCheck, setTimeCheck ] = useState(false);

  const currentWeight_ref = useRef(null);
  const current_weight_err_ref = useRef(null);

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const Token = {
    authorization: sessionStorage.getItem("accessToken"),
    refresh_token: sessionStorage.getItem("refreshToken")
  }

  const LoginCheck = () => {
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
      const res = await TokenInstance.post("api/bodyInfo", {
        savedDate: dateString,
        weight: currentWeight_ref.current.value
      });
      // console.log(res)
      if(res.status === 201 && res.data === "입력 완료!") {
        setCurWeight('')
        setChangeMyWeight(false)
        setWeightCheck(!weightCheck)
      }
    } catch (error) {
      // console.log(error)
      currentWeight_ref.current.focus()
    }
  }

  const DetailPostView = (v) => {
    if(Token.authorization !== null && Token.refresh_token !== null) {
      navigate(`/post/${v.postId}`)
    } else {
      window.alert("게시글 상세보기는 로그인 후 사용 가능합니다.")
    }
  }

  useEffect(() => {
    dispatch(loadMainUserDB())
    dispatch(loadPostDB())
    LoginCheck()
  }, [])

  useEffect(() => {
    dispatch(loadUserWeightDB())
  }, [weightCheck])

  useEffect(() => {
    dispatch(loadMainUserDB())
  }, [timeCheck])

  return (
    <Wrap>
      <MainWrap>
        <Container>
          <TopMenu>
            {
              !isLogin ? (
                <DimmedLayer />
              ) : (
                null
              )
            }
            <Item1 style={{ filter: !isLogin ? "blur(6px)" : "none" }}>
              <Circle Token={Token} timeCheck={timeCheck} setTimeCheck={setTimeCheck} />
            </Item1>
            <GrapWrap style={{ filter: !isLogin ? "blur(6px)" : "none" }}>
              <Item2>
                <Rechart weight={weight} />
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
                    null
                  )
                }
              </Item2>
            </GrapWrap>
          </TopMenu>
          <BottomMenu>
            <Item4>
              <Titlebar>
                <p>오늘의 식단</p>
              </Titlebar>
              <CardList>
                {MainData?.map((v, idx) => (
                  <CardsBox onClick={() => DetailPostView(v)} key={idx}>
                    <Cards post={v} />
                  </CardsBox>
                ))}
              </CardList>
            </Item4>
          </BottomMenu>
        </Container>
      </MainWrap>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 1024px) {
    height: 100vh;
    margin-top: 0;
    margin-left: 260px;
  }
`

const MainWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const Titlebar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0px 0px 15px 0px;
  background-color: #ffc81e;
  color: #333;
  p {
    font-size: 12px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media (min-width: 1024px) {
    width: 140px;
    height: 40px;
    p {
      font-size: 16px;
    }
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
  color: #FE7770;
  font-size: 20px;
  box-sizing: border-box;
  &:hover {
    background-color: #FFB0AC;
    color: #fff;
    border: none;
    cursor: pointer;
  }
`

const WeightModal = styled.div`
  position: absolute;
  left: -100px;
  width: 90px;
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
`;

const TopMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: relative;
  overflow: hidden;
  @media (min-width: 769px) {
    flex-direction: row;
    height: 55%;
  }
`

const Item1 = styled.div`
  width: 50%;
  height: 50%;
  display: flex;
  padding: 20px;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
`;

const GrapWrap = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 20px;
  @media (min-width: 769px) {
    width: 50%;
  }
`;

const Item2 = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: #F6EAE0;
  @media (min-width: 500px) and (max-width: 768px) {
    width: 70%;
    height: 260px;
  }
  @media (min-width: 769px) {
    width: 80%;
    height: 260px;
  }
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
    margin: 0 0 10px;
    font-size: 16px;
  }
  div.weightWrap {
    position: relative;
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
  }
  div input {
    width: 100%;
    padding: 6px 0px 6px 3px;
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
  @media (min-width: 769px) {
    div input {
      padding: 12px;
    }
  }
  @media (min-width: 1024px) {
    h2 {
      margin: 0 0 20px;
      font-size: 24px;
    }
    div.weightWrap {
      margin: 30px 0;
    }
    div input {
      padding: 12px;
    }
  }
`

const HoverMsg = styled.p`
  position: absolute;
  top: 55px;
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
  @media (min-width: 769px) {
    top: 65px;
    box-sizing: border-box;
  }
  @media (min-width: 1024px) {
    top: 90px;
  }
`

const Button = styled.div`
  width: 80%;
  height: 30px;
  margin: 26px auto 0;
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
    font-size: 12px;
    font-weight: 900;
    font-family: 'GmarketM', 'sans-serif';
    cursor: pointer;
  }
  @media (min-width: 1024px) {
    height: 40px;
    margin: 0 auto;
    button {
      font-size: 16px;
    }
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

const BottomMenu = styled.div`
  width: 100%;
  height: 100%;
  @media (min-width: 769px) {
    height: 45%;
  }
`

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
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

const CardsBox = styled.div`
  width: 80%;
  height: 260px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  margin-top: 30px;
  &:first-child {
    margin-top: 50px;
  }
  &:last-child {
    margin-bottom: 30px;
  }
  @media (min-width: 400px) and (max-width: 768px) {
    width: 46%;
    &:nth-child(2) {
      margin-top: 50px;
    }
    &:nth-child(3) {
      margin-bottom: 30px;
    }
  }
  @media (min-width: 769px) {
    width: 23%;
    margin-top: 80px;
    margin-bottom: 80px;
    &:first-child {
      margin-top: 80px;
    }
    &:last-child {
      margin-bottom: 80px;
    }
  }
  @media (min-width: 1024px) {
    width: 22%;
    height: 300px;
    margin-top: 0px;
    margin-bottom: 0px;
    &:first-child {
      margin-top: 0px;
    }
    &:last-child {
      margin-bottom: 0px;
    }
  }
`;

export default Main;