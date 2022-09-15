import React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const DimmedLayer = ({carbs, fat, kcal, protein}) => {
  const navigate = useNavigate();
  return (
    <>
      <Dimmed></Dimmed>
        {
          carbs === 0 && fat === 0 && kcal === 0 && protein === 0 ? (
          <LoginWrap>
            <p>하루 목표량을 작성 후 사용해주세요.</p>
            <Button onClick={() => {navigate("/user/info")}}>마이 페이지</Button>
          </LoginWrap>
          ) : (
          <LoginWrap>
            <p>로그인 후 이용해주세요</p>
            <Button onClick={() => {navigate("/user/login")}}>로그인</Button>
          </LoginWrap>
          )
        }
    </>
  )
}


const Dimmed = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 5000;
`

const LoginWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  background-color: transparent;
  /* box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4); */
  border-radius: 12px;
  z-index: 5001;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Button = styled.div`
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 30px;
  background-color: #FE7770;
  color: #FFF;
  font-size: 16px;
  font-weight: 900;
  font-family: 'GmarketM', 'sans-serif';
  cursor: pointer;
`

export default DimmedLayer