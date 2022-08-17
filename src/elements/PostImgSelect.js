import React, { useEffect } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

const PostImgSelect = ({ files, setFiles }) => {

  const temp_img = "https://cdn.icon-icons.com/icons2/2828/PNG/512/images_photos_photo_image_icon_179766.png"
  const [prevFiles, setPrevFiles] = React.useState(temp_img);

  const previewImage = async (e) => {

    e.preventDefault();

    const file = e.target.files[0];
    console.log(file)
    const reader = new FileReader();
    reader.readAsDataURL(file); // 내가 올릴 img
    reader.onload = (e) => {
      setPrevFiles(e.target.result);
    };
    setFiles(file)
  }

  return (
    <Wrap>
      <ImgWrap>
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
  margin: 0 auto;
`

const ImgWrap = styled.div`
  position: absolute;
  width: 700px;
  height: 420px;
  top: 0px;
  margin: 0 auto;
  background: #b1cfe7;
  border-radius: 30px 30px 0px 0px;
`

const Img = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  border-radius: 30px 30px 0px 0px;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    // background: red;
  }
`

const IconWrap = styled.label`
  position: absolute;
  bottom: 20px;
  right: 20px;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
`

export default PostImgSelect