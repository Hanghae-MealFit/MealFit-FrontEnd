import React from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'

const CardsAll = ({post}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(post)

  const [dataTest, setdataTest] = React.useState({
    postId: "1",
    nickname: "봄봄",
    profileImage: "https://images.unsplash.com/photo-1660632531779-b363f16acdbd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    postImage: "https://images.unsplash.com/photo-1571047399553-603e2138b646?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    content: "신선한 채소와 다양한 토핑들을 추가해서 먹는 포만감 만점, 다이어트 불가능한 샐러드 래시피!",
    likeToggle: Boolean,
    likeNumber: 2,
    commentNumber: 2
});

  return (
    <>
      <Card>
        <CardInner>
          <CardImg src="https://images.unsplash.com/photo-1571047399553-603e2138b646?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
          <TextBox>
          <ImgWrap src={dataTest.profileImage} />
          <span>{dataTest.nickname}</span>
            <TextLabel>
              {/* 좋아요 {post.like} ∙ 댓글 2 ∙ 조회수 {post.view} */}
            </TextLabel>
          </TextBox>
        </CardInner>
      </Card>
    </>
  );
};

const Card = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  &:nth-child(5n) {
      margin-right: 10px;
}
`;

const CardInner = styled.a`
  // border: 3px solid green;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CardImg = styled.img`
  width: 100%;
  height: 100%;
  max-height: 220px;
  overflow: hidden;
  object-fit: contain;
  background-scolor: rgba(255, 255, 255, 0.5);
  // background: yellow;
`;

const TextBox = styled.div`
  // background: pink;
  background: #fff;
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  span {
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 5px;
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: 25px;
    background-color: gray;
}
    `;
    
const ImgWrap = styled.img`
  // background: pink;
  position: relative;
  width: 100%;
  height: 60%;
  border-radius: 30px 30px 0px 0px;
  overflow: hidden;
  object-fit: cover;
`;

const TextLabel = styled.div`
  // background: green;
  color: #808080;
  font-size: 12px;
  width: 68%;
  height: 40%;
  display: flex;
  justify-content: center; // flex-end
  align-items: center;
  // flex-direction: column;
`;

// const CardContents = styled.div`
//   padding: 15px 10px;
//   height: 50px;
// `;

export default CardsAll;