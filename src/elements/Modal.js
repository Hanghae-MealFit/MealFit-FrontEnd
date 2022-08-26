import React from 'react';
import styled from 'styled-components';
import axios from "axios";

const Modal = ({setModalOpen, postId}) => {
    const handleClose = () => {
        setModalOpen(false);
    };
    console.log(postId)

    const auth = {
        authorization: sessionStorage.getItem("accessToken"),
        refresh_token: sessionStorage.getItem("refreshToken")
    }

     // 삭제 axios
     const DeletPost = () => {
            axios.delete(`http://43.200.174.111:8080/post/${postId}`,
                {
                    headers: {
                        Authorization: `Bearer ${auth.authorization}`,
                        refresh_token: `Bearer ${auth.refresh_token}`,
                    }
                })
                .then(function (response) {
                    console.log("반응", response)
                    // window.alert("삭제되었습니다.")
                    // setModalOpen(false)
                })
                .catch(function (error) {
                    console.log("에러", error)
                    // window.alert("삭제 실패!")
                });
            // console.log("삭제됨!", DeletPost) 
    }

    
    return (
        <Container>
            <Background onClick={handleClose}/>
            <ModalBlock>
                <Contents>
                  <p>게시글이 삭제됩니다. 삭제하시겠습니까?</p>
                  <div>
                    <button onClick={handleClose}>NO</button>
                    <button onClick={DeletPost}>YES</button>
                  </div>
                </Contents>
            </ModalBlock>
        </Container>
    );
};

const Container = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Background = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(5px);
    // animation: modal-bg-show 1s;
    // @keyframes modal-bg-show {
    //     from {
    //         opacity: 0;
    //     }
    //     to {
    //         opacity: 1;
    //     }
    // }
`;

const ModalBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 10rem;
    border-radius: 10px;
    padding: 1.5rem;
    background-color: #ddd;
    width: 30rem;
    // @media (max-width: 1120px) {
    //     width: 50rem;
    // }
    // @media (max-width: 50rem) {
    //     width: 80%;
    // }
    // min-height: 10rem;
    // animation: modal-show 1s;
    // @keyframes modal-show {
    //     from {
    //         opacity: 0;
    //         margin-top: -50px;
    //     }
    //     to {
    //         opacity: 1;
    //         margin-top: 0;
    //     }
    // }
`;

const Contents = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    div {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        width: 50%;
        height: 100%;
    }

    button {
        position: relative;
        margin: 0px;
        width: 100px;
        height: 30px;
        font-size: 12px;
        font-weight: 900;
        border-radius: 30px;
        cursor: pointer;
        border: 1px solid #555;
        background-color: white;
        }
`;

export default Modal;