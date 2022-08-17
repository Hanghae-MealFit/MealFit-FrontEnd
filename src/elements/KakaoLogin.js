import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

const KakaoLogin = () => {
  const KAKAO_AUTH_URL = 'http://13.125.227.9:8080/oauth2/authorization/kakao'

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  }

  return (
    <div onClick={handleLogin}>KakaoLogin</div>
  )
}

export default KakaoLogin