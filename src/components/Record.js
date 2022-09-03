import React from "react";
import styled from "styled-components";
import axios from 'axios';

import { MemoizedSidebar } from "./Sidebar";
import RecordModal from "../elements/RecordModal";
import DimmedLayer from "../elements/DimmedLayer";

import Calendar from 'react-calendar';
import moment from "moment";
import 'moment/locale/ko';

const Record = () => {
  const [isLogin, setIsLogin] = React.useState(false)
  const [value, onChange] = React.useState(new Date());
  const [recordModalOpen, setRecordModalOpen] = React.useState(false);
  // const [open, setOpen] = React.useState(false);
  const [breakfastOpen, setBreakfastOpen] = React.useState(false);
  const [lunchOpen, setLunchOpen] = React.useState(false);
  const [dinnerOpen, setDinnerOpen] = React.useState(false);

  const [ breakfastEatItem, setBreakfastEatItem] = React.useState([])
  const [ lunchEatItem, setLunchEatItem] = React.useState([])
  const [ dinnerEatItem, setDinnerEatItem] = React.useState([])

  const [selectTime, setSelectTime] = React.useState("");
  const [todayEatItem, setTodayEatItem] = React.useState("");

  const [selectEatItem, setSelectEatItem] = React.useState("");
  const [selectEatItemCheck, setSelectEatItemCheck] = React.useState(false);

  const [editEatItem, setEditEatItem] = React.useState(false);

  // console.log("타임", selectTime)

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

  const SelectItem = (value) => {
    console.log("select")
    setSelectEatItem(value)
    setSelectEatItemCheck(true)
  }

  console.log(selectEatItem, selectEatItemCheck)

  const EditItem = (value) => {
    setSelectEatItem(value)
    setEditEatItem(true)
    setRecordModalOpen(true)
  }

  // status
  // 아침: BREAKFAST
  // 점심: LUNCH
  // 저녁: DINNER

  const auth = {
    authorization: sessionStorage.getItem("accessToken"),
    refresh_token: sessionStorage.getItem("refreshToken")
  };

  const SelectDay = moment(value).format("YYYY-MM-DD")
  console.log(SelectDay)

  const getFood = async () => {
    if (Token.authorization !== null && Token.refresh_token !== null) {
      try {
        const res = await axios.get(`http://43.200.174.111:8080/diet?date=${SelectDay}`,
          {
            headers: {
              Authorization: `Bearer ${auth.authorization}`,
              refresh_token: `Bearer ${auth.refresh_token}`
            },
          })
        console.log(res.data.dietResponseDto)
        const data = res.data.dietResponseDto;
        console.log(data)
        setBreakfastEatItem(data.filter((value) => value.dietStatus === "BREAKFAST"))
        setLunchEatItem(data.filter((value) => value.dietStatus === "LUNCH"))
        setDinnerEatItem(data.filter((value) => value.dietStatus === "DINNER"))
      } catch (error) {
        console.log(error)
      }
    }
  }
  console.log(breakfastEatItem)
  console.log(lunchEatItem)
  console.log(dinnerEatItem)

  React.useEffect(() => {
    LoginCheck()
}, [])

  React.useEffect(() => {
    getFood()
  }, [SelectDay])

  console.log("why",selectEatItem)

  const DeleteItem = async (value) => {
    try {
      const res = await axios.delete(`http://43.200.174.111:8080/diet/${value}`,{
        headers: {
          Authorization: `Bearer ${auth.authorization}`,
          refresh_token: `Bearer ${auth.refresh_token}`
        },
      })
      console.log(res)
      console.log(selectEatItem.dietId)
    } catch(error) {
      console.log(error)
      console.log(selectEatItem.dietId)
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
          <Line />
          <RecordingBox style={{ filter: !isLogin ? "blur(6px)" : "none" }}>
            <h1 className="Title">
              <div className="text-gray-500 mt-4">
                {moment(value).format("YYYY년 MM월 DD일 dddd")}
              </div>
            </h1>
            <SelectBoxWrap>
              <SelectBox>
                {
                  breakfastOpen  === true ?
                    (
                      <>
                        <Select onClick={() => setBreakfastOpen(false)}>
                          <div ref={morning_ref}>아침</div>
                          <IconSVG
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10 14L16 6H4L10 14Z"
                              fill="#1A1A1A"
                            />
                          </IconSVG>
                        </Select>
                        <SelectContent>
                          {
                            breakfastEatItem.length === 0 ? (
                              <div>아침 식단을 입력하세요.</div>
                            ) :
                            (
                              breakfastEatItem.map((v,idx) => (
                                <div key={"item" + idx}>
                                  <div style={{
                                    cursor: "pointer",
                                    backgroundColor: selectEatItemCheck && v.foodId === selectEatItem.foodId ? "gray" : "transparent"
                                  }} onClick={() => SelectItem(v)}>
                                    {v.foodName}
                                  </div>
                                  <span onClick={() => EditItem(v)}>수정</span>
                                  <span onClick={() => DeleteItem(v.dietId)}>삭제</span>
                                </div>
                              ))
                            )
                          }
                          <Button onClick={() => {
                            setRecordModalOpen(true)
                            setSelectTime(morning_ref.current.innerHTML)
                          }}
                          >추가하기</Button>
                          {
                            recordModalOpen === true ? (
                              <RecordModal
                              setRecordModalOpen={setRecordModalOpen}
                              selectTime={selectTime}
                              SelectDay={SelectDay}
                              selectEatItem={selectEatItem}
                              editEatItem={editEatItem}
                              />
                            ) : (
                              null
                            )
                          }
                        </SelectContent>
                      </>
                    ) :
                    (
                      <>
                      <Select onClick={() => setBreakfastOpen(true)}>
                        <div>아침</div>
                        <IconSVG
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10 14L16 6H4L10 14Z"
                            fill="#1A1A1A"
                          />
                        </IconSVG>
                      </Select>
                    </>
                    )
                }
              </SelectBox>

              <SelectBox>
                {
                  lunchOpen  === true ?
                    (
                      <>
                        <Select onClick={() => setLunchOpen(false)}>
                          <div ref={lunch_ref}>점심</div>
                          <IconSVG
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10 14L16 6H4L10 14Z"
                              fill="#1A1A1A"
                            />
                          </IconSVG>
                        </Select>
                        <SelectContent>
                          {
                            lunchEatItem.length === 0 ? (
                              <div>점심 식단을 입력하세요.</div>
                            ) :
                            (
                              lunchEatItem.map((v,idx) => (
                                <div key={"item" + idx}>
                                  <div style={{
                                    cursor: "pointer",
                                    backgroundColor: selectEatItemCheck && v.foodId === selectEatItem.foodId ? "gray" : "transparent"
                                  }} onClick={() => {SelectItem(v)}}>
                                    {v.foodName}
                                  </div>
                                  <span onClick={() => EditItem(v)}>수정</span>
                                  <span onClick={() => {DeleteItem(v.dietId)}}>삭제</span>
                                </div>
                              ))
                            )
                          }
                          <Button onClick={() => {
                            setRecordModalOpen(true)
                            setSelectTime(lunch_ref.current.innerHTML)
                          }}
                          >추가하기</Button>
                          {
                            recordModalOpen === true ? (
                              <RecordModal
                              setRecordModalOpen={setRecordModalOpen}
                              selectTime={selectTime}
                              SelectDay={SelectDay}
                              selectEatItem={selectEatItem}
                              editEatItem={editEatItem}
                              />
                            ) : (
                              null
                            )
                          }
                        </SelectContent>
                      </>
                    ) :
                    (
                      <>
                      <Select onClick={() => setLunchOpen(true)}>
                        <div>점심</div>
                        <IconSVG
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10 14L16 6H4L10 14Z"
                            fill="#1A1A1A"
                          />
                        </IconSVG>
                      </Select>
                    </>
                    )
                }
              </SelectBox>

              <SelectBox>
                {
                  dinnerOpen  === true ?
                    (
                      <>
                        <Select onClick={() => setDinnerOpen(false)}>
                          <div ref={dinner_ref}>저녁</div>
                          <IconSVG
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M10 14L16 6H4L10 14Z"
                              fill="#1A1A1A"
                            />
                          </IconSVG>
                        </Select>
                        <SelectContent>
                          {
                            dinnerEatItem.length === 0 ? (
                              <div>저녁 식단을 입력하세요.</div>
                            ) :
                            (
                              dinnerEatItem.map((v,idx) => (
                                <div key={"item" + idx}>
                                  <div style={{
                                    cursor: "pointer",
                                    backgroundColor: selectEatItemCheck && v.foodId === selectEatItem.foodId ? "gray" : "transparent"
                                  }} onClick={() => {SelectItem(v)}}>
                                    {v.foodName}
                                  </div>
                                  <span onClick={() => EditItem(v)}>수정</span>
                                  <span onClick={() => {DeleteItem(v.dietId)}}>삭제</span>
                                </div>
                              ))
                            )
                          }
                          <Button onClick={() => {
                            setRecordModalOpen(true)
                            setSelectTime(dinner_ref.current.innerHTML)
                          }}
                          >추가하기</Button>
                          {
                            recordModalOpen === true ? (
                              <RecordModal
                              setRecordModalOpen={setRecordModalOpen}
                              selectTime={selectTime}
                              SelectDay={SelectDay}
                              selectEatItem={selectEatItem}
                              editEatItem={editEatItem}
                              />
                            ) : (
                              null
                            )
                          }
                        </SelectContent>
                      </>
                    ) :
                    (
                      <>
                      <Select onClick={() => setDinnerOpen(true)}>
                        <div>저녁</div>
                        <IconSVG
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M10 14L16 6H4L10 14Z"
                            fill="#1A1A1A"
                          />
                        </IconSVG>
                      </Select>
                    </>
                    )
                }
              </SelectBox>
            </SelectBoxWrap>
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
  // border: 5px solid blue;
  position: absolute;
  width: 1200px;
  height: 600px;
  border-radius: 30px;
  background-color: white;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  overflow: hidden;
  /* p {
    position: relative;
    bottom: -20px;
    font-size: 16px;
    color: #D9D9D9;
  } */
`;

const NotLogin = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 500;
`

const CalendarContainer = styled.div`
  // background-color: yellow;
  // border: 5px solid yellow;

  /* ~~~ container styles ~~~ */
  width: 50%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
`;

const RecordingBox = styled.div`
  // background-color: green;
  // border: 5px solid green;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  h1.Title {
    position: absolute;
    top: 10px;
    right: 30px;
    margin: 0 auto;
    padding: 30px 0;
    font-size: 20px;
    text-align: center;
    color: #555;
    width: 540px;
    border-bottom: 1px solid #E0E2E6;
  }
`;

const Line = styled.hr`
    height : 90%;
    border-left: 1px solid #eee;
`;

const SelectBoxWrap = styled.div`
  // background-color: pink;
  width: 75%;
  height: 50%;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
  // align-items: center;
  overflow: auto;
`;

const SelectBox = styled.div`
  // background-color: hotpink;
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Select = styled.div`
  // background-color: gray;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  min-width: 0;
  width: 400px;
  padding: 8px 8px;
  font-size: inherit;
  line-height: inherit;
  border: 1px solid;
  border-radius: 5px;
  color: #555;
  // background-color: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  &:focus {
    border-color: #333;
  }
    cursor: pointer;
`;

const SelectContent = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
div {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
`;

const IconSVG = styled.svg`
	margin-left: -30px;
	align-self: center;
	width: 24px;
	height: 24px;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 400px;
  height: 40px;
  margin-top: 20px;
  border: none;
  border-radius: 30px;
  color: #fff;
  background-color: #FE7770;
  font-size: 16px;
  // font-weight: 900;
  cursor: pointer;
`;

const MyCalendar = styled(Calendar)`
.react-calendar {
}

   /* 상단 네비게이션 바 */
  .react-calendar__navigation {
    display: flex;
    width: 500px;
    height: 50px;
    margin-bottom: 40px;

    .react-calendar__navigation__label {
      width: 1000px;
      height: 100%;
      font-weight: bold;
      font-size: 22px;
    }

    .react-calendar__navigation__arrow {
      flex-grow: 0.333;
    }
  }

   /* 요일 라벨 */
  .react-calendar__month-view__weekdays {
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

  .react-calendar__tile--range {
    color: #333;
    background-color: #FE7770;
    // box-shadow: 0 0 6px 2px #eee;
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
      // background-color: green;
      height: 100px;
      max-width: initial !important;
    }
  }
`

export default Record;