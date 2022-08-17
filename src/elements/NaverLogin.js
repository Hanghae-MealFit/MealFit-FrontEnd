import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

const NaverLogin = () => {

  const NAVER_AUTH_URL = 'http://13.125.227.9:8080/oauth2/authorization/naver'

  const handleLogin = () => {
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
    <div onClick={handleLogin}>NaverLogin</div>
  )
};



export default NaverLogin