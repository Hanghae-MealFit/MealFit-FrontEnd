import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import StartHourSelect from '../elements/StartHourSelect'
import StartMinuteSelect from '../elements/StartMinuteSelect'
import EndHourSelect from '../elements/EndHourSelect'
import EndMinuteSelect from '../elements/EndMinuteSelect'
import PicSelect from '../elements/PicSelect'

const Signup = () => {

  const sessionStorage = window.sessionStorage;

  useEffect(() => {
    sessionStorage.setItem("checkUsername", false)
    sessionStorage.setItem("checkNickname", false)
    sessionStorage.setItem("checkEmail", false)
  }, []);

  const username_ref = React.useRef(null);
  const nickname_ref = React.useRef(null);
  const email_ref = React.useRef(null);
  const password_ref = React.useRef(null);
  const passwordCheck_ref = React.useRef(null);
  const currentWeight_ref = React.useRef(null);
  const goalWeight_ref = React.useRef(null);
  const startFastingHour_ref = React.useRef(null);
  const startFastingMinute_ref = React.useRef(null);
  const endFastingHour_ref = React.useRef(null);
  const endFastingMinute_ref = React.useRef(null);
  const username_err_ref = React.useRef(null);
  const nickname_err_ref = React.useRef(null);
  const email_err_ref = React.useRef(null);
  const pw_err_ref = React.useRef(null);
  const pw_check_err_ref = React.useRef(null);

  // formData로 보낼 이미지 파일
  const [ files, setFiles ] = React.useState(null);

  // 현재 체중 목표 체중 값
  const [ curWeight, setCurWeight ] = React.useState();
  const [ goWeight, setGoWeight ] = React.useState();

  const [ curError, setCurError ] = React.useState();
  const [ goError, setGoError ] = React.useState();

  // ID 중복확인 클릭 시, 유저에게 제공 될 값
  const [ checkIdMsg, SetCheckIdMsg ] = React.useState("* 사용하실 아이디를 입력해주세요.");

  // 닉네임 중복확인 클릭 시, 유저에게 제공 될 값
  const [ checkNickMsg, SetCheckNickMsg ] = React.useState("* 사용하실 닉네임을 입력해주세요.");

  // 이메일 중복확인 클릭 시, 유저에게 제공 될 값
  const [ checkEmailMsg, SetCheckEmailMsg ] = React.useState("* 이메일은 아이디 비밀번호를 찾을 때 사용됩니다.");
  
  // 입력된 비밀번호 값이 영어+숫자가 아닐 시, 유저에게 제공 될 값
  const [ PwMsg, SetPwMsg ] = React.useState("* 비밀번호는 영어/숫자 조합으로 8자 이상 사용 가능합니다.");

  // 입력된 비밀번호 값이 영어+숫자가 아닐 시, 유저에게 제공 될 값
  const [ checkPwMsg, SetPwCheckMsg ] = React.useState("* 입력하신 비밀번호를 다시 입력해주세요.");

  // 입력된 아이디 값이 4글자보다 적을 시, 버튼 클릭 불가능하게 설정
  const [ idCheckDis, SetIdCheckDis ] = React.useState(true);

  // 입력된 닉네임 값이 4글자보다 적을 시, 버튼 클릭 불가능하게 설정
  const [ nickCheckDis, SetNickCheckDis ] = React.useState(true);

  // 입력된 이메일 값이 이메일 형식이 아닐 시, 버튼 클릭 불가능하게 설정
  const [ emailCheckDis, SetEmailCheckDis ] = React.useState(true);

  // 체중 입력 시 숫자만 입력할 수 있도록 정규식 사용
  const currentWeight = (e) => {

    setCurWeight(e.target.value.replace(/[^0-9.]/g, ''))
    const regNum = /^(\d*)[\.]?(\d{1,2})?$/g
    if(regNum.test(e.target.value) !== true) {
      setCurError('숫자만 입력 가능합니다.')
    } else {
      setCurError('잘 입력하셨습니다.')
    }
    console.log(e.target.value)
  }

  const goalWeight = (e) => {
    setGoWeight(e.target.value.replace(/[^0-9.]/g, ''))
    console.log(e.target.value)
  }

  const onhandleSignUp = async (e) => {
    e.preventDefault()

    const SignupInfo = {
      username: username_ref.current.value,
      email: email_ref.current.value,
      password: password_ref.current.value,
      passwordCheck: passwordCheck_ref.current.value,
      nickname: nickname_ref.current.value,
      profileImage: files,
      currentWeight: currentWeight_ref.current.value,
      goalWeight: goalWeight_ref.current.value,
      startFasting: startFastingHour_ref.current.value + ":" + startFastingMinute_ref.current.value,
      endFasting: endFastingHour_ref.current.value + ":" + endFastingMinute_ref.current.value,
    }
    // console.log(SignupInfo)

    const formData = new FormData()
    formData.append("username", SignupInfo.username);
    formData.append("email", SignupInfo.email);
    formData.append("password", SignupInfo.password);
    formData.append("passwordCheck", SignupInfo.passwordCheck);
    formData.append("nickname", SignupInfo.nickname);
    formData.append("currentWeight", SignupInfo.currentWeight);
    formData.append("goalWeight", SignupInfo.goalWeight);
    formData.append("startFasting", SignupInfo.startFasting);
    formData.append("endFasting", SignupInfo.endFasting);
    if(SignupInfo.profileImage !== null) {
      formData.append("profileImage", SignupInfo.profileImage);
    }
    console.log(formData)

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
      url: "/user/signup",
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

  const CheckId = async (e) => {
    e.preventDefault()

    try {
      const username = username_ref.current.value
      const res = await axios.get(`http://13.125.227.9:8080/user/username?username=${username}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      })
      console.log(res)
      if(res.data === "검증완료!" && res.status === 200) {
        sessionStorage.setItem("checkUsername", true)
        // alert("사용가능 한 아이디 입니다.")
        SetCheckIdMsg("* 사용 가능 한 아이디입니다.")
        username_err_ref.current.style.color = "#81C147";
      }
    } catch(error) {
      console.log(error)
      sessionStorage.setItem("checkUsername", false)
      // alert("사용 불가능 한 아이디 입니다.")
      SetCheckIdMsg("* 사용 불가능 한 아이디입니다.")
      username_err_ref.current.style.color = "#FF0000";
      username_ref.current.focus()
    }
  }

  const CheckNickname = async (e) => {
    e.preventDefault()

    try {
      const nickname = nickname_ref.current.value
      const res = await axios.get(`http://13.125.227.9:8080/user/nickname?nickname=${nickname}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      })
      console.log(res)
      if(res.data === "검증완료!" && res.status === 200) {
        sessionStorage.setItem("checkNickname", true)
        // alert("사용가능 한 닉네임 입니다.")
        SetCheckNickMsg("* 사용 가능 한 닉네임입니다.")
        nickname_err_ref.current.style.color = "#81C147";
      }
    } catch(error) {
      console.log(error)
      sessionStorage.setItem("checkNickname", false)
      // alert("사용 불가능 한 닉네임 입니다.")
      SetCheckNickMsg("* 사용 불가능 한 닉네임입니다.")
      nickname_err_ref.current.style.color = "#FF0000";
      nickname_ref.current.focus()
    }
  }

  const CheckEmail = async (e) => {
    e.preventDefault()

    try {
      const email = email_ref.current.value
      const res = await axios.get(`http://13.125.227.9:8080/user/email?email=${email}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      })
      console.log(res)
      if(res.data === "검증완료!" && res.status === 200) {
        sessionStorage.setItem("checkEmail", true)
        SetCheckEmailMsg("* 사용 가능 한 이메일입니다.")
        email_err_ref.current.style.color = "#81C147";
      }
    } catch(error) {
      console.log(error)
      sessionStorage.setItem("checkEmail", false)
      SetCheckEmailMsg("* 사용 불가능 한 이메일 입니다.")
      email_err_ref.current.style.color = "#FF0000";
    }
  }

  const IdChange = (e) => {
    let regTxt = /[0-9a-zA-Z]/;
    let regKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    let regSpecial = /[.,~!@#$%^&*()_+|<>?:{}]/;
    let regBlank = /[\s]/;
    if(e.target.value.length === 0) {
      SetIdCheckDis(true)
      SetCheckIdMsg("* 사용하실 아이디를 입력해주세요.")
      username_err_ref.current.style.color = "#D9D9D9";
    } else if (!(regTxt.test(e.target.value)) || (regKor.test(e.target.value)) || (regSpecial.test(e.target.value)) || (regBlank.test(e.target.value)) ) {
      SetIdCheckDis(true)
      SetCheckIdMsg("* 영어 / 숫자를 제외한 다른 문자는 사용할 수 없습니다.")
      username_err_ref.current.style.color = "#FF7F00";
    } else if(e.target.value.length < 4) {
      SetIdCheckDis(true)
      SetCheckIdMsg("* 아이디는 4글자 이상 12글자 이하로 사용 가능합니다.")
      username_err_ref.current.style.color = "#FF7F00";
    } else {
      SetIdCheckDis(false)
      SetCheckIdMsg("* 아이디 중복확인을 진행해주세요.")
      username_err_ref.current.style.color = "#FF7F00";
    }
  }

  const NickChange = (e) => {
    let regTxt = /[0-9a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    let regSpecial = /[.,~!@#$%^&*()_+|<>?:{}]/;
    let regBlank = /[\s]/;
    if(e.target.value.length === 0) {
      SetNickCheckDis(true)
      SetCheckNickMsg("* 사용하실 닉네임을 입력해주세요.")
      nickname_err_ref.current.style.color = "#D9D9D9";
    } else if (!(regTxt.test(e.target.value)) || (regSpecial.test(e.target.value)) || (regBlank.test(e.target.value)) ) {
      SetNickCheckDis(true)
      SetCheckNickMsg("* 영어 / 한글 / 숫자를 제외한 다른 문자는 사용할 수 없습니다.")
      nickname_err_ref.current.style.color = "#FF7F00";
    } else if(e.target.value.length < 2){
      SetNickCheckDis(true)
      SetCheckNickMsg("* 닉네임은 2글자 이상 12글자 이하로 사용 가능합니다.")
      nickname_err_ref.current.style.color = "#FF7F00";
    } else {
      SetNickCheckDis(false)
      SetCheckNickMsg("* 닉네임 중복확인을 진행해주세요.")
      nickname_err_ref.current.style.color = "#FF7F00";
    }
  }

  const EmailChange = (e) => {
    const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/g;
    if(e.target.value.length === 0) {
      SetEmailCheckDis(true)
      SetCheckEmailMsg("* 이메일은 아이디 비밀번호를 찾을 때 사용됩니다.")
      email_err_ref.current.style.color = "#D9D9D9";
    } else if(regEmail.test(e.target.value) !== true) {
      SetEmailCheckDis(true)
      SetCheckEmailMsg("* 이메일 형식으로 작성해주세요. ( ex) abc@naver.com )")
      email_err_ref.current.style.color = "#FF7F00";
    } else {
      SetEmailCheckDis(false)
      SetCheckEmailMsg("* 이메일 중복확인을 진행해주세요.")
      email_err_ref.current.style.color = "#FF7F00";
    }
  }

  const PwChange = (e) => {
    const regPw = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if(e.target.value.length === 0) {
      SetPwMsg("* 비밀번호는 영어/숫자 조합으로 8자 이상 사용 가능합니다.")
      pw_err_ref.current.style.color = "#D9D9D9";
    } else if(regPw.test(e.target.value) !== true) {
      SetPwMsg("* 비밀번호는 영어/숫자 조합으로 8자 이상 사용 가능합니다.")
      pw_err_ref.current.style.color = "#FF0000";
    } else {
      SetPwMsg("* 사용 가능한 비밀번호 입니다.")
      pw_err_ref.current.style.color = "#81C147";
    }
  }

  const PwCheckChange = (e) => {
    if(e.target.value.length === 0) {
      SetPwCheckMsg("* 입력하신 비밀번호를 다시 입력해주세요.")
      pw_check_err_ref.current.style.color = "#D9D9D9";
    }
    else if(password_ref.current.value === e.target.value) {
      SetPwCheckMsg("* 비밀번호가 일치합니다.")
      pw_check_err_ref.current.style.color = "#81C147";
    } else {
      SetPwCheckMsg("* 입력하신 비밀번호와 값이 다릅니다. ")
      pw_check_err_ref.current.style.color = "#FF0000";
    }
  }

  return (
    <SignUpWrap>
      <h1>회원가입</h1>
      <FormWrap>
        <PicWrap>
          <PicSelect files={files} setFiles={setFiles} />
        </PicWrap>
        <Contents>
          <input ref={username_ref} type="text" placeholder='ID를 입력해주세요.' onChange={IdChange} maxLength='12' />
          <button onClick={CheckId} disabled={idCheckDis} >중복확인</button>
          <p ref={username_err_ref}>{checkIdMsg}</p>
        </Contents>
        <Contents>
          <input ref={nickname_ref} type="text" placeholder='닉네임를 입력해주세요.' onChange={NickChange} maxLength='12' />
          <button onClick={CheckNickname} disabled={nickCheckDis} >중복확인</button>
          <p ref={nickname_err_ref}>{checkNickMsg}</p>
        </Contents>
        <Contents>
          <input ref={email_ref} type="email" placeholder='Email를 입력해주세요.' onChange={EmailChange} />
          <button onClick={CheckEmail} disabled={emailCheckDis}>중복확인</button>
          <p ref={email_err_ref}>{checkEmailMsg}</p>
        </Contents>
        <Contents>
          <input ref={password_ref} type="password" placeholder='Password를 입력해주세요.' onChange={PwChange} />
          <p ref={pw_err_ref}>{PwMsg}</p>
        </Contents>
        <Contents>
          <input ref={passwordCheck_ref} type="password" placeholder='Password를 확인해주세요.' onChange={PwCheckChange} />
          <p ref={pw_check_err_ref}>{checkPwMsg}</p>
        </Contents>
        <WeightWrap>
          <div>
            <input ref={currentWeight_ref} maxLength="10" type="number" placeholder='현재 체중을 입력해주세요.' onChange={(e) => {currentWeight(e)}} value={curWeight || ''} />
            <span>(kg)</span>
            <p>{curError}</p>
          </div>
          <div>
            <input ref={goalWeight_ref} maxLength="10" type="number" placeholder='목표 체중을 입력해주세요.' onChange={(e) => {goalWeight(e)}} value={goWeight || ''} />
            <span>(kg)</span>
          </div>
        </WeightWrap>
        <FastTimeWrap>
          <FastTime>
            <p>단식 시작시간</p>
            <div>
              <StartHourSelect startHour={startFastingHour_ref} /> 시
              <StartMinuteSelect startMinute={startFastingMinute_ref} /> 분
            </div>
          </FastTime>
          <FastTime>
            <p>단식 종료시간</p>
            <div>
              <EndHourSelect endHour={endFastingHour_ref} /> 시
              <EndMinuteSelect endMinute={endFastingMinute_ref} /> 분
            </div>
          </FastTime>
        </FastTimeWrap>
        <Button>
          <CancleBtn>취소</CancleBtn>
          <SignUpBtn onClick={onhandleSignUp}>회원가입</SignUpBtn>
        </Button>
      </FormWrap>
      <LoginTxt>
        이미 회원이신가요? <span>밀핏 계정으로 로그인하기</span>
      </LoginTxt>
    </SignUpWrap>
  )
}

const SignUpWrap = styled.div`
  position: relative;
  width: 700px;
  height: 920px;
  margin-left: 260px;
  /* margin: 0 auto; */
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

const FormWrap = styled.form`
  margin-top: 60px;
`

const PicWrap = styled.div`
  width: 100%;
  margin: 0 auto;
`

const Contents = styled.div`
  position: relative;
  width: 460px;
  margin: 26px auto;
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
    cursor: pointer;
  }
  button:disabled {
    border: 1px solid #9A9A9A;
    cursor: default;
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

const WeightWrap = styled.div`
  width: 460px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    position: relative;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  div input {
    width: 100%;
    padding: 12px;
    border: none;
    border-bottom: 1px solid #9A9A9A;
    box-sizing: border-box;
    outline: none;
  }
  div input[type="number"]::-webkit-outer-spin-button,
  div input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
  div span {
    position: absolute;
    bottom: 12px;
    right: 10px;
    font-size: 12px;
    color: #9A9A9A;
  }
`

const FastTimeWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 460px;
  height: 120px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #9A9A9A;
  border-radius: 20px;
  margin: 30px auto;
`

const FastTime = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 10px 0;
  p {
    margin: 0;
  }
`

const Button = styled.div`
  width: 460px;
  height: 40px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 140px;
    height: 100%;
    margin: 0 10px;
    border: none;
    border-radius: 30px;
    color: #fff;
    font-size: 16px;
    font-weight: 900;
    font-family: 'GmarketM', 'sans-serif';
    cursor: pointer;
  }
`

const CancleBtn = styled.button`
  background-color: #C2C2C2;
`

const SignUpBtn = styled.button`
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

export default Signup