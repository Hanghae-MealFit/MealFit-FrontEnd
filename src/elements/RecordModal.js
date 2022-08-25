import React from 'react';
import styled from 'styled-components';
import axios from "axios";

// import FoodModal from "../elements/FoodModal";

const RecordModal = ({ setRecordModalOpen }) => {
    const handleClose = () => {
        setRecordModalOpen(false);
    };

    const [data, setData] = React.useState({ hits: [] })
    // api 검색 키워드 (쿼리 스트링)
    const [query, setQuery] = React.useState('react')

    // 랜더링이 업데이트가 되었을 때 effct 구문 실행
    // 리액트에서 랜더링
    React.useEffect(() => {
        // useEffect는 비동기적으로 실행된다.
        // query에 대한 검색 결과가 완료 되었는지를 검사할 변수 필요
        let completed = false;

        async function get() {
            const result = await axios(`https://hn.algolia.com/api/v1/search?query=${query}`)
            if (!completed) {
                setData(result.data);
            }
        }

        get()
        return () => {
            // 다른 비동기 작업이 또 실행되지 않도록
            completed = true
        }
        // 두 번째 파라미터 []는 리액트 랜더링 조건
        // 배열이 비어있다 -> 검사할 요소가 없다는 것
        // 즉 이펙트를 실행할지 안 할지를 검사하는 변수
        // 현재 상황에선 query가 바뀌는 시점이 된다.
    }, [query])

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

    return (
        <Container>
            <Background />
            <ModalBlock>
                <Contents>
                    <h1>추가하기</h1>
                    <InputTxt>
                        {/* <input type="text" placeholder='검색어를 입력하세요.' /> */}
                        <>
                            <input value={query} placeholder='검색어를 입력하세요.'
                                onChange={e => setQuery(e.target.value)} />
                            <ul>
                                {data.hits.map(item => (
                                    <li key={item.objectId}>
                                        <a href={item.url}>{item.title}</a>
                                    </li>
                                ))}
                            </ul>
                        </>
                    </InputTxt>
                    <div style={{ width: "50%" }}>
                        <button onClick={handleClose}>뒤로가기</button>
                        <button onClick={FoodSearch}>검색하기</button>
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
    height: 70%;
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
        width: 100%;
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
    position: relative;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    input {
        width: 400px;
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #808080;
        margin-top: 40px;
        padding: 12px 0 12px 6px;
        box-sizing: border-box;
        outline: none;
    }
    p {
        margin: 0;
        position: absolute;
        left: 6px;
        bottom: -6px;
        font-size: 10px;
        color: #808080;
    }
`;

export default RecordModal;