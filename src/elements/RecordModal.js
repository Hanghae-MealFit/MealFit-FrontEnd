import React from 'react';
import styled from 'styled-components';
import axios from "axios";

// import FoodModal from "../elements/FoodModal";

const RecordModal = ({ setRecordModalOpen }) => {
    const handleClose = () => {
        setRecordModalOpen(false);
    };


    // const [foodModalOpen, setFoodModalOpen] = React.useState(false);

    // const foodName_ref = React.useRef(null);

    // const FoodName = {
    //     foodname: foodName_ref.current.value,
    //   }

    const auth = {
        authorization: sessionStorage.getItem("token"),
        refresh_token: sessionStorage.getItem("refresh_token")
    }

    // 검색
    const FoodSearch = () => {
        // axios.get("http://13.125.227.9:8080/food?name=음식명", 
        // {
        //     name: FoodName
        // }, {
        //         headers: {
        //             Authorization: `Bearer ${auth.Authorization}`,
        //             refresh_token: `Bearer ${auth.refresh_token}`,
        //         }
        //     })
        //     .then(function (response) {
        //         console.log("반응", response)
        //         setModalOpen(false)
        //     })
        //     .catch(function (error) {
        //         console.log("에러", error)
        //     });
        // console.log("음식 검색", FoodSearch)
    }

    const FoodRecord = () => {
        // 식단 추가하기
    }

    return (
        <Container>
            <Background />
            <ModalBlock>
                <Contents>
                    <h1>추가하기</h1>
                    <InputTxt>
                        <input type="text" placeholder='검색어를 입력하세요.' />
                        <button onClick={FoodSearch}>검색하기</button>
                    </InputTxt>
                    <div>
                        불러온 데이터
                    </div>
                    <div style={{ width: "50%" }}>
                        <button onClick={handleClose}>뒤로가기</button>
                        <button onClick={FoodRecord}>기록하기</button>
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
    height: 80%;
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
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    border-radius: 15px;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
    background-color: #fff;
    width: 35rem;
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
height: 100%;
margin: 0 auto;
border-radius: 30px;
background-color: white;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
    h1 {
        width: 90%;
        font-size: 26px;
        margin: 0 auto;
        padding: 30px 0;
        color: #FE7770;
        border-bottom: 1px solid #E0E2E6;
        text-align: center;
         }
    div {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: 60%;
        height: 100%;
    }
    button {
        position: relative;
        margin: 0px;
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
    position: relative;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    input {
        width: 250px;
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #808080;
        padding: 12px 0 12px 6px;
        box-sizing: border-box;
        outline: none;
    }
    p {
        // margin: 0;
        position: absolute;
        font-size: 10px;
        color: #808080;
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

export default RecordModal;