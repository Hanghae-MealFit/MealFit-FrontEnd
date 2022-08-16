import React from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'

const Cards = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const image = React.useRef()
    // const content = React.useRef()
    // const likeCount = React.useRef()
    // const commentCount = React.useRef()

    // const { image, contents, likeCount, commentCount } = props.post;
    // console.log("나는 어디에", props.post)

    return (
        <>
        <Card>
                <CardInner>
                  <CardImg src="https://images.unsplash.com/photo-1571047399553-603e2138b646?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
                  <CardText>
                    <p>신선한 채소와 다양한 토핑들을 추가해서 먹는 포만감 만점, 다이어트 불가능한 샐러드 래시피!</p>
                  </CardText>
                  <TextLabel>
                    좋아요 2 ∙ 댓글 2
                  </TextLabel>

                  {/* <div>{image}</div>
                  <div>{content}</div>
                  <div>좋아요 {likeCount} ∙ 댓글 {commentCount}</div> */}

                    {/* <CardImg>
                        <img src={props.post.image} alt="" />
                    </CardImg>
                    <CardContents>
                        <CardText>{props.post.contents}</CardText>
                    </CardContents> */}
                </CardInner>
                {/* <TextLabel>
                    관심 {props.post.likeCount} ∙ 댓글 {props.post.commentCount}
                </TextLabel> */}
            </Card>
        </>
    );
};

const Card = styled.div`
    display: block;
    width: 245px;
    height: 340px;
    // margin-bottom: 20px;
    // maring: 0 10px;
    // background-color: red;
    // padding : 0px 20px 0px 20px;
    
    &:nth-child(5n) {
        margin-right: 10px;
    }
    `;

const CardInner = styled.a`
//   border: 1px solid rgb(238, 238, 238);
  background: rgb(255, 255, 255);
  display: block;
  // border-radius: 2em;
  padding-bottom: 10px;

`;

const CardImg = styled.img`
    width: 100%;
    height: auto;
    max-width: 245px;
    max-height: 220px;
    overflow: hidden;
    // background-color: yellow;

`;

const CardText = styled.div`
    margin: 5px 10px 10px;
    font-size: 14px;
    text {
        height: 40px;
        text-overflow: ellipsis;
        word-wrap: break-word;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow:hidden
    }
`;

const TextLabel = styled.div`
    font-size: 12px;
    margin-top: 10px;
`;

// const CardContents = styled.div`
//   padding: 15px 10px;
//   height: 50px;
// `;

export default Cards;