import React from 'react';
import styled from 'styled-components';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

// import FoodModal from "../elements/FoodModal";

const RecordModal = ({ setRecordModalOpen }) => {
  const handleClose = () => {
      setRecordModalOpen(false);
  };

  const [foodInputModal, setFoodInputModal] = React.useState(false)

  const search_food_ref = React.useRef(null);
  const foodName_ref = React.useRef(null);
  const serving_ref = React.useRef(null);
  const kcal_ref = React.useRef(null);
  const carbs_ref = React.useRef(null);
  const pro_ref = React.useRef(null);
  const fat_ref = React.useRef(null);

  const NotFoundSearchBtn = () => {
    setFoodInputModal(true)
  }
  console.log(foodInputModal)

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
        console.log(res)
    } catch (error) {
        console.log(error)
    }
  }

  const FoodRecord = () => {
    // 식단 추가하기
  }

  return (
    <Container>
      <Background />
      <ModalBlock>
      <h1>추가하기</h1>
        <Contents>
          <InputTxt>
              <input ref={search_food_ref} type="text" placeholder='검색어를 입력하세요.' />
              <button onClick={FoodSearch}>검색하기</button>
          </InputTxt>
          <Search>
              <p>검색 결과가 없습니다. 직접 입력해주세요.</p>
              <button onClick={NotFoundSearchBtn}>직접 입력</button>
          </Search>
          {
            foodInputModal === true ? 
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
              <FoodData>
                <p>불러온 데이터</p>
              </FoodData>
            )
          }
          <div style={{ width: "50%" }}>
              <button onClick={handleClose}>뒤로가기</button>
              <button>기록하기</button>
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
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Background = styled.div`
    position: fixed;
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
    align-items: center;
    justify-content: center;
    position: absolute;
    border-radius: 30px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
    background-color: #fff;
    width: 35rem;
    height: 100%;
    h1 {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
      padding: 30px 0;
      font-size: 26px;
      color: #FE7770;
      width: 540px;
      border-bottom: 1px solid #E0E2E6;
      text-align: center;
    }
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

const Contents = styled.div`
  position: relative;
  width: 100%;
  height: 80%;
  position: absolute;
  bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  p {
      font-size: 17px;
      font-weight: 100;
      color: #bbb;
    }
  div {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      width: 60%;
  }
  button {
      position: relative;
      // margin: 0px;
      width: 100px;
      height: 30px;
      font-size: 12px;
      font-weight: 900;
      border-radius: 30px;
      cursor: pointer;
      border: 1px solid #555;
      background-color: white;
      }
`;

const InputTxt = styled.div`
    // background-color: red;
    input {
        width: 250px;
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #808080;
        padding: 12px 0 12px 6px;
        box-sizing: border-box;
        outline: none;
    }
    button {
        // position: relative;
        width: 100px;
        height: 30px;
        font-size: 12px;
        font-weight: 900;
        border-radius: 30px;
        cursor: pointer;
        border: 1px solid #555;
        background-color: white;
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
      margin-bottom: 40px;
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
    // background-color: hotpink;
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    p {
      font-size: 17px;
      font-weight: 100;
      color: #bbb;
      margin-bottom: 50px;
    }
`;

export default RecordModal;