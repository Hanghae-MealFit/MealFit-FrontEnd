import React from 'react'
import HourSelect from '../elements/HourSelect'
import MinuteSelect from '../elements/MinuteSelect'
import PicSelect from '../elements/PicSelect'

const Signup = () => {

  return (
    <div>
      <h1>회원가입</h1>
      <form action="">
        <div>
          <input type="text" placeholder='ID를 입력해주세요.' />
          <button>중복확인</button>
        </div>
        <div>
          <input type="text" placeholder='닉네임를 입력해주세요.' />
          <button>중복확인</button>
        </div>
        <div>
          <input type="email" placeholder='Email를 입력해주세요.' />
          <button>중복확인</button>
          <p>이메일은 아이디 비밀번호를 찾을 때 사용됩니다.</p>
        </div>
        <div>
          <input type="password" placeholder='Password를 입력해주세요.' />
        </div>
        <div>
          <input type="password" placeholder='Password를 확인해주세요.' />
        </div>
        <div>
          <input type="number" placeholder='현재 체중을 입력해주세요.' />
          <input type="number" placeholder='목표 체중을 입력해주세요.' />
        </div>
        <div>
          <input type="text" placeholder='단식 시작시간' />
          <input type="text" placeholder='단식 종료시간' />
        </div>
        <div style={{ display: "flex" }}>
          <div>
            <HourSelect />
          </div>
          <div>
            <MinuteSelect />
          </div>
        </div>
        <div>
          <PicSelect />
        </div>
      </form>
    </div>
  )
}

export default Signup