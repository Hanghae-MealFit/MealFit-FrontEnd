import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

const Login = () => {
  const username_ref = React.useRef(null);
  const password_ref = React.useRef(null);

  const onhandleLogin = async (e) => {
      e.preventDefault()
  
      const LoginInfo = {
        username: username_ref.current.value,
        password: password_ref.current.value,
      }
      // console.log(LoginInfo)
  
      const formData = new FormData()
        formData.append("username", LoginInfo.username);
        formData.append("password", LoginInfo.password);
      // console.log(formData)
  
      // const res = await axios.post("http://13.125.227.9:8080/user/signup",
      // {
      //   formData
      // }, {
      //   headers: {
      //     "Content-Type": "multipart/form-data"
      //   }
      // })
      // console.log(res)
  
      await axios({
        baseURL: "http://13.125.227.9:8080/",
        method: "POST",
        url: "/user/login",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((response) => {
        console.log("반응", response)
      }).catch((error) => {
        console.log("에러", error)
      })
    }


  return (
    <LoginWrap>
      <h1>로그인</h1>
      <Contents>
        <input ref={username_ref} type="text" placeholder='아이디' />
      </Contents>
      <Contents>
        <input ref={password_ref} type="password" placeholder='비밀번호' />
      </Contents>
      <FindTxt>
        <span>아이디 / 비밀번호 찾기</span>
      </FindTxt>
      <Button>
        <LoginBtn onClick={onhandleLogin}>로그인</LoginBtn>
      </Button>
      <LoginTxt>
        밀핏 회원이 아니신가요? <span>새 계정 만들기</span>
      </LoginTxt>
    </LoginWrap>
  )
}

const LoginWrap = styled.div`
  position: relative;
  width: 700px;
  height: 640px;
  margin: 0 auto;
  border-radius: 30px;
  background-color: white;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 10px 0;
    font-size: 26px;
    color: #FE7770;
    width: 540px;
    border-bottom: 1px solid #E0E2E6;
    text-align: center;
  }
`

const Contents = styled.div`
  position: relative;
  width: 400px;
  margin: 8px auto;
  input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #9A9A9A;
    padding: 12px 0 12px 6px;
    box-sizing: border-box;
    outline: none;
  }
  button {
    position: absolute;
    bottom: 10px;
    right: 0;
    width: 80px;
    height: 30px;
    border: 1px solid #000;
    border-radius: 6px;
    font-family: 'GmarketM', 'sans-serif';
    font-size: 12px;
    background-color: transparent;
    cursor: #000;
  }
  p {
    position: absolute;
    bottom: -20px;
    left: 6px;
    margin: 0;
    font-size: 10px;
    color: #D9D9D9;
  }
`

const FindTxt = styled.div`
  font-size: 14px;
  margin: 16px auto;
  text-align: center;
  span {
    color: #808080;
    cursor: pointer;
  }
`
const Button = styled.div`
  width: 425px;
  height: 40px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 500px;
    height: 100%;
    margin: 0 10px;
    border: none;
    border-radius: 30px;
    color: #fff;
    font-size: 18px;
    font-weight: 900;
    cursor: pointer;
  }
`
const LoginBtn = styled.button`
  background-color: #FE7770;
`

const LoginTxt = styled.div`
  font-size: 12px;
  margin: 16px auto;
  text-align: center;
  span {
    color: #FE7770;
    cursor: pointer;
  }
`

export default Login