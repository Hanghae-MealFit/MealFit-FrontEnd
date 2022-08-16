import React from 'react'
import styled from 'styled-components'
import axios from 'axios'

const FindMyInfo = () => {
  const id_email_ref = React.useRef(null)
  const pw_id_ref = React.useRef(null)
  const pw_email_ref = React.useRef(null)

  const FindId = async () => {
    try {
      const res = await axios.post("http://13.125.227.9:8080/user/find/username", {
        "email": id_email_ref.current.value
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      console.log(res)
    } catch(error) {
      console.log(error)
    }
  }

  const FindPw = async () => {
    try {
      const res = await axios.post("http://13.125.227.9:8080/user/find/password", {
        "username": pw_id_ref.current.value,
        "email": pw_email_ref.current.value
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      })
      console.log(res)
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <FindWrap>
      <h1>아이디/비밀번호 찾기</h1>
      <InputWrap>
        <FindInputWrap>
          <p>아이디를 찾기 위해 이메일을 입력해주세요.</p>
          <Find>
            <input type="email" placeholder='이메일을 입력해주세요.' ref={id_email_ref} />
            <button onClick={FindId}>아이디 찾기</button>
          </Find>
        </FindInputWrap>
        <FindInputWrap>
          <p>비밀번호를 찾기 위해 아이디와 이메일을 입력해주세요.</p>
          <Find>
            <input type="text" placeholder='아이디를 입력해주세요.' ref={pw_id_ref} />
            <input type="email" placeholder='이메일을 입력해주세요.' ref={pw_email_ref} />
            <button onClick={FindPw}>비밀번호 찾기</button>
          </Find>
        </FindInputWrap>
      </InputWrap>
    </FindWrap>
  )
}

const FindWrap = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
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

const InputWrap = styled.div`
  width: 500px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > div:nth-of-type(1) {
    border-bottom: 1px solid #9A9A9A;
  }
`

const FindInputWrap = styled.div`
  width: 100%;
  height: 40%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    font-size: 17px;
  }
`

const Find = styled.div`
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input {
    width: 360px;
    border: none;
    border-bottom: 1px solid #9A9A9A;
    padding: 12px;
    margin: 8px auto;
    box-sizing: border-box;
    outline: none;
  }
  button {
    width: 240px;
    height: 34px;
    border: none;
    border-radius: 30px;
    font-family: 'GmarketM', 'sans-serif';
    font-size: 12px;
    background-color: #FE7770;
    color: #fff;
    margin-top: 24px;
    cursor: pointer;
  }
`

export default FindMyInfo