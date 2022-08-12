import React, {useEffect} from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

const PicSelect = ( { files, setFiles } ) => {

  const temp_img = "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"
  const [ prevFiles, setPrevFiles ] = React.useState(temp_img);

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
  position: relative;
  width: 160px;
  height: 160px;
  margin: 0 auto;
`

const Img = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const IconWrap = styled.label`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #FFB0AC;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  cursor: pointer;
`

export default PicSelect