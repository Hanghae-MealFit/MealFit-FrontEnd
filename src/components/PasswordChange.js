import React from "react";
import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

import { MemoizedSidebar } from "./Sidebar";

const PasswordChange = () => {
  const navigate = useNavigate();

  const password_ref = React.useRef(null);
  const passwordCheck_ref = React.useRef(null);
  const pw_err_ref = React.useRef(null);
  const pw_check_err_ref = React.useRef(null);

  // 입력된 비밀번호 값이 영어+숫자가 아닐 시, 유저에게 제공 될 값
  const [PwMsg, SetPwMsg] = React.useState("* 비밀번호는 영어/숫자 조합으로 8자 이상 사용 가능합니다.");

  // 입력된 비밀번호 값이 영어+숫자가 아닐 시, 유저에게 제공 될 값
  const [checkPwMsg, SetPwCheckMsg] = React.useState("* 입력하신 비밀번호를 다시 입력해주세요.");

  const onhandlePwChange = async (e) => {
    e.preventDefault()

    const PasswordChange = {
      password: password_ref.current.value,
      passwordCheck: passwordCheck_ref.current.value,
    }
    // console.log(PasswordChange)

    // const formData = new FormData()
    // formData.append("password", PasswordChange.password);
    // formData.append("passwordCheck", PasswordChange.passwordCheck);
    // console.log(formData)

    const auth = {
      authorization: sessionStorage.getItem("accessToken"),
      refresh_token: sessionStorage.getItem("refreshToken")
    };

    await axios({
      baseURL: "http://13.125.227.9:8080/",
      method: "PUT",
      url: "/user/signup",
      data: PasswordChange,
      headers: {
        // "Content-Type": "multipart/form-data",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.authorization}`,
        refresh_token: `Bearer ${auth.refresh_token}`
      },
    }).then((response) => {
      if (response.status === 201 && response.data === "변경 완료!")
        alert(`비밀번호가 변경되었습니다.`)
      navigate("/user/login")
    }).catch((error) => {
      console.log("에러", error)
      alert(`비밀번호 변경을 실패하셨습니다.`)
    })
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

  const PwCheckChange = (e) => {
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
      <MemoizedSidebar />
      <Container>
        <h1>비밀번호 변경</h1>
        <ModInputWrap>
          <p>새로운 비밀번호를 입력해주세요.</p>
          <InputTxt>
            <input ref={password_ref} onChange={PwChange}
              type="password" placeholder='새 비밀번호' />
            <input ref={passwordCheck_ref} onChange={PwCheckChange}
              type="password" placeholder='비밀번호 확인' />
          </InputTxt>
        </ModInputWrap>
        <Button>
          <CancleBtn onClick={() => {
            navigate("/user/password");
          }}>뒤로가기</CancleBtn>
          <PwChangeBtn onClick={onhandlePwChange}>저장하기</PwChangeBtn>
        </Button>
      </Container>
    </Wrap>
  );
};

const Wrap = styled.div`
  // background-color: yellow;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  `;

const Container = styled.div`
  // border: 5px solid blue;
  position: relative;
  width: 700px;
  height: 640px;
  margin-left: 260px;
  border-radius: 30px;
  background-color: white;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  h1 {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 30px 0;
    font-size: 26px;
    color: #FE7770;
    width: 540px;
    border-bottom: 1px solid #E0E2E6;
    text-align: center;
  }
  `;

const ModInputWrap = styled.div`
  // background-color: green;
  width: 100%;
  height: 60%;
  margin-bottom: 65px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-size: 17px;
  }
`

const InputTxt = styled.div`
position: relative;
text-align: center;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
input {
  width: 400px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #808080;
  padding: 12px 0 12px 6px;
  margin: 12px auto;
  box-sizing: border-box;
  outline: none;
}
p {
  margin: 0;
  position: absolute;
  left: 6px;
  bottom: -6px;
  font-size: 10px;
  color: #808080;
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
`

const Button = styled.div`
  // background-color: red;
  position: absolute;
  width: 400px;
  height: 40px;
  bottom: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 100%;
    height: 100%;
    margin: 0 10px;
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