import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useNavigate, useLocation } from 'react-router-dom';
import KakaoLogin from '../elements/KakaoLogin';
import NaverLogin from '../elements/NaverLogin';
import GoogleLogin from '../elements/GoogleLogin';
import Instance from '../axios/Instance'

const Login = () => {
  const username_ref = useRef(null);
  const password_ref = useRef(null);
  const username_err_ref = useRef(null);
  const pw_err_ref = useRef(null);

  const [ checkIdMsg, SetCheckIdMsg] = useState("")
  const [ pwMsg, SetPwMsg ] = useState("")

  const sessionStorage = window.sessionStorage;
  const navigate = useNavigate();

  useEffect(() => {
    if(sessionStorage.getItem("accessToken") !== null || sessionStorage.getItem("refreshToken") !== null) {
      window.alert("이미 로그인 되어 있는 상태입니다.\n메인으로 돌아갑니다.")
      navigate("/")
    }
  }, [])
  
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
        const res = await Instance.post("/login", {
          username: LoginInfo.username,
          password: LoginInfo.password
        });
        Instance.defaults.headers.common["accessToken"] = res.data?.tokenBox.accessToken;
        Instance.defaults.headers.common["refreshToken"] = res.data?.tokenBox.refreshToken;
        console.log(res)
        if(res.status === 200 & res.data.tokenBox.accessToken !== null && res.data.tokenBox.refreshToken !== null) {
          sessionStorage.setItem("accessToken", res.data.tokenBox.accessToken)
          sessionStorage.setItem("refreshToken", res.data.tokenBox.refreshToken)
          window.alert(`안녕하세요.\n밀핏을 찾아주셔서 감사합니다.`)
          navigate("/")
        }
      } catch(error) {
        console.log(error)
        if(error.response.status === 401 && error.response.data === "잘못된 로그인 정보입니다.") {
          window.alert("로그인에 실패하였습니다. 아이디 혹은 비밀번호를 다시 확인해주세요.")
          username_ref.current.focus()
        } else if(error.response.status === 401 && error.response.data === "이메일 인증을 받지 않았습니다. 이메일 인증을 해주세요!") {
          window.alert("회원가입 시 작성한 e-mail에서 인증 후 로그인 가능합니다.")
        } else {
          window.alert("로그인에 실패하였습니다. 아이디 혹은 비밀번호를 다시 확인해주세요.")
          username_ref.current.focus()
        }
      }
    }

  return (
    <Wrap>
      <LoginWrap>
        <ConWrap>
          <h1>로그인</h1>
          <Contents>
            <input ref={username_ref} type="text" placeholder='아이디를 입력해주세요.' onChange={IdChange} maxLength={12} />
            <p ref={username_err_ref}>{checkIdMsg}</p>
          </Contents>
          <Contents>
            <input ref={password_ref} type="password" placeholder='비밀번호를 입력해주세요.' autoComplete="off" onChange={PwChange} />
            <p ref={pw_err_ref}>{pwMsg}</p>
          </Contents>
          <Button>
            <LoginBtn onClick={onhandleLogin} disabled={checkIdMsg === true && pwMsg === true ? false : true}>로그인</LoginBtn>
          </Button>
          <LoginTxt>
            <span onClick={() => {navigate("/user/signup")}}>회원가입 하기</span>
            <span onClick={() => {navigate("/user/find")}}>아이디/비밀번호 찾기</span>
          </LoginTxt>
          <SocialTxt>소셜 로그인</SocialTxt>
          <SocialBtnWrap>
            <KakaoLogin />
            <NaverLogin />
            <GoogleLogin />
          </SocialBtnWrap>
        </ConWrap>
      </LoginWrap>
    </Wrap>
  )
}

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 769px) and (max-height: 500px) {
    height: 100%;
    margin-top: 60px;
  }
  @media (min-width: 769px) and (max-height: 760px) {
    height: 100%;
    margin-top: 100px;
    margin-bottom: 40px;
  }
  @media (min-width: 1024px) {
    margin-left: 260px;
  }
`

const LoginWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background-color: white;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    margin: 0 auto;
    padding: 30px 0;
    font-size: 20px;
    color: #FE7770;
    width: 100%;
    text-align: center;
  }
  @media (min-width: 520px) {
    padding: 0 60px;
    box-sizing: border-box;
  }
  @media (min-width: 769px) {
    width: 700px;
    height: 640px;
    border-radius: 30px;
    h1 {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 540px;
      font-size: 26px;
      border-bottom: 1px solid #E0E2E6;
    }
  }
`

const ConWrap = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 769px) {
    margin: 94px auto 0;
  }
`

const Contents = styled.div`
  position: relative;
  width: 80%;
  margin: 10px auto;
  input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #9A9A9A;
    background-color: transparent;
    padding: 6px 0 6px 3px;
    font-size: 12px;
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
    left: -26px;
    right: 0;
    width: 280px;
    margin: 0;
    font-size: 10px;
    -webkit-transform: scale(0.8);
    color: #D9D9D9;
  }
  @media (min-width: 769px) {
    width: 400px;
    input {
      padding: 12px 0 12px 6px;
    }
    p {
      bottom: -20px;
      left: 6px;
      -webkit-transform: scale(1.0);
    }
  }
`

const Button = styled.div`
  width: 100%;
  height: 40px;
  margin: 20px auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 80%;
    height: 100%;
    margin: 0;
    border: none;
    border-radius: 12px;
    color: #fff;
    font-size: 18px;
    font-weight: 900;
    cursor: pointer;
  }
  @media (min-width: 769px) {
    width: 400px;
    button {
      width: 500px;
    }
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
  font-size: 10px;
  margin: 16px auto;
  text-align: center;
  span {
    position: relative;
    color: #808080;
    cursor: pointer;
    margin: 0 10px;
    transition: 0.2s;
  }
  span:hover {
    color: #FE7770;
  }
  span:first-child::before {
    content: '';
    position: absolute;
    top: calc(50% - 5px);
    right: -10px;
    width: 1px;
    height: 10px;
    border-right: 1px solid #CCC;
  }
  @media (min-width: 769px) {
    font-size: 12px;
  }
`

const SocialTxt = styled.h4`
  position: relative;
  width: 80%;
  font-size: 11px;
  text-align: center;
  margin: 12px auto 6px;
  color: #808080;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: 34%;
    border-top: 1px solid #CCC;
  }
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    width: 34%;
    border-top: 1px solid #CCC;
  }
  @media (min-width: 769px) {
    font-size: 12px;
  }
`

const SocialBtnWrap = styled.div`
  width: 100%;
  margin: 26px auto 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media (min-width: 769px) {
    width: 50%;
  }
  @media (max-width: 769px) and (max-height: 500px) {
    margin: 26px auto 30px;
  }
`

export default Login