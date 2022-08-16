import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const username_ref = React.useRef(null);
  const password_ref = React.useRef(null);
  const username_err_ref = React.useRef(null);
  const pw_err_ref = React.useRef(null);

  const [ checkIdMsg, SetCheckIdMsg] = React.useState("")
  const [ pwMsg, SetPwMsg ] = React.useState("")

  const sessionStorage = window.sessionStorage;
  const navigate = useNavigate();

  const IdChange = (e) => {
    let regTxt = /[0-9a-zA-Z]/;
    let regKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    let regSpecial = /[.,~!@#$%^&*()_+|<>?:{}]/;
    let regBlank = /[\s]/;
    if(e.target.value.length === 0) {
      SetCheckIdMsg("")
    } else if (!(regTxt.test(e.target.value)) || (regKor.test(e.target.value)) || (regSpecial.test(e.target.value)) || (regBlank.test(e.target.value)) ) {
      SetCheckIdMsg("* 영어 / 숫자를 제외한 다른 문자는 사용할 수 없습니다.")
      username_err_ref.current.style.color = "#FF7F00";
    } else if(e.target.value.length < 4) {
      SetCheckIdMsg("* 아이디는 4글자 이상 12글자 이하로 사용 가능합니다.")
      username_err_ref.current.style.color = "#FF7F00";
    } else {
      SetCheckIdMsg(true)
    }
  }

  const PwChange = (e) => {
    const regPw = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(e.target.value.length === 0) {
      SetPwMsg("")
    } else if(regPw.test(e.target.value) !== true) {
      SetPwMsg("* 비밀번호는 영어/숫자 조합으로 8자 이상 사용 가능합니다.")
      pw_err_ref.current.style.color = "#FF0000";
    } else {
      SetPwMsg(true)
    }
  }

  const onhandleLogin = async (e) => {

      e.preventDefault()
  
      const LoginInfo = {
        username: username_ref.current.value,
        password: password_ref.current.value,
      }
      try {
        const res = await axios.post("http://13.125.227.9:8080/login",
        {
          username: LoginInfo.username,
          password: LoginInfo.password
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        })
        console.log(res)
        if(res.status === 200 && res.headers.authorization !== "") {
          sessionStorage.setItem("token", res.headers.authorization)
          window.alert("로그인에 성공하였습니다. 밀핏을 찾아주셔서 감사합니다.")
          navigate("/")
        }
      } catch(error) {
        console.log(error)
        window.alert("로그인에 실패하였습니다. 아이디 혹은 비밀번호를 다시 확인해주세요.")
        username_ref.current.focus()
      }
    }

  return (
    <LoginWrap>
      <h1>로그인</h1>
      <Contents>
        <input ref={username_ref} type="text" placeholder='아이디' onChange={IdChange} maxLength={12} />
        <p ref={username_err_ref}>{checkIdMsg}</p>
      </Contents>
      <Contents>
        <input ref={password_ref} type="password" placeholder='비밀번호' onChange={PwChange} />
        <p ref={pw_err_ref}>{pwMsg}</p>
      </Contents>
      <FindTxt>
        <span>아이디 / 비밀번호 찾기</span>
      </FindTxt>
      <Button>
        <LoginBtn onClick={onhandleLogin} disabled={checkIdMsg === true && pwMsg === true ? false : true}>로그인</LoginBtn>
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
  margin: 12px auto;
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
  &:disabled {
    background-color: #C2C2C2;
    cursor: default;
  }
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