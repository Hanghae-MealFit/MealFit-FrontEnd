import React, { useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import PicSelect from '../elements/PicSelect'

const SignupSNS = () => {

  const nickname_ref = React.useRef(null);
  const currentWeight_ref = React.useRef(null);
  const goalWeight_ref = React.useRef(null);
  const startFastingHour_ref = React.useRef(null);
  const startFastingMinute_ref = React.useRef(null);
  const endFastingHour_ref = React.useRef(null);
  const endFastingMinute_ref = React.useRef(null);
  const nickname_err_ref = React.useRef(null);
  const current_weight_err_ref = React.useRef(null);
  const goal_weight_err_ref = React.useRef(null);
  const hour_check_ref = React.useRef(null);

  //
  const [ files, setFiles ] = React.useState(null);

  // 현재 체중 목표 체중 값
  const [ curWeight, setCurWeight ] = React.useState();
  const [ goWeight, setGoWeight ] = React.useState();

  const [ curInfoMsg, SetCurInfoMsg ] = React.useState(false);
  const [ goInfoMsg, SetGoInfoMsg ] = React.useState(false);
  const [ curError, setCurError ] = React.useState("* 현재 체중을 입력해주세요.");
  const [ goError, setGoError ] = React.useState("* 목표 체중을 입력해주세요.");

  // 닉네임 중복확인 클릭 시, 유저에게 제공 될 값
  const [ checkNickMsg, SetCheckNickMsg ] = React.useState("* 사용하실 닉네임을 입력해주세요.");

  // 입력된 닉네임 값이 2글자보다 적을 시, 버튼 클릭 불가능하게 설정
  const [ nickCheckDis, SetNickCheckDis ] = React.useState(true);

  // 단식 시간 설정하지 않았을 경우, 버튼 클릭 불가능하게 설정
  const [ startHourCheck, SetStartHourCheck ] = React.useState("* 필수 선택값을 선택하세요.");

  const onhandleSignUpSNS = async (e) => {
    e.preventDefault()

    const SignupSNSInfo = {
      nickname: nickname_ref.current.value,
      profileImage: files,
      currentWeight: currentWeight_ref.current.value,
      goalWeight: goalWeight_ref.current.value,
      startFasting: startFastingHour_ref.current.value + ":" + startFastingMinute_ref.current.value,
      endFasting: endFastingHour_ref.current.value + ":" + endFastingMinute_ref.current.value,
    }
    // console.log(SignupInfo)

    const formData = new FormData()
    formData.append("nickname", SignupSNSInfo.nickname);
    formData.append("currentWeight", SignupSNSInfo.currentWeight);
    formData.append("goalWeight", SignupSNSInfo.goalWeight);
    formData.append("startFasting", SignupSNSInfo.startFasting);
    formData.append("endFasting", SignupSNSInfo.endFasting);
    if(SignupSNSInfo.profileImage !== null) {
      formData.append("profileImage", SignupSNSInfo.profileImage);
    }
    console.log(formData)

    await axios({
      baseURL: "http://13.125.227.9:8080/",
      method: "POST",
      url: "/user/signupsns",
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
      if(res.data === "검증완료!" && res.status === 200) {
        SetCheckNickMsg("* 사용 가능 한 닉네임입니다.")
        nickname_err_ref.current.style.color = "#81C147";
      }
    } catch(error) {
      console.log(error)
      SetCheckNickMsg("* 사용 불가능 한 닉네임입니다.")
      nickname_err_ref.current.style.color = "#FF0000";
      nickname_ref.current.focus()
    }
  }

  const NickChange = (e) => {
    let regTxt = /[0-9a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    let regSpecial = /[.,~!@#$%^&*()_+|<>?:{}/\\]/;
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

  const CurrentWeightChange = (e) => {
    // 체중 입력 시 숫자만 입력할 수 있도록 정규식 사용
    setCurWeight(e.target.value.replace(/[^0-9.]/g, ''))
    const regDot = /[\.]/g
    const regNum = /^(\d{0,3})[\.]?(\d{1})?$/g
    if(e.target.value.length === 0) {
      setCurError("* 현재 체중을 입력해주세요.")
      current_weight_err_ref.current.style.color = "#D9D9D9"
    } else if(!(regDot.test(e.target.value)) && e.target.value.length === 4) {
      setCurError("* 양식에 맞춰 작성해주세요.")
      current_weight_err_ref.current.style.color = "#FF0000";
    } else if(regNum.test(e.target.value) !== true) {
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
    if(e.target.value.length === 0) {
      setGoError("* 현재 체중을 입력해주세요.")
      goal_weight_err_ref.current.style.color = "#D9D9D9"
    } else if(!(regDot.test(e.target.value)) && e.target.value.length === 4) {
      setGoError("* 양식에 맞춰 작성해주세요.")
      goal_weight_err_ref.current.style.color = "#FF0000";
    } else if(regNum.test(e.target.value) !== true) {
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
    if(startFastingHour_ref.current.value && startFastingMinute_ref.current.value && endFastingHour_ref.current.value && endFastingMinute_ref.current.value !== "default") {
      SetStartHourCheck("")
      hour_check_ref.current.style.display = "none"
    } else {
      SetStartHourCheck("* 필수 선택값을 모두 선택하세요.")
      hour_check_ref.current.style.color = "#FF0000"
    }
  }

  return (
    <SignUpWrap>
      <h1>회원정보 작성</h1>
      <FormWrap>
        <PicWrap>
          <PicSelect files={files} setFiles={setFiles} />
        </PicWrap>
        <Contents>
          <input ref={nickname_ref} type="text" placeholder='닉네임를 입력해주세요.' onChange={NickChange} maxLength='12' />
          <button onClick={CheckNickname} disabled={nickCheckDis} >중복확인</button>
          <p ref={nickname_err_ref}>{checkNickMsg}</p>
        </Contents>
        <WeightWrap>
          <div>
            { curInfoMsg ? 
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
            <input ref={currentWeight_ref} maxLength={5} type="number" onInput={maxLengthCheck} onMouseEnter={() => SetCurInfoMsg(true)} onMouseLeave={() => SetCurInfoMsg(false)} placeholder='현재 체중을 입력해주세요.' onChange={(e) => {CurrentWeightChange(e)}} value={curWeight || ''} />
            <span className='weight'>(kg)</span>
            <p ref={current_weight_err_ref}>{curError}</p>
          </div>
          <div>
            { goInfoMsg ?
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
            <input ref={goalWeight_ref} maxLength={5} type="number" onInput={maxLengthCheck} onMouseEnter={() => SetGoInfoMsg(true)} onMouseLeave={() => SetGoInfoMsg(false)} placeholder='목표 체중을 입력해주세요.' onChange={(e) => {GoalWeightChange(e)}} value={goWeight || ''} />
            <span className='weight'>(kg)</span>
            <p ref={goal_weight_err_ref}>{goError}</p>
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
                  return <option value = {(index < 10 ? "0" + index : index)} key = {(index < 10 ? "0" + index : index) + "Hour"}> {index < 10 ? "0" + index : index}</option>
                  })
                }
              </Select> 시
              <Select ref={startFastingMinute_ref} onChange={TimeChange} defaultValue="default" id="StartMinute" name="StartMinute">
                <option value="default" disabled>분</option>
                { 
                  Array.from({ length: 60 }, (item, index) => {
                  return <option value = {(index < 10 ? "0" + index : index)} key = {(index < 10 ? "0" + index : index) + "Minute"}> {index < 10 ? "0" + index : index}</option>
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
                  return <option value = {(index < 10 ? "0" + index : index)} key = {(index < 10 ? "0" + index : index) + "Hour"}> {index < 10 ? "0" + index : index}</option>
                  })
                }
              </Select> 시
              <Select ref={endFastingMinute_ref} onChange={TimeChange} defaultValue="default" id="EndMinute" name="EndMinute">
                <option value="default" disabled>분</option>
                { 
                  Array.from({ length: 60 }, (item, index) => {
                  return <option value = {(index < 10 ? "0" + index : index)} key = {(index < 10 ? "0" + index : index) + "Minute"}> {index < 10 ? "0" + index : index}</option>
                  })
                }
              </Select> 분
            </div>
          </FastTime>
        </FastTimeWrap>
        <Button>
          <CancleBtn>뒤로가기</CancleBtn>
          <SignUpBtn onClick={onhandleSignUpSNS}
            disabled=
            {
              checkNickMsg === "* 사용 가능 한 닉네임입니다." &&
              curError === "* 양식에 맞게 작성되었습니다." &&
              goError === "* 양식에 맞게 작성되었습니다." &&
              startHourCheck === ""
              ? false : true
            }>회원가입</SignUpBtn>
        </Button>
      </FormWrap>
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
  div span.weight {
    position: absolute;
    bottom: 12px;
    right: 10px;
    font-size: 12px;
    color: #9A9A9A;
  }
  div p {
    position: absolute;
    bottom: -20px;
    left: 6px;
    margin: 0;
    font-size: 10px;
    color: #D9D9D9;
  }
`

const HoverMsg = styled.p`
  position: fixed;
  top: 48px;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 40px;
  font-size: 10px;
  background-color: #7E7E7E;
  border-radius: 6px;
  padding: 5px;
  /* box-sizing: border-box; */
  z-index: 5000;
  span {
    color: #81C147;
    font-size: 11px;
  }
  &::after {
    content: '';
    position: absolute;
    top: -4px;
    left: 20px;
    width: 8px;
    height: 8px;
    background-color: #7E7E7E;
    transform: rotate(45deg);
  }
`

const FastTimeWrap = styled.div`
  position: relative;
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
  span {
    position: absolute;
    bottom: -20px;
    left: 6px;
    font-size: 10px;
    color: #D9D9D9;
  }
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

const Select = styled.select`
  width: 60px;
  height: 30px;
  border: none;
  border-bottom: 1px solid #9A9A9A;
  outline: none;
  padding: 0 4px;
  box-sizing: border-box;
  font-family: 'GmarketM', 'sans-serif';
  font-size: 12px;
  text-align: center;
`

export default SignupSNS