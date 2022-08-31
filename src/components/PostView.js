import React from "react";
import styled from "styled-components";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import { MemoizedSidebar } from "./Sidebar";
import DelPostModal from "../elements/DelPostModal";
import { loadPostDB } from "../redux/modules/post";
import { loadPost } from "../redux/modules/post";

const PostView = () => {
  const navigate = useNavigate();
  const { postId } = useParams();
  // console.log(postId);

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

  const [ isLogin, setIsLogin ] = React.useState(false);
  const comment_ref = React.useRef(null);

  const Token = {
    authorization: sessionStorage.getItem("accessToken"),
    refresh_token: sessionStorage.getItem("refreshToken")
  }

  const isLoginCheck = () => {  
    // console.log(Token)
    if (Token.authorization !== null && Token.refresh_token !== null) {
      setIsLogin(true)
    }
    // if (userDto.nickname === response.data.userDto.nickname)
  }

    // 식단 게시글 상세조회
    const PostViewAX = async () => {
        try {
          const response = await axios.get(`http://43.200.174.111:8080/post/${postId}`, {
            headers: {
                Authorization: `Bearer ${Token.authorization}`,
                refresh_token: `Bearer ${Token.refresh_token}`
            }
          })
          console.log("게시글 불러오기", response)
          setContentData(response.data)
        } catch(error) {
          console.log(error)
        }
    };

  // 삭제 모달창
  const [modalOpen, setModalOpen] = React.useState(false);

  // 댓글 입력값 저장되는 곳 지정
  const [comments, setComments] = React.useState("");
  // const [feedComments, setFeedComments] = React.useState([]);

  // const CommentPost = e => {
  //   const copyFeedComments =
  //   [...feedComments];
  //   copyFeedComments.push(comments);
  //   setFeedComments(copyFeedComments);
  //   setComments("");
  // };

  const onSubmit = event => {
      event.preventDefault();
      if (comments === '') {
          return;
      }
      setComments(commentValueList => [comments, ...commentValueList]);
      setComments('');
  };

  
    // 댓글 불러오기
    const CommentLoad = async () => {
      try {
        const response = await axios.get(`http://43.200.174.111:8080/post/${postId}/comment`, {
          headers: {
            Authorization: `Bearer ${Token.authorization}`,
            refresh_token: `Bearer ${Token.refresh_token}`
          }
        })
        console.log("댓글 불러오기", response.data)
      } catch(error) {
        console.log("댓글 불러오기 실패", error)
      }
    }

    // 댓글 작성하기
    const CommentWrite = async () => {
      const formData = new FormData()
      formData.append("content", comment_ref.current.value)

      try {
        const response = await axios.post(`http://43.200.174.111:8080/post/${postId}/comment`,
          comment_ref.current.value,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Token.authorization}`,
            refresh_token: `Bearer ${Token.refresh_token}`
          }
        })
        console.log("댓글 작성하기", response)
      } catch(error) {
        console.log("댓글 작성 실패", error)
      }
    }

    React.useEffect(() => {
      PostViewAX()
      CommentLoad()
    }, [])

    return (
        <Wrap>
            <MemoizedSidebar />
            <Container>
                <ImgWrap src={contentData.image} />
                {
                  !isLogin === true ? (
                    <ModifyDelBtn>
                    <button style={{ margin: "0px 10px 0px 0px" }} onClick={() => { setModalOpen(true) }}>
                        삭제
                    </button>
                    {
                        modalOpen === true ? (
                            <DelPostModal setModalOpen={setModalOpen} postId={postId} />
                        ) : (
                            null
                        )
                    }
                    <button onClick={() => { navigate(`/post/${postId}`) }}>
                        수정
                    </button>
                </ModifyDelBtn>
                  ) : (
                    null
                  )
                }
                <PostInfo>
                    <img src={contentData.userDto.profileImage} />
                    <span>{contentData.userDto.nickname}</span>
                    <Likecomment>좋아요 {contentData.like} ∙ 댓글 {contentData.commentNumber} ∙ 조회수 {contentData.view}</Likecomment>
                </PostInfo>
                <Line />
                <Contents>{contentData.content}</Contents>
                {/* <Line /> */}
                <CommentContainer onSubmit={onSubmit}>
                    <Titlebar>
                        <Titletag>
                            <p>댓글</p>
                        </Titletag>
                    </Titlebar>
                    <CommentView>
                      {/* {feedComments.map((commentArr, i) => {
                        return (
                          <CommentInfo
                          nickname={comments.userDto.nickname}
                          comments={comments.comment}
                          key={i}
                          />
                        )
                      })} */}
                        <CommentInfo>
                        <img src={contentData.userDto.profileImage} />
                        <span style={{ fontWeight: "bold" }}>{contentData.userDto.nickname}</span>
                        <span>{comments.comment}</span>
                        </CommentInfo>
                    </CommentView>
                    {/* <div>{comment.likeToggle : Boolean}</div> */}
                    <CommentBox>
                        <input ref={comment_ref} type="text" placeholder="댓글을 입력해주세요."
                        onChange={e => {
                          setComments(e.target.value);
                        }}
                        value={comments}
                        />
                        <CommentBtn onClick={CommentWrite}>댓글 작성하기</CommentBtn>
                    </CommentBox>
                </CommentContainer>
            </Container>
        </Wrap>
    )
}

const Wrap = styled.div`
  // background-color: yellow;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  `;

const Container = styled.div`
  // border: 5px solid blue;
  position: absolute;
  width: 700px;
  height: 95%;
  margin-left: 260px;
  border-radius: 30px;
  background-color: white;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  `;

const ImgWrap = styled.img`
    position: relative;
    width: 100%;
    height: 60%;
    border-radius: 30px 30px 0px 0px;
    overflow: hidden;
    object-fit: cover;
    background-color: #ddd;
`;

const PostInfo = styled.div`
    // background-color: red;
    width: 90%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin : 10px auto;
    img {
        width: 105px;
        height: 50px;
        border-radius: 50px;
        background-color: gray;
    }
    span {
        width: 100%;
        height: 100%
        font-weight: bold;
        margin-left: 10px;
    }
`;

const Likecomment = styled.div`
    // background-color: red;
    width: 90%;
    height: 100%;
    display: flex;
    justify-content: right;
    align-items: center;
    font-size: 14px;
    color: #bbb;
`;

const Contents = styled.div`
    position: relative;
    width: 90%;
    height: 20%;
    display: flex;
    // align-items: center;
    justify-content: center;
    margin : 10px auto;
  p {
        font-size: 16px;
        color: #808080;
  }
`;

const Line = styled.hr`
    width: 90%;
    border-bottom: 1px solid #eee;
`;

const ModifyDelBtn = styled.div`
    // background-color: red;
    position: absolute;
    width: 90%;
    height: 100%;
    display: flex;
    justify-content: right;
    margin-top: 40px;
    button {
        position: relative;
        width: 60px;
        height: 30px;
        font-size: 12px;
        font-weight: 900;
        border-radius: 30px;
        cursor: pointer;
        border: 1px solid #555;
        background-color: white;
    }
`;

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

const Titlebar = styled.div`
  width: 100%;
  height: 30%;
//   background-color: red;
`;

const Titletag = styled.div`
  width: 100px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0px 0px 15px 0px;
  background-color: #ccc;
  p {
  font-size: 14px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  }
`;

const CommentBox = styled.div`
    // background-color: red;
    position: relative;
    width: 90%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    border: 1px solid #808080;
    input {
        width: 100%;
        margin-left: 10px;
        border: none;
        box-sizing: border-box;
        outline: none;
      }
`;

const CommentBtn = styled.button`
    position: relative;
    width: 130px;
    height: 30px;
    font-size: 12px;
    font-weight: 700;
    border-radius: 30px;
    cursor: pointer;
    color: #fff;
    border: 1px solid #808080;
    background-color: #808080;
`;

export default PostView;