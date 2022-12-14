import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { useSelector } from "react-redux";

const CircleGraph = ({ totalEatItem }) => {
  const user = useSelector((state) => state.userinfo.user.nutritionGoal)

  const [totalKcal, setTotalKcal] = useState(0)
  const [totalCarbs, setTotalCarbs] = useState(0)
  const [totalPro, setTotalPro] = useState(0)
  const [totalFat, setTotalFat] = useState(0)

  const [kcalPer, setKcalPer] = useState(0)
  const [CarbsPer, setCarbsPer] = useState(0)
  const [ProPer, setProPer] = useState(0)
  const [FatPer, setFatPer] = useState(0)

  const Kcal_arr = []
  const Carbs_arr = []
  const Pro_arr = []
  const Fat_arr = []

  useEffect(() => {
    for(let i = 0; i < totalEatItem.length; i++) {
      Kcal_arr.push(totalEatItem[i].kcal)
      Carbs_arr.push(totalEatItem[i].carbs)
      Pro_arr.push(totalEatItem[i].protein)
      Fat_arr.push(totalEatItem[i].fat)
    }
    if(Kcal_arr.length !== 0) {
      setTotalKcal((Kcal_arr.reduce((pre, cur) => pre + cur)).toFixed(2))
    } else {
      setTotalKcal(0)
    }
    if(Carbs_arr.length !== 0) {
      setTotalCarbs((Carbs_arr.reduce((pre, cur) => pre + cur)).toFixed(2))
    } else {
      setTotalCarbs(0)
    }
    if(Pro_arr.length !== 0) {
      setTotalPro((Pro_arr.reduce((pre, cur) => pre + cur)).toFixed(2))
    } else {
      setTotalPro(0)
    }
    if(Fat_arr.length !== 0) {
      setTotalFat((Fat_arr.reduce((pre, cur) => pre + cur)).toFixed(2))
    } else {
      setTotalFat(0)
    }
  }, [totalEatItem])

  useEffect(() => {
    if(totalKcal !== 0) {
      setKcalPer(((totalKcal / user.kcal) * 100).toFixed(1))
    } else {
      setKcalPer(0)
    }
  }, [totalKcal])

  useEffect(() => {
    if(totalCarbs !== 0) {
      setCarbsPer(((totalCarbs / user.carbs) * 100).toFixed(1))
    } else {
      setCarbsPer(0)
    }
  }, [totalCarbs])

  useEffect(() => {
    if(totalPro !== 0) {
      setProPer(((totalPro / user.protein) * 100).toFixed(1))
    } else {
      setProPer(0)
    }
  }, [totalPro])

  useEffect(() => {
    if(totalFat !== 0) {
      setFatPer(((totalFat / user.fat) * 100).toFixed(1))
    } else {
      setFatPer(0)
    }
  }, [totalFat])

  const TotalInfo = [
    { title: "?????????", info: totalKcal, goal: user.kcal, per: kcalPer, unit: "(Kcal)" },
    { title: "????????????", info: totalCarbs, goal: user.carbs, per: CarbsPer, unit: "(g)" },
    { title: "?????????", info: totalPro, goal: user.protein, per: ProPer, unit: "(g)" },
    { title: "??????", info: totalFat, goal: user.fat, per: FatPer, unit: "(g)" }
  ]
  return (
    <Wrap>
      {
        TotalInfo.map((v, idx) => (
          <CircleWrap key={idx}>
            <Percent>
              <svg>
                <circle style={{
                  stroke: v.per > 100 ? "red" : "#BBB"
                }} cx="65" cy="65" r="50"></circle>
                <circle style={{
                  strokeDashoffset: `calc(377 - (377 * ${v.per > 100 ? v.per - 100 : v.per }) / 100)`,
                  stroke: "#FE7770"
                }} cx="65" cy="65" r="50"></circle>
              </svg>
              <Info>
                <InfoTitle>{v.title}</InfoTitle>
                <InfoPer>{v.per}%</InfoPer>
                <Goal>{Math.ceil(parseInt(v.info).toFixed(0))} / {v.goal}</Goal>
                <Unit>{v.unit}</Unit>
              </Info>
            </Percent>
          </CircleWrap>
        ))
      }
    </Wrap>
  )
}

const Wrap = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (min-width: 520px) and (max-width: 768px) {
    width: 70%;
    flex-direction: row;
    flex-wrap: wrap;
  }
  @media (min-width: 769px) {
    width: 120%;
    flex-direction: row;
    flex-wrap: wrap;
  }
  @media (min-width: 1440px) {
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
  }
`

const CircleWrap = styled.div`
  width: 140px;
  height: 140px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

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
  width: 100%;
  height: 100%;
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
    stroke-width: 14;
    stroke: #000;
    transform: translate(5px, 5px);
    stroke-dasharray: 377;
    stroke-dashoffset: 377;
    transition: 0.2s;
  }
  svg circle:first-child {
    stroke-dashoffset: 0;
    fill: #FFF;
    opacity: 0;
    animation: ${fadeIn} 0.5s linear forwards;
    animation-delay: 0.5s;
  }
  svg circle:last-child {
    opacity: 0;
    animation: ${fadeIn} 0.5s linear forwards;
    animation-delay: 1.5s;
  }
`

const Info = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2px;
`

const InfoTitle = styled.p`
  margin: 0;
  font-size: 12px;
`
const InfoPer = styled.p`
  margin: 0;
  font-size: 15px;
`
const Goal = styled.p`
  margin: 0;
  font-size: 11px;
`
const Unit = styled.p`
  margin: 0;
  font-size: 11px;
`

export default CircleGraph