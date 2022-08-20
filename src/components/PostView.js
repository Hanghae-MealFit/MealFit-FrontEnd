import React from "react";
import styled from "styled-components";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "./Sidebar";
import Modal from "../elements/Modal";
import { loadPost } from "../redux/modules/card";

const PostView = ({ _handleModal }) => {
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
    console.log(dataTest);

    let { postId } = useParams();
    const navigation = useNavigate();
    console.log(postId);

    // 수정
    const ModifyPost = () => {
        navigation(`/post/${postId}`);
    }

    const auth = {
        authorization: sessionStorage.getItem("token"),
        refresh_token: sessionStorage.getItem("refresh_token")
    };

    const loadPostAX = async() => {
        const apiPost = axios.create({
            baseURL: "http://13.125.227.9:8080/",
            headers: {
                Authorization: `Bearer ${auth.Authorization}`,
                refresh_token: `Bearer ${auth.refresh_token}`,
            }
        });
        const CreatePostAXImg = await apiPost
            .get("/post/{postId}")
            .then((response) => {
                console.log("반응", response)
                console.log('보내주신 data는', response.data)
                setdataTest(response.data)
            })
            .catch(function (error) {
                console.log("에러", error)
            });
    }

    React.useEffect(() => {
        loadPostAX()
    }, []);

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

    const onhandleComment = async (e) => {
        e.preventDefault()
        const CommentApi = axios.create({
            baseURL: "http://13.125.227.9:8080/",
            headers: {
                Authorization: `Bearer ${auth.Authorization}`,
                refresh_token: `Bearer ${auth.refresh_token}`,
            }
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
            <Sidebar />
            <ImgWrap src={dataTest.postImage} />
            <ModifyDelBtn>
                <button onClick={() => { setModalOpen(true) }}
                    style={{ margin: "0px 10px 0px 0px" }} >
                    삭제
                </button>
                {
                    modalOpen === true? (
                        <Modal setModalOpen={setModalOpen} />
                    ) : (
                        null
                    )
                }

                <button onClick={ModifyPost}>
                    수정
                </button>
            </ModifyDelBtn>

            <div>
                <div style={{ display: "flex", alignItems: "center", marginTop: "15px", marginLeft: "25px", marginBottom: "15px" }}>
                    <img src={dataTest.profileImage}
                        style={{ width: "50px", height: "50px", borderRadius: "25px", backgroundColor: "gray" }} />
                    <span style={{ fontWeight: "bold", marginLeft: "10px" }}>{dataTest.nickname}</span>
                    <Likecomment>좋아요 {dataTest.likeNumber} ∙ 댓글 {dataTest.commentNumber}</Likecomment>
                </div>
            </div>
            <hr style={{ width: "640px", borderBottom: "1px solid #eeeeee" }} />
            <Contents>{dataTest.content}</Contents>
            <hr style={{ width: "640px", borderBottom: "1px solid #eeeeee" }} />
            <p style={{ marginLeft: "40px", fontSize: "14px", color: "#9A9A9A" }}>댓글</p>

            <CommentContainer onSubmit={onSubmit}>
                <div style={{ display: "flex", alignItems: "center", marginTop: "15px", marginLeft: "35px", marginBottom: "15px" }}>
                    <img src={comment.userProfile}
                        style={{ width: "40px", height: "40px", borderRadius: "25px", backgroundColor: "gray" }} />
                    <span style={{ fontWeight: "bold", marginLeft: "10px" }}>{comment.username}</span>
                    <span style={{ marginLeft: "10px" }}>{comment.comment}</span>
                </div>
                {/* <div>{comment.likeToggle : Boolean}</div> */}
                <CommentBox style={{ marginLeft: "45px" }}>
                    <input type="text" placeholder="댓글을 입력해주세요."
                    // value={comment} onChange={onChange}
                    />
                    <Button>
                        <CommentBtn onClick={onhandleComment}>댓글 작성하기</CommentBtn>
                    </Button>
                </CommentBox>
            </CommentContainer>
        </Wrap>
    )
}


const Wrap = styled.div`
    width: 700px;
    height: 95%;
    border-radius: 30px;
    background-color: white;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
`;

const ImgWrap = styled.img`
    position: relative;
    width: 700px;
    height: 420px;
    border-radius: 30px 30px 0px 0px;
    // margin-top: 20px;
    overflow: hidden;
    object-fit: cover;
`;

// const profileInfo = styled.div`
//     position: relative;
//     display: flex;
//     align-items: center;
// `;

const Contents = styled.div`
    position: relative;
    width: 600px;
    height: 150px;
    display: flex;
    // align-items: center;
    justify-content: center;
    margin-left: 40px;
    margin-right: 40px;
    margin-bottom: 40px;
    top: 10px;

  p {
    position: relative;
    bottom: -20px;
    font-size: 16px;
    color: #808080;
  }
`;

const Button = styled.div`
position: absolute;
  width: 120px;
  height: 30px;
  bottom: 0px;
  right: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 500px;
    height: 100%;
    margin: 0 10px;
    border: none;
    border-radius: 30px;
    color: #fff;
    font-size: 12px;
    font-weight: 900;
    cursor: pointer;
  }
// background-color: red;
`;

const ModifyDelBtn = styled.div`
    display: flex;
    justify-content: right;
    background-color: red;
    margin-top: -400px;
    margin-bottom: 380px;

    button {
    position: relative;
    width: 60px;
    height: 30px;
    margin-right: 40px;
    font-size: 12px;
    font-weight: 900;
    border-radius: 30px;
    cursor: pointer;
    border: 1px solid #555;
    background-color: white;
    }
`;

const CommentBtn = styled.button`
  background-color: #555;
  &:disabled {
    background-color: #555;
    cursor: default;
  }
`;

const CommentContainer = styled.div`

`;

const CommentBox = styled.div`
    position: absolute;
    width: 600px;
    height: 30px;
    bottom: 40px;

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

const Likecomment = styled.div`
    font-size: 14px;
    color: #bbb;
    margin-left: 430px;
    // background-color: red;
`;

export default PostView;