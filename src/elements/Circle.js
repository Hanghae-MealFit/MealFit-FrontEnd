import React, {useEffect} from 'react'
import styled, {keyframes} from 'styled-components'

import Time from './Time'

const Circle = ({time, setTime}) => {
  const Hour = time.getHours();
  const Minute = time.getMinutes();
  const Second = time.getSeconds();
  // const TodaySecond = 86400;
  // const NowSecond = (((Hour * 60) + Minute) * 60) + Second
  const TodaySecond = 60;
  const NowSecond = Second
  const NowPer = ((NowSecond / TodaySecond) * 100).toFixed(1)
  const [ todayPer, setTodayPer ] = React.useState();
  console.log(NowPer)

  useEffect(() => {
    setTodayPer((3.6 * NowPer).toFixed(1))
  }, [NowPer]);
  console.log("today", todayPer)
  console.log("NowSecond", NowSecond)
  console.log("Per", NowPer)
  return (
    <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
      <Percent>
        <Dot TodayPer={todayPer}>
          {/* <HoverMsg TodayPer={todayPer}>
            정수 혹은 소수점 첫째자리까지 입력해주세요.<br />
            <span>ex) 40 / 40.5 / 100.5</span>
          </HoverMsg> */}
        </Dot>
        <svg>
          <circle cx="195" cy="195" r="170"></circle>
          <circle style={{strokeDashoffset: `calc(1070 - (1070 * ${NowPer}) / 100)`}} cx="195" cy="195" r="170"></circle>
        </svg>
        <Time time={time} setTime={setTime} setTodayPer={setTodayPer} />
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
    stroke-dasharray: 1070;
    stroke-dashoffset: 1070;
    stroke-linecap: round;
    transition: 0.2s;
  }
  svg circle:first-child {
    stroke-dashoffset: 0;
    stroke: #f3f3f3;
  }
  svg circle:last-child {
    stroke: #FFB0AC;
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
    left: 50%;
    transform: translateX(-50%) ${(props) => `rotate(-${props.TodayPer}deg)`};
    width: 40px;
    height: 40px;
    background-color: #fff;
    border: 4px solid #EE6366;
    border-radius: 50%;
    z-index: 10;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #EE6366;
    font-size: 26px;
  }
  &:hover:before {
    cursor: pointer;
  }
  &::after {
    content: 'CLICK';
    position: absolute;
    top: ${props => props.TodayPer < 90 ? 80 + "px" : props.TodayPer < 180 ? 80 + "px" : props.TodayPer < 270 ? 80 + "px" : 80 + "px"};
    left: 50%;
    transform: translateX(-50%) ${(props) => `rotate(-${props.TodayPer}deg)`};
    width: 60px;
    height: 40px;
    background-color: #fff;
    border: 4px solid #EE6366;
    z-index: 10;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #EE6366;
    font-size: 12px;
  }
`

const HoverMsg = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 50%;
  height: 40px;
  font-size: 9px;
  background-color: white;
  border: 1px solid #FE7770;
  border-radius: 6px;
  padding: 4px;
  color: #333;
  /* box-sizing: border-box; */
  z-index: 5000;
  transform: translateX(-50%) ${(props) => `rotate(-${props.TodayPer}deg)`};
  span {
    color: #81C147;
    font-size: 11px;
    margin-top: 6px;
  }
  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: calc(50% - 4px);
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
`

export default Circle