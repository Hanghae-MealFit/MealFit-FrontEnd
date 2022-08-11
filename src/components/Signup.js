import React from 'react'
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
    <div>
      <h1>회원가입</h1>
      <form action="">
        <div>
          <input ref={username_ref} type="text" placeholder='ID를 입력해주세요.' />
          <button>중복확인</button>
        </div>
        <div>
          <input ref={nickname_ref} type="text" placeholder='닉네임를 입력해주세요.' />
          <button>중복확인</button>
        </div>
        <div>
          <input ref={email_ref} type="email" placeholder='Email를 입력해주세요.' />
          <button>중복확인</button>
          <p>이메일은 아이디 비밀번호를 찾을 때 사용됩니다.</p>
        </div>
        <div>
          <input ref={password_ref} type="password" placeholder='Password를 입력해주세요.' />
        </div>
        <div>
          <input ref={passwordCheck_ref} type="password" placeholder='Password를 확인해주세요.' />
        </div>
        <div>
          <input ref={currentWeight_ref} type="number" placeholder='현재 체중을 입력해주세요.' />
          <input ref={goalWeight_ref} type="number" placeholder='목표 체중을 입력해주세요.' />
        </div>

        <div style={{ display: "flex" }}>
          <p style={{ margin: "0" }}>단식 시작시간</p>
          <div>
            <StartHourSelect startHour={startFastingHour_ref} /> 시
          </div>
          <div>
            <StartMinuteSelect startMinute={startFastingMinute_ref} /> 분
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <p style={{ margin: "0" }}>단식 종료시간</p>
          <div>
            <EndHourSelect endHour={endFastingHour_ref} /> 시
          </div>
          <div>
            <EndMinuteSelect endMinute={endFastingMinute_ref} /> 분
          </div>
        </div>

        <div>
          <PicSelect files={files} setFiles={setFiles} />
        </div>
        <div>
          <button>취소</button>
          <button onClick={onhandleSignUp}>회원가입</button>
        </div>
      </form>
    </div>
  )
}

export default Signup