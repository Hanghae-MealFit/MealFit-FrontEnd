import React, { useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { MemoizedSidebar } from "./Sidebar";
import PostImgSelect from '../elements/PostImgSelect';
import Header from "../elements/Header";

import { loadMainUserDB } from "../redux/modules/userinfo";

const PostUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { postId } = useParams();
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  let code = new URL(window.location.href);
  const PageCheck = code.href
  const EditPage = PageCheck.includes("edit")

  const [ImageFile, setImageFile] = React.useState([]);
  const [contentText, setContentText] = React.useState(false);
  const UpdateformData = new FormData();
  const formData = new FormData();
  const content_ref = React.useRef(null);

  const TextCheck = (e) => {
    if(e.target.value.length === 0) {
      setContentText(false)
    } else {
      setContentText(true)
    }
  }

  const auth = {
    authorization: sessionStorage.getItem("accessToken"),
    refresh_token: sessionStorage.getItem("refreshToken")
  };

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

  // 작성
  const PostUpAX = async () => {
    formData.append("postImageList", ImageFile);
    formData.append("content", content_ref.current.value);

    await axios({
      baseURL: "http://43.200.174.111:8080/",
      method: "POST",
      url: "/api/post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${auth.authorization}`,
        refresh_token: `Bearer ${auth.refresh_token}`
      },
    }).then((response) => {
      // console.log("반응", response)
      window.alert("식단 작성 성공!");
      navigate("/post/all")
    }).catch((error) => {
      // console.log("에러", error)
      window.alert("식단 작성 실패!");
    });
  };

  // 수정 페이지 시, 식단 게시글 상세조회
  const PostViewAX = async () => {
    try {
      const response = await axios.get(`http://43.200.174.111:8080/api/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${auth.authorization}`,
          refresh_token: `Bearer ${auth.refresh_token}`
        }
      })
      setContentData(response.data)
    } catch (error) {
      // console.log(error)
    }
  };

  // 수정
  const PostUpdateAX = async () => {
    UpdateformData.append("postImageList", ImageFile);
    UpdateformData.append("content", content_ref.current.value);

    await axios({
      baseURL: "http://43.200.174.111:8080/",
      method: "POST",
      url: `/api/post/${postId}`,
      data: UpdateformData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${auth.authorization}`,
        refresh_token: `Bearer ${auth.refresh_token}`
      },
    }).then((response) => {
      // console.log("반응", response)
      if(response.status === 200 && response.data === "수정 완료!") {
        window.alert("게시글이 성공적으로 수정되었습니다.")
        navigate(`/post/${postId}`)
      }
    }).catch((error) => {
      // console.log("에러", error)
      window.alert("게시글 수정에 실패하였습니다.")
    });
  }

    const onhandleBack = () => {
      navigate("/post/all");
    };

    const onhandleEditBack = () => {
      navigate(`/post/${postId}`);
    };

    useEffect(() => {
      if(EditPage) {
        PostViewAX()
      }
    }, [])

    useEffect(() => {
      dispatch(loadMainUserDB())
    }, [])

    return (
      <Wrap>
        <MemoizedSidebar />
        <Header postId={postId} />
        <Container>
          <PostImgSelect files={ImageFile} setFiles={setImageFile} />
          <Textarea
            ref={content_ref}
            onChange={TextCheck}
            placeholder='오늘 식단을 입력해주세요.'
          >
          </Textarea>
            {
              EditPage ? (
                <Button>
                  <CancleBtn onClick={onhandleEditBack}>뒤로가기</CancleBtn>
                  <PostUpBtn onClick={PostUpdateAX} disabled={ImageFile.length !== 0 && contentText ? false : true}>수정하기</PostUpBtn>
                </Button>
              ) : (
                <Button>
                  <CancleBtn onClick={onhandleBack}>뒤로가기</CancleBtn>
                  <PostUpBtn onClick={PostUpAX} disabled={ImageFile.length !== 0 && contentText ? false : true}>작성하기</PostUpBtn>
                </Button>
              )
            }
        </Container>
      </Wrap>
    );
  };

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 180px;
  margin-bottom: 60px;
  @media (min-width: 1024px) {
    margin: 180px 0 40px 260px;
  }
`;

const Container = styled.div`
  width: 90%;
  height: 100%;
  border-radius: 30px;
  background-color: white;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  overflow: hidden;
  @media (min-width: 769px) {
    width: 700px;
    min-height: 800px;
  }
`;

const Textarea = styled.textarea`
  margin: 20px auto;
  bottom: 70px;
  height: 100px;
  width: 80%;
  border: none;
  outline: none;
  border-radius: 10px;
  padding: 15px;
  box-sizing: border-box;
  resize: none;
  @media (min-width: 400px) and (max-width: 768px) {
    height: 240px;
  }
  @media (min-width: 769px) {
    width: 600px;
    height: 300px;
  }
`;

const Button = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  button {
    width: 40%;
    height: 40px;
    margin: 0 10px;
    border: none;
    border-radius: 30px;
    color: #fff;
    font-size: 14px;
    font-weight: 900;
    cursor: pointer;
  }
`

const CancleBtn = styled.button`
  background-color: #C2C2C2;
`

const PostUpBtn = styled.button`
  background-color: #FE7770;
  &:disabled {
    background-color: #C2C2C2;
    cursor: default;
  }
`

export default PostUp;