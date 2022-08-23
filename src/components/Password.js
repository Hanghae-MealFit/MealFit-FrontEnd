import React from "react";
import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { MemoizedSidebar } from "./Sidebar";

const Password = () => {
  const password_ref = React.useRef(null);
  const pw_err_ref = React.useRef(null);
  const [pwMsg, SetPwMsg] = React.useState("")


  const PwChange = (e) => {
    const regPw = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (e.target.value.length === 0) {
      SetPwMsg("")
    } else if (regPw.test(e.target.value) !== true) {
      SetPwMsg("* 비밀번호는 영어/숫자 조합으로 8자 이상 사용 가능합니다.")
      pw_err_ref.current.style.color = "#FF0000";
    } else {
      SetPwMsg(true)
    }
  }

  const navigate = useNavigate();

  const auth = {
    authorization: sessionStorage.getItem("accessToken"),
    refresh_token: sessionStorage.getItem("refreshToken")
  };

  const onhandlePwChange = async (e) => {
    e.preventDefault()

    const PwChange = {
      password: password_ref.current.value,
    }
    try {
      const res = await axios.post("http://13.125.227.9:8080/user/info/password",
        {
          password: PwChange.password
        }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.authorization}`,
          refresh_token: `Bearer ${auth.refresh_token}`
        }
      })
      console.log(res)
      if (res.status === 200 && res.data.tokenBox.accessToken !== null && res.data.tokenBox.refreshToken !== null && res.data.userInfoDto.userStatus !== "NOT_VALID") {
        sessionStorage.setItem("accessToken", res.data.tokenBox.accessToken)
        sessionStorage.setItem("refreshToken", res.data.tokenBox.refreshToken)
        window.alert(`${res.data.userInfoDto.nickname}님, 인증되었습니다.`)
        navigate("/user/info/password")
      }
    } catch (error) {
      console.log(error)
      // window.alert("비밀번호가 틀렸습니다. 비밀번호를 다시 확인해주세요.")
      // username_ref.current.focus()
    }
  }

  return (
    <Wrap>
      <MemoizedSidebar />
      <Container>
        <h1>본인인증</h1>
        <ModInputWrap>
          <p>비밀번호 변경을 위해 현재 비밀번호를 입력해주세요.</p>
          <InputTxt>
            <input ref={password_ref} onChange={PwChange}
              type="password" placeholder='비밀번호를 입력해주세요.' />
          </InputTxt>
        </ModInputWrap>
        <Button>
          <CancleBtn onClick={() => {
            navigate("/user/info");
          }}>뒤로가기</CancleBtn>
          <PwChangeBtn onClick={onhandlePwChange}>변경하기</PwChangeBtn>
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

export default Password;