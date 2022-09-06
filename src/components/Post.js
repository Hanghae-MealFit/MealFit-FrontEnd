import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useInView } from "react-intersection-observer"

import { MemoizedSidebar } from "./Sidebar";
import CardsAll from "../elements/CardsAll";
import Header from "../elements/Header";

import { loadPostDB } from "../redux/modules/post";

const Post = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // let { postId } = useParams();
  // console.log(postId);

  const data = useSelector((state) => state.post.post);
  // console.log(data);
  const [ isLogin, setIsLogin ] = React.useState(false);

  const Token = {
    authorization: sessionStorage.getItem("accessToken"),
    refresh_token: sessionStorage.getItem("refreshToken")
  }

  const [items, setItems] = React.useState([])
  const [page, setPage] = React.useState(1)
  const [loading, setLoading] = React.useState(false)

  const [ref, inView] = useInView()

  // 서버에서 아이템을 가지고 오는 함수
  const getItems = useCallback(async () => {
    setLoading(true)
    await axios.get('http://43.200.174.111:8080/api/post?size=6').then((res) => {
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
    if(Token.authorization !== null && Token.refresh_token !== null) {
      setIsLogin(true)
    }
  }, [])
  
  return (
    <Wrap>
      <MemoizedSidebar />
      <Header isLogin={isLogin} />
      <Container>
        <CardList>
          {data?.map((v, idx) => (
            <CardsBox onClick={() => {navigate(`/post/${v.postId}`)}} key={idx}>
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
`;

const Container = styled.div`
  width: calc(100% - 260px);
  height: 100%;
  margin: 180px 0 60px 260px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
`;

const CardList = styled.div`
  width: 1080px;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 60px;
  flex-wrap : wrap;
`;

const CardsBox = styled.div`
  width: 320px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
`;

export default Post;