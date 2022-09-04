import React from "react";
import styled from "styled-components";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faEye } from '@fortawesome/free-solid-svg-icons'

const CardsAll = ({post}) => {
  const temp_img = "/logo/writebasicimage.png"
  const temp_pro_img = "/logo/profile.png"
  console.log(post)
  return (
    <Card>
      <CardInner>
        <CardImg post={post.images.length}>
          <img src={post.images.length === 0 ? temp_img : post.images} alt="Content Img" />
        </CardImg>
        <Content>
          <p>{post.content}</p>
        </Content>
        <TextBox>
          <UserInfo>
            <img src={post.profileImage === null ? temp_pro_img : post.profileImage} alt="Writer Profile Img" />
            <p>{post.nickname}</p>
          </UserInfo>
          <TextLabel>
            <div>
              <span><FontAwesomeIcon icon={faHeart} /></span>{post.like}
            </div>
            <div>
              <span><FontAwesomeIcon icon={faEye} /></span>{post.view}
            </div>
          </TextLabel>
        </TextBox>
      </CardInner>
    </Card>
  );
};

const Card = styled.div`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const CardInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

const CardImg = styled.div`
  width: 100%;
  height: 60%;
  overflow: hidden;
  background-color: ${(props) => props.post === 0 ? "#b0cee6" : "rgba(0, 0, 0, 1)"};
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 20px;
  box-sizing: border-box;
  p {
    margin: 0;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
`

const TextBox = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 14px;
  box-sizing: border-box;
  border-top: 1px solid #D9D9D9;
`;
    
const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  p {
    margin: 0;
    margin-left: 6px;
    font-size: 13px;
  }
`;

const TextLabel = styled.div`
  color: #808080;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 6px;
  }
  div > span {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 4px;
    font-size: 17px;
  }
`;

export default CardsAll;