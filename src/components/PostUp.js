import React from "react";
import styled from "styled-components";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Sidebar from "./Sidebar";
import PostImgSelect from '../elements/PostImgSelect';

const PostUp = () => {
  const navigate = useNavigate();

  const [ImageFile, setImageFile] = React.useState([]);
  const [ShowImg, setShowImg] = React.useState(null);
  const UpdateformData = new FormData();
  const formData = new FormData();
  const content_ref = React.useRef(null);


  const PostUpAX = async () => {
    const data = {
      postImage: ImageFile,
      content: content_ref.current.value
    };
  
    formData.append("postImage", ImageFile);  
    formData.append("content", content_ref.current.value);
    console.log(formData);
    console.log(ImageFile);

    const auth = {
      authorization: sessionStorage.getItem("accessToken"),
      refresh_token: sessionStorage.getItem("refreshToken")
    };  

    await axios({
      baseURL: "http://13.125.227.9:8080/",
      method: "POST",
      url: "/post",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${auth.authorization}`,
        refresh_token: `Bearer ${auth.refresh_token}`
      },
    }).then((response) => {
      console.log("반응", response)
      window.alert("식단 작성 성공!");
      navigate("/")
    }).catch((error) => {
      console.log("에러", error)
      window.alert("식단 작성 실패!");
    });
  };


    // const apiImg = axios.create({
    //   baseURL: "http://13.125.227.9:8080/",
    //   headers: {
    //     Authorization: `Bearer ${auth.authorization}`,
    //     refresh_token: `Bearer ${auth.refresh_token}`,
    //   }
    // });

    // const CreatePostAX = await apiImg
    //   .post("/post", formData)
    //   .then((response) => {
    //     console.log("반응", response)
    //     window.alert("식단 작성 성공!");
    //     navigate("/")
    //   }).catch((error) => {
    //     console.log("에러", error)
    //     window.alert("식단 작성 실패!");
    //   });

    // const UpdatePostAX = async () => {
    //   const data = {
    //     newFile: ImageFile,
    //     content: content_ref.content
    //   };
    //   console.log("file 안에서 data의 형식 및 이름은", data);

    //   const auth = {
    //     authorization: sessionStorage.getItem("token"),
    //     refresh_token: sessionStorage.getItem("refresh_token")
    //   };
    //   console.log(auth);

    //   const apiPost = axios.create({
    //     baseURL: "http://13.125.227.9:8080/",
    //     headers: {
    //       Authorization: `Bearer ${auth.authorization}`,
    //       refresh_token: `Bearer ${auth.refresh_token}`,
    //     }
    //   });

    //   const CreatePostAXImg = await apiPost
    //     .put("/api/post/1", data)

    //     .then((response) => {
    //       console.log("반응", response)
    //       window.alert("식단 수정 성공!");
    //       navigate("/")
    //     }).catch((error) => {
    //       console.log("에러", error)
    //       window.alert("식단 수정 실패!");
    //     });

  
    const onhandleBack = () => {
      navigate("/");
    };


    return (
      <Wrap>
        <Sidebar />
        <PicWrap>
          <PostImgSelect files={ImageFile} setFiles={setImageFile} />
        </PicWrap>

        <Contents>
          <Textarea ref={content_ref} placeholder='오늘 식단을 입력해주세요.' />
        </Contents>

        <Button>
          <CancleBtn onClick={onhandleBack}>뒤로가기</CancleBtn>
          <PostUpBtn onClick={PostUpAX}>올리기</PostUpBtn>
        </Button>
      </Wrap>

    );
  };

  const Wrap = styled.div`
  position: absolute;
  width: 700px;
  height: 860px;
  left: 40%;
  // top: 5%;
  margin: 0 auto;
  border-radius: 30px;
  background-color: white;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    position: absolute;
    top: 10px;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 10px 0;
    font-size: 26px;
    color: #FE7770;
    width: 540px;
    border-bottom: 1px solid #E0E2E6;
    text-align: center;
  }
`
  const FormWrap = styled.form`
  margin-top: 60px;
`

  const PicWrap = styled.div`
  width: 100%;
  margin: 0 auto;
`

  const Contents = styled.div`
  position: absolute;
  margin: 20px auto;
  bottom: 70px;
  p {
    position: relative;
    bottom: -20px;
    font-size: 16px;
    color: #D9D9D9;
  }
`

  const Textarea = styled.textarea`
    width: 600px;
    height: 300px;
    border: none;
    // border: 1px solid #9A9A9A;
    // border-radius: 10px;
    padding-left: 10px;
    padding-right: 5px;
    padding-top: 10px;
`;

  const Button = styled.div`
position: absolute;
  width: 250px;
  height: 35px;
  bottom: 40px;
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
    font-size: 14px;
    font-weight: 900;
    cursor: pointer;
  }
// background-color: red;
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