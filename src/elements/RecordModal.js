import React from 'react';
import styled from 'styled-components';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
// import FoodModal from "../elements/FoodModal";

const RecordModal = (
  {
    setRecordModalOpen,
    selectTime,
    SelectDay,
    editEatItem,
    setEditEatItem,
    selectEatItem,
    checkInputFood,
    setCheckInputFood
  }) => {

  const handleClose = () => {
    setRecordModalOpen(false)
  };
  
  const handleEditClose = () => {
    setRecordModalOpen(false)
    setEditEatItem(false)
  }

  const [notFoundSearch, setNotFoundSarch] = React.useState(false)
  const [searchList, setSearchList] = React.useState()
  const [selectMenu, setSelectMenu] = React.useState()
  const [selectMenuCheck, setSelectMenuCheck] = React.useState(false)

  const search_food_ref = React.useRef(null);
  const foodName_ref = React.useRef(null);
  const serving_ref = React.useRef(null);
  const kcal_ref = React.useRef(null);
  const carbs_ref = React.useRef(null);
  const pro_ref = React.useRef(null);
  const fat_ref = React.useRef(null);
  const eating_weight_ref = React.useRef(null);

  const auth = {
    authorization: sessionStorage.getItem("accessToken"),
    refresh_token: sessionStorage.getItem("refreshToken")
  }

  // 음식 추가하기
  const FoodInsert = async () => {
    try {
      const res = await axios.post("http://43.200.174.111:8080/api/food",
        {
          foodName: foodName_ref.current.value,
          oneServing: serving_ref.current.value,
          kcal: kcal_ref.current.value,
          carbs: carbs_ref.current.value,
          protein: pro_ref.current.value,
          fat: fat_ref.current.value
        }, {
          headers: {
            Authorization: `Bearer ${auth.authorization}`,
            refresh_token: `Bearer ${auth.refresh_token}`
          },
        })
      console.log(res)
      if(res.status === 201 && res.data === "음식 입력 완료") {
        window.alert("음식 입력에 완료되었습니다.\n검색 후 섭취량을 기록해주세요.")
        setNotFoundSarch(false)
        search_food_ref.current.focus()
        setText(foodName_ref.current.value)
        FoodSearch(foodName_ref.current.value)
      }
    } catch (error) {
      console.log(error)
      window.alert("음식 입력에 실패하였습니다.")
    }
  }

  // 검색
  const FoodSearch = async (data) => {
    console.log(data)
    const SearchName = data ? data : search_food_ref.current.value
    try {
      const res = await axios.get(`http://43.200.174.111:8080/api/food?name=${SearchName}`,
        {
          headers: {
            Authorization: `Bearer ${auth.authorization}`,
            refresh_token: `Bearer ${auth.refresh_token}`
          },
        })
        console.log(res)
        if(res.data.length === 0) {
          setNotFoundSarch(true)
        } else {
          setNotFoundSarch(false)
          setSearchList(res.data)
        }
    } catch (error) {
        console.log(error)
    }
  }

  // 식단 추가하기
  const DietInsert = async () => {
    try {
      const res = await axios.post(`http://43.200.174.111:8080/api/diet`,{
        foodId: selectMenu.foodId,
        foodWeight: eating_weight_ref.current.value,
        status: selectTime === "아침" ? "BREAKFAST" : selectTime === "점심" ? "LUNCH" : "DINNER",
        date: SelectDay
      },
      {
        headers: {
          Authorization: `Bearer ${auth.authorization}`,
          refresh_token: `Bearer ${auth.refresh_token}`
        },
      })
      console.log(res)
      if(res.status === 201) {
        window.alert("식단 입력이 완료되었습니다.")
        setRecordModalOpen(false)
        setCheckInputFood(!checkInputFood)
      }
    } catch (error) {
        console.log(error)
        window.alert("식단 입력에 실패하였습니다.")
    }
  }

  // 선택 된 음식의 정보 가져오기
  const SelectFood = (e, value) => {
    setSelectMenu(value)
    setSelectMenuCheck(true)
  }

  // 식단 수정하기
  const DietEdit = async () => {
    try {
      const res = await axios.put(`http://43.200.174.111:8080/api/diet`,{
        dietId: selectEatItem.dietId,
        foodId: selectMenu.foodId,
        foodWeight: eating_weight_ref.current.value
      },
      {
        headers: {
          Authorization: `Bearer ${auth.authorization}`,
          refresh_token: `Bearer ${auth.refresh_token}`
        },
      })
      console.log(res)
      if(res.status === 200 && res.data === "식단 수정 완료!") {
        window.alert("음식 수정이 완료되었습니다.")
        setRecordModalOpen(false)
        setEditEatItem(false)
        setCheckInputFood(!checkInputFood)
      }
    } catch (error) {
      console.log(error)
      window.alert("음식 수정에 실패하였습니다.")
    }
  }
  console.log("EatItem",selectEatItem, "selectMenu",selectMenu)

  console.log("edit", editEatItem)

  const onCheckEnter = (e) => {
    if(e.key === 'Enter') {
      FoodSearch()
    }
  }

  const [text, setText] = React.useState("");

  const displayText = (e) => {
    setText(e.target.value);
  };

  return (
    <Container>
      <Background />
      <ModalBlock>
        <Contents>
          {
            editEatItem ? (
              <Title>수정하기</Title>
            ) :
            (
              <Title>추가하기</Title>
            )
          }
          <InputTxt>
            <input ref={search_food_ref} type="text" placeholder='검색어를 입력하세요.' onKeyPress={onCheckEnter} value={text} onChange={displayText} />
            <button onClick={() => FoodSearch()}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </InputTxt>
          {
            notFoundSearch ? (
              <Search>
                <p>검색 결과가 없습니다. 직접 입력해주세요.</p>
                <Direct>
                  <div className="InputWrap">
                    <p>음식명</p>
                    <input ref={foodName_ref} type="text" placeholder='음식이름' />
                  </div>

                  <div className="InputWrap">
                    <p>1회 제공량</p>
                    <input ref={serving_ref} type="text" placeholder='1회 제공량' />
                  </div>

                  <div className="InputWrap">
                    <p>칼로리</p>
                    <input ref={kcal_ref} type="text" placeholder='칼로리' />
                  </div>

                  <div className="InputWrap">
                    <p>탄수화물</p>
                    <input ref={carbs_ref} type="text" placeholder='탄수화물' />
                  </div>

                  <div className="InputWrap">
                    <p>단백질</p>
                    <input ref={pro_ref} type="text" placeholder='단백질' />
                  </div>

                  <div className="InputWrap">
                    <p>지방</p>
                    <input ref={fat_ref} type="text" placeholder='지방' />
                  </div>
                </Direct>
              </Search>
            ) :
            (
              <FoodData>
                {searchList?.map((v, idx) => (
                  <FoodInfo key={idx}>
                    <RadioInput type="radio" id={v.foodId} name="SelectFood" value={v} />
                    <label htmlFor={v.foodId} onClick={(e) => {SelectFood(e, v)}}>
                      <RadioBtn className="RadioBtn" />
                      <FoodInfoWrap>
                        <FoodTitle>
                          <p className="FoodTitle">{v.foodName === null ? "미정" : v.foodName}</p>
                        </FoodTitle>
                        <FoodCom className="FoodCom">
                          <p>제조사 : {v.madeBy === null ? "미정" : v.madeBy}</p>
                        </FoodCom>
                        <FoodDesc className="FoodDesc">
                          <p>1회 제공량: {v.oneServing === null ? "미정" : v.oneServing.toFixed(2)}(g)</p>
                          <p>kcal: {v.kcal === null ? "미정" : v.kcal.toFixed(2)}</p>
                          <p>탄: {v.carbs === null ? "미정" : v.carbs.toFixed(2)}</p>
                          <p>단: {v.protein === null ? "미정" : v.protein.toFixed(2)}</p>
                          <p>지: {v.fat === null ? "미정" : v.fat.toFixed(2)}</p>
                        </FoodDesc>
                        { selectMenuCheck && v.foodId === selectMenu.foodId ?
                          (
                            <EatInput>
                              <input ref={eating_weight_ref} type="text" placeholder='섭취량을 입력해주세요.' />
                            </EatInput>
                          ) :
                          (
                            null
                          )
                        }
                      </FoodInfoWrap>
                    </label>
                  </FoodInfo>
                ))}
              </FoodData>
            )
          }
          { notFoundSearch ?
            (
              <BtnWrap>
                <button onClick={handleClose}>뒤로가기</button>
                <button onClick={FoodInsert}>입력하기</button>
              </BtnWrap>
            ) :
            (
              editEatItem ?
                (
                  <BtnWrap>
                    <button onClick={handleEditClose}>뒤로가기</button>
                    <button onClick={DietEdit}>수정하기</button>
                  </BtnWrap>
                ) :
                (
                  <BtnWrap>
                    <button onClick={handleEditClose}>뒤로가기</button>
                    <button onClick={DietInsert}>기록하기</button>
                  </BtnWrap>
                )
            )
          }
        </Contents>
      </ModalBlock>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 21000;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(5px);
`;

const ModalBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  background-color: #fff;
  width: 100%;
  height: 100%;
  z-index: 1000;
  @media (min-width: 520px) {
    width: 80%;
    height: 80%;
    border-radius: 30px;
  }
  @media (min-width: 769px) {
    width: 60%;
    height: 60%;
    border-radius: 30px;
  }
  animation: modal-show 1s;
  @keyframes modal-show {
      from {
          opacity: 0;
          margin-top: -50px;
      }
      to {
          opacity: 1;
          margin-top: 0;
      }
  }
`;

const Title = styled.h1`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 0 auto;
  padding: 20px 0;
  font-size: 22px;
  color: #FE7770;
`;

const Contents = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
`;

const InputTxt = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 85%;
  height: 40px;
  margin-bottom: 16px;
  input {
    width: 100%;
    height: 100%;
    background-color: transparent;
    border: 1px solid #808080;
    border-radius: 12px;
    padding: 12px;
    padding-right: 52px;
    box-sizing: border-box;
    outline: none;
  }
  button {
    position: absolute;
    top: 0;
    right: 0;
    width: 40px;
    height: 100%;
    font-size: 16px;
    font-weight: 900;
    cursor: pointer;
    border: none;
    outline: none;
    background-color: transparent;
    box-sizing: border-box;
  }
`;

const Search = styled.div`
    position: relative;
    width: 85%;
    height: 280px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      font-size: 13px;
      font-weight: 700;
      color: #333;
      margin: 0;
    }
`;

const Direct = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div.InputWrap {
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      margin-bottom: 8px;
    }
    div.InputWrap:last-child {
      margin: 0;
    }
    p {
      width: 90px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #FE7770;
      border-radius: 8px 0 0 8px;
      font-size: 14px;
      color: #fff;
      margin: 0;
    }
    input {
        width: 200px;
        height: 100%;
        background-color: transparent;
        border: 1px solid #808080;
        border-left: none;
        padding: 6px 10px;
        box-sizing: border-box;
        border-radius: 0 8px 8px 0;
        outline: none;
    }
`;

const FoodData = styled.div`
  width: 100%;
  height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  /* border: 1px solid #555; */
  border-radius: 8px;
  padding: 12px;
  box-sizing: border-box;
  overflow: auto;
  @media (min-width: 520px) {
    width: 80%;
  }
`;

const FoodInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 6px;
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
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid #eee;
  box-sizing: border-box;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
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
    font-size: 13px;
    color: #555;
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
    font-size: 10px;
    color: #555;
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
    font-size: 10px;
    color: #555;
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

const EatInput = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 3px 0;
  color: #bbb;
  animation: eatInput-show 1s;
  @keyframes eatInput-show {
      from {
          opacity: 0;
          margin-left: -40px;
      }
      to {
          opacity: 1;
          margin-left: 0;
      }
  }
  input {
    border: none;
    outline: none;
    border-bottom: 1px solid #BBB;
    padding: 2px;
    font-size: 12px;
  }
`

const BtnWrap = styled.div`
  width: 90%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 18px;
  button {
    width: 140px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 30px;
    font-weight: 900;
    cursor: pointer;
  }
  button:last-child {
    background-color: #FE7770;
    color: #fff;
  }
`

export default RecordModal;