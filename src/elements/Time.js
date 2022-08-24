import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Time = ({time, setTime, EatTime, EatTimeCheck, StartTimeTotal, EndTimeTotal}) => {

  const user = useSelector((state) => state.userinfo.user.fastingInfo);
  const StartTime = user.startFasting.split(":").slice(0, -1).join(":")
  const EndTime = user.endFasting.split(":").slice(0, -1).join(":")
  // console.log(startTime, endTime)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer)
    }
  }, []);

  const Year = time.getFullYear();
  const Month = time.getMonth() + 1;
  const Day = time.getDate();
  const Hour = time.getHours();
  const Minute = time.getMinutes();
  const Second = time.getSeconds();
  const NowSecond = (((Hour * 60) + Minute) * 60) + Second

  const TimeCheck = (NowSecond - StartTimeTotal) * 1000
  const TimeHour = Math.abs(Math.floor(TimeCheck / (1000 * 60 * 60)));
  const TimeMinute = Math.abs(Math.floor((TimeCheck % (1000 * 60 * 60)) / (1000 * 60)));
  
  const EndTimeCheck = (EndTimeTotal - NowSecond) * 1000
  const EndTimeHour = Math.floor(EndTimeCheck / (1000 * 60 * 60));
  const EndTimeMinute = Math.floor((EndTimeCheck % (1000 * 60 * 60)) / (1000 * 60));

  return (
    <TimeWrap>
      <TopText>
        <p>{Year}년 {Month < 10 ? '0' + Month : Month}월 {Day < 10 ? '0' + Day : Day}일</p>
        <p>{Hour < 10 ? '0' + Hour : Hour}시 {Minute < 10 ? '0' + Minute : Minute}분</p>
        {
          EatTime === true ?
          (
            <p>지금은 식사시간 입니다.</p>
          ) :
          (
            <p>지금은 단식시간 입니다.</p>
          )
        }
      </TopText>
      <BottomText>
        <p>단식 시간 : {StartTime} ~ {EndTime}</p>
        <p>음식 섭취 가능 시간 : {EndTime} ~ {StartTime}</p>
        {
          EatTimeCheck === true ?
          (
            EndTimeMinute === 60 ?
            (
              <p>식사 종료까지 {EndTimeHour < 10 ? "0" + (EndTimeHour - 1) : EndTimeHour}시간 00분 남았습니다.</p>
            ) :
            (
              <p>식사 종료까지 {EndTimeHour < 10 ? "0" + (EndTimeHour) : EndTimeHour - 1}시간 {EndTimeMinute < 10 ? "0" + EndTimeMinute : EndTimeMinute}분 남았습니다.</p>
            )
          ) :
          (
            TimeMinute === 60 ?
            (
              <p>단식 종료까지 {TimeHour < 10 ? "0" + (TimeHour) : TimeHour}시간 00분 남았습니다.</p>
            ) :
            (
              <p>단식 종료까지 {TimeHour < 10 ? "0" + (TimeHour - 1) : TimeHour - 1}시간 {TimeMinute < 10 ? "0" + TimeMinute : TimeMinute}분 남았습니다.</p>
            )
          )
        }
      </BottomText>
    </TimeWrap>
  )
}

const TimeWrap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const TopText = styled.div`
  color: #ffffff;
  font-size: 18px;
  text-shadow: -1px 0 #FE7770, 0 1px #FE7770, 1px 0 #FE7770, 0 -1px #FE7770;
  margin-bottom: 10px;
  p {
    margin: 0;
  }
`;

const BottomText = styled.div`
  font-size: 14px;
  p {
    margin: 0;
  }
`;

export const MemoizedTime = React.memo(Time)