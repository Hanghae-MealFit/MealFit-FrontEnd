import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { IconWrap } from './KakaoLogin'

const NaverLogin = () => {

  const NAVER_AUTH_URL = 'http://43.200.174.111:8080/oauth2/authorization/naver'

  const handleLogin = (e) => {
    e.preventDefault()
    window.location.href = NAVER_AUTH_URL;
  }
  // const { naver } = window;
  // const initializeNaverLogin = () => {
  //   const naverLogin = new naver.LoginWithNaverId({
  //     clientId: NAVER_CLIENT_ID,
  //     callbackUrl: NAVER_CALLBACK_URL,
  //     isPopup: false,
  //     loginButton: { color: 'white', type: 1, height: '47' },
  //     callbackHandle: true,
  //   });
  //   naverLogin.init();

  //   naverLogin.getLoginStatus(async function (status) {
  //     if (status) {
  //       // 아래처럼 선택하여 추출이 가능하고, 
  //       const userid = naverLogin.user.getEmail()
  //       const username = naverLogin.user.getName()
  //       // 정보 전체를 아래처럼 state 에 저장하여 추출하여 사용가능하다. 
  //       // setUserInfo(naverLogin.user)
  //     }
  //   })
  // }

  // useEffect(() => {
	// 	initializeNaverLogin()
	// }, [])

  return (
    // <div id="naverIdLogin">NaverLogin</div>
    <IconWrap>
      <ImgBox onClick={handleLogin} id="naver">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">
          <g fill="#FFF" fillRule="evenodd">
            <path fill="#FFF" d="M21 25.231V34h-7V15h7l6 8.769V15h7v19h-7l-6-8.769z"></path>
          </g>
        </svg>
      </ImgBox>
      {/* <label htmlFor="naver">네이버</label> */}
    </IconWrap>
  )
};

const ImgBox = styled.button`
  width: 48px;
  height: 48px;
  background-color: #00C63B;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 12px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
  cursor: pointer;
`

export default NaverLogin