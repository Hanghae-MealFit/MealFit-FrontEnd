import React from 'react'

const GoogleLogin = () => {

  const GOOGLE_AUTH_URL = 'http://ec2-13-125-227-9.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google'

  const handleLogin = () => {
    window.location.href = GOOGLE_AUTH_URL;
  }

  return (
    <div onClick={handleLogin}>GoogleLogin</div>
  )
}

export default GoogleLogin