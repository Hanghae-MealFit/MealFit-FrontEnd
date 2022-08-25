import React from "react";
import styled from "styled-components";
import axios from 'axios';

import { MemoizedSidebar } from "./Sidebar";
import FoodModal from "../elements/FoodModal";

import Calendar from 'react-calendar';
import moment from "moment";
import 'moment/locale/ko';

const Record = () => {
  const [value, onChange] = React.useState(new Date());
  const [modalOpen, setModalOpen] = React.useState(false);

  const closeModal = () => {
      setModalOpen(false);
  };


  return (
    <Wrap>
      <MemoizedSidebar />
      <Container>
          <CalendarContainer>
          <MyCalendar
              onChange={onChange} value={value}
              calendarType="US" // 요일을 일요일부터 시작하도록 설정
              formatDay={(locale, date) => moment(date).format("D")} // '일' 제외하고 숫자만 보이도록 설정
            />
          </CalendarContainer>
        <Line />
        <RecordingBox>
          <h1>
            <div className="text-gray-500 mt-4">
              {moment(value).format("YYYY년 MM월 DD일 dddd")}
            </div>
          </h1>
          <SelectBoxWrap>
            <SelectBox>
              <Select defaultValue="default" name="Morning">
                <option value="default" disabled>아침</option>
                <option value="AddMorning">추가하기</option>
              </Select>
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
            </SelectBox>
            <SelectBox>
              <Select defaultValue="default" name="Lunch">
                <option value="default" disabled>점심</option>
                <option value="AddLunch">추가하기</option>
              </Select>
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
            </SelectBox>
            <SelectBox>
              <Select defaultValue="default" name="Dinner">
                <option value="default" disabled>저녁</option>
                <option onClick={() => { setModalOpen(true) }}
                value="setModalOpen">추가하기</option>
                {
                  modalOpen === true ? (
                      <FoodModal setModalOpen={setModalOpen} />
                  ) : (
                      null
                  )
              }
              </Select>
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
            </SelectBox>
          </SelectBoxWrap>
        </RecordingBox>
      </Container>
    </Wrap>
  )
}

const Wrap = styled.div`
  // background-color: yellow;
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
  margin-left: 260px;
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
  p {
    position: relative;
    bottom: -20px;
    font-size: 16px;
    color: #D9D9D9;
  }
  `;

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

  h1 {
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
  width: 70%;
  height: 50%;
  margin-bottom: 100px;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const SelectBox = styled.div`
	display: flex;
  justify-content: center;
  align-items: center;
`;

const Select = styled.select`
	min-width: 0;
	display: block;
	width: 400px;
	padding: 8px 8px;
	font-size: inherit;
	line-height: inherit;
	border: 1px solid;
	border-radius: 5px;
	color: #555;
	background-color: transparent;
  -webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	&:focus {
		border-color: #333;
	}
`;

// const Option = styled.option`
//   background-color: FE7770;
// `;

const IconSVG = styled.svg`
	margin-left: -30px;
	align-self: center;
	width: 24px;
	height: 24px;
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