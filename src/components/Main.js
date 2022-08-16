import React from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Cards from "../elements/Cards";

const Main = () => {
    const data = useSelector((state) => state.card.post);
  console.log("나야나", data);

  const dispatch = useDispatch();
  const navigate = useNavigate();

    return (
        <Grid>
            <Item1></Item1>
            <Item2>
            <CircleWrap>
            <InsideCircle>
            <TopText>
                     <p>2022년 8월 13일</p>
                     <p>지금은 단식시간 입니다.</p>
                     </TopText>
                     <BottomText>
                     <p>단식 시간 : 18시 ~ 10시</p>
                     <p>음식 섭취 가능 시간 : 10시 ~ 18시</p>
                     </BottomText>
            </InsideCircle>
            </CircleWrap>
            </Item2>
            <Item3>몸무게 변화량</Item3>
            <Item4>체지방 변화량</Item4>
            <Item5>
                <H2>오늘의 식단</H2>
                <CardList>
                    {data.map((v, idx) => (
                        <CardsBox
                            onClick={() => {
                                navigate(`/detail/${v.postId}`);
                            }}
                            key={idx}
                        >
                            <Cards post={v} />
                        </CardsBox>
                    ))}
                </CardList>
            </Item5>
        </Grid>
    );
}

const Grid = styled.div`
    display: grid;
    grid-template-columns: 780px 780px;
    grid-template-rows: 0px 250px 225px 380px; 
    grid-gap: 15px;
    position: absolute;
    margin-left: 250px;
    color: black;
    font-size: 2em;
    padding: 5px;
    text-align: center;
    font-weight: bold;
    // background-color: lightblue;
    
`;

const Item1 = styled.div`
    // border: 5px solid red;
    padding: 5px;

    grid-column : 1/4;
    /*  grid-column-start : 1;
    grid-column-end : 3; */
`;

const Item2 = styled.div`
    // border: 5px solid red;
    padding: 5px;
    grid-row : 2/4; 
 /*   grid-row-start : 2;
   grid-row-end : 4; */
 `;

const Item3 = styled.div`
    // border: 5px solid red;
    background-color: lightgray;
    width: 650px;
    padding: 5px;
    grid-column : 2/4;
 /*   grid-column-start : 2;
   grid-column-end : 4; */
 `;

const Item4 = styled.div`
    // border: 5px solid red;
    background-color: lightgray;
    width: 650px;
    padding: 5px;
    grid-column : 2/4;
 /*   grid-column-start : 2;
   grid-column-end : 4; */
 `;

const Item5 = styled.div`
    // border: 5px solid red;
    padding: 5px;
    margin-top: 10px;
    grid-column : 1/4;
    /*  grid-column-start : 1;
    grid-column-end : 3; */
`;

const Wrap = styled.div`
  mwidth: 100vw;
  position: relative;
  height: 100%;
  margin: 0 auto;
  // background-color: yellow;
`;

const H2 = styled.div`
  font-size: 1.5rem;
  margin-top: 18px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CircleWrap = styled.div`
    margin: 10px auto;
    width: 480px;
    height: 480px;
    // left: 330px;
    // top: 64px;
    background: #fefcff;
    // position: absolute;
    border-radius: 50%;
    // border: 1px solid #cdcbd0;
`

const InsideCircle = styled.div`
    margin: 30px auto;
    width: 430px;
    height: 430px;
    left: 155px;
    top: 35px;
    border-radius: 50%;
    background: #FFB0AC;
    line-height: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
    margin-top: 25px;
    margin-left: 25px;
    position: absolute;
    z-index: 100;
    font-weight: 700;
    font-size: 18px;
`


const TopText = styled.div`
    color: #ffffff;
    font-size: 22px;
    text-shadow: -1px 0 #FE7770, 0 1px #FE7770, 1px 0 #FE7770, 0 -1px #FE7770;
`;

const BottomText = styled.div`

`;

const CardList = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: center;
// align-items: center;
// flex-direction: row;
// flex-basis: 33.3%;
// flex-wrap : wrap;
// border: 5px solid red;
// background-color: blue;
`;

const CardsBox = styled.div`
  width: 195px;
  height: 100%;
//   margin-bottom : 5%;
  margin-left: 5%;
  margin-right: 5%;

  // border: 5px solid red;
  // background-color: blue;
`;

export default Main;