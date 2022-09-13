import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { MemoizedSidebar } from "./Sidebar";
import CardsAll from "../elements/CardsAll";
import Header from "../elements/Header";

const Post = () => {
  const navigate = useNavigate();

  const [ isLogin, setIsLogin ] = React.useState(false);

  const Token = {
    authorization: sessionStorage.getItem("accessToken"),
    refresh_token: sessionStorage.getItem("refreshToken")
  }

  const obsRef = React.useRef(null) // observer Element
  const [list, setList] = React.useState([]); // Post List
  const [page, setPage] = React.useState(0); // 현재 페이지
  const preventRef = React.useRef(true); // 옵저버 중복 실행 방지
  const endRef = React.useRef(false); // 모든 글 로드 확인

  useEffect(() => {
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    }
  }, []);

  useEffect(() => {
    getPostList();
  }, [page])

  const obsHandler = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && preventRef.current) {
      preventRef.current = false;
      setPage((prev) => prev + 1);
    }
  }
  console.log("page", page)

  const getPostList = useCallback(async() => {
    try {
      const res = await axios.get(`http://43.200.174.111:8080/api/post?size=3&page=${page}`)
      console.log(res.data)
      if(res.data) {
        setList(prev => {
          console.log("prev", prev)
          return [...prev, ...res.data]
        })
        preventRef.current = true;
      }
    } catch(error) {
      console.log(error)
    }
  }, [page])
  console.log("list", list)

  useEffect(() => {
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
          {list?.map((v, idx) => (
            <CardsBox className="CardsBox" onClick={() => {navigate(`/post/${v.postId}`)}} key={idx}>
              <CardsAll post={v} />
            </CardsBox>
          ))}
        </CardList>
      </Container>
      <div ref={obsRef} style={{ height: "0"}}></div>
    </Wrap>
  )
}

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 90%;
  height: 100%;
  margin-top: 180px;
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  @media (min-width: 1024px) {
    width: calc(100% - 260px);
    margin: 180px 0 60px 260px;
  }
`;

const CardList = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 54px;
  flex-wrap: wrap;
  margin: 0 auto;
  @media (min-width: 400px) and (max-width: 599px) {
    width: 70%;
  }
  @media (min-width: 1024px) {
    max-width: 740px;
  }
  @media (min-width: 1440px) {
    max-width: 1080px;
  }
`;

const CardsBox = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
  box-sizing: border-box;
  @media (min-width: 600px) and (max-width: 768px) {
    width: 45%;
  }
  @media (min-width: 769px) {
    width: 45%;
  }
  @media (min-width: 1024px) {
    width: 46%;
  }
  @media (min-width: 1440px) {
    width: 30%;
  }
`;

export default Post;