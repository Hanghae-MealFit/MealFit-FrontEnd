import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const EmailVerify = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let code = new URL(window.location.href);

    const USER_NAME = code.href.split('=')[1].split('&')[0];
    const CODE = code.href.split('=')[2].split('&')[0];

    const userVerify = async () => {
      try {
        const res = await axios.get(`http://43.200.174.111:8080/api/user/verify?username=${USER_NAME}&code=${CODE}`, {
          username: USER_NAME,
          code: CODE
        })
        // console.log(res)
        if(res.status === 200) {
          window.alert("인증에 성공하였습니다.\n로그인 페이지로 돌아갑니다.")
          navigate("/user/login")
        }
      } catch(error) {
        // console.log(error)
        window.alert("인증에 실패하였습니다.\n로그인 페이지로 돌아갑니다.")
        navigate("/user/login")
      }
    }
    userVerify()
  }, [])
  return (
    null
  )
}

export default EmailVerify