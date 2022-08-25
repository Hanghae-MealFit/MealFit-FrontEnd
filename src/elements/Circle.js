import React, {useEffect} from 'react'
import styled, {keyframes} from 'styled-components'
import { useSelector } from 'react-redux';

import { MemoizedTime } from './Time'

const Circle = () => {

  const [time, setTime] = React.useState(new Date());

  const Hour = time.getHours();
  const Minute = time.getMinutes();
  const Second = time.getSeconds();
  const TodaySecond = 86400;
  const NowSecond = (((Hour * 60) + Minute) * 60) + Second
  const NowPer = ((NowSecond / TodaySecond) * 100).toFixed(1)
  const [ todayPer, setTodayPer ] = React.useState();
  const [ eatTime, setEatTime ] = React.useState(true);
  const [ eatTimeCheck, setEatTimeCheck ] = React.useState(true);

  const user = useSelector((state) => state.userinfo.user.fastingInfo);
  const StartTime = user.startFasting.split(":")
  const StartTimeTotal = ((parseInt(StartTime[0] * 60) + parseInt(StartTime[1])) * 60) + parseInt(StartTime[2])
  const StartPer = ((StartTimeTotal / TodaySecond) * 100).toFixed(1)

  const EndTime = user.endFasting.split(":")
  const EndTimeTotal = ((parseInt(EndTime[0] * 60) + parseInt(EndTime[1])) * 60) + parseInt(EndTime[2])
  const EndPer = ((EndTimeTotal / TodaySecond) * 100).toFixed(1)
  // console.log(StartPer, NowPer, EndPer)
  // console.log(StartTimeTotal, EndTimeTotal)

  useEffect(() => {
    if(StartPer < NowPer && NowPer < EndPer) {
      setEatTime(true)
    } else {
      setEatTime(false)
    }
    if(StartTimeTotal < NowSecond && NowSecond < EndTimeTotal) {
      setEatTimeCheck(true)
    } else {
      setEatTimeCheck(false)
    }
    setTodayPer((3.6 * NowPer).toFixed(1))
  }, [time]);

  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
      <Percent>
        <Dot TodayPer={todayPer} EatTime={eatTime}></Dot>
        <svg>
          <circle style={{
            fill: eatTime === true ? "#dcff95" : "#FFB0AC"
          }}
          cx="195" cy="195" r="170"></circle>
          <circle style={{
            strokeDashoffset: `calc(1080 - (1080 * ${NowPer}) / 100)`,
            stroke: eatTime === true ? "yellowgreen" : "#FE7770"
          }} cx="195" cy="195" r="170"></circle>
        </svg>
        <MemoizedTime time={time} setTime={setTime} EatTime={eatTime} EatTimeCheck={eatTimeCheck} StartTimeTotal={StartTimeTotal} EndTimeTotal={EndTimeTotal} />
      </Percent>
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
  width: 400px;
  height: 400px;
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
    stroke-width: 40;
    stroke: #000;
    transform: translate(5px, 5px);
    stroke-dasharray: 1080;
    stroke-dashoffset: 1080;
    stroke-linecap: round;
    transition: 0.2s;
  }
  svg circle:first-child {
    stroke-dashoffset: 0;
    fill: #dcff95;
    stroke: #f3f3f3;
  }
  svg circle:last-child {
    /* stroke: #FE7770; */
    opacity: 0;
    animation: ${fadeIn} 0.5s linear forwards;
    animation-delay: 1.5s;
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
  inset: 0px;
  z-index: 10;
  transform: ${(props) => `rotate(${props.TodayPer}deg)`};
  transition: 0.2s;
  animation: ${animateDot} 1s linear forwards;
  &::before {
    content: '+';
    position: absolute;
    top: 10px;
    left: 52%;
    transform: translateX(-50%) ${(props) => `rotate(-${props.TodayPer}deg)`};
    width: 40px;
    height: 40px;
    background-color: #fff;
    border: ${props => (props.EatTime === true ? "4px solid green" : "4px solid #EE6366")};
    border-radius: 50%;
    z-index: 10;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => (props.EatTime === true ? "green" : "#EE6366")};
    font-size: 26px;
  }
  &:hover:before {
    cursor: pointer;
  }
`

export default Circle