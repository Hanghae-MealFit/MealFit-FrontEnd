import React from "react";
import styled from "styled-components";
import axios from "axios";

import { useLocation, useNavigate, useParams } from "react-router-dom";

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
    console.log(dataTest)

    let { postId } = useParams();
    const navigation = useNavigate();
    console.log(postId)

    // 수정
    const ModifyPost = () => {
        navigation(`/post/${postId}`)
    }

    const auth = {
        Authorization: sessionStorage.getItem("Authorization"),
        refresh_token: sessionStorage.getItem("refresh_token")
    }

    // React.useEffect(async () => {
    //     const Post = axios.create({
    //         baseURL: "http://13.125.227.9:8080/",
    //         headers: {
    //             Authorization: `Bearer ${auth.Authorization}`,
    //             refresh_token: `Bearer ${auth.refresh_token}`,
    //         }
    //     });

    //     const PostImg = await Post
    //         .get("/post/{postId}")
    //         .then((response) => {
    //             console.log("반응", response)
    //             console.log('보내주신 data는', response.data)
    //             setdataTest(response.data)
    //         })
    //         .catch(function (error) {
    //             console.log("에러", error)
    //         });
    // }, []);


    // // 삭제
    // const DelPost = () => {
    //     axios.delete("http://13.125.227.9:8080/post/{postId}",
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${auth.Authorization}`,
    //                 refresh_token: `Bearer ${auth.refresh_token}`,
    //             }
    //         })
    //         .then(function (response) {
    //             console.log("반응", response)
    //             window.alert("삭제되었습니다.")
    //         })
    //         .catch(function (error) {
    //             console.log("에러", error)
    //         });
    //     // console.log("삭제됨!", DelPost) 
    // }


    // 댓글
    const onhandleComment = async (e) => {
        e.preventDefault()
    }

    return (
        <Wrap>
            <ImgWrap src={dataTest.postImage} />

            {/* <div style={{display: "flex", justifyContent: "right", marginRight: "10px"}}>
          <Button onClick={ApiDetailDel} style={{ color: 'gray', margin: "0px 8px 0px 0px" }} variant="outlined" color="inherit">
            삭제</Button>
          <Button onClick={ModdifyPost} style={{ color: 'gray' }} variant="outlined" color="inherit">
            수정</Button>
        </div> */}

            <profileInfo>
                <div style={{ display: "flex", alignItems: "center", marginTop: "15px", marginLeft: "25px" }}>
                    <img src={dataTest.profileImage}
                        style={{ width: "50px", height: "50px", borderRadius: "25px", backgroundColor: "gray" }} />
                    <span style={{ fontWeight: "bold", marginLeft: "10px" }}>{dataTest.nickname}</span>
                    <Likecomment>좋아요 {dataTest.likeNumber} ∙ 댓글 {dataTest.commentNumber}</Likecomment>
                </div>
            </profileInfo>
            <hr style={{ width: "640px", borderBottom: "1px solid #eeeeee"}} />
            <Contents>{dataTest.content}</Contents>
            <hr style={{ width: "640px", borderBottom: "1px solid #eeeeee"}} />

            <h5 style={{marginLeft: "40px"}}>댓글</h5>

            <CommentBox style={{ marginLeft: "45px"}}>
                <input type="text" placeholder="댓글을 입력해주세요." />

                <Button>
                    <CommentBtn onClick={onhandleComment}>댓글 작성하기</CommentBtn>
                </Button>
            </CommentBox>
        </Wrap>

    )
};

const Wrap = styled.div`
    position: absolute;
    width: 700px;
    height: 95%;
    left: 40%;
    border-radius: 30px;
    background-color: white;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
    // display: flex;
    // flex-direction: column;
    // justify-content: center;
    // align-items: center;
`

const ImgWrap = styled.img`
    position: relative;
    width: 700px;
    height: 420px;
    border-radius: 30px 30px 0px 0px;
    overflow: hidden;
    object-fit: cover;
`

const profileInfo = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const Contents = styled.div`
    position: relative;
    width: 600px;
    // height: 200px;
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
    color: #D9D9D9;
  }
`

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
`

const CommentBtn = styled.button`
  background-color: #FE7770;
  &:disabled {
    background-color: #C2C2C2;
    cursor: default;
  }
`

const CommentBox = styled.div`
    position: absolute;
    width: 600px;
    height: 30px;
    bottom: 40px;

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    border: 1px solid #9A9A9A;

    input {
        width: 100%;
        margin-left: 10px;
        border: none;
        box-sizing: border-box;
        outline: none;
      }
`

const Likecomment = styled.div`
    font-size: 14px;
    color: rgb(136, 136, 136);
    margin-left: 430px;
    // background-color: red;
`;


export default PostView;