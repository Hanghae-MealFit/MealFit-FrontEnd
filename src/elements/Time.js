import React, { useEffect } from 'react'
import styled from 'styled-components';

const Time = ({time, setTime}) => {
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
  const TodaySecond = 86400;
  const NowSecond = (((Hour * 60) + Minute) * 60) + Second
  const TodayPer = ((NowSecond / TodaySecond) * 100).toFixed(1)

  return (
    <>
      <TopText>
        <p>{Year}년 {Month < 10 ? '0' + Month : Month}월 {Day < 10 ? '0' + Day : Day}일</p>
        <p>{Hour < 10 ? '0' + Hour : Hour} : {Minute < 10 ? '0' + Minute : Minute} : {Second < 10 ? '0' + Second : Second}</p>
        <p>지금은 단식시간 입니다.</p>
      </TopText>
      <BottomText>
        <p>단식 시간 : 13시 ~ 08시</p>
        <p>음식 섭취 가능 시간 : 08시 ~ 13시</p>
      </BottomText>
    </>
  )
}

const TopText = styled.div`
  color: #ffffff;
  font-size: 24px;
  text-shadow: -1px 0 #FE7770, 0 1px #FE7770, 1px 0 #FE7770, 0 -1px #FE7770;
`;

const BottomText = styled.div`
`;

export default Time