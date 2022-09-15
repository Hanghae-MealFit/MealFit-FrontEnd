import React, { useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

const PostImgSelect = ({ files, setFiles }) => {

  const temp_img = "/logo/writebasicimage.png"
  const [prevFiles, setPrevFiles] = React.useState(temp_img);

  const previewImage = async (e) => {

    e.preventDefault();

    const correctForm = /(.*?)\.(jpg|jpeg|png|gif|bmp)$/;
    if (e.target.files[0]?.size > 3 * 1024 * 1024) {
      return;
    } else if (!e.target?.files[0]?.name.match(correctForm)) {
      alert("이미지 파일만 가능합니다.");
      return;
    }

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file); // 내가 올릴 img
    reader.onload = (e) => {
      setPrevFiles(e.target.result);
    };
    setFiles(file)
  }

  return (
    <Wrap>
      <ImgWrap files={files}>
        <Img>
          <img src={prevFiles} alt="" />
        </Img>
        <IconWrap htmlFor="file">
          <FontAwesomeIcon icon={faCamera} />
        </IconWrap>
        <input type="file" id="file" onChange={previewImage} style={{ display: "none" }} />
      </ImgWrap>
    </Wrap>
  )
}

const Wrap = styled.div`
  width: 100%;
  height: 200px;
  margin: 0 auto;
  @media (min-width: 400px) and (max-width: 768px) {
    height: 360px;
  }
  @media (min-width: 769px) {
    height: 500px;
  }
`

const ImgWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: ${(props) => props.files.length === 0 ? "#b1cfe7" : "black" };
  border-radius: 30px 30px 0px 0px;
`

const Img = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

const IconWrap = styled.label`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #555;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
`

export default PostImgSelect