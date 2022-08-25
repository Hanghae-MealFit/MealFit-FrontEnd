import React from "react";
import styled from "styled-components";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import { MemoizedSidebar } from "./Sidebar";
import Modal from "../elements/Modal";
import { loadPostDB } from "../redux/modules/post";

const PostView = () => {
    const [dataTest, setdataTest] = React.useState({
        postId: "1",
        nickname: "봄봄",
        profileImage: "https://images.unsplash.com/photo-1660632531779-b363f16acdbd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        postImage: "https://images.unsplash.com/photo-1571047399553-603e2138b646?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        content: "신선한 채소와 다양한 토핑들을 추가해서 먹는 포만감 만점, 다이어트 불가능한 샐러드 래시피!",
        likeToggle: Boolean,
        likeNumber: 2,
        commentNumber: 2
    });
    // console.log(dataTest);

    const PostViewAX = async () => {
        const data = {
            postId: "postId",
            nickname: "nickname",
            profileImage: "profileImage",
            postImage: "postImage",
            content: "content",
            likeToggle: Boolean,
            likeNumber: "likeNumber",
            commentNumber: "commentNumber"
        }

        const auth = {
            authorization: sessionStorage.getItem("token"),
            refresh_token: sessionStorage.getItem("refresh_token")
        };

        await axios({
            baseURL: "http://13.125.227.9:8080/",
            method: "get",
            url: "/post/{postId}",
            data: data,
            headers: {
                Authorization: `Bearer ${auth.authorization}`,
                refresh_token: `Bearer ${auth.refresh_token}`
            },
        }).then((response) => {
            console.log("반응", response)
        }).catch((error) => {
            console.log("에러", error)
        });
    };

    // const loadPostAX = async() => {
    //     const apiPost = axios.create({
    //         baseURL: "http://13.125.227.9:8080/",
    //         headers: {
    //             Authorization: `Bearer ${auth.authorization}`,
    //             refresh_token: `Bearer ${auth.refresh_token}`
    //           },
    //     });

    //     const CreatePostAXImg = await apiPost
    //         .get("/post/{postId}")
    //         .then((response) => {
    //             console.log("반응", response)
    //             setdataTest(response.data)
    //         })
    //         .catch(function (error) {
    //             console.log("에러", error)
    //         });
    // }

    // React.useEffect(() => {
    //     loadPostAX()
    // }, []);

    let { postId } = useParams();
    const navigation = useNavigate();
    console.log(postId);

    // 수정
    const ModifyPost = () => {
        navigation(`/post/${postId}`);
    }

    // 삭제 모달창
    const [modalOpen, setModalOpen] = React.useState(false);

    const closeModal = () => {
        setModalOpen(false);
    };

    // 댓글 입력값 State 저장
    // const [comment, setComment] = React.useState("");
    const [comment, setComment] = React.useState({
        username: "봄봄",
        userProfile: "https://images.unsplash.com/photo-1660632531779-b363f16acdbd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        comment: "여러분 무플방지 환영합니다! 댓글 달아주세용!",
        likeToggle: Boolean
    });
    // const onChange = event => setComment(event.target.value);

    const auth = {
        authorization: sessionStorage.getItem("token"),
        refresh_token: sessionStorage.getItem("refresh_token")
    };

    const onhandleComment = async (e) => {
        e.preventDefault()
        const CommentApi = axios.create({
            baseURL: "http://13.125.227.9:8080/",
            headers: {
                Authorization: `Bearer ${auth.authorization}`,
                refresh_token: `Bearer ${auth.refresh_token}`
            },
        });

        // 댓글 보기




        // 댓글 쓰기
        const CommentUp = await CommentApi
            .post("/post/{postId}/comment")
            .then((response) => {
                console.log("반응", response)
                window.alert("댓글 작성 성공!")
            }).catch((error) => {
                console.log("에러", error)
                window.alert("댓글 작성 실패!")
            });
    }


    // 댓글 입력값 저장되는 곳 지정
    const [commentArray, setCommentArray] = React.useState([]);
    const onSubmit = event => {
        event.preventDefault();
        if (comment === '') {
            return;
        }
        setCommentArray(commentValueList => [comment, ...commentValueList]);
        setComment('');
    };

    return (
        <Wrap>
            <MemoizedSidebar />
            <Container>
                <ImgWrap src={dataTest.postImage} />
                <ModifyDelBtn>
                    <button style={{ margin: "0px 10px 0px 0px" }} onClick={() => { setModalOpen(true) }}>
                        삭제
                    </button>
                    {
                        modalOpen === true ? (
                            <Modal setModalOpen={setModalOpen} />
                        ) : (
                            null
                        )
                    }
                    <button onClick={ModifyPost}>
                        수정
                    </button>
                </ModifyDelBtn>
                <PostInfo>
                    <img src={dataTest.profileImage} />
                    <span>{dataTest.nickname}</span>
                    <Likecomment>좋아요 {dataTest.likeNumber} ∙ 댓글 {dataTest.commentNumber}</Likecomment>
                </PostInfo>
                <Line />
                <Contents>{dataTest.content}</Contents>
                {/* <Line /> */}
                <CommentContainer onSubmit={onSubmit}>
                    <Titlebar>
                        <Titletag>
                            <p>댓글</p>
                        </Titletag>
                    </Titlebar>
                    <CommentView>
                        <CommentInfo>
                        <img src={comment.userProfile} />
                        <span style={{ fontWeight: "bold" }}>{comment.username}</span>
                        <span>{comment.comment}</span>
                        </CommentInfo>
                    </CommentView>
                    {/* <div>{comment.likeToggle : Boolean}</div> */}
                    <CommentBox>
                        <input type="text" placeholder="댓글을 입력해주세요."
                        // value={comment} onChange={onChange}
                        />
                        <CommentBtn onClick={onhandleComment}>댓글 작성하기</CommentBtn>
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
        width: 50px;
        height: 50px;
        border-radius: 25px;
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