import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

import PicSelect from '../elements/PicSelect'

const Signup = () => {

  const sessionStorage = window.sessionStorage;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if(sessionStorage.getItem("accessToken") !== null || sessionStorage.getItem("refreshToken") !== null) {
      window.alert("이미 로그인 되어 있는 상태입니다.\n메인으로 돌아갑니다.")
      navigate("/")
    }
  }, [])

  const username_ref = useRef(null);
  const nickname_ref = useRef(null);
  const email_ref = useRef(null);
  const password_ref = useRef(null);
  const passwordCheck_ref = useRef(null);
  const currentWeight_ref = useRef(null);
  const goalWeight_ref = useRef(null);
  const startFastingHour_ref = useRef(null);
  const startFastingMinute_ref = useRef(null);
  const endFastingHour_ref = useRef(null);
  const endFastingMinute_ref = useRef(null);
  const username_err_ref = useRef(null);
  const nickname_err_ref = useRef(null);
  const email_err_ref = useRef(null);
  const pw_err_ref = useRef(null);
  const pw_check_err_ref = useRef(null);
  const current_weight_err_ref = useRef(null);
  const goal_weight_err_ref = useRef(null);
  const hour_check_ref = useRef(null)

  // formData로 보낼 이미지 파일
  const [files, setFiles] = useState(null);

  // 현재 체중 목표 체중 값
  const [curWeight, setCurWeight] = useState();
  const [goWeight, setGoWeight] = useState();

  const [curInfoMsg, SetCurInfoMsg] = useState(false);
  const [goInfoMsg, SetGoInfoMsg] = useState(false);
  const [curError, setCurError] = useState("* 현재 체중을 입력해주세요.");
  const [goError, setGoError] = useState("* 목표 체중을 입력해주세요.");

  // ID 중복확인 클릭 시, 유저에게 제공 될 값
  const [checkIdMsg, SetCheckIdMsg] = useState("* 사용하실 아이디를 입력해주세요.");

  // 닉네임 중복확인 클릭 시, 유저에게 제공 될 값
  const [checkNickMsg, SetCheckNickMsg] = useState("* 사용하실 닉네임을 입력해주세요.");

  // 이메일 중복확인 클릭 시, 유저에게 제공 될 값
  const [checkEmailMsg, SetCheckEmailMsg] = useState("* 이메일은 아이디 비밀번호를 찾을 때 사용됩니다.");

  // 입력된 비밀번호 값이 영어+숫자가 아닐 시, 유저에게 제공 될 값
  const [PwMsg, SetPwMsg] = useState("* 비밀번호는 영어/숫자 조합으로 8자 이상 사용 가능합니다.");

  // 입력된 비밀번호 값이 영어+숫자가 아닐 시, 유저에게 제공 될 값
  const [checkPwMsg, SetPwCheckMsg] = useState("* 입력하신 비밀번호를 다시 입력해주세요.");

  // 단식 시간 설정하지 않았을 경우, 버튼 클릭 불가능하게 설정
  const [startHourCheck, SetStartHourCheck] = useState("* 필수 선택값을 선택하세요.");

  // 입력된 아이디 값이 4글자보다 적을 시, 버튼 클릭 불가능하게 설정
  const [idCheckDis, SetIdCheckDis] = useState(true);

  // 입력된 닉네임 값이 2글자보다 적을 시, 버튼 클릭 불가능하게 설정
  const [nickCheckDis, SetNickCheckDis] = useState(true);

  // 입력된 이메일 값이 이메일 형식이 아닐 시, 버튼 클릭 불가능하게 설정
  const [emailCheckDis, SetEmailCheckDis] = useState(true);

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
    if (SignupInfo.profileImage !== null) {
      formData.append("profileImage", SignupInfo.profileImage);
    }
    // console.log(formData)

    await axios({
      baseURL: "http://43.200.174.111:8080/",
      method: "POST",
      url: "/api/user/signup",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response) => {
      if (response.status === 201 && response.data === "가입 완료!")
        alert(`${nickname_ref.current.value}님 반갑습니다.\n밀핏 회원가입에 성공하셨습니다.\n가입 시 입력하신 이메일을 확인하여 인증을 완료해주세요.`)
      navigate("/user/login")
    }).catch((error) => {
      // console.log("에러", error)
      alert(`밀핏 회원가입에 실패하셨습니다.`)
    })
  }

  const CheckId = async (e) => {
    e.preventDefault()

    try {
      const username = username_ref.current.value
      const res = await axios.get(`http://43.200.174.111:8080/api/user/username/${username}`,
        {
          headers: {
            "Content-Type": "application/json"
          }
        })
      if (res.data === "검증완료!" && res.status === 200) {
        SetCheckIdMsg("* 사용 가능 한 아이디입니다.")
        username_err_ref.current.style.color = "#81C147";
      }
      // console.log(res)
    } catch (error) {
      // console.log(error)
      SetCheckIdMsg("* 사용 불가능 한 아이디입니다.")
      username_err_ref.current.style.color = "#FF0000";
      username_ref.current.focus()
    }
  }

  const CheckNickname = async (e) => {
    e.preventDefault()

    try {
      const nickname = nickname_ref.current.value
      const res = await axios.get(`http://43.200.174.111:8080/api/user/nickname/${nickname}`,
        {
          headers: {
            "Content-Type": "application/json"
          }
        })
      if (res.data === "검증완료!" && res.status === 200) {
        SetCheckNickMsg("* 사용 가능 한 닉네임입니다.")
        nickname_err_ref.current.style.color = "#81C147";
      }
      // console.log(res)
    } catch (error) {
      // console.log(error)
      SetCheckNickMsg("* 사용 불가능 한 닉네임입니다.")
      nickname_err_ref.current.style.color = "#FF0000";
      nickname_ref.current.focus()
    }
  }

  const CheckEmail = async (e) => {
    e.preventDefault()

    try {
      const email = email_ref.current.value
      const res = await axios.get(`http://43.200.174.111:8080/api/user/email/${email}`,
        {
          headers: {
            "Content-Type": "application/json"
          }
        })
      if (res.data === "검증완료!" && res.status === 200) {
        SetCheckEmailMsg("* 사용 가능 한 이메일입니다.")
        email_err_ref.current.style.color = "#81C147";
      }
      // console.log(res)
    } catch (error) {
      // console.log(error)
      SetCheckEmailMsg("* 사용 불가능 한 이메일 입니다.")
      email_err_ref.current.style.color = "#FF0000";
    }
  }

  const IdChange = (e) => {
    let regTxt = /[a-z0-9]/;
    let regUpperTxt = /[A-Z]/;
    let regKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    let regSpecial = /[.,~!@#$%^&*()_+|<>?:{}/\\]/;
    let regBlank = /[\s]/;
    if (e.target.value.length === 0) {
      SetIdCheckDis(true)
      SetCheckIdMsg("* 사용하실 아이디를 입력해주세요.")
      username_err_ref.current.style.color = "#D9D9D9";
    } else if (!(regTxt.test(e.target.value)) || (regUpperTxt.test(e.target.value)) || (regKor.test(e.target.value)) || (regSpecial.test(e.target.value)) || (regBlank.test(e.target.value))) {
      SetIdCheckDis(true)
      SetCheckIdMsg("* 영어 소문자 / 숫자를 제외한 다른 문자는 사용할 수 없습니다.")
      username_err_ref.current.style.color = "#FF7F00";
    } else if (e.target.value.length < 4) {
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
    let regSpecial = /[.,~!@#$%^&*()_+|<>?:{}/\\]/;
    let regBlank = /[\s]/;
    if (e.target.value.length === 0) {
      SetNickCheckDis(true)
      SetCheckNickMsg("* 사용하실 닉네임을 입력해주세요.")
      nickname_err_ref.current.style.color = "#D9D9D9";
    } else if (!(regTxt.test(e.target.value)) || (regSpecial.test(e.target.value)) || (regBlank.test(e.target.value))) {
      SetNickCheckDis(true)
      SetCheckNickMsg("* 영어 / 한글 / 숫자를 제외한 다른 문자는 사용할 수 없습니다.")
      nickname_err_ref.current.style.color = "#FF7F00";
    } else if (e.target.value.length < 2) {
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
    if (e.target.value.length === 0) {
      SetEmailCheckDis(true)
      SetCheckEmailMsg("* 이메일은 아이디 비밀번호를 찾을 때 사용됩니다.")
      email_err_ref.current.style.color = "#D9D9D9";
    } else if (regEmail.test(e.target.value) !== true) {
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

  const CurrentWeightChange = (e) => {
    // 체중 입력 시 숫자만 입력할 수 있도록 정규식 사용
    setCurWeight(e.target.value.replace(/[^0-9.]/g, ''))
    const regDot = /[\.]/g
    const regNum = /^(\d{0,3})[\.]?(\d{1})?$/g
    if (e.target.value.length === 0) {
      setCurError("* 현재 체중을 입력해주세요.")
      current_weight_err_ref.current.style.color = "#D9D9D9"
    } else if (!(regDot.test(e.target.value)) && e.target.value.length === 4) {
      setCurError("* 양식에 맞춰 작성해주세요.")
      current_weight_err_ref.current.style.color = "#FF0000";
    } else if (regNum.test(e.target.value) !== true) {
      setCurError("* 양식에 맞춰 작성해주세요.")
      current_weight_err_ref.current.style.color = "#FF0000";
    } else {
      setCurError('* 양식에 맞게 작성되었습니다.')
      current_weight_err_ref.current.style.color = "#81C147";
    }
  }

  const GoalWeightChange = (e) => {
    // 체중 입력 시 숫자만 입력할 수 있도록 정규식 사용
    setGoWeight(e.target.value.replace(/[^0-9.]/g, ''))
    const regDot = /[\.]/g
    const regNum = /^(\d{0,3})[\.]?(\d{1})?$/g
    if (e.target.value.length === 0) {
      setGoError("* 현재 체중을 입력해주세요.")
      goal_weight_err_ref.current.style.color = "#D9D9D9"
    } else if (!(regDot.test(e.target.value)) && e.target.value.length === 4) {
      setGoError("* 양식에 맞춰 작성해주세요.")
      goal_weight_err_ref.current.style.color = "#FF0000";
    } else if (regNum.test(e.target.value) !== true) {
      setGoError("* 양식에 맞춰 작성해주세요.")
      goal_weight_err_ref.current.style.color = "#FF0000";
    } else {
      setGoError('* 양식에 맞게 작성되었습니다.')
      goal_weight_err_ref.current.style.color = "#81C147";
    }
  }

  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(0, object.target.maxLength)
    }
  }

  const TimeChange = (e) => {
    if (startFastingHour_ref.current.value && startFastingMinute_ref.current.value && endFastingHour_ref.current.value && endFastingMinute_ref.current.value !== "default") {
      SetStartHourCheck("")
      hour_check_ref.current.style.display = "none"
    } else {
      SetStartHourCheck("* 필수 선택값을 모두 선택하세요.")
      hour_check_ref.current.style.color = "#FF0000"
    }
  }

  return (
    <Wrap>
      <SignUpWrap>
        <FormWrap>
          <h1>회원가입</h1>
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
            <input ref={password_ref} type="password" placeholder='Password를 입력해주세요.' onChange={PwChange} autoComplete="off" />
            <p ref={pw_err_ref}>{PwMsg}</p>
          </Contents>
          <Contents>
            <input ref={passwordCheck_ref} type="password" placeholder='Password를 확인해주세요.' onChange={PwCheckChange} autoComplete="off" />
            <p ref={pw_check_err_ref}>{checkPwMsg}</p>
          </Contents>
          <WeightWrap>
            <div>
              {curInfoMsg ?
                (
                  <HoverMsg>
                    정수 혹은 소수점 첫째자리까지 입력해주세요.<br />
                    <span>ex) 40 / 40.5 / 100.5</span>
                  </HoverMsg>
                ) :
                (
                  null
                )
              }
              <input ref={currentWeight_ref} maxLength={5} type="number" onInput={maxLengthCheck} onMouseEnter={() => SetCurInfoMsg(true)} onMouseLeave={() => SetCurInfoMsg(false)} placeholder='현재 체중' onChange={(e) => { CurrentWeightChange(e) }} value={curWeight || ''} />
              <span className='weight'>(kg)</span>
              <p className="infomsg" ref={current_weight_err_ref}>{curError}</p>
            </div>
            <div>
              {goInfoMsg ?
                (
                  <HoverMsg>
                    정수 혹은 소수점 첫째자리까지 입력해주세요.<br />
                    <span>ex) 40 / 40.5 / 100.5</span>
                  </HoverMsg>
                ) :
                (
                  null
                )
              }
              <input ref={goalWeight_ref} maxLength={5} type="number" onInput={maxLengthCheck} onMouseEnter={() => SetGoInfoMsg(true)} onMouseLeave={() => SetGoInfoMsg(false)} placeholder='목표 체중' onChange={(e) => { GoalWeightChange(e) }} value={goWeight || ''} />
              <span className='weight'>(kg)</span>
              <p className="infomsg" ref={goal_weight_err_ref}>{goError}</p>
            </div>
          </WeightWrap>
          <FastTimeWrap>
            <span ref={hour_check_ref}>{startHourCheck}</span>
            <FastTime>
              <p>단식 시작시간</p>
              <div>
                <Select ref={startFastingHour_ref} onChange={TimeChange} defaultValue="default" id="StartHour" name="StartHour">
                  <option value="default" disabled>시간</option>
                  {
                    Array.from({ length: 24 }, (item, index) => {
                      return <option value={(index < 10 ? "0" + index : index)} key={(index < 10 ? "0" + index : index) + "Hour"}> {index < 10 ? "0" + index : index}</option>
                    })
                  }
                </Select> 시
                <Select ref={startFastingMinute_ref} onChange={TimeChange} defaultValue="default" id="StartMinute" name="StartMinute">
                  <option value="default" disabled>분</option>
                  {
                    Array.from({ length: 60 }, (item, index) => {
                      return <option value={(index < 10 ? "0" + index : index)} key={(index < 10 ? "0" + index : index) + "Minute"}> {index < 10 ? "0" + index : index}</option>
                    })
                  }
                </Select> 분
              </div>
            </FastTime>
            <FastTime>
              <p>단식 종료시간</p>
              <div>
                <Select ref={endFastingHour_ref} onChange={TimeChange} defaultValue="default" id="EndHour" name="EndHour">
                  <option value="default" disabled>시간</option>
                  {
                    Array.from({ length: 24 }, (item, index) => {
                      return <option value={(index < 10 ? "0" + index : index)} key={(index < 10 ? "0" + index : index) + "Hour"}> {index < 10 ? "0" + index : index}</option>
                    })
                  }
                </Select> 시
                <Select ref={endFastingMinute_ref} onChange={TimeChange} defaultValue="default" id="EndMinute" name="EndMinute">
                  <option value="default" disabled>분</option>
                  {
                    Array.from({ length: 60 }, (item, index) => {
                      return <option value={(index < 10 ? "0" + index : index)} key={(index < 10 ? "0" + index : index) + "Minute"}> {index < 10 ? "0" + index : index}</option>
                    })
                  }
                </Select> 분
              </div>
            </FastTime>
          </FastTimeWrap>
          <Button>
            <CancleBtn onClick={() => navigate("/")}>취소</CancleBtn>
            <SignUpBtn
              onClick={onhandleSignUp}
              disabled=
              {
                checkIdMsg === "* 사용 가능 한 아이디입니다." &&
                  checkNickMsg === "* 사용 가능 한 닉네임입니다." &&
                  checkEmailMsg === "* 사용 가능 한 이메일입니다." &&
                  PwMsg === "* 사용 가능한 비밀번호 입니다." &&
                  checkPwMsg === "* 비밀번호가 일치합니다." &&
                  curError === "* 양식에 맞게 작성되었습니다." &&
                  goError === "* 양식에 맞게 작성되었습니다." &&
                  startHourCheck === ""
                  ? false : true
              }>회원가입</SignUpBtn>
          </Button>
        </FormWrap>
        {/* <LoginTxt>
          이미 회원이신가요? <span onClick={() => navigate("/user/login")}>밀핏 계정으로 로그인하기</span>
        </LoginTxt> */}
      </SignUpWrap>
    </Wrap>
  )
}

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 769px) {
    height: 100%;
    margin-top: 100px;
    margin-bottom: 40px;
  }
  @media (min-width: 1024px) and (max-height: 1000px) {
    height: 100%;
    margin-left: 260px;
    margin-top: 40px;
    margin-bottom: 40px;
  }
  @media (min-width: 1024px) and (min-height: 1001px) {
    height: 100vh;
    margin-left: 260px;
    margin-top: 0px;
    margin-bottom: 0px;
  }
`

const SignUpWrap = styled.div`
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
    height: 840px;
    border-radius: 30px;
    h1 {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      border-bottom: 1px solid #E0E2E6;
      font-size: 26px;
    }
  }
  @media (min-width: 1024px) {
    height: 940px;
  }
`

const FormWrap = styled.form`
  margin-top: 60px;
  width: 100%;
  height: 100%;
  @media (min-width: 769px) {
    margin-top: 124px;
  }
`

const PicWrap = styled.div`
  width: 100%;
  margin: 0 auto;
`

const Contents = styled.div`
  position: relative;
  width: 80%;
  margin: 20px auto;  
  input {
    width: 100%;
    border: none;
    border-bottom: 1px solid #9A9A9A;
    padding: 6px 0 6px 3px;
    box-sizing: border-box;
    outline: none;
    font-size: 11px;
  }
  button {
    position: absolute;
    bottom: 6px;
    right: 0;
    width: 54px;
    height: 20px;
    border: 1px solid #000;
    border-radius: 6px;
    font-family: 'GmarketM', 'sans-serif';
    font-size: 10px;
    background-color: transparent;
    cursor: pointer;
  }
  button:disabled {
    border: 1px solid #9A9A9A;
    cursor: default;
  }
  p {
    position: absolute;
    bottom: -16px;
    left: -26px;
    margin: 0;
    width: 280px;
    font-size: 10px;
    -webkit-transform: scale(0.8);
    color: #D9D9D9;
    text-align: left;
  }
  @media (min-width: 769px) {
    width: 460px;
    margin: 26px auto;
    input {
      padding: 12px 0 12px 6px;
    }
    button {
      bottom: 10px;
      right: 0;
      width: 80px;
      height: 30px;
      font-size: 12px;
    }
    p {
      bottom: -20px;
      left: 6px;
      -webkit-transform: scale(1.0);
    }
  }
`

const WeightWrap = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    position: relative;
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  div input {
    width: 100%;
    padding: 6px 0 6px 3px;
    font-size: 11px;
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
  div span.weight {
    position: absolute;
    bottom: 6px;
    right: 6px;
    font-size: 10px;
    color: #9A9A9A;
  }
  div p.infomsg {
    position: absolute;
    bottom: -16px;
    left: -12px;
    width: 140px;
    margin: 0;
    font-size: 10px;
    -webkit-transform: scale(0.8);
    color: #D9D9D9;
    text-align: left;
  }
  @media (min-width: 320px) {
    div {
      width: 140px;
    }
  }
  @media (min-width: 769px) {
    width: 460px;
    div {
      width: 200px;
    }
    div input {
      padding: 12px;
    }
    div span.weight {
      bottom: 12px;
      right: 10px;
      font-size: 12px;
    }
    div p.infomsg {
      bottom: -20px;
      left: 6px;
      -webkit-transform: scale(1.0);
    }
  }
`

const HoverMsg = styled.p`
  position: absolute;
  top: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 120px;
  height: 40px;
  font-size: 10px;
  -webkit-transform: scale(0.8);
  background-color: white;
  border: 1px solid #FE7770;
  border-radius: 6px;
  padding: 4px;
  color: #333;
  z-index: 5000;
  span {
    color: #81C147;
    font-size: 10px;
    margin-top: 6px;
  }
  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: 20px;
    width: 8px;
    height: 8px;
    border-bottom: 1px solid transparent;
    border-right: 1px solid transparent;
    border-top: 1px solid #FE7770;
    border-left: 1px solid #FE7770;
    box-sizing: border-box;
    background-color: white;
    transform: rotate(45deg);
  }
  @media (min-width: 769px) {
    top: 35px;
    left: 0;
    width: 100%;
    font-size: 10px;
    -webkit-transform: scale(0.9);
    span {
      font-size: 11px;
    }
  }
`

const FastTimeWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  height: 80px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #9A9A9A;
  border-radius: 20px;
  margin: 30px auto;
  span {
    position: absolute;
    bottom: -20px;
    left: 6px;
    font-size: 10px;
    color: #D9D9D9;
  }
  @media (min-width: 769px) {
    width: 460px;
    height: 120px;
  }
`

const FastTime = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 10px 0;
  font-size: 11px;
  p {
    margin: 0;
  }
  @media (min-width: 769px) {
    font-size: 14px;
  }
`

const Button = styled.div`
  width: 80%;
  height: 36px;
  margin: 0 auto 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    width: 46%;
    height: 100%;
    margin: 0;
    border: none;
    border-radius: 30px;
    color: #fff;
    font-size: 16px;
    font-weight: 900;
    font-family: 'GmarketM', 'sans-serif';
    cursor: pointer;
  }
  @media (min-width: 769px) {
    width: 460px;
    height: 40px;
  }
`

const CancleBtn = styled.button`
  background-color: #C2C2C2;
`

const SignUpBtn = styled.button`
  background-color: #FE7770;
  &:disabled {
    background-color: #C2C2C2;
    cursor: default;
  }
`

const Select = styled.select`
  width: 50px;
  height: 20px;
  border: none;
  border-bottom: 1px solid #9A9A9A;
  outline: none;
  padding: 0 4px;
  box-sizing: border-box;
  font-family: 'GmarketM', 'sans-serif';
  font-size: 10px;
  text-align: center;
  @media (min-width: 769px) {
    width: 60px;
    height: 30px;
    font-size: 12px;
  }
`

export default Signup