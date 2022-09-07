import React from "react";
import styled from "styled-components";
import axios from 'axios';

import { MemoizedSidebar } from "./Sidebar";
import RecordModal from "../elements/RecordModal";
import DimmedLayer from "../elements/DimmedLayer";
import CircleGraph from "../elements/CircleGraph"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faXmark, faCaretRight, faCaretDown } from '@fortawesome/free-solid-svg-icons'

import Calendar from 'react-calendar';
import moment from "moment";
import 'moment/locale/ko';

const Record = () => {
  const [isLogin, setIsLogin] = React.useState(false)
  const [value, onChange] = React.useState(new Date());
  const [recordModalOpen, setRecordModalOpen] = React.useState(false);

  const [breakfastOpen, setBreakfastOpen] = React.useState(false);
  const [lunchOpen, setLunchOpen] = React.useState(false);
  const [dinnerOpen, setDinnerOpen] = React.useState(false);

  const [ totalEatItem, setTotalEatItem] = React.useState([])
  const [ breakfastEatItem, setBreakfastEatItem] = React.useState([])
  const [ lunchEatItem, setLunchEatItem] = React.useState([])
  const [ dinnerEatItem, setDinnerEatItem] = React.useState([])
  const [ checkInputFood, setCheckInputFood ] = React.useState(false)

  const [selectTime, setSelectTime] = React.useState("");

  const [selectEatItem, setSelectEatItem] = React.useState("");
  const [selectBreakfast, setSelectBreakfast] = React.useState(false);
  const [selectLunch, setSelectLunch] = React.useState(false);
  const [selectDinner, setSelectDinner] = React.useState(false);

  const [editEatItem, setEditEatItem] = React.useState(false);

  const Token = {
    authorization: sessionStorage.getItem("accessToken"),
    refresh_token: sessionStorage.getItem("refreshToken")
  }

  const LoginCheck = () => {
    if (Token.authorization !== null && Token.refresh_token !== null) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }
  
  const morning_ref = React.useRef(null);
  const lunch_ref = React.useRef(null);
  const dinner_ref = React.useRef(null);

  const BreakfastSelectItem = (value) => {
    setSelectEatItem(value)
    setSelectBreakfast(true)
  }

  const LunchSelectItem = (value) => {
    setSelectEatItem(value)
    setSelectLunch(true)
  }

  const DinnerSelectItem = (value) => {
    setSelectEatItem(value)
    setSelectDinner(true)
  }

  const EditItem = (value) => {
    setSelectEatItem(value)
    setEditEatItem(true)
    setRecordModalOpen(true)
  }

  const morningToggle = () => {
    if(breakfastOpen === false) {
      setBreakfastOpen(true)
    } else {
      setBreakfastOpen(false)
      setSelectBreakfast(false)
    }
  }

  const LunchToggle = () => {
    if(lunchOpen === false) {
      setLunchOpen(true)
    } else {
      setLunchOpen(false)
      setSelectLunch(false)
    }
  }

  const DinnerToggle = () => {
    if(dinnerOpen === false) {
      setDinnerOpen(true)
    } else {
      setDinnerOpen(false)
      setSelectDinner(false)
    }
  }

  const auth = {
    authorization: sessionStorage.getItem("accessToken"),
    refresh_token: sessionStorage.getItem("refreshToken")
  };

  const SelectDay = moment(value).format("YYYY-MM-DD")

  const getFood = async () => {
    if (Token.authorization !== null && Token.refresh_token !== null) {
      try {
        const res = await axios.get(`http://43.200.174.111:8080/api/diet?date=${SelectDay}`,
          {
            headers: {
              Authorization: `Bearer ${auth.authorization}`,
              refresh_token: `Bearer ${auth.refresh_token}`
            },
          })
        console.log(res)
        const data = res.data.dietResponseDto;
        console.log(data)
        if(res.status === 200) {
          setTotalEatItem(data)
          setBreakfastEatItem(data.filter((value) => value.dietStatus === "BREAKFAST"))
          setLunchEatItem(data.filter((value) => value.dietStatus === "LUNCH"))
          setDinnerEatItem(data.filter((value) => value.dietStatus === "DINNER"))
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  const [morningKcal, setMorningKcal] = React.useState(0)
  const [lunchKcal, setLunchKcal] = React.useState(0)
  const [dinnerKcal, setDinnerKcal] = React.useState(0)

  let MorningArr = [];
  let LunchArr = [];
  let DinnerArr = [];

  const MorningKcal = () => {
    if(breakfastEatItem.length === 1) {
      setMorningKcal(breakfastEatItem[0].kcal.toFixed(2))
    } else if(breakfastEatItem.length === 0) {
      setMorningKcal(0)
    } else {
      for(let i = 0; i < breakfastEatItem.length; i++) {
        MorningArr.push((breakfastEatItem[i].kcal))
      }
      setMorningKcal((MorningArr.reduce((pre, cur) => pre + cur)).toFixed(2))
    }
  }

  const LunchKcal = () => {
    if(lunchEatItem.length === 1) {
      setLunchKcal((lunchEatItem[0].kcal).toFixed(2))
    } else if(lunchEatItem.length === 0) {
      setLunchKcal(0)
    } else {
      for(let i = 0; i < lunchEatItem.length; i++) {
        LunchArr.push(lunchEatItem[i].kcal)
      }
      setLunchKcal((LunchArr.reduce((pre, cur) => pre + cur)).toFixed(2))
    }
  }

  const DinnerKcal = () => {
    if(dinnerEatItem.length === 1) {
      setDinnerKcal(dinnerEatItem[0].kcal.toFixed(2))
    } else if(dinnerEatItem.length === 0) {
      setDinnerKcal(0)
    } else {
      for(let i = 0; i < dinnerEatItem.length; i++) {
        DinnerArr.push((dinnerEatItem[i].kcal))
      }
      setDinnerKcal((DinnerArr.reduce((pre, cur) => pre + cur)).toFixed(2))
    }
  }

  React.useEffect(() => {
    LoginCheck()
}, [])

  React.useEffect(() => {
    getFood()
  }, [SelectDay, checkInputFood])

  React.useEffect(() => {
    MorningKcal()
  }, [breakfastEatItem])

  React.useEffect(() => {
    LunchKcal()
  }, [lunchEatItem])

  React.useEffect(() => {
    DinnerKcal()
  }, [dinnerEatItem])

  const DeleteItem = async (value) => {
    try {
      const res = await axios.delete(`http://43.200.174.111:8080/api/diet/${value}`,{
        headers: {
          Authorization: `Bearer ${auth.authorization}`,
          refresh_token: `Bearer ${auth.refresh_token}`
        },
      })
      console.log(res)
      if(res.status === 200 && res.data === "식단 삭제 완료!") {
        window.alert("선택하신 음식이 삭제되었습니다.")
        setCheckInputFood(!checkInputFood)
      }
    } catch(error) {
      console.log(error)
      window.alert("음식 삭제에 실패하였습니다.")
    }
  }
  
  return (
    <Wrap>
      <RecordWrap>
        <MemoizedSidebar />
        <Container>
          {
            isLogin ? (
              null
            ) :
            (
              <DimmedLayer />
            )
          }
          <CalendarContainer style={{ filter: !isLogin ? "blur(6px)" : "none" }}>
            <MyCalendar
              onChange={onChange} value={value}
              calendarType="US" // 요일을 일요일부터 시작하도록 설정
              formatDay={(locale, date) => moment(date).format("D")} // '일' 제외하고 숫자만 보이도록 설정
            />
          </CalendarContainer>
          <RecordingBox 
            style={{ filter: !isLogin ? "blur(6px)" : "none" }}>
            <h1 className="Title">
              <div className="text-gray-500 mt-4">
                {moment(value).format("YYYY년 MM월 DD일 dddd")}
              </div>
            </h1>
            {
              recordModalOpen === true ? (
                <RecordModal
                  setRecordModalOpen={setRecordModalOpen}
                  selectTime={selectTime}
                  SelectDay={SelectDay}
                  selectEatItem={selectEatItem}
                  editEatItem={editEatItem}
                  setEditEatItem={setEditEatItem}
                  checkInputFood={checkInputFood}
                  setCheckInputFood={setCheckInputFood}
                />
              ) : (
                null
              )
            }
            <SelectBoxWrap>
              <SelectBox className="MorningSelect">
                <Select>
                  <SelectTitle onClick={morningToggle} style={{borderRadius: breakfastOpen ? "6px 6px 0 0" : "6px"}}>
                    <FontAwesomeIcon icon={ breakfastOpen ? faCaretDown : faCaretRight} />
                    <div ref={morning_ref}>아침</div>
                    <p className="TotalKcal">총 섭취 칼로리 : {morningKcal}</p>
                    { breakfastOpen  === true ?
                      (
                        <div className="addBtn">
                          <Button onClick={() => {
                              setRecordModalOpen(true)
                              setSelectTime(morning_ref.current.innerHTML)
                            }}
                          >+ 추가하기</Button>
                        </div>
                      ) : (
                        null
                      )
                    }
                  </SelectTitle>
                  { breakfastOpen  === true ? 
                    (
                      <SelectContent>
                        {
                          breakfastEatItem.length === 0 ? (
                            <div className="TimeTitle">아침 식단을 입력하세요.</div>
                          ) :
                          (
                            breakfastEatItem.map((v,idx) => (
                              <FoodInfo key={idx}>
                                <RadioInput type="radio" id={v.foodId} name="SelectFood" value={v} />
                                <label htmlFor={v.foodId} onClick={() => BreakfastSelectItem(v)}>
                                  <RadioBtn className="RadioBtn" />
                                  <FoodInfoWrap className="FoodInfo">
                                    <FoodTitle>
                                      <p className="FoodTitle">{v.foodName === null ? "미정" : v.foodName}</p>
                                    </FoodTitle>
                                    <FoodCom className="FoodCom">
                                      <p>제조사 : {v.madeBy === null ? "미정" : v.madeBy}</p>
                                    </FoodCom>
                                    <FoodDesc className="FoodDesc">
                                      <p>총 섭취량: {v.foodWeight === null ? "미정" : v.foodWeight.toFixed(2)}(g)</p>
                                      <p>kcal: {v.kcal === null ? "미정" : v.kcal.toFixed(2)}</p>
                                      <p>탄: {v.carbs === null ? "미정" : v.carbs.toFixed(2)}</p>
                                      <p>단: {v.protein === null ? "미정" : v.protein.toFixed(2)}</p>
                                      <p>지: {v.fat === null ? "미정" : v.fat.toFixed(2)}</p>
                                    </FoodDesc>
                                    {
                                      selectBreakfast && v.foodId === selectEatItem.foodId ? (
                                        <EtcBtnWrap>
                                          <div onClick={() => EditItem(v)}>
                                            <FontAwesomeIcon icon={faPen} />
                                          </div>
                                          <div onClick={() => DeleteItem(v.dietId)}>
                                            <FontAwesomeIcon icon={faXmark} />
                                          </div>
                                        </EtcBtnWrap>
                                      ) : (
                                        null
                                      )
                                    }
                                  </FoodInfoWrap>
                                </label>
                              </FoodInfo>
                            ))
                          )
                        }
                      </SelectContent>
                    ) :
                    (
                      null
                    )
                  }
                </Select>
              </SelectBox>
              <SelectBox className="LunchSelect">
                <Select>
                  <SelectTitle onClick={LunchToggle} style={{borderRadius: lunchOpen ? "6px 6px 0 0" : "6px"}}>
                    <FontAwesomeIcon icon={ lunchOpen ? faCaretDown : faCaretRight} />
                    <div ref={lunch_ref}>점심</div>
                    <p className="TotalKcal">총 섭취 칼로리 : {lunchKcal}</p>
                    { lunchOpen === true ?
                      (
                        <div className="addBtn">
                          <Button onClick={() => {
                              setRecordModalOpen(true)
                              setSelectTime(lunch_ref.current.innerHTML)
                            }}
                          >+ 추가하기</Button>
                        </div>
                      ) : (
                        null
                      )
                    }
                  </SelectTitle>
                  { lunchOpen === true ? 
                    (
                      <SelectContent>
                        {
                          lunchEatItem.length === 0 ? (
                            <div className="TimeTitle">점심 식단을 입력하세요.</div>
                          ) :
                          (
                            lunchEatItem.map((v,idx) => (
                              <FoodInfo key={idx}>
                                <RadioInput type="radio" id={v.foodId} name="SelectFood" value={v} />
                                <label htmlFor={v.foodId} onClick={() => LunchSelectItem(v)}>
                                  <RadioBtn className="RadioBtn" />
                                  <FoodInfoWrap className="FoodInfo">
                                    <FoodTitle>
                                      <p className="FoodTitle">{v.foodName === null ? "미정" : v.foodName}</p>
                                    </FoodTitle>
                                    <FoodCom className="FoodCom">
                                      <p>제조사 : {v.madeBy === null ? "미정" : v.madeBy}</p>
                                    </FoodCom>
                                    <FoodDesc className="FoodDesc">
                                      <p>총 섭취량: {v.foodWeight === null ? "미정" : v.foodWeight.toFixed(2)}(g)</p>
                                      <p>kcal: {v.kcal === null ? "미정" : v.kcal.toFixed(2)}</p>
                                      <p>탄: {v.carbs === null ? "미정" : v.carbs.toFixed(2)}</p>
                                      <p>단: {v.protein === null ? "미정" : v.protein.toFixed(2)}</p>
                                      <p>지: {v.fat === null ? "미정" : v.fat.toFixed(2)}</p>
                                    </FoodDesc>
                                    {
                                      selectLunch && v.foodId === selectEatItem.foodId ? (
                                        <EtcBtnWrap>
                                          <div onClick={() => EditItem(v)}>
                                            <FontAwesomeIcon icon={faPen} />
                                          </div>
                                          <div onClick={() => DeleteItem(v.dietId)}>
                                            <FontAwesomeIcon icon={faXmark} />
                                          </div>
                                        </EtcBtnWrap>
                                      ) : (
                                        null
                                      )
                                    }
                                  </FoodInfoWrap>
                                </label>
                              </FoodInfo>
                            ))
                          )
                        }
                      </SelectContent>
                    ) :
                    (
                      null
                    )
                  }
                </Select>
              </SelectBox>
              <SelectBox className="DinnerSelect">
                <Select>
                  <SelectTitle onClick={DinnerToggle} style={{borderRadius: dinnerOpen ? "6px 6px 0 0" : "6px"}}>
                    <FontAwesomeIcon icon={ dinnerOpen ? faCaretDown : faCaretRight} />
                    <div ref={dinner_ref}>저녁</div>
                    <p className="TotalKcal">총 섭취 칼로리 : {dinnerKcal}</p>
                    { dinnerOpen === true ?
                      (
                        <div className="addBtn">
                          <Button onClick={() => {
                              setRecordModalOpen(true)
                              setSelectTime(dinner_ref.current.innerHTML)
                            }}
                          >+ 추가하기</Button>
                        </div>
                      ) : (
                        null
                      )
                    }
                  </SelectTitle>
                  { dinnerOpen === true ? 
                    (
                      <SelectContent>
                        {
                          dinnerEatItem.length === 0 ? (
                            <div className="TimeTitle">저녁 식단을 입력하세요.</div>
                          ) :
                          (
                            dinnerEatItem.map((v,idx) => (
                              <FoodInfo key={idx}>
                                <RadioInput type="radio" id={v.foodId} name="SelectFood" value={v} />
                                <label htmlFor={v.foodId} onClick={() => DinnerSelectItem(v)}>
                                  <RadioBtn className="RadioBtn" />
                                  <FoodInfoWrap className="FoodInfo">
                                    <FoodTitle>
                                      <p className="FoodTitle">{v.foodName === null ? "미정" : v.foodName}</p>
                                    </FoodTitle>
                                    <FoodCom className="FoodCom">
                                      <p>제조사 : {v.madeBy === null ? "미정" : v.madeBy}</p>
                                    </FoodCom>
                                    <FoodDesc className="FoodDesc">
                                      <p>총 섭취량: {v.foodWeight === null ? "미정" : v.foodWeight.toFixed(2)}(g)</p>
                                      <p>kcal: {v.kcal === null ? "미정" : v.kcal.toFixed(2)}</p>
                                      <p>탄: {v.carbs === null ? "미정" : v.carbs.toFixed(2)}</p>
                                      <p>단: {v.protein === null ? "미정" : v.protein.toFixed(2)}</p>
                                      <p>지: {v.fat === null ? "미정" : v.fat.toFixed(2)}</p>
                                    </FoodDesc>
                                    {
                                      selectDinner && v.foodId === selectEatItem.foodId ? (
                                        <EtcBtnWrap>
                                          <div onClick={() => EditItem(v)}>
                                            <FontAwesomeIcon icon={faPen} />
                                          </div>
                                          <div onClick={() => DeleteItem(v.dietId)}>
                                            <FontAwesomeIcon icon={faXmark} />
                                          </div>
                                        </EtcBtnWrap>
                                      ) : (
                                        null
                                      )
                                    }
                                  </FoodInfoWrap>
                                </label>
                              </FoodInfo>
                            ))
                          )
                        }
                      </SelectContent>
                    ) :
                    (
                      null
                    )
                  }
                </Select>
              </SelectBox>
            </SelectBoxWrap>
            <CircleGraph totalEatItem={totalEatItem} />
          </RecordingBox>
        </Container>
      </RecordWrap>
    </Wrap>
  )
}

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  margin-left: 260px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const RecordWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 80%;
  height: 70%;
  border-radius: 30px;
  background-color: white;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* font-size: 20px;
  text-align: center;
  font-weight: bold; */
  overflow: hidden;
`;

const CalendarContainer = styled.div`
  /* ~~~ container styles ~~~ */
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  border-right: 1px solid #BBB;
`;

const RecordingBox = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1.Title {
    margin: 0 auto;
    padding: 20px 0;
    font-size: 20px;
    text-align: center;
    color: #555;
    width: 540px;
    border-bottom: 1px solid #E0E2E6;
  }
`;

const SelectBoxWrap = styled.div`
  width: 100%;
  font-size: 18px;
  margin: 12px auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: auto;
`;

const SelectBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  margin: 8px 0;
`;

const Select = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 450px;
  color: #555;
`;

const SelectTitle = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: #FFB0AC;
  padding: 10px;
  box-sizing: border-box;
  gap: 8px;
  cursor: pointer;
  div.addBtn {
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  p.TotalKcal {
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    font-size: 12px;
    font-weight: 300;
    color: #555;
    box-sizing: border-box;
  }
`

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 30px;
  border: none;
  border-radius: 8px;
  color: #fff;
  background-color: #FE7770;
  font-size: 14px;
  font-weight: 900;
  margin-right: 10px;
  cursor: pointer;
`;

const SelectContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  border-radius: 0 0 6px 6px;
  box-shadow: 2px 2px 4px #ccc;
  box-sizing: border-box;
  div.TimeTitle {
    min-height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const FoodInfo = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 6px;
  box-sizing: border-box;
`

const RadioInput = styled.input`
  display: none;
  & + label {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
  }
  &:checked + label > .RadioBtn {
    background-color: #FE7770;
  }
  &:checked + label .FoodTitle {
    color: #FE7770;
  }
`

const RadioBtn = styled.div`
  position: relative;
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #eee;
  box-sizing: border-box;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 12px;
    height: 12px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background-color: #fff;
  }
`

const FoodInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 90%;
  margin-left: 12px;
`

const FoodTitle = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  p {
    font-size: 14px;
    color: #bbb;
    margin: 0;
  }
`
const FoodCom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  p {
    font-size: 8px;
    color: #bbb;
    margin: 0;
    font-weight: 300;
  }
`

const FoodDesc = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  p {
    position: relative;
    font-size: 8px;
    color: #bbb;
    margin: 0;
    padding: 0 4px;
    text-align: center;
    box-sizing: border-box;
    font-weight: 300;
  }
  p::before {
    position: absolute;
    content: '';
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 50%;
    border-right: 1px solid #CCC;
  }
  p:first-child {
    padding-left: 0;
  }
  p:last-child:before {
    border: none;
  }
`

const EtcBtnWrap = styled.div`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #bbb;
  font-size: 14px;
  gap: 6px;
  div:hover {
    color: #333;
  }
`

const MyCalendar = styled(Calendar)`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

   /* 상단 네비게이션 바 */
  .react-calendar__navigation {
    display: flex;
    width: 100%;
    height: 50px;
    margin-bottom: 40px;
  }

  .react-calendar__navigation__label {
    width: 50%;
    height: 100%;
    font-weight: bold;
    font-size: 22px;
  }

  .react-calendar__navigation__arrow {
    /* flex-grow: 0.333; */
    width: 12%;
  }

  .react-calendar__viewContainer {
    width: 100%;
  }
   /* 요일 라벨 */
  .react-calendar__month-view__weekdays {
    width: 100%;
    text-align: center;
    font-weight: 300;
    font-size: 20px;
    color: #808080;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  /* 버튼 */
  button {
    width: 100%;
    height: 50px;
    margin: 3px;
    border: none;
    background-color: #fff;
    border-radius: 10px;
    color: #555;
    font-size: 22px;
    font-weight: 700;
    padding: 5px 0;
    cursor: pointer;
    &:hover {
      background-color: #eee;
    }
    &:active {
      background-color: #808080;
    }
  }

  /* 일자 그리드 스타일 */
  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: 14.2% 14.2% 14.2% 14.2% 14.2% 14.2% 14.2%;
    .react-calendar__tile {
      max-width: initial !important;
    }
  }

  /* 해당 월의 날짜가 아니면 투명도 0.7 */
  .react-calendar__month-view__days__day--neighboringMonth {
    opacity: 0.6;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #FE7770;
  }

  .react-calendar__tile--now {
    background-color: #FE7770;
    color: #fff;
  }

  .react-calendar__tile--range {
    color: #333;
    background-color: #FFB0AC;
  }

  /* 월 & 년도 버튼 스타일 */
  .react-calendar__year-view__months,
  .react-calendar__decade-view__years,
  .react-calendar__century-view__decades {
    display: grid !important;
    grid-template-columns: 20% 20% 20% 20% 20%;

    &.react-calendar__year-view__months {
      grid-template-columns: 33.3% 33.3% 33.3%;
    }

    .react-calendar__tile {
      height: 100px;
      max-width: initial !important;
    }
  }
`

export default Record;