import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { MemoizedSidebar } from "./Sidebar";
import PicSelect from '../elements/PicSelect';

import { loadMainUserDB } from '../redux/modules/userinfo'
import { loadUserWeightDB } from '../redux/modules/userweight'

const MyPage = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadMainUserDB())
    dispatch(loadUserWeightDB())
  }, [])

  const user = useSelector((state) => state.userinfo.user.fastingInfo);
  const userInfo = useSelector((state) => state.userinfo.user.userProfile);
  const weight = useSelector((state) => state.userweight.data.data);
  console.log(weight)
  const NowWeight = weight[weight.length - 1].weight
  const startHour = user.startFasting.split(":")[0]
  const startMinute = user.startFasting.split(":")[1]
  const endHour = user.endFasting.split(":")[0]
  const endMinute = user.endFasting.split(":")[1]

  return (
    <Wrap>
      <MemoizedSidebar />
      <div>마이페이지</div>
      <MyPageInfoWrap>
        <h1>My Page</h1>
        <PwModBtn onClick={() => {
                  navigate("/user/password");
                }}>비밀번호 변경</PwModBtn>
        <FormWrap>
          <PicWrap>
            <PicSelect />
          </PicWrap>
          <Contents>
            <p>닉네임</p>
            <input type="text" value={userInfo.nickname} readOnly />
          </Contents>
          <WeightWrap>
            <div>
              <p>현재 몸무게</p>
              <input type="number" readOnly value={NowWeight} />
              <span className='weight'>(kg)</span>
            </div>
            <div>
              <p>목표 몸무게</p>
              <input type="number" value={userInfo.goalWeight} readOnly />
              <span className='weight'>(kg)</span>
            </div>
          </WeightWrap>
          <FastTimeWrap>
            <FastTime>
              <p>단식 시작시간</p>
              <div>
                <Select defaultValue="default" readOnly>
                  <option value="default" disabled readOnly>{startHour}</option>
                </Select> 시
                <Select defaultValue="default" readOnly>
                  <option value="default" disabled readOnly>{startMinute}</option>
                </Select> 분
              </div>
            </FastTime>
            <FastTime>
              <p>단식 종료시간</p>
              <div>
                <Select defaultValue="default" readOnly>
                  <option value="default" disabled readOnly>{endHour}</option>
                </Select> 시
                <Select defaultValue="default" readOnly>
                  <option value="default" disabled readOnly>{endMinute}</option>
                </Select> 분
              </div>
            </FastTime>
          </FastTimeWrap>
          <IntakeWrap>
            <h4>일일 목표 섭취량</h4>
            <GoalInfoWrap>
              <GoalTitle>칼로리</GoalTitle>
              <GoalInfo>
                <input type="number" readOnly value={""} />
                <span className='unit'>(Kcal)</span>
              </GoalInfo>
            </GoalInfoWrap>
            <GoalInfoWrap>
              <GoalTitle>탄수화물</GoalTitle>
              <GoalInfo>
                <input type="number" readOnly value={""} />
                <span className='unit'>(g)</span>
              </GoalInfo>
            </GoalInfoWrap>
            <GoalInfoWrap>
              <GoalTitle>단백질</GoalTitle>
              <GoalInfo>
                <input type="number" readOnly value={""} />
                <span className='unit'>(g)</span>
              </GoalInfo>
            </GoalInfoWrap>
            <GoalInfoWrap>
              <GoalTitle>지방</GoalTitle>
              <GoalInfo>
                <input type="number" readOnly value={""} />
                <span className='unit'>(g)</span>
              </GoalInfo>
            </GoalInfoWrap>
          </IntakeWrap>
          <Button>
            <CancleBtn onClick={() => {navigate("/")}}>뒤로가기</CancleBtn>
            <MyPageInfoBtn onClick={() => {navigate("/user/info/edit")}}>수정하기</MyPageInfoBtn>
          </Button>
        </FormWrap>
      </MyPageInfoWrap>
    </Wrap>
  )
}

const Wrap = styled.div`
//   background-color: yellow;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MyPageInfoWrap = styled.div`
  position: absolute;
  width: 700px;
  height: 920px;
  margin-left: 260px;
  border-radius: 30px;
  background-color: white;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 30px 0;
    font-size: 26px;
    color: #FE7770;
    width: 540px;
    border-bottom: 1px solid #E0E2E6;
    text-align: center;
  }
`

const PwModBtn = styled.div`
  position: relative;
  width: 120px;
  height: 40px;
  margin-left: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: #555;
  border: 1px solid #555;
  cursor: pointer;
`;

const FormWrap = styled.form`
  margin-top: 94px;
`

const PicWrap = styled.div`
  width: 100%;
  margin: 0 auto;
`

const Contents = styled.div`
  position: relative;
  width: 460px;
  margin: 26px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    min-width: 80px;
    height: 30px;
    background-color: #FE7770;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    box-sizing: border-box;
    margin-right: 20px;
    color: #fff;
    font-size: 15px;
  }
  input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #9A9A9A;
    padding: 12px 0 12px 6px;
    box-sizing: border-box;
    outline: none;
  }
`

const WeightWrap = styled.div`
  width: 460px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    position: relative;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  div input {
    width: 50%;
    padding: 12px;
    border: none;
    border-bottom: 1px solid #9A9A9A;
    box-sizing: border-box;
    outline: none;
  }
  div p {
    width: 80px;
    height: 30px;
    background-color: #FE7770;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    box-sizing: border-box;
    margin-right: 20px;
    color: #fff;
    font-size: 15px;
  }
  div span.weight {
    position: absolute;
    bottom: 12px;
    right: 10px;
    font-size: 12px;
    color: #9A9A9A;
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

const FastTimeWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 460px;
  height: 120px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #9A9A9A;
  border-radius: 20px;
  margin: 30px auto;
  span {
    position: absolute;
    bottom: -20px;
    left: 6px;
    font-size: 10px;
    color: #D9D9D9;
  }
`

const FastTime = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 10px 0;
  p {
    margin: 0;
  }
`

const Button = styled.div`
  width: 460px;
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

const MyPageInfoBtn = styled.button`
  background-color: #FE7770;
  &:disabled {
    background-color: #C2C2C2;
    cursor: default;
  }
`

const Select = styled.select`
  width: 60px;
  height: 30px;
  border: none;
  border-bottom: 1px solid #9A9A9A;
  outline: none;
  padding: 0 4px;
  box-sizing: border-box;
  font-family: 'GmarketM', 'sans-serif';
  font-size: 12px;
  text-align: center;
`

const IntakeWrap = styled.div`
  position: relative;
  width: 460px;
  margin: 40px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  border: 1px solid #FE7770;
  border-radius: 20px;
  padding: 20px 14px;
  box-sizing: border-box;
  h4 {
    position: absolute;
    top: -15px;
    left: 20px;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    width: 140px;
    height: 30px;
    background-color: #FE7770;
    color: #fff;
    border-radius: 6px;
  }
`

const GoalInfoWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto 4px;
`

const GoalHoverMsg = styled.p`
  position: absolute;
  top: 35px;
  left: 90px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 75%;
  height: 40px;
  font-size: 10px;
  background-color: white;
  border: 1px solid #FE7770;
  border-radius: 6px;
  padding: 5px;
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

const GoalTitle = styled.div`
  width: 80px;
  height: 30px;
  background-color: #FE7770;
  border-radius: 6px;
  color: #fff;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`

const GoalInfo = styled.div`
  position: relative;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    width: 100%;
    padding: 12px;
    border: none;
    border-bottom: 1px solid #9A9A9A;
    box-sizing: border-box;
    outline: none;
  }
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  span.unit {
    position: absolute;
    bottom: 12px;
    right: 10px;
    font-size: 12px;
    color: #9A9A9A;
  }
  p {
    position: absolute;
    bottom: -14px;
    left: 4px;
    margin: 0;
    font-size: 6px;
    color: #D9D9D9;
  }
`

export default MyPage;