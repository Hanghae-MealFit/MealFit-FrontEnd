import React, { useState } from 'react'
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import DelPostModal from './DelPostModal';

const Header = ({isLogin, postId, user, conuser}) => {

  const navigate = useNavigate();

  // 삭제 모달창
  const [modalOpen, setModalOpen] = useState(false);

  const PostWrite = () => {
    if (isLogin === true) {
      navigate("/post")
    }
  }
  const EditPost = () => {
    navigate(`/post/${postId}/edit`)
  }
  const DeletePost = () => {
    setModalOpen(true)
  }

  let code = new URL(window.location.href);
  const PageCheck = code.href

  return (
    <Titlebar>
      {
        (PageCheck === "http://mealfit.co.kr/post/all") ?
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
          : (PageCheck === "http://mealfit.co.kr/post") ?
          (
            <Titletag>
              <h2>게시글 작성</h2>
            </Titletag>
          )
          : (PageCheck === `http://mealfit.co.kr/post/${postId}`) ?
          (
            <Titletag>
              <h2>게시글 상세보기</h2>
              { user === conuser ?
                (
                  <BtnWrap>
                    <WriteBtn onClick={EditPost}>수정하기</WriteBtn>
                    <WriteBtn onClick={DeletePost}>삭제하기</WriteBtn>
                    { modalOpen ? (
                      <DelPostModal setModalOpen={setModalOpen} postId={postId} />
                    ) : (
                      null
                    )

                    }
                  </BtnWrap>
                ) :
                (
                  null
                )
              }
            </Titletag>
          )
          : (PageCheck === `http://mealfit.co.kr/post/${postId}/edit`) ?
          (
            <Titletag>
              <h2>게시글 수정하기</h2>
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
  top: 60px;
  left: 0;
  right: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  padding: 0 30px;
  box-sizing: border-box;
  z-index: 5000;
  @media (min-width: 1024px) {
    top: 0;
    height: 100px;
    width: calc(100% - 260px);
    margin-left: 260px;
  }
`;


const Titletag = styled.div`
  width: 100%;
  height: 50px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 0 10px;
  h2 {
    font-size: 14px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
    border-bottom: 2px double #333;
    padding-bottom: 6px;
  }
  @media (min-width: 1024px) {
    h2 {
      font-size: 26px;
    }
  }
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

const WriteBtn = styled.div`
  position: relative;
  width: 60px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  color: #FE7770;
  border: 2px solid #FE7770;
  box-sizing: border-box;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 10px;
  &:hover {
    border: none;
    background-color: #FE7770;
    color: #fff;
  }
  @media (min-width: 1024px) {
    width: 100px;
    height: 40px;
    font-size: 14px;
  }
`;

export default Header