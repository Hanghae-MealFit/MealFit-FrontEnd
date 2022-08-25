import React from 'react'
import styled from 'styled-components'

const KakaoLogin = () => {
  const KAKAO_AUTH_URL = 'http://13.125.227.9:8080/oauth2/authorization/kakao'

  const handleLogin = (e) => {
    e.preventDefault()
    window.location.href = KAKAO_AUTH_URL;
  }

  return (
    <IconWrap>
      <ImgBox onClick={handleLogin} id="kakao">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="21" viewBox="0 0 22 21">
          <path fill="#000" fillRule="nonzero" d="M11 0C5.242 0 0 3.823 0 8.539c0 2.932 1.904 5.519 4.804 7.056l-1.22 4.479c-.107.397.343.712.69.483l5.348-3.548c.452.044.91.069 1.377.069 6.076 0 11-3.823 11-8.54 0-4.715-4.924-8.538-11-8.538"></path>
        </svg>
      </ImgBox>
      {/* <label htmlFor="kakao">카카오</label> */}
    </IconWrap>
  )
}

export const IconWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  label {
    font-size: 12px;
    margin: 10px auto 0;
    cursor: pointer;
  }
`

const ImgBox = styled.button`
  width: 48px;
  height: 48px;
  background-color: #fee500;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 12px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.4);
  cursor: pointer;
`

export default KakaoLogin