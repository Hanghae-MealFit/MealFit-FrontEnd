import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useInView } from "react-intersection-observer"

import { MemoizedSidebar } from "./Sidebar";
import CardsAll from "../elements/CardsAll";

import { loadPostDB } from "../redux/modules/post";

const Post = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // let { postId } = useParams();
  // console.log(postId);

  const data = useSelector((state) => state.post.post.content);
  // console.log(data);
  const [ isLogin, setIsLogin ] = React.useState(false);

  const Token = {
    authorization: sessionStorage.getItem("accessToken"),
    refresh_token: sessionStorage.getItem("refreshToken")
  }

  const PostWrite = () => {
    // console.log(Token)
    if (Token.authorization !== null && Token.refresh_token !== null) {
      navigate("/post")
    }
  }

  const [items, setItems] = React.useState([])
  const [page, setPage] = React.useState(1)
  const [loading, setLoading] = React.useState(false)

  const [ref, inView] = useInView()

  // 서버에서 아이템을 가지고 오는 함수
  const getItems = useCallback(async () => {
    setLoading(true)
    await axios.get('http://43.200.174.111:8080/post?size=6').then((res) => {
      setItems(prevState => [...prevState, res])
    })
    setLoading(false)
  }, [page])

  // `getItems` 가 바뀔 때 마다 함수 실행
  useEffect(() => {
    getItems()
  }, [getItems])

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      setPage(prevState => prevState + 1)
    }
  }, [inView, loading])

  useEffect(() => {
    dispatch(loadPostDB())
  }, [])
  
  return (
    <Wrap>
      <MemoizedSidebar />

      <Titlebar>
        <Titletag>
          <p>식단 게시판</p>
        </Titletag>
        {
            !isLogin  === true ? (
              <WriteBtn onClick={PostWrite}>작성하기</WriteBtn>
            ) : (
              null
            )
          }
          {/* <WriteBtn onClick={() => {
            navigate("/post")
          }}>작성하기</WriteBtn> */}
      </Titlebar>

      <Container>
      {/* <CardList>
      {data.map((v, idx) => (
        <CardsBox
        onClick={() => {
          navigate(`/post/${v.postId}`);
        }}
        key={idx}>
          {data.length - 1 == idx ? (
            <CardsAll ref={ref}>
              {v.content}
            </CardsAll>
          ) : (
            <CardsAll>
              {v.content}
            </CardsAll>
          )}
        </CardsBox>
      ))}
      </CardList> */}

        <CardList>
          {data.map((v, idx) => (
            <CardsBox
              onClick={() => {
                navigate(`/post/${v.postId}`);
              }}
              key={idx}>
              <CardsAll post={v} />
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

const WriteBtn = styled.div`
  position: relative;
  width: 100px;
  height: 40px;
  margin-right: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
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
  width: 15%;
  height: 33%;
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