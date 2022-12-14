import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Instance from '../axios/Instance'
import { useNavigate, useLocation } from 'react-router-dom'

import PicSelect from '../elements/PicSelect'

const SignupSNS = () => {

  const nickname_ref = useRef(null);
  const currentWeight_ref = useRef(null);
  const goalWeight_ref = useRef(null);
  const startFastingHour_ref = useRef(null);
  const startFastingMinute_ref = useRef(null);
  const endFastingHour_ref = useRef(null);
  const endFastingMinute_ref = useRef(null);
  const nickname_err_ref = useRef(null);
  const current_weight_err_ref = useRef(null);
  const goal_weight_err_ref = useRef(null);
  const hour_check_ref = useRef(null);
  const goal_kcal_ref = useRef(null);
  const goal_carbs_ref = useRef(null);
  const goal_pro_ref = useRef(null);
  const goal_fat_ref = useRef(null);
  const goal_kcal_err_ref = useRef(null);
  const goal_carbs_err_ref = useRef(null);
  const goal_pro_err_ref = useRef(null);
  const goal_fat_err_ref = useRef(null);

  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [ files, setFiles ] = useState(null);

  // 현재 체중 목표 체중 값
  const [ curWeight, setCurWeight ] = useState();
  const [ goWeight, setGoWeight ] = useState();

  const [ curInfoMsg, SetCurInfoMsg ] = useState(false);
  const [ goInfoMsg, SetGoInfoMsg ] = useState(false);
  const [ curError, setCurError ] = useState("* 현재 체중을 입력해주세요.");
  const [ goError, setGoError ] = useState("* 목표 체중을 입력해주세요.");

  // 닉네임 중복확인 클릭 시, 유저에게 제공 될 값
  const [ checkNickMsg, SetCheckNickMsg ] = useState("* 사용하실 닉네임을 입력해주세요.");

  // 입력된 닉네임 값이 2글자보다 적을 시, 버튼 클릭 불가능하게 설정
  const [ nickCheckDis, SetNickCheckDis ] = useState(true);

  // 단식 시간 설정하지 않았을 경우, 버튼 클릭 불가능하게 설정
  const [ startHourCheck, SetStartHourCheck ] = useState("* 필수 선택값을 모두 선택하세요.");

  // 목표 섭취량 입력 시, 예시 표시
  const [ calInfo, SetCalInfo ] = useState();
  const [ carbsInfo, SetCarbsInfo ] = useState();
  const [ proInfo, SetProInfo ] = useState();
  const [ fatInfo, SetFatInfo ] = useState();

  const [ goalKcal, setGoalKcal ] = useState();
  const [ goalKcalError, setGoalKcalError ] = useState("* 값을 입력해주세요.");

  const [ goalCarbs, setGoalCarbs ] = useState();
  const [ goalCarbsError, setGoalCarbsError ] = useState("* 값을 입력해주세요.");

  const [ goalPro, setGoalPro ] = useState();
  const [ goalProError, setGoalProError ] = useState("* 값을 입력해주세요.");

  const [ goalFat, setGoalFat ] = useState();
  const [ goalFatError, setGoalFatError ] = useState("* 값을 입력해주세요.");

  const sessionStorage = window.sessionStorage;
  const ACCESS_TOKEN = sessionStorage.getItem("accessToken")
  const REFRESH_TOKEN = sessionStorage.getItem("refreshToken")

  const onhandleSignUpSNS = async (e) => {
    e.preventDefault()

    const SignupSNSInfo = {
      nickname: nickname_ref.current.value,
      profileImage: files,
      currentWeight: currentWeight_ref.current.value,
      goalWeight: goalWeight_ref.current.value,
      startFasting: startFastingHour_ref.current.value + ":" + startFastingMinute_ref.current.value,
      endFasting: endFastingHour_ref.current.value + ":" + endFastingMinute_ref.current.value,
      kcal: goal_kcal_ref.current.value,
      carbs: goal_carbs_ref.current.value,
      protein: goal_pro_ref.current.value,
      fat: goal_fat_ref.current.value,
    }
    // console.log(SignupSNSInfo)

    const formData = new FormData()
    formData.append("nickname", SignupSNSInfo.nickname);
    formData.append("currentWeight", SignupSNSInfo.currentWeight);
    formData.append("goalWeight", SignupSNSInfo.goalWeight);
    formData.append("startFasting", SignupSNSInfo.startFasting);
    formData.append("endFasting", SignupSNSInfo.endFasting);
    formData.append("kcal", SignupSNSInfo.kcal);
    formData.append("carbs", SignupSNSInfo.carbs);
    formData.append("protein", SignupSNSInfo.protein);
    formData.append("fat", SignupSNSInfo.fat);
    if(SignupSNSInfo.profileImage !== null) {
      formData.append("profileImage", SignupSNSInfo.profileImage);
    }

    await axios({
      baseURL: "http://43.200.174.111:8080/",
      method: "POST",
      url: "/api/user/social/signup",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        refresh_token: `Bearer ${REFRESH_TOKEN}`
      },
    }).then((response) => {
      // console.log(response.status)
      if(response.status === 200) {
        window.alert("회원정보 등록에 성공하셨습니다.")
        navigate("/")
      }
    }).catch((error) => {
      // console.log(error)
      window.alert("회원정보 등록에 실패하셨습니다.")
    })
  }

  const BackToCancle = () => {
    sessionStorage.clear()
    navigate("/")
  }

  const CheckNickname = async (e) => {
    e.preventDefault()

    try {
      const nickname = nickname_ref.current.value
      const res = await Instance.get(`/api/user/nickname/${nickname}`)
      if(res.data === "검증완료!" && res.status === 200) {
        SetCheckNickMsg("* 사용 가능 한 닉네임입니다.")
        nickname_err_ref.current.style.color = "#81C147";
      }
    } catch(error) {
      // console.log(error)
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

  const GoalKcalChange = (e) => {
    // 체중 입력 시 숫자만 입력할 수 있도록 정규식 사용
    setGoalKcal(e.target.value.replace(/[^0-9]/g, ''))
    const regNum = /^(\d{3,4})$/g
    if(e.target.value.length === 0) {
      setGoalKcalError("* 값을 입력해주세요.")
      goal_kcal_err_ref.current.style.color = "#FF7F00"
    } else if(e.target.value.length < 3) {
      setGoalKcalError("* 양식을 확인해주세요.")
      goal_kcal_err_ref.current.style.color = "#FF7F00"
    } else if(regNum.test(e.target.value) !== true) {
      setGoalKcalError("* 숫자만 사용 가능합니다.")
      goal_kcal_err_ref.current.style.color = "#FF7F00"
    } else {
      setGoalKcalError("")
    }
    // console.log(e.target.value)
    // console.log(e.target.value.length)
  }

  const GoalCarbsChange = (e) => {
    // 체중 입력 시 숫자만 입력할 수 있도록 정규식 사용
    setGoalCarbs(e.target.value.replace(/[^0-9]/g, ''))
    const regNum = /^(\d{2,3})$/g
    if(e.target.value.length === 0) {
      setGoalCarbsError("* 값을 입력해주세요.")
      goal_carbs_err_ref.current.style.color = "#FF7F00"
    } else if(e.target.value.length < 2) {
      setGoalCarbsError("* 양식을 확인해주세요.")
      goal_carbs_err_ref.current.style.color = "#FF7F00"
    } else if(regNum.test(e.target.value) !== true) {
      setGoalCarbsError("* 숫자만 사용 가능합니다.")
      goal_carbs_err_ref.current.style.color = "#FF7F00"
    } else {
      setGoalCarbsError("")
    }
  }

  const GoalProChange = (e) => {
    // 체중 입력 시 숫자만 입력할 수 있도록 정규식 사용
    setGoalPro(e.target.value.replace(/[^0-9]/g, ''))
    const regNum = /^(\d{2,3})$/g
    if(e.target.value.length === 0) {
      setGoalProError("* 값을 입력해주세요.")
      goal_pro_err_ref.current.style.color = "#FF7F00"
    } else if(e.target.value.length < 2) {
      setGoalProError("* 양식을 확인해주세요.")
      goal_pro_err_ref.current.style.color = "#FF7F00"
    } else if(regNum.test(e.target.value) !== true) {
      setGoalProError("* 숫자만 사용 가능합니다.")
      goal_pro_err_ref.current.style.color = "#FF7F00"
    } else {
      setGoalProError("")
    }
  }

  const GoalFatChange = (e) => {
    // 체중 입력 시 숫자만 입력할 수 있도록 정규식 사용
    setGoalFat(e.target.value.replace(/[^0-9]/g, ''))
    const regNum = /^(\d{2,3})$/g
    if(e.target.value.length === 0) {
      setGoalFatError("* 값을 입력해주세요.")
      goal_fat_err_ref.current.style.color = "#FF7F00"
    } else if(e.target.value.length < 2) {
      setGoalFatError("* 양식을 확인해주세요.")
      goal_fat_err_ref.current.style.color = "#FF7F00"
    } else if(regNum.test(e.target.value) !== true) {
      setGoalFatError("* 숫자만 사용 가능합니다.")
      goal_fat_err_ref.current.style.color = "#FF7F00"
    } else {
      setGoalFatError("")
    }
  }

  return (
    <Wrap>
      <SignUpWrap>
        <FormWrap>
          <h1>회원정보 작성</h1>
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
              <input ref={currentWeight_ref} maxLength={5} type="number" onInput={maxLengthCheck} onMouseEnter={() => SetCurInfoMsg(true)} onMouseLeave={() => SetCurInfoMsg(false)} placeholder='현재 체중' onChange={(e) => {CurrentWeightChange(e)}} value={curWeight || ''} />
              <span className='weight'>(kg)</span>
              <p className="infomsg" ref={current_weight_err_ref}>{curError}</p>
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
              <input ref={goalWeight_ref} maxLength={5} type="number" onInput={maxLengthCheck} onMouseEnter={() => SetGoInfoMsg(true)} onMouseLeave={() => SetGoInfoMsg(false)} placeholder='목표 체중' onChange={(e) => {GoalWeightChange(e)}} value={goWeight || ''} />
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
          <IntakeWrap>
            <h4>일일 목표 섭취량</h4>
            <GoalInfoWrap>
              { calInfo ? 
                (
                  <GoalHoverMsg>
                    목표 섭취 칼로리를 입력해주세요.<br />
                    <span>ex) 2400 / 2000 / 1400</span>
                  </GoalHoverMsg>
                ) :
                (
                  null
                )
              }
              <GoalTitle>칼로리</GoalTitle>
              <GoalInfo>
                <input ref={goal_kcal_ref} maxLength={4} type="number" onInput={maxLengthCheck} onMouseEnter={() => SetCalInfo(true)} onMouseLeave={() => SetCalInfo(false)} placeholder='칼로리' onChange={(e) => {GoalKcalChange(e)}} value={goalKcal || ''} />
                <span className='unit'>(Kcal)</span>
                <p ref={goal_kcal_err_ref}>{goalKcalError}</p>
              </GoalInfo>
            </GoalInfoWrap>
            <GoalInfoWrap>
              { carbsInfo ? 
                (
                  <GoalHoverMsg>
                    목표 섭취 탄수화물을 입력해주세요.<br />
                    <span>ex) 100 / 110 / 120 </span>
                  </GoalHoverMsg>
                ) :
                (
                  null
                )
              }
              <GoalTitle>탄수화물</GoalTitle>
              <GoalInfo>
                <input ref={goal_carbs_ref} maxLength={3} type="number" onInput={maxLengthCheck} onMouseEnter={() => SetCarbsInfo(true)} onMouseLeave={() => SetCarbsInfo(false)} placeholder='탄수화물' onChange={(e) => {GoalCarbsChange(e)}} value={goalCarbs || ''} />
                <span className='unit'>(g)</span>
                <p ref={goal_carbs_err_ref}>{goalCarbsError}</p>
              </GoalInfo>
            </GoalInfoWrap>
            <GoalInfoWrap>
              { proInfo ? 
                (
                  <GoalHoverMsg>
                    목표 섭취 단백질을 입력해주세요.<br />
                    <span>ex) 100 / 110 / 120 </span>
                  </GoalHoverMsg>
                ) :
                (
                  null
                )
              }
              <GoalTitle>단백질</GoalTitle>
              <GoalInfo>
                <input ref={goal_pro_ref} maxLength={3} type="number" onInput={maxLengthCheck} onMouseEnter={() => SetProInfo(true)} onMouseLeave={() => SetProInfo(false)} placeholder='단백질' onChange={(e) => {GoalProChange(e)}} value={goalPro || ''} />
                <span className='unit'>(g)</span>
                <p ref={goal_pro_err_ref}>{goalProError}</p>
              </GoalInfo>
            </GoalInfoWrap>
            <GoalInfoWrap>
              { fatInfo ? 
                (
                  <GoalHoverMsg>
                    목표 섭취 지방을 입력해주세요.<br />
                    <span>ex) 100 / 110 / 120 </span>
                  </GoalHoverMsg>
                ) :
                (
                  null
                )
              }
              <GoalTitle>지방</GoalTitle>
              <GoalInfo>
                <input ref={goal_fat_ref} maxLength={3} type="number" onInput={maxLengthCheck} onMouseEnter={() => SetFatInfo(true)} onMouseLeave={() => SetFatInfo(false)} placeholder='지방' onChange={(e) => {GoalFatChange(e)}} value={goalFat || ''} />
                <span className='unit'>(g)</span>
                <p ref={goal_fat_err_ref}>{goalFatError}</p>
              </GoalInfo>
            </GoalInfoWrap>
          </IntakeWrap>
          <Button>
            <CancleBtn onClick={BackToCancle}>뒤로가기</CancleBtn>
            <SignUpBtn onClick={onhandleSignUpSNS}
              disabled=
              {
                checkNickMsg === "* 사용 가능 한 닉네임입니다." &&
                curError === "* 양식에 맞게 작성되었습니다." &&
                goError === "* 양식에 맞게 작성되었습니다." &&
                startHourCheck === "" &&
                goalKcalError === "" &&
                goalCarbsError === "" &&
                goalProError === "" &&
                goalFatError === ""
                ? false : true
              }>회원가입</SignUpBtn>
          </Button>
        </FormWrap>
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
    bottom: -20px;
    left: 6px;
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
  @media (min-width: 400px) and (max-width: 768px) {
    flex-direction: row;
    div {
      width: 200px;
      max-width: 200px;
    }
    div input {
      padding: 12px;
    }
    div:last-child {
      margin-top: 0px;
      margin-left: 50px;
    }
    div span.weight {
      position: absolute;
      bottom: 12px;
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
    font-size: 11px;
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
    margin: 0 auto;
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

const IntakeWrap = styled.div`
  position: relative;
  width: 80%;
  margin: 40px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  border: 1px solid #FE7770;
  border-radius: 20px;
  padding: 20px 14px;
  box-sizing: border-box;
  h4 {
    position: absolute;
    top: -15px;
    left: 20px;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    width: 140px;
    height: 30px;
    background-color: #FE7770;
    color: #fff;
    border-radius: 6px;
  }
  @media (min-width: 769px) {
    width: 460px;
  }
`

const GoalInfoWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto 4px;
`

const GoalHoverMsg = styled.p`
  position: absolute;
  top: 18px;
  left: 54px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 80%;
  height: 40px;
  font-size: 10px;
  -webkit-transform: scale(0.8);
  background-color: white;
  border: 1px solid #FE7770;
  border-radius: 6px;
  padding: 5px;
  color: #333;
  z-index: 5000;
  span {
    color: #81C147;
    font-size: 11px;
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
    left: 90px;
    width: 75%;
    -webkit-transform: scale(1.0);
  }
`

const GoalTitle = styled.div`
  width: 60px;
  height: 30px;
  background-color: #FE7770;
  border-radius: 6px;
  color: #fff;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  @media (min-width: 769px) {
    width: 80px;
    font-size: 15px;
  }
`

const GoalInfo = styled.div`
  position: relative;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
  input {
    width: 100%;
    padding: 6px 0px 6px 3px;
    border: none;
    border-bottom: 1px solid #9A9A9A;
    box-sizing: border-box;
    outline: none;
  }
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  span.unit {
    position: absolute;
    bottom: 6px;
    right: 6px;
    font-size: 10px;
    color: #9A9A9A;
  }
  p {
    position: absolute;
    bottom: -14px;
    left: 4px;
    margin: 0;
    font-size: 6px;
    color: #D9D9D9;
  }
  @media (min-width: 769px) {
    input {
      padding: 12px;
    }
    span.unit {
      bottom: 12px;
      right: 10px;
      font-size: 12px;
    }
  }
`

export default SignupSNS