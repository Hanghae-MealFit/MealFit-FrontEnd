import React from "react";
import styled from "styled-components";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Sidebar from "./Sidebar";
import Cards from "../elements/Cards";

const Post = () => {
  const navigate = useNavigate();

  let { postId } = useParams();
  console.log(postId);

  const data = useSelector((state) => state.card.post);
  console.log(data);

  // const PostViewAX = async () => {
  //     const data = {       
  //     postId: "postId",
  //     nickname: "nickname",
  //     profileImage: "profileImage",
  //     postImage: "postImage",
  //     content: "content",
  //     likeToggle: Boolean,
  //     likeNumber: "likeNumber",
  //     commentNumber: "commentNumber"
  //  }

  // const auth = {
  //     authorization: sessionStorage.getItem("token"),
  //     refresh_token: sessionStorage.getItem("refresh_token")
  // };

  // await axios({
  //     baseURL: "http://13.125.227.9:8080/",
  //     method: "get",
  //     url: "/post/{postId}",
  //     data: data,
  //     headers: {
  //       Authorization: `Bearer ${auth.authorization}`,
  //       refresh_token: `Bearer ${auth.refresh_token}`
  //     },
  //   }).then((response) => {
  //     console.log("반응", response)
  //   }).catch((error) => {
  //     console.log("에러", error)
  //   });
  // };

  return (
    <Wrap>
      <Sidebar />

      <Titlebar>
        <Titletag>
        <p>식단 게시판</p>
        </Titletag>
        <WriteButtom onClick={() => {
                navigate("/post");
              }}>작성하기</WriteButtom>
        </Titlebar>

      <Container>
        <CardList>
          {data.map((v, idx) => (
            <CardsBox
              onClick={() => {
                navigate(`/post/${v.postId}`);
              }}
              key={idx}
            >
              <Cards post={v} />
            </CardsBox>
          ))}
        </CardList>
      </Container>
    </Wrap>
  )
}

const Wrap = styled.div`
  width: 100%;
  height: 100%;
//   background-color: yellow;
`;

const Container = styled.div`
  // border: 5px solid blue;
  width: calc(100% - 260px);
  height: 100%;
  margin-left: 260px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
`;

const Titlebar = styled.div`
  width: calc(100% - 260px);
  height: 10%%;
  margin-top: 20px;
  margin-left: 260px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // background-color: red;
`;


const Titletag = styled.div`
  width: 130px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0px 0px 15px 0px;
  background-color: #ccc;
  p {
    font-size: 18px;
    font-weight: bold;
    height: 12%;
    display: flex;
    align-items: center;
    justify-content: center;
    }
`;

const WriteButtom = styled.div`
  position: relative;
  width: 100px;
  height: 40px;
  margin-right: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  color: #555;
  border: 1px solid #555;
  cursor: pointer;
`;

const CardList = styled.div`
  width: 100%;
  height: 88%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: row;
  flex-wrap : wrap;

// flex-basis: 33.3%;
// flex-wrap : wrap;
// border: 5px solid red;
// background-color: blue;
`;

const CardsBox = styled.div`
  // width: 320px;
  width: 22%;
  height: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2%;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;

  // border: 5px solid red;
  // background-color: blue;
`;

export default Post;