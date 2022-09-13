import React, {useEffect} from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { loadMainUserDB } from '../redux/modules/userinfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCamera } from '@fortawesome/free-solid-svg-icons'

const PicSelect = ( { setFiles, myPageIn } ) => {

  const userInfo = useSelector((state) => state.userinfo.user.userProfile);

  const temp_img = "/logo/profile.png"
  const mypage_img = userInfo.profileImage
  const [ prevFiles, setPrevFiles ] = React.useState(temp_img);
  const previewImage = (e) => {

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
        {
          myPageIn ? (
            <Img>
              <img src={mypage_img === null ? temp_img : mypage_img} alt="" />
            </Img>
          ) : (
            <Img>
              <img src={prevFiles} alt="" />
            </Img>
          )
        }
        
        <IconWrap htmlFor="file" style={{ display: myPageIn ? "none" : "flex" }}>
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
  width: 120px;
  height: 120px;
  margin: 0 auto;
  @media (min-width: 1024px) {
    width: 160px;
    height: 160px;
  }
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