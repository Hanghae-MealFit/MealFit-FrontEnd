import React, { useState, useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import { useSelector } from 'react-redux';
import TokenInstance from '../axios/TokenInstance';

import { MemoizedTime } from './Time'
import axios from 'axios';

const Circle = ({Token, timeCheck, setTimeCheck}) => {

  const [time, setTime] = useState(new Date());

  const Hour = time.getHours();
  const Minute = time.getMinutes();
  const Second = time.getSeconds();
  const TodaySecond = 86400;
  const NowSecond = (((Hour * 60) + Minute) * 60) + Second
  const NowPer = ((NowSecond / TodaySecond) * 100).toFixed(1)
  const [ todayPer, setTodayPer ] = useState();
  const [ eatTime, setEatTime ] = useState(true);
  const [ hoverClickPlus, setHoverClickPlus ] = useState(false)
  const [ changeEatTime, setChangeEatTime ] = useState(false)

  const user = useSelector((state) => state.userinfo.user.fastingInfo);
  const StartTime = user.startFasting.split(":")
  const StartTimeTotal = ((parseInt(StartTime[0] * 60) + parseInt(StartTime[1])) * 60) + parseInt(StartTime[2])

  const EndTime = user.endFasting.split(":")
  const EndTimeTotal = ((parseInt(EndTime[0] * 60) + parseInt(EndTime[1])) * 60) + parseInt(EndTime[2])

  const [ startHourCheck, SetStartHourCheck ] = useState("* 필수 선택값을 모두 선택하세요.");
  const hour_check_ref = useRef(null);
  const startFastingHour_ref = useRef(null);
  const startFastingMinute_ref = useRef(null);
  const endFastingHour_ref = useRef(null);
  const endFastingMinute_ref = useRef(null);

  const TimeChange = (e) => {
    if(startFastingHour_ref.current.value && startFastingMinute_ref.current.value && endFastingHour_ref.current.value && endFastingMinute_ref.current.value !== "default") {
      SetStartHourCheck("")
      hour_check_ref.current.style.display = "none"
    } else {
      SetStartHourCheck("* 필수 선택값을 모두 선택하세요.")
      hour_check_ref.current.style.color = "#FF0000"
    }
  }

  const ShowHoverDesc = () => {
    setHoverClickPlus(true)
  }

  const HideHoverDesc = () => {
    setHoverClickPlus(false)
  }

  const ChangeTimeOpen = () => {
    setChangeEatTime(true)
    setHoverClickPlus(false)
  }

  const ChangeTimeClose = () => {
    setChangeEatTime(false)
  }

  const ChangeTiemAX = async () => {
    try {
      const res = await TokenInstance.put("/api/user/fastingTime", {
        startFasting: startFastingHour_ref.current.value + ":" + startFastingMinute_ref.current.value,
        endFasting: endFastingHour_ref.current.value + ":" + endFastingMinute_ref.current.value,
      })
      // console.log(res)
      if(res.status === 200) {
        setChangeEatTime(false)
        setTimeCheck(!timeCheck)
      }
    } catch(err) {
      // console.log(err)
    }
  }

  // 시작시간 20시, 종료시간 18시
  // 20 21 22 23 24 01 02

  // StartTimeTotal < NowSecond
  // 20 < 22 < 18 => StartTime < NowTime && NowTime < EndTime + TodaySecond

  // StartTimeTotal > NowSecond
  // 20 < 01 < 18 => StartTime < TodaySecond + NowTime && NowTime < EndTime

  useEffect(() => {
    if(StartTimeTotal < EndTimeTotal) {
      if(StartTimeTotal < NowSecond && NowSecond < EndTimeTotal) {
        setEatTime(false)
      } else {
        setEatTime(true)
      }
    } else {
      if(StartTimeTotal < NowSecond) {
        setEatTime(false)
      } else if(StartTimeTotal > NowSecond) {
        if(NowSecond < EndTimeTotal) {
          setEatTime(false)
        } else {
          setEatTime(true)
        }
      } else {
        setEatTime(true)
      }
    }

    setTodayPer((3.6 * NowPer).toFixed(1))
  }, [time]);

  const MobileMedia = window.matchMedia('(max-width: 768px)');
  const TabletMedia = window.matchMedia('(max-width: 1023px)');

  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center", position: "relative"}}>
      <Percent className="Percent">
        <Dot TodayPer={todayPer} EatTime={eatTime} onMouseEnter={ShowHoverDesc} onMouseLeave={HideHoverDesc} onClick={ChangeTimeOpen}></Dot>
        <svg>
          <circle style={{
            fill: eatTime === true ? "#FFB0AC" : "#ccc"
          }}
          cx={ MobileMedia.matches ? "130" : TabletMedia.matches ? "160" : "195" }
          cy={ MobileMedia.matches ? "130" : TabletMedia.matches ? "160" : "195" }
          r={ MobileMedia.matches ? "105" : TabletMedia.matches ? "135" : "170"}>
          </circle>
          <circle style={{
            strokeDashoffset:
            MobileMedia.matches ? `calc(890 - (890 * ${NowPer}) / 100)` :
            TabletMedia.matches ? `calc(850 - (850 * ${NowPer}) / 100)` :
            `calc(1080 - (1080 * ${NowPer}) / 100)`,
            stroke: eatTime === true ? "#FE7770" : "#777"
          }}
          cx={ MobileMedia.matches ? "130" : TabletMedia.matches ? "160" : "195" }
          cy={ MobileMedia.matches ? "130" : TabletMedia.matches ? "160" : "195" }
          r={ MobileMedia.matches ? "105" : TabletMedia.matches ? "135" : "170" }>
          </circle>
        </svg>
        <MemoizedTime time={time} setTime={setTime} EatTime={eatTime} StartTimeTotal={StartTimeTotal} EndTimeTotal={EndTimeTotal} TodaySecond={TodaySecond} />
        {
          changeEatTime ? (
            <Modal>
              <h2>단식시간 수정</h2>
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
                <CancleBtn onClick={ChangeTimeClose}>취소하기</CancleBtn>
                <SignUpBtn onClick={ChangeTiemAX}
                  disabled={startHourCheck === "" ? false : true}>수정하기</SignUpBtn>
              </Button>
            </Modal>
          ) : (
            null
          )
        }
        
      </Percent>
      {
        hoverClickPlus ? (
          <HoverMsg>+ 버튼을 클릭 시, 단식시간을 변경할 수 있습니다.</HoverMsg>
        ) :
        (
          null
        )
      }
    </div>
  )
}

const fadeIn = keyframes`
	0%{
    opacity: 0;
    }
  100%{
    opacity: 1;
  }
`;

const Percent = styled.div`
  position: relative;
  width: 270px;
  height: 270px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    position: relative;
    width: 100%;
    height: 100%;
    transform: rotate(270deg);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  svg circle {
    width: 100%;
    height: 100%;
    fill: transparent;
    stroke-width: 30;
    stroke: #000;
    transform: translate(5px, 5px);
    stroke-dasharray: 890;
    stroke-dashoffset: 890;
    /* stroke-linecap: round; */
    transition: 0.2s;
  }
  svg circle:first-child {
    stroke-dashoffset: 0;
    fill: #dcff95;
    stroke: #f3f3f3;
  }
  svg circle:last-child {
    opacity: 0;
    animation: ${fadeIn} 0.5s linear forwards;
    animation-delay: 1.5s;
  }
  @media (min-width: 769px) and (max-width: 1023px) {
    width: 320px;
    height: 320px;
    svg circle {
      transform: translate(0px, 0px);
      stroke-dasharray: 850;
      stroke-dashoffset: 850;
    }
  }
  @media (min-width: 1024px) {
    width: 400px;
    height: 400px;
    svg circle {
      transform: translate(0px, 0px);
      stroke-dasharray: 1080;
      stroke-dashoffset: 1080;
    }
  }
`

const animateDot = keyframes`
	0%{
    transform: rotate(0deg);
    }
  100%{
    transform: ${(props) => `rotate(${props.TodayPer}deg)`};
  }
`;

const Dot = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  z-index: 10;
  /* transform: ${(props) => `rotate(${props.TodayPer}deg)`}; */
  transition: 0.2s;
  /* animation: ${animateDot} 1s linear forwards; */
  &::before {
    content: '+';
    position: absolute;
    top: 0;
    left: 0;
    /* transform: translateX(-50%) ${(props) => `rotate(-${props.TodayPer}deg)`}; */
    width: 24px;
    height: 24px;
    background-color: #fff;
    border: ${props => (props.EatTime === true ? "2px solid #FE7770" : "2px solid #777")};
    border-radius: 50%;
    z-index: 10;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => (props.EatTime === true ? "#FE7770" : "#777")};
    font-size: 20px;
  }
  &:hover:before {
    cursor: pointer;
  }
`

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  border: 2px solid #333;
  background-color: white;
  z-index: 20;
  h2 {
    margin: 0;
    font-size: 20px;
  }
  @media (min-width: 769px) {
    h2 {
      font-size: 24px;
    }
  }
`

const FastTimeWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  height: 120px;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #9A9A9A;
  border-radius: 20px;
  margin: 30px auto;
  font-size: 16px;
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
  font-size: 10px;
  p {
    margin: 0;
  }
  @media (min-width: 769px) {
    font-size: 14px;
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
    font-size: 11px;
  }
`

const Button = styled.div`
  width: 80%;
  height: 34px;
  margin: 0 auto;
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
    font-size: 13px;
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

const HoverMsg = styled.div`
  position: absolute;
  bottom: -50px;
  width: 80%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #FFB0AC;
  font-size: 14px;
  border-radius: 6px;
`

export default Circle