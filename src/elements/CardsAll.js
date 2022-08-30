import React from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'

const CardsAll = ({post}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(post)

  // const image = React.useRef()
  // const content = React.useRef()
  // const likeCount = React.useRef()
  // const commentCount = React.useRef()

  // const { nickname, profileImage, likeCount, commentCount } = post.post;
  // console.log("나는 어디에", post.post)

  return (
    <>
      <Card>
        <CardInner>
          <CardImg src="https://images.unsplash.com/photo-1571047399553-603e2138b646?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
          <TextBox>
          <img src={post?.image} />
          {/* <span>{post.nickname}</span> */}
            <CardText>
              <p>{post.content}</p>
            </CardText>
            <TextLabel>
              좋아요 {post.like} ∙ 댓글 2 ∙ 조회수 {post.view}
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
  // background: green;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CardImg = styled.img`
    width: 100%;
    height: 60%;
    max-height: 180px;
    overflow: hidden;
    object-fit: contain;
    background-color: rgba(255, 255, 255, 0.5);
`;

const TextBox = styled.div`
    background: #fff;
    width: 100%;
    height: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    `;

const CardText = styled.div`
    // background: pink;
    font-size: 14px;
    width: 90%;
    height: 60%;
    border-bottom: 1px solid #ddd;
    p {
        height: 100%;
        text-overflow: ellipsis;
        word-wrap: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden
    }
`;

const TextLabel = styled.div`
    // background: green;
    color: #808080;
    font-size: 12px;
    width: 100%;
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