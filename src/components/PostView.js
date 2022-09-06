import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faEye, faPen, faXmark } from '@fortawesome/free-solid-svg-icons'

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { MemoizedSidebar } from "./Sidebar";
import Header from "../elements/Header";

const PostView = (props) => {
  const { postId } = useParams();

  const user = useSelector((state) => state.userinfo.user.userProfile)

  const [contentData, setContentData] = React.useState({
    content: "",
    createdAt: null,
    image: [],
    like: 0,
    liked: null,
    postId: 18,
    updatedAt: null,
    userDto: {
      nickname: "",
      profile: null
    },
    view: 1
  })

  const [commentData, setCommentData] = React.useState(
    [{
      comment: "",
      commentId: "",
      like: "",
      postId: "",
      userDto: "",
      nickname: "",
      profileImage: null
    }]
  )

  const [isLogin, setIsLogin] = React.useState(false);
  const [commentUserCheck, setCommentUserCheck] = React.useState('')
  const [commentEditCheck, setCommentEditCheck] = React.useState('')
  const [commentEditOpen, setCommentEditOpen] = React.useState(false)

  // 좋아요 버튼
  const [liked, setLiked] = React.useState(false);

  // 댓글 좋아요
  const [commentLiked, setCommentLiked] = React.useState(false);

  const comment_ref = React.useRef(null);

  // 사용자 입력 저장 
  const [checkItemContent, setCheckItemContent] = React.useState('');
  // 줄바꿈 위치를 저장하는 Dictionary
  const [lineBreakIndexDict, setLineBreakIndexDict] = React.useState({});
  // 줄 수 (높이)
  const [lineHeight, setLineHeight] = React.useState(0);

  // 사용자 입력 업데이트 및 줄바꿈 감지
  const checkItemChangeHandler = (event) => {
    setCheckItemContent(event.target.value);
    // Scroll이 생기면 line break
    if (event.target.scrollHeight !== event.target.clientHeight) {
      setLineHeight(prev => prev+1);	// textarea 높이 늘리고
      setLineBreakIndexDict({...lineBreakIndexDict, [event.target.value.length-1]: 1});	// 줄바꿈 위치 저장
    }
    else {
    // 다시 줄바꿈 지점으로 오면 line break 취소
      if (lineBreakIndexDict[event.target.value.length]) {
        setLineHeight(prev => prev-1);	// textarea 높이 줄이고
        setLineBreakIndexDict({...lineBreakIndexDict, [event.target.value.length]: 0});	// Dictionary에서 삭제
      }
    }
  }
  // 너비 초과로 인한 줄바꿈 말고 사용자가 엔터를 입력했을 때의 줄바꿈 처리
  const checkItemEnterHandler = (event) => {
    if (event.key === 'Enter') {
      // textarea 높이는 checkItemChangeHandler에서 변경됨
      setLineBreakIndexDict({...lineBreakIndexDict, [event.target.value.length]: 1}); // 줄바꿈 위치 저장
    }
  }

  const Token = {
    authorization: sessionStorage.getItem("accessToken"),
    refresh_token: sessionStorage.getItem("refreshToken")
  }

  // 작성자 확인 - ?
  const isLoginCheck = () => {
    if (Token.authorization !== null && Token.refresh_token !== null) {
      setIsLogin(true)
    }
    // if (userDto.nickname === response.data.userDto.nickname)
  }

  // 식단 게시글 상세조회
  const PostViewAX = async () => {
    try {
      const response = await axios.get(`http://43.200.174.111:8080/api/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${Token.authorization}`,
          refresh_token: `Bearer ${Token.refresh_token}`
        }
      })
      // console.log("게시글 불러오기", response)
      setContentData(response.data)
    } catch (error) {
      console.log(error)
    }
  };

  // 댓글 작성 후, 리렌더링 진행될 수 있도록 설정
  const [commentCheck, setCommentCheck] = React.useState(false);

  // 댓글 불러오기
  const CommentLoad = async () => {
    try {
      const response = await axios.get(`http://43.200.174.111:8080/api/post/${postId}/comment`, {
        headers: {
          Authorization: `Bearer ${Token.authorization}`,
          refresh_token: `Bearer ${Token.refresh_token}`
        }
      })
      // console.log("댓글 불러오기", response.data)
      setCommentData(response.data.comments)
    } catch (error) {
      console.log("댓글 불러오기 실패", error)
    }
  }

  // 댓글 작성하기
  const CommentWrite = async () => {
    try {
      const response = await axios.post(`http://43.200.174.111:8080/api/post/${postId}/comment`, {
        content: comment_ref.current.value
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token.authorization}`,
          refresh_token: `Bearer ${Token.refresh_token}`
        }
      })
      // console.log("댓글 작성하기", response)
      setCommentCheck(!commentCheck)
      setCheckItemContent('')
    } catch (error) {
      console.log("댓글 작성 실패", error)
    }
  }

  // 댓글 수정하기
  const CommentEditModal = (value) => {
    setCommentEditCheck(value)
    setCommentEditOpen(true)
  }

  const edit_ref = React.useRef(null)

  const CommentEdit = async () => {
    const commentId = commentEditCheck.commentId
    try {
      const res = await axios.put(`http://43.200.174.111:8080/api/post/comment/${commentId}`, {
        content: edit_ref.current.value
      }
      , {
        headers: {
          Authorization: `Bearer ${Token.authorization}`,
          refresh_token: `Bearer ${Token.refresh_token}`
        }
      })
      // console.log(res)
      if(res.status === 200 && res.data === "수정 완료!") {
        setCommentEditOpen(false)
        setCommentCheck(!commentCheck)
      }
    } catch(err) {
      console.log(err)
    }
  }

  // 댓글 삭제하기
  const CommentDelete = async (commentId) => {
    try {
      const response = await axios.delete(`http://43.200.174.111:8080/api/post/comment/${commentId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Token.authorization}`,
          refresh_token: `Bearer ${Token.refresh_token}`
        }
      })
      // console.log("댓글 삭제하기", response)
      if(response.status === 200 && response.data === "삭제완료") {
        alert('댓글을 삭제하였습니다.');
        setCommentCheck(!commentCheck)
      }
    } catch (error) {
      console.log("댓글 삭제실패", error)
    }
  }

  useEffect(() => {
    isLoginCheck()
    PostViewAX()
    CommentLoad()
  }, [])

  useEffect(() => {
    CommentLoad()
  }, [commentCheck])

  useEffect(() => {
    if(commentEditOpen) {
      edit_ref.current.focus()
    }
  }, [commentEditOpen])

  const temp_img = "/logo/writebasicimage.png"
  const temp_pro_img = "/logo/profile.png"

  return (
    <Wrap>
      <MemoizedSidebar />
      <Header isLogin={isLogin} postId={postId} user={user.nickname} conuser={contentData.nickname}  />
      <Container>
        <CardImg conImg={contentData.images}>
          <img src={contentData.images?.length === 0 ? temp_img : contentData.images} alt="Content Img" />
        </CardImg>
        <BoardInfo>
          <UserInfo>
            <img src={contentData.profileImage === null ? temp_pro_img : contentData.profileImage} alt="Writer User Img" />
            <BoardText>
              <p>{contentData.nickname}</p>
              <WriteTime>
                <p>{contentData.createdAt?.split("T")[0]}</p>
                <p>{contentData.createdAt?.split("T")[1].split(":").slice(0, 2).join(":")}</p>
              </WriteTime>
            </BoardText>
          </UserInfo>
          <IconWrap>
            <div>
              <span><FontAwesomeIcon icon={faHeart} /></span>{contentData.like}
            </div>
            <div>
              <span><FontAwesomeIcon icon={faEye} /></span>{contentData.view}
            </div>
          </IconWrap>
        </BoardInfo>
        <Content>
          <p>{contentData.content}</p>
        </Content>
        <CommentTitle>댓글</CommentTitle>
        <CommentWrap>
          {commentData.map((v, idx) => (
            <CommentInfo key={idx}
              onMouseEnter={() => setCommentUserCheck(v)}
              onMouseLeave={() => setCommentUserCheck('')}>
              <div className="CommentProfile">
                <img src={v.userDto.profileImage} alt="Comment Writer Img" />
              </div>
              <div className="CommentWrap">
                <p>{v.userDto.nickname}</p>
                {
                  commentEditCheck.commentId === v.commentId && commentEditOpen ? (
                    <input type="text" defaultValue={v.comment} ref={edit_ref} />
                  ) :
                  (
                    <p>{v.comment}</p>
                  )
                }
              </div>
              {
                commentEditCheck.commentId === v.commentId && commentEditOpen ? (
                  <div className="EditBtn">
                    <div className="cancle" onClick={() => setCommentEditOpen(false)}>취소</div>
                    <div className="edit" onClick={CommentEdit}>수정</div>
                  </div>
                ) : (
                  commentUserCheck.userDto?.nickname === user?.nickname &&
                  commentUserCheck?.commentId === v?.commentId ? (
                    <div className="BtnWrap">
                      <div>
                        <FontAwesomeIcon icon={faHeart} />
                      </div>
                      <div onClick={() => CommentEditModal(v)}>
                        <FontAwesomeIcon icon={faPen} />
                      </div>
                      <div onClick={() => CommentDelete(v.commentId)}>
                        <FontAwesomeIcon icon={faXmark} />
                      </div>
                    </div>
                  ) :
                  (
                    <div className="BtnWrap">
                      <div><FontAwesomeIcon icon={faHeart} /></div>
                    </div>
                  )
                )
              }
            </CommentInfo>
          ))}
        </CommentWrap>
        <Comment>
          <CommentWriter>
            <WriterInfo>
              <img src={user.profileImage} alt="Comment Writer Img" />
              <p>{user.nickname}</p>
            </WriterInfo>
            <WriteInput>
              <textarea type='text'
                ref={comment_ref}
                value={checkItemContent}
                placeholder='댓글을 남겨보세요'
                onChange={checkItemChangeHandler}
                onKeyDown={checkItemEnterHandler}
                style={{height: ((lineHeight * 20) + 20) + 'px'}} />
            </WriteInput>
            <WriteBtnWrap>
              <WriteBtn
                disabled={checkItemContent.length === 0 ? true : false }
                onClick={CommentWrite}
              >작성</WriteBtn>
            </WriteBtnWrap>
          </CommentWriter>
        </Comment>
      </Container>
    </Wrap>
  )
}

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 260px;
  margin-top: 180px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  `;

const Container = styled.div`
  width: 700px;
  border-radius: 30px;
  background-color: white;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  `;

const CardImg = styled.div`
  width: 100%;
  height: 600px;
  border-radius: 30px 30px 0px 0px;
  overflow: hidden;
  background-color: ${(props) => props.conImg?.length === 0 ? "#b1cfe7" : "black" };
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const BoardInfo = styled.div`
    width: 90%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin : 0 auto;
    border-bottom: 1px solid #D9D9D9;
    padding: 0px 20px;
    box-sizing: border-box;
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
        width: 50px;
        height: 50px;
        border-radius: 50px;
    }
`

const BoardText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-left: 10px;
  p {
    margin: 0;
    font-size: 20px;
  }
`

const WriteTime = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    margin: 0 2px;
    font-size: 10px;
  }
`

const IconWrap = styled.div`
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
  div:hover {
    cursor: pointer;
  }
  div > span {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 4px;
    font-size: 17px;
  }
`;

const Content = styled.div`
  width: 90%;
  min-height: 240px;
  padding: 0 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #D9D9D9;
`

const CommentTitle = styled.div`
  margin: 14px 0;
  width: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  padding-left: 10px;
  font-size: 18px;
  color: #333;
`

const CommentWrap = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const CommentInfo = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #D9D9D9;
  &:last-child {
    border: none;
    margin-bottom: 14px;
  }
  div.CommentProfile {
    width: 40px;
    height: 40px;
  }
  div.CommentProfile img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    flex-basis: 100%;
  }
  div.CommentWrap {
    width: 90%;
    margin-left: 12px;
  }
  div.CommentWrap p {
    margin: 0;
    font-size: 12px;
    font-weight: 500;
  }
  div.CommentWrap p:first-child {
    font-size: 15px;
    font-weight: 600;
  }
  div.CommentWrap p:last-child {
    padding-top: 5px;
  }
  div.CommentWrap input {
    width: 70%;
    font-size: 12px;
    font-weight: 500;
    border: none;
    border-bottom: 1px solid #333;
    padding-bottom: 4px;
    outline: none;
  }
  div.EditBtn {
    position: absolute;
    top: 50%;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  div.EditBtn .cancle,
  div.EditBtn .edit {
    width: 40px;
    height: 20px;
    border: 1px solid #D9D9D9;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    font-size: 12px;
    margin: 0 3px;
    cursor: pointer;
    color: #aaa;
  }
  div.EditBtn .cancle:hover {
    background-color: gray;
    color: #fff;
  }
  div.EditBtn .edit:hover {
    background-color: #FE7770;
    color: #fff;
  }
  div.BtnWrap {
    position: absolute;
    top: 50%;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(-50%);
  }
  div.BtnWrap div {
    margin: 0 4px;
    color: #D9D9D9;
  }
  div.BtnWrap div:hover {
    color: #333;
    cursor: pointer;
  }
`

const Comment = styled.div`
  width: 90%;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const CommentWriter = styled.div`
  width: 100%;
  min-height: 120px;
  border: 2px solid #D9D9D9;
  border-radius: 6px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`
const WriterInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 12px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  p {
    margin: 0;
    margin-left: 6px;
  }
`

const WriteInput = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  textarea {
    width: 100%;
    overflow: hidden;
    overflow-wrap: break-word;
    resize: none;
    border: none;
    outline: none;
  }
`

const WriteBtnWrap = styled.div`
  width: 100%;
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const WriteBtn = styled.button`
  width: 40px;
  height: 30px;
  border-radius: 6px;
  border: none;
  color: white;
  background-color: #FE7770;
  font-weight: 500;
  cursor: pointer;
  &:disabled {
    background-color: transparent;
    color: #D9D9D9;
  }
`

export default PostView;