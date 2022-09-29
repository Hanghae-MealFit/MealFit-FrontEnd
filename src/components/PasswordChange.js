import React, { useState, useEffect, useRef } from 'react'
import styled from "styled-components";
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'

import { MemoizedSidebar } from "./Sidebar";

const PasswordChange = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const cur_password_ref = useRef(null);
  const password_ref = useRef(null);
  const passwordCheck_ref = useRef(null);

  const cur_pw_err_ref = useRef(null);
  const pw_err_ref = useRef(null);
  const pw_check_err_ref = useRef(null);

  // 현재 비밀번호 입력 값이 영어+숫자가 아닐 시, 유저에게 제공 될 값
  const [curPwMsg, setCurPwMsg] = useState("* 비밀번호는 영어/숫자 조합으로 8자 이상 사용 가능합니다.");

  // 입력된 비밀번호 값이 영어+숫자가 아닐 시, 유저에게 제공 될 값
  const [PwMsg, SetPwMsg] = useState("* 비밀번호는 영어/숫자 조합으로 8자 이상 사용 가능합니다.");

  // 입력된 비밀번호 값이 영어+숫자가 아닐 시, 유저에게 제공 될 값
  const [checkPwMsg, SetPwCheckMsg] = useState("* 입력하신 비밀번호를 다시 입력해주세요.");

  const auth = {
    authorization: sessionStorage.getItem("accessToken"),
    refresh_token: sessionStorage.getItem("refreshToken")
  };

  useEffect(() => {
    if(auth.authorization === null && auth.refresh_token === null) {
      window.alert("비밀번호 변경은 로그인 후 사용 가능합니다.")
      navigate("/")
    }
  }, [])

  const onhandlePwChange = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.put("http://43.200.174.111:8080/api/user/password", {
        password: cur_password_ref.current.value,
        changePassword: password_ref.current.value,
        passwordCheck: passwordCheck_ref.current.value
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.authorization}`,
          refresh_token: `Bearer ${auth.refresh_token}`
        }
      })
      // console.log(res)
      if(res.status === 200) {
        try {
          const response = await axios.post("http://43.200.174.111:8080/logout", null ,{
              headers: {
                Authorization: `Bearer ${auth.authorization}`,
                refresh_token: `Bearer ${auth.refresh_token}`
              }
            })
            // console.log("반응", response)
          if (response.status === 200) {
            sessionStorage.clear();
            window.alert("비밀번호가 변경되었습니다. 다시 로그인 해주세요.")
            navigate("/user/login")
            window.location.reload()
          }
        } catch (error) {
          // console.log("에러", error)
          // console.log(Token)
          window.alert("로그아웃에 실패하였습니다. 다시 한번 시도해주십시오.");
        }
      };
    } catch(err) {
      // console.log(err)
    }
  }

  const CurPw = (e) => {
    const regPw = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (e.target.value.length === 0) {
      setCurPwMsg("* 비밀번호는 영어/숫자 조합으로 8자 이상 사용 가능합니다.")
      cur_pw_err_ref.current.style.color = "#D9D9D9";
    } else if (regPw.test(e.target.value) !== true) {
      setCurPwMsg("* 비밀번호는 영어/숫자 조합으로 8자 이상 사용 가능합니다.")
      cur_pw_err_ref.current.style.color = "#FF0000";
    } else {
      setCurPwMsg("* 양식에 맞게 작성되었습니다.")
      cur_pw_err_ref.current.style.color = "#81C147";
    }
  }

  const PwChange = (e) => {
    const regPw = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (e.target.value.length === 0) {
      SetPwMsg("* 비밀번호는 영어/숫자 조합으로 8자 이상 사용 가능합니다.")
      pw_err_ref.current.style.color = "#D9D9D9";
    } else if (regPw.test(e.target.value) !== true) {
      SetPwMsg("* 비밀번호는 영어/숫자 조합으로 8자 이상 사용 가능합니다.")
      pw_err_ref.current.style.color = "#FF0000";
    } else {
      SetPwMsg("* 사용 가능한 비밀번호 입니다.")
      pw_err_ref.current.style.color = "#81C147";
    }
  }

  const PwCheck = (e) => {
    if (e.target.value.length === 0) {
      SetPwCheckMsg("* 입력하신 비밀번호를 다시 입력해주세요.")
      pw_check_err_ref.current.style.color = "#D9D9D9";
    }
    else if (password_ref.current.value === e.target.value) {
      SetPwCheckMsg("* 비밀번호가 일치합니다.")
      pw_check_err_ref.current.style.color = "#81C147";
    } else {
      SetPwCheckMsg("* 입력하신 비밀번호와 값이 다릅니다. ")
      pw_check_err_ref.current.style.color = "#FF0000";
    }
  }

  return (
    <Wrap>
      <PwChangeWrap>
        <MemoizedSidebar />
        <Container>
          <ModInputWrap>
            <h1>비밀번호 변경</h1>
            <p>새로운 비밀번호를 입력해주세요.</p>
            <InputTxt>
              <input ref={cur_password_ref} onChange={CurPw} type="password" placeholder='현재 비밀번호를 입력하세요.' autoComplete="off" />
              <p ref={cur_pw_err_ref}>{curPwMsg}</p>
            </InputTxt>
            <InputTxt>
              <input ref={password_ref} onChange={PwChange} type="password" placeholder='새로운 비밀번호를 입력하세요.' autoComplete="off" />
              <p ref={pw_err_ref}>{PwMsg}</p>
            </InputTxt>
            <InputTxt>
              <input ref={passwordCheck_ref} onChange={PwCheck} type="password" placeholder='새로운 비밀번호 다시 한번 입력해주세요.' autoComplete="off" />
              <p ref={pw_check_err_ref}>{checkPwMsg}</p>
            </InputTxt>
          </ModInputWrap>
          <Button>
            <CancleBtn onClick={() => {
              navigate("/user/info");
            }}>뒤로가기</CancleBtn>
            <PwChangeBtn onClick={onhandlePwChange} disabled=
              {
                curPwMsg === "* 양식에 맞게 작성되었습니다." &&
                PwMsg === "* 사용 가능한 비밀번호 입니다." &&
                checkPwMsg === "* 비밀번호가 일치합니다."
                ? false : true
              }>저장하기</PwChangeBtn>
          </Button>
        </Container>
      </PwChangeWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-height: 500px) {
    height: 100%;
    margin-top: 60px;
  }
  @media (min-width: 1024px) {
    margin-left: 260px;
  }
`

const PwChangeWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  `;

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
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
  @media (min-width: 520px) and (max-width: 768px) {
    padding: 0 60px;
    box-sizing: border-box;
  }
  @media (min-width: 769px) {
    width: 700px;
    height: 640px;
    border-radius: 30px;
    font-size: 20px;
    h1 {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      font-size: 26px;
      width: 540px;
      border-bottom: 1px solid #E0E2E6;
    }
  }
`;

const ModInputWrap = styled.div`
  width: 100%;
  height: 60%;
  margin-bottom: 65px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-size: 13px;
  }
  @media (min-width: 769px) {
    font-size: 17px;
  }
`

const InputTxt = styled.div`
  width: 80%;
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input {
    width: 100%;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #808080;
    padding: 6px 0 6px 3px;
    margin: 12px auto;
    box-sizing: border-box;
    outline: none;
    font-size: 11px;
  }
  p {
    position: absolute;
    bottom: -6px;
    left: -26px;
    margin: 0;
    width: 280px;
    font-size: 10px;
    -webkit-transform: scale(0.8);
    color: #D9D9D9;
    text-align: left;
  }
  button {
    width: 400px;
    height: 40px;
    border: none;
    border-radius: 12px;
    font-family: 'GmarketM', 'sans-serif';
    font-size: 14px;
    background-color: #FE7770;
    color: #fff;
    margin-top: 20px;
    cursor: pointer;
  }
  button:disabled {
    background-color: #808080;
    cursor: default; 
  }
  @media (min-width: 769px) {
    width: 58%;
    input {
      width: 400px;
      padding: 12px 0 12px 6px;
    }
    p {
      bottom: -6px;
      left: 6px;
      -webkit-transform: scale(1.0);
    }
  }
`

const Button = styled.div`
  /* position: absolute; */
  width: 80%;
  height: 40px;
  /* bottom: 120px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  button {
    width: 46%;
    height: 100%;
    margin: 0;
    border: none;
    border-radius: 30px;
    color: #fff;
    font-size: 14px;
    font-weight: 900;
    cursor: pointer;
  }

`
const CancleBtn = styled.button`
  background-color: #C2C2C2;
`

const PwChangeBtn = styled.button`
  background-color: #FE7770;
  &:disabled {
    background-color: #C2C2C2;
    cursor: default;
  }
`

export default PasswordChange;