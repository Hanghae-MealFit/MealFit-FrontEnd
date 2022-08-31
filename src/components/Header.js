import React from 'react'
import styled from 'styled-components'

const Header = () => {
  return (
    <HeaderWrap>로그인</HeaderWrap>
  )
}

const HeaderWrap = styled.h1`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 260px;
  right: 0;
  height: 120px;
  background-color: #fff;
  margin: 0 auto;
  padding: 30px 0;
  font-size: 32px;
  color: #FE7770;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Header