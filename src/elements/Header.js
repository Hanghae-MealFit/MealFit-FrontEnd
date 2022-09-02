import React from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Header = ({isLogin}) => {

  console.log(isLogin)
  const navigate = useNavigate();

  const PostWrite = () => {
    if (isLogin === true) {
      navigate("/post")
    }
  }

  let code = new URL(window.location.href);
  const PageCheck = code.href
  const NumReg = /[0-9]/

  return (
    <Titlebar>
      {
        (PageCheck === "http://localhost:3000/post/all") ?
          (
            <Titletag>
              <h2>식단 게시판</h2>
              { isLogin ?
                (
                  <WriteBtn onClick={PostWrite}>작성하기</WriteBtn>
                ) :
                (
                  null
                )
              }
            </Titletag>
          )
          : (PageCheck === "http://localhost:3000/post") ?
          (
            <Titletag>
              <h2>게시글 작성</h2>
            </Titletag>
          )
          : (PageCheck === `http://localhost:3000/post/${NumReg}`) ?
          (
            <Titletag>
              <h2>게시글 상세보기</h2>
            </Titletag>
          )
          :
          (
            null
          )
      }
    </Titlebar>
  )
}

const Titlebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: calc(100% - 260px);
  height: 120px;
  margin-left: 260px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  z-index: 5000;
`;


const Titletag = styled.div`
  width: 1000px;
  height: 50px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-size: 26px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
    border-bottom: 2px double #333;
    padding-bottom: 6px;
  }
`;

const WriteBtn = styled.div`
  position: relative;
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: #FE7770;
  border: 2px solid #FE7770;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    border: none;
    background-color: #FE7770;
    color: #fff;
  }
`;

export default Header