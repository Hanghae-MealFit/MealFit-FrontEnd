import React from 'react'

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
          <p>이메일은 아이디 비밀번호를 찾을 때 사용됩니다.</p>
          <button>중복확인</button>
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
        <div>
          <form action="">
            <select defaultValue="default" id="Hour" name="Hour">
              <option value="default" disabled>시간을 선택하세요</option>
              <option value="00hour">00시</option>
              <option value="01hour">01시</option>
              <option value="02hour">02시</option>
              <option value="03hour">03시</option>
              <option value="04hour">04시</option>
              <option value="05hour">05시</option>
              <option value="06hour">06시</option>
              <option value="07hour">07시</option>
              <option value="08hour">08시</option>
              <option value="09hour">09시</option>
              <option value="10hour">10시</option>
              <option value="11hour">11시</option>
              <option value="12hour">12시</option>
              <option value="13hour">13시</option>
              <option value="14hour">14시</option>
              <option value="15hour">15시</option>
              <option value="16hour">16시</option>
              <option value="17hour">17시</option>
              <option value="18hour">18시</option>
              <option value="19hour">19시</option>
              <option value="20hour">20시</option>
              <option value="21hour">21시</option>
              <option value="22hour">22시</option>
              <option value="23hour">23시</option>
              <option value="24hour">24시</option>
            </select>
          </form>
        </div>
        <div>
          <form action="">
            <select defaultValue="default" id="Minute" name="Minute">
              <option value="default" disabled>분을 선택하세요</option>
              <option value="00분">00분</option>
              <option value="01분">01분</option>
              <option value="02분">02분</option>
              <option value="03분">03분</option>
              <option value="04분">04분</option>
              <option value="05분">05분</option>
              <option value="06분">06분</option>
              <option value="07분">07분</option>
              <option value="08분">08분</option>
              <option value="09분">09분</option>
              <option value="10분">10분</option>
              <option value="11분">11분</option>
              <option value="12분">12분</option>
              <option value="13분">13분</option>
              <option value="14분">14분</option>
              <option value="15분">15분</option>
              <option value="16분">16분</option>
              <option value="17분">17분</option>
              <option value="18분">18분</option>
              <option value="19분">19분</option>
              <option value="20분">20분</option>
              <option value="21분">21분</option>
              <option value="22분">22분</option>
              <option value="23분">23분</option>
              <option value="24분">24분</option>
              <option value="25분">25분</option>
              <option value="26분">26분</option>
              <option value="27분">27분</option>
              <option value="28분">28분</option>
              <option value="29분">29분</option>
              <option value="30분">30분</option>
              <option value="31분">31분</option>
              <option value="32분">32분</option>
              <option value="33분">33분</option>
              <option value="34분">34분</option>
              <option value="35분">35분</option>
              <option value="36분">36분</option>
              <option value="37분">37분</option>
              <option value="38분">38분</option>
              <option value="39분">39분</option>
              <option value="40분">40분</option>
              <option value="41분">41분</option>
              <option value="42분">42분</option>
              <option value="43분">43분</option>
              <option value="44분">44분</option>
              <option value="45분">45분</option>
              <option value="46분">46분</option>
              <option value="47분">47분</option>
              <option value="48분">48분</option>
              <option value="49분">49분</option>
              <option value="50분">50분</option>
              <option value="51분">51분</option>
              <option value="52분">52분</option>
              <option value="53분">53분</option>
              <option value="54분">54분</option>
              <option value="55분">55분</option>
              <option value="56분">56분</option>
              <option value="57분">57분</option>
              <option value="58분">58분</option>
              <option value="59분">59분</option>
            </select>
          </form>
        </div>
      </form>
    </div>
  )
}

export default Signup