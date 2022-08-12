import React from 'react'
import styled from 'styled-components'

import StartHourSelect from '../elements/StartHourSelect'
import StartMinuteSelect from '../elements/StartMinuteSelect'
import EndHourSelect from '../elements/EndHourSelect'
import EndMinuteSelect from '../elements/EndMinuteSelect'
import PicSelect from '../elements/PicSelect'

const Signup = () => {

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

  // 현재 체중 목표 체중 값
  const [ curWeight, setCurWeight ] = React.useState();
  const [ goWeight, setGoWeight ] = React.useState();

  const [ curError, setCurError ] = React.useState();
  const [ goError, setGoError ] = React.useState();

  // 체중 입력 시 숫자만 입력할 수 있도록 정규식 사용
  const currentWeight = (e) => {
    setCurWeight(e.target.value.replace(/[^0-9.]/g, ''))

    // if(e.target.value.find(/[^0-9.]/g, '')) {
    //   setCurError('')
    // } else {
    //   setCurError('숫자만 입력 가능합니다.')
    // }
    console.log(e.target.value)
  }

  const goalWeight = (e) => {
    setGoWeight(e.target.value.replace(/[^0-9.]/g, ''))
    // console.log(e.target.value)
  }

  const onhandleSignUp = async (e) => {
    e.preventDefault()

    const SignupInfo = {
      username: username_ref.current.value,
      email: email_ref.current.value,
      password: password_ref.current.value,
      passwordCheck: passwordCheck_ref.current.value,
      nickname: nickname_ref.current.value,
      currentWeight: currentWeight_ref.current.value,
      goalWeight: goalWeight_ref.current.value,
      startFasting: startFastingHour_ref.current.value + ":" + startFastingMinute_ref.current.value,
      endFasting: endFastingHour_ref.current.value + ":" + endFastingMinute_ref.current.value,
    }
    console.log(SignupInfo)

    const formData = new FormData()
    formData.append("username", SignupInfo.username)
  }


  const temp_img = "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
  const [ files, setFiles ] = React.useState(temp_img);

  return (
    <SignUpWrap>
      <h1>회원가입</h1>
      <form action="">
        <PicWrap>
          <PicSelect files={files} setFiles={setFiles} />
        </PicWrap>
        <Contents>
          <input ref={username_ref} type="text" placeholder='ID를 입력해주세요.' />
          <button>중복확인</button>
        </Contents>
        <Contents>
          <input ref={nickname_ref} type="text" placeholder='닉네임를 입력해주세요.' />
          <button>중복확인</button>
        </Contents>
        <Contents>
          <input ref={email_ref} type="email" placeholder='Email를 입력해주세요.' />
          <button>중복확인</button>
          <p>* 이메일은 아이디 비밀번호를 찾을 때 사용됩니다.</p>
        </Contents>
        <Contents>
          <input ref={password_ref} type="password" placeholder='Password를 입력해주세요.' />
        </Contents>
        <Contents>
          <input ref={passwordCheck_ref} type="password" placeholder='Password를 확인해주세요.' />
        </Contents>
        <WeightWrap>
          <div>
            <input ref={currentWeight_ref} maxLength={10} type="text" placeholder='현재 체중을 입력해주세요.' onChange={(e) => {currentWeight(e)}} value={curWeight || ''} />
            <span>(kg)</span>
          </div>
          <div>
            <input ref={goalWeight_ref} maxLength={10} type="text" placeholder='목표 체중을 입력해주세요.' onChange={(e) => {goalWeight(e)}} value={goWeight || ''} />
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
        <div>
          <button>취소</button>
          <button onClick={onhandleSignUp}>회원가입</button>
        </div>
      </form>
    </SignUpWrap>
  )
}

const SignUpWrap = styled.div`
  width: 700px;
  height: 1100px;
  margin: 0 auto;
  border-radius: 30px;
  background-color: white;
  h1 {
    margin: 0 auto;
    font-size: 26px;
    color: #FE7770;
    width: 540px;
    border-bottom: 1px solid #E0E2E6;
    text-align: center;
  }
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
    font-size: 14px;
    background-color: transparent;
    cursor: #000;
  }
  p {
    position: absolute;
    bottom: -20px;
    left: 6px;
    margin: 0;
    font-size: 12px;
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
  margin: 0 auto;
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

export default Signup