import React from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FindMyInfo = () => {

  const sessionStorage = window.sessionStorage;
  const navigate = useNavigate();

  React.useEffect(() => {
    if(sessionStorage.getItem("accessToken") !== null || sessionStorage.getItem("refreshToken") !== null) {
      window.alert("이미 로그인 되어 있는 상태입니다.\n메인으로 돌아갑니다.")
      navigate("/")
    }
  }, [])

  const id_email_ref = React.useRef(null)
  const pw_id_ref = React.useRef(null)
  const pw_email_ref = React.useRef(null)
  const id_email_msg_ref = React.useRef(null)
  const pw_id_msg_ref = React.useRef(null)
  const pw_email_msg_ref = React.useRef(null)

  const [ idEmailMsg, SetIdEmailMsg] = React.useState("* 가입하신 아이디의 이메일을 입력해주세요.")
  const [ pwIdMsg, SetPwIdMsg] = React.useState("* 가입하신 아이디를 입력해주세요.")
  const [ pwEmailMsg, SetPwEmailMsg] = React.useState("* 가입하신 아이디의 이메일을 입력해주세요.")

  const FindId = async () => {
    try {
      const res = await axios.post("http://43.200.174.111:8080/api/user/find/username",
        id_email_ref.current.value,
        {
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
      const res = await axios.post("http://43.200.174.111:8080/api/user/find/password", {
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

  const IdEmailChange = (e) => {
    const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/g;
    if(e.target.value.length === 0) {
      SetIdEmailMsg("* 이메일은 아이디 비밀번호를 찾을 때 사용됩니다.")
      id_email_msg_ref.current.style.color = "#D9D9D9";
    } else if(regEmail.test(e.target.value) !== true) {
      SetIdEmailMsg("* 이메일 형식으로 작성해주세요. ( ex) abc@naver.com )")
      id_email_msg_ref.current.style.color = "#FF7F00";
    } else {
      SetIdEmailMsg("* 올바른 양식으로 작성하였습니다.")
      id_email_msg_ref.current.style.color = "#81C147";
    }
  }

  const PwIdChange = (e) => {
    let regTxt = /[a-z0-9]/;
    let regUpperTxt = /[A-Z]/;
    let regKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    let regSpecial = /[.,~!@#$%^&*()_+|<>?:{}/\\]/;
    let regBlank = /[\s]/;
    if(e.target.value.length === 0) {
      SetPwIdMsg("* 가입하신 아이디를 입력해주세요.")
      pw_id_msg_ref.current.style.color = "#D9D9D9";
    } else if (!(regTxt.test(e.target.value)) || (regUpperTxt.test(e.target.value)) || (regKor.test(e.target.value)) || (regSpecial.test(e.target.value)) || (regBlank.test(e.target.value)) ) {
      SetPwIdMsg("* 영어 소문자 / 숫자를 제외한 다른 문자는 사용할 수 없습니다.")
      pw_id_msg_ref.current.style.color = "#FF7F00";
    } else if(e.target.value.length < 4) {
      SetPwIdMsg("* 아이디는 4글자 이상 12글자 이하로 사용 가능합니다.")
      pw_id_msg_ref.current.style.color = "#FF7F00";
    } else {
      SetPwIdMsg("* 올바른 양식으로 작성하였습니다.")
      pw_id_msg_ref.current.style.color = "#81C147";
    }
  }

  const PwEmailChange = (e) => {
    const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/g;
    if(e.target.value.length === 0) {
      SetPwEmailMsg("* 이메일은 아이디 비밀번호를 찾을 때 사용됩니다.")
      pw_email_msg_ref.current.style.color = "#D9D9D9";
    } else if(regEmail.test(e.target.value) !== true) {
      SetPwEmailMsg("* 이메일 형식으로 작성해주세요. ( ex) abc@naver.com )")
      pw_email_msg_ref.current.style.color = "#FF7F00";
    } else {
      SetPwEmailMsg("* 올바른 양식으로 작성하였습니다.")
      pw_email_msg_ref.current.style.color = "#81C147";
    }
  }

  return (
    <Wrap>
      <FindWrap>
        <InputWrap>
          <h1>아이디/비밀번호 찾기</h1>
          <FindIdInputWrap>
            <p>아이디를 찾기 위해 이메일을 입력해주세요.</p>
            <Find>
              <InputTxt>
                <input type="email" placeholder='이메일을 입력해주세요.' ref={id_email_ref} onChange={IdEmailChange} />
                <p ref={id_email_msg_ref}>{idEmailMsg}</p>
              </InputTxt>
              <button onClick={FindId} disabled={idEmailMsg === "* 올바른 양식으로 작성하였습니다." ? false : true}>아이디 찾기</button>
            </Find>
          </FindIdInputWrap>
          <FindPwInputWrap>
            <p>비밀번호를 찾기 위해 아이디와 이메일을 입력해주세요.</p>
            <Find>
              <InputTxt>
                <input type="text" placeholder='아이디를 입력해주세요.' ref={pw_id_ref} onChange={PwIdChange} />
                <p ref={pw_id_msg_ref}>{pwIdMsg}</p>
              </InputTxt>
              <InputTxt>
                <input type="email" placeholder='이메일을 입력해주세요.' ref={pw_email_ref} onChange={PwEmailChange} />
                <p ref={pw_email_msg_ref}>{pwEmailMsg}</p>
              </InputTxt>
              <button onClick={FindPw} disabled={pwIdMsg === "* 올바른 양식으로 작성하였습니다." && pwEmailMsg === "* 올바른 양식으로 작성하였습니다." ? false : true}>비밀번호 찾기</button>
            </Find>
          </FindPwInputWrap>
        </InputWrap>
      </FindWrap>
    </Wrap>
  )
}

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  /* margin-left: 260px; */
  display: flex;
  justify-content: center;
  align-items: center;
`

const FindWrap = styled.div`
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
  overflow: hidden;
  h1 {
    margin: 0 auto;
    padding-top: 20px;
    font-size: 20px;
    color: #FE7770;
    width: 100%;
    text-align: center;
  }
  @media (min-width: 769px) {
    width: 600px;
    height: 740px;
    border-radius: 30px;
    h1 {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      padding: 30px 0;
      width: 540px;
      border-bottom: 1px solid #E0E2E6;
    }
  }
`

const InputWrap = styled.div`
  width: 100%;
  height: 100%;
  margin: 60px auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > div:nth-of-type(2) {
    background-color: #eee;
  }
`

const FindIdInputWrap = styled.div`
  width: 100%;
  height: 40%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    width: 80%;
    font-size: 12px;
  }
  @media (min-width: 520px) and (max-width: 768px) {
    padding: 0 60px;
    box-sizing: border-box;
  }
  @media (min-width: 769px) {
    p {
      width: 60%;
    }
  }
`

const FindPwInputWrap = styled.div`
  width: 100%;
  height: 60%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    width: 80%;
    font-size: 12px;
  }
  @media (min-width: 520px) and (max-width: 768px) {
    padding: 0 60px;
    box-sizing: border-box;
  }
  @media (min-width: 769px) {
    p {
      width: 60%;
    }
  }
`

const Find = styled.div`
  width: 80%;
  margin: 0 auto;
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
    font-size: 12px;
  }
  button {
    width: 100%;
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
    width: 60%;
    input {
      padding: 12px 0 12px 6px;
    }
  }
`

const InputTxt = styled.div`
  width: 100%;
  position: relative;
  p {
    margin: 0;
    position: absolute;
    left: -26px;
    bottom: -6px;
    width: 280px;
    font-size: 10px;
    -webkit-transform: scale(0.8);
    color: #808080;
    text-align: left;
  }
  @media (min-width: 769px) {
    p {
      left: 6px;
      -webkit-transform: scale(1.0);
    }
  }
`

export default FindMyInfo