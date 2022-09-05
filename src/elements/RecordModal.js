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
    selectEatItem
  }) => {

  const handleClose = () => {
      setRecordModalOpen(false);
  };

  const [notFoundSearch, setNotFoundSarch] = React.useState(false)
  const [foodInputModal, setFoodInputModal] = React.useState(false)
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

  const FoodInsert = async () => {
    try {
      const res = await axios.post("http://43.200.174.111:8080/food",
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
    } catch (error) {
      console.log(error)
    }
  }

  // 검색
  const FoodSearch = async () => {
    const SearchName = search_food_ref.current.value
    try {
      const res = await axios.get(`http://43.200.174.111:8080/food?name=${SearchName}`,
        {
          headers: {
            Authorization: `Bearer ${auth.authorization}`,
            refresh_token: `Bearer ${auth.refresh_token}`
          },
        })
        console.log(res.data)
        if(res.data.length === 0) {
          setNotFoundSarch(true)
        } else {
          setSearchList(res.data)
          setNotFoundSarch(false)
        }
    } catch (error) {
        console.log(error)
    }
  }

  // 식단 추가하기
  const DietInsert = async () => {
    try {
      const res = await axios.post(`http://43.200.174.111:8080/diet`,{
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
        // console.log(selectMenu.foodId, eating_ref.current.value, selectTime, SelectDay)
    } catch (error) {
        console.log(error)
        // console.log(selectMenu.foodId, eating_ref.current.value, selectTime, SelectDay)
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
      const res = await axios.put(`http://43.200.174.111:8080/diet`,{
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
        console.log(
          "dd", selectEatItem,
          "dietId", selectEatItem.dietId,
          "foodId", selectMenu.foodId,
          "foodWeight", eating_weight_ref.current.value)
        console.log(selectMenu.foodId, eating_weight_ref.current.value, selectEatItem.dietId, selectMenu.foodId)
    } catch (error) {
      console.log(error)
      console.log(
        "dd", selectEatItem,
        "dietId", selectEatItem.dietId,
        "foodId", selectEatItem.foodId,
        "changeTo", selectMenu.foodId,
        "foodWeight", eating_weight_ref.current.value)
    }
  }
  console.log(selectEatItem, selectMenu)

  console.log("edit", editEatItem)

  return (
    <Container>
      <Background />
      <ModalBlock>
        {
          editEatItem ? (
            <Title>수정하기</Title>
          ) :
          (
            <Title>추가하기</Title>
          )
        }
        <Contents>
          <InputTxt>
            <input ref={search_food_ref} type="text" placeholder='검색어를 입력하세요.' />
            <button onClick={FoodSearch}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </InputTxt>
          {
            notFoundSearch ? (
              <Search>
                <p>검색 결과가 없습니다. 직접 입력해주세요.</p>
                <button onClick={() => setFoodInputModal(true)}>직접 입력</button>
              </Search>
            ) :
            (
              null
            )
          }
          {
            foodInputModal ?
            (
              <Direct>
                <input ref={foodName_ref} type="text" placeholder='음식이름' />
                <input ref={serving_ref} type="text" placeholder='1회 제공량' />
                <input ref={kcal_ref} type="text" placeholder='칼로리' />
                <input ref={carbs_ref} type="text" placeholder='탄수화물' />
                <input ref={pro_ref} type="text" placeholder='단백질' />
                <input ref={fat_ref} type="text" placeholder='지방' />
                <div style={{ width: "80%" }}>
                <button onClick={() => {setFoodInputModal(false)}}>취소하기</button>
                <button onClick={FoodInsert}>입력하기</button>
                </div>
              </Direct>
            ) : 
            (
              // style={{
              //   cursor: "pointer",
              //   backgroundColor: selectMenuCheck && v.foodId === selectMenu.foodId ? "black" : "transparent"
              // }}
              !notFoundSearch ? (
                  <FoodData>
                    {searchList?.map((v, idx) => (
                      <FoodInfo key={idx}>
                        <RadioInput type="radio" id={v.foodId} name="SelectFood" value={v} />
                        <label htmlFor={v.foodId} onClick={(e) => {SelectFood(e, v)}}>
                          <RadioBtn className="RadioBtn" />
                          <FoodInofWrap>
                            <FoodTitle>
                              <p className="FoodTitle">{v.foodName}</p>
                            </FoodTitle>
                            <FoodCom className="FoodCom">
                              <p>제조사 : {v.madeBy}</p>
                            </FoodCom>
                            <FoodDesc className="FoodDesc">
                              <p>1회 제공량: {v.oneServing}(g)</p>
                              <p>kcal: {v.kcal}</p>
                              <p>탄: {v.carbs}</p>
                              <p>단: {v.protein}</p>
                              <p>지: {v.fat}</p>
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
                          </FoodInofWrap>
                        </label>
                      </FoodInfo>
                    ))}
                  </FoodData>
              ) : (
                null
              )
            )
          }
          <div style={{ width: "50%" }}>
              <button onClick={handleClose}>뒤로가기</button>
              {
                editEatItem ? (
                  <button onClick={DietEdit}>수정하기</button>
                ) :
                (
                  <button onClick={DietInsert}>기록하기</button>
                )
              }
              {/* <button onClick={() => { setFoodModalOpen(true) }}
              >검색하기</button> */}
              {/* {
        foodModalOpen === true ? (
            <FoodModal setFoodModalOpen={setFoodModalOpen} />
        ) : (
            null
        )
    } */}
          </div>
        </Contents>
      </ModalBlock>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
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
  border-radius: 30px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  background-color: #fff;
  width: 80%;
  height: 80%;
  z-index: 120;
  @media (max-width: 1120px) {
      width: 50rem;
  }
  @media (max-width: 50rem) {
      width: 80%;
  }
  min-height: 10rem;
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
  justify-content: flex-start;
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
    // background-color: pink;
    position: relative;
    width: 100%;
    height: 25%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      font-size: 17px;
      font-weight: 100;
      color: #bbb;
    }
`;

const Direct = styled.div`
    // background-color: hotpink;
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #555;
    border-radius: 8px;
    input {
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #808080;
        padding: 6px 0 6px 3px;
        box-sizing: border-box;
        outline: none;
    }
`;

const FoodData = styled.div`
  width: 90%;
  height: 280px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  /* border: 1px solid #555; */
  border-radius: 8px;
  padding: 12px;
  box-sizing: border-box;
  overflow: auto;
`;

const FoodInfo = styled.div`
  width: 100%;
  height: 100%;
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

const FoodInofWrap = styled.div`
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

const EatInput = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 3px 0;
  color: #bbb;
  animation: modal-show 1s;
  @keyframes modal-show {
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

export default RecordModal;