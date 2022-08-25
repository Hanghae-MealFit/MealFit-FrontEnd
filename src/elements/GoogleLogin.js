import React from 'react'
import styled from 'styled-components'
import { IconWrap } from './KakaoLogin'

const GoogleLogin = () => {

  const GOOGLE_AUTH_URL = 'http://ec2-13-125-227-9.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google'

  const handleLogin = (e) => {
    e.preventDefault()
    window.location.href = GOOGLE_AUTH_URL;
  }

  return (
    <IconWrap>
      <ImgBox onClick={handleLogin} id="google">
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 23 23">
          <g fill="#000" fillRule="nonzero">
            <path fill="#EA4335" d="M11.5 4.574c1.688 0 3.204.58 4.396 1.72l3.299-3.299C17.203 1.14 14.6 0 11.5 0 7.005 0 3.115 2.577 1.223 6.335l3.842 2.98c.905-2.718 3.44-4.741 6.435-4.741z"></path>
            <path fill="#4285F4" d="M22.54 11.761c0-.815-.073-1.6-.21-2.352H11.5v4.448h6.19c-.268 1.438-1.078 2.656-2.296 3.471v2.886h3.717c2.174-2.002 3.429-4.95 3.429-8.453z"></path>
            <path fill="#FBBC05" d="M5.065 13.685c-.23-.69-.36-1.427-.36-2.185s.13-1.495.36-2.185v-2.98H1.223C.444 7.888 0 9.645 0 11.5c0 1.856.444 3.612 1.223 5.165l3.842-2.98z"></path>
            <path fill="#34A853" d="M11.5 23c3.105 0 5.708-1.03 7.61-2.786l-3.716-2.886c-1.03.69-2.347 1.098-3.894 1.098-2.995 0-5.53-2.023-6.435-4.741H1.223v2.98C3.115 20.423 7.005 23 11.5 23z"></path>
          </g>
        </svg>
      </ImgBox>
      {/* <label htmlFor="google">구글</label> */}
    </IconWrap>
  )
}

const ImgBox = styled.button`
  width: 48px;
  height: 48px;
  background-color: #fff;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 12px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
  cursor: pointer;
`

export default GoogleLogin