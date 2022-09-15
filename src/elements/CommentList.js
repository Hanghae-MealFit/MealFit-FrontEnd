import React from "react";
import styled from "styled-components";
import axios from 'axios';

const CommentList = (comments) => {
    // console.log(comments)
    return (
        <CommentInfo>
            <img src={comments.userDto.profileImage} />
            <span style={{ fontWeight: "bold" }}>{comments.userDto.nickname}</span>
            <span>{comments.comment}</span>
        </CommentInfo>
    )
}

const CommentContainer = styled.div`
    // background-color: red;
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    color: #555;
`;

const CommentView = styled.div`
    // background-color: yellow;
    width: 90%;
    height: 30%;
    display: flex;
    // justify-content: center;
    align-items: center;
    margin-bottom: 10px;
`;

const CommentInfo = styled.div`
    // background-color: yellow;
    width: 90%;
    height: 100%;
    display: flex;
    // justify-content: center;
    align-items: center;
    img {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius: 25px;
        background-color: gray;
    }
    span {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
        font-size: 14px;
    }
`;

export default CommentList;

