import React from "react";
import styled, {css} from "styled-components";
import axios from "axios";
// FontAwesom Icon 사용
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

import { loadMainUserDB } from "../redux/modules/userinfo";

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

const Sidebar = () => {

  const user = useSelector((state) => state.userinfo.user.userProfile)
  // const user2 = useSelector((state) => state)
  // console.log(user2)

  const [isLogin, setIsLogin] = React.useState(false);
  const sessionStorage = window.sessionStorage;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const board_ref = React.useRef(null);
  const record_ref = React.useRef(null);

  const Token = {
    authorization: sessionStorage.getItem("accessToken"),
    refresh_token: sessionStorage.getItem("refreshToken")
  }
  let code = new URL(window.location.href);
  const USER_CHECK = code.href

  const LoginCheck = () => {
    if (Token.authorization !== null && Token.refresh_token !== null && USER_CHECK !== "http://localhost:3000/user/signupsns") {
      setIsLogin(true)
    }
  }

  const LogoClick = () => {
    if(!isLogin) {
      sessionStorage.clear()
      navigate("/")
    } else {
      navigate("/")
    }
  }

  React.useEffect(() => {
    LoginCheck()
  }, [USER_CHECK]);

  React.useEffect(() => {
    if(isLogin) {
      dispatch(loadMainUserDB())
    }
  }, [])

  const [ showMenu, setShowMenu ] = React.useState(false)
  const ShowMenuToggle = () => {
    if(showMenu === true) {
      setShowMenu(false)
    } else {
      setShowMenu(true)
    }
  }
  React.useEffect(() => {
    if(showMenu === true) {
      setShowMenu(false)
    }
  }, [USER_CHECK])

  const MenuClick = (e) => {
    if(!isLogin) {
      sessionStorage.clear()
    }
    console.log("OnClick", e.target.innerText)
    if(e.target.innerText === "식단게시판") {
      navigate("/post/all")
    } else if (e.target.innerText === "기록하기") {
      navigate("/record")
    } else if (e.target.innerText === "식단가이드") {
      navigate("/")
    }
  }

  const onClickLogin = () => {
    sessionStorage.clear()
    navigate("/user/login");
  }

  const temp_img = "/logo/profile.png"

  const onhandleLogOut = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post("http://43.200.174.111:8080/logout", null ,{
          headers: {
            Authorization: `Bearer ${Token.authorization}`,
            refresh_token: `Bearer ${Token.refresh_token}`
          }
        })
        console.log("반응", response)
      if (response.status === 200) {
        sessionStorage.clear();
        setIsLogin(false);
        window.alert("로그아웃 하셨습니다. 밀핏을 찾아주셔서 감사합니다.");
        navigate("/")
        window.location.reload();
      }
    } catch (error) {
      console.log("에러", error)
      // console.log(Token)
      // window.alert("로그아웃에 실패하였습니다. 다시 한번 시도해주십시오.");
    }
  };

  return (
    <>
      <MobileHeader>
        <Logo onClick={LogoClick} style={{ cursor: "pointer" }}>
          <img className="logo" src="/logo/mealft_1.png" alt="logo" />
        </Logo>
        <HamBtn onClick={ShowMenuToggle}>
          <div style={{ display: showMenu ? "none" : "block"}}></div>
          <div style={{
            transform: showMenu ? "rotate(-45deg)" : null
          }}></div>
          <div style={{
            display: showMenu ? "block" : "none",
            transform: "rotate(45deg) translate(-5px, -5px)"
          }}></div>
          <div style={{ display: showMenu ? "none" : "block"}}></div>
        </HamBtn>
        {
          showMenu ? (
            <div className="Toggle">
              {
                !isLogin ?
                  (
                    <Info style={{backgroundColor: "#FFB0AC", position:"relative"}}>
                      <Profile src={temp_img}></Profile>
                      <span style={{ color: "white" }}>로그인 해주세요</span>
                      <div style={{
                        position:"absolute", top:"0", right:"0", backgroundColor: "white", border: "none", width: "60px", height: "24px", fontSize: "12px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer"
                      }} onClick={() => navigate("/user/login")}>로그인</div>
                    </Info>
                  ) :
                  (
                    <Info style={{backgroundColor: "#FFB0AC", position:"relative", margin: "0 auto"}}>
                      <Profile onClick={() => { navigate("/user/info") }}
                      src={user.profileImage === null ? temp_img : user.profileImage }
                      alt="User Profile Image" />
                      <span style={{ color: "white" }}>
                        <span className="UserNick">{user.nickname} 님</span>
                        <span className="Welcome">밀핏에 오신 걸 환영합니다!</span>
                      </span>
                      <div style={{
                        position:"absolute", top:"0", right:"0", backgroundColor: "white", border: "none", width: "60px", height: "24px", fontSize: "12px", display: "flex", justifyContent: "center", alignItems: "center", cursor: "pointer"
                      }} onClick={onhandleLogOut}>로그아웃</div>
                    </Info>
                  )
              }
              <ul>
                <li onClick={() => navigate("/post/all")}>식단게시판</li>
                <li onClick={() => navigate("/record")}>기록하기</li>
                <li onClick={() => navigate("/")}>피드백 작성하기</li>
              </ul>
            </div>
          ) : (
            null
          )
        }
      </MobileHeader>
      <SideBar>
        <Logo onClick={LogoClick} style={{ cursor: "pointer" }}>
          <img className="logo" src="/logo/mealft_1.png" alt="logo" />
        </Logo>
        <SideBox>
          {
            !isLogin ?
              (
                <Info>
                  <Profile src={temp_img}></Profile>
                  <span style={{ color: "white" }}>로그인 해주세요</span>
                </Info>
              ) :
              (
                <Info>
                  <Profile onClick={() => { navigate("/user/info") }}
                  src={user.profileImage === null ? temp_img : user.profileImage }
                  alt="User Profile Image" />
                  <span style={{ color: "white" }}>
                    <span className="UserNick">{user.nickname} 님</span>
                    <span className="Welcome">밀핏에 오신 걸 환영합니다!</span>
                  </span>
                </Info>
              )
          }
          <Menu>
            <MenuWrap className="sidebar-item" onClick={MenuClick} ref={board_ref} checkMenu={USER_CHECK.includes("post") ? true : false}>
              <span><FontAwesomeIcon icon={faClipboardList} /></span>
              <p>식단게시판</p>
            </MenuWrap>
            <MenuWrap className="sidebar-item" onClick={MenuClick} ref={record_ref} checkMenu={USER_CHECK.includes("record") ? true : false}>
              <span><FontAwesomeIcon icon={faPenToSquare} /></span>
              <p>기록하기</p>
            </MenuWrap>
          </Menu>
          {
            !isLogin ?
              (
                <Button>
                  <LogInBtn onClick={onClickLogin}>로그인</LogInBtn>
                </Button>
              ) :
              (
                <Button>
                  <LogOutBtn onClick={onhandleLogOut}>로그아웃</LogOutBtn>
                </Button>
              )
          }
        </SideBox>
      </SideBar>
    </>
  );
}

const MobileHeader = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 60px;
  background-color: #FE7770;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-sizing: border-box;
  z-index: 20000;
  div.Toggle {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
  }
  div.Toggle ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  div.Toggle ul li {
    margin: 0;
    height: 40px;
    box-shadow: 0 0 4px rgba(255, 255, 255, 0.8);
    background-color: #FFB0AC;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    cursor: pointer;
  }
  @media (min-width: 1023px) {
    display: none;
  }
`

const HamBtn = styled.div`
  cursor: pointer;
  div {
    width: 24px;
    height: 4px;
    margin: 3px;
    border-radius: 4px;
    background-color: #fff;
  }
`

const SideBar = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 260px;
  height: 100%;
  background-color: #FE7770;
  z-index: 20000;
  @media (max-width: 1023px) {
    display: none;
  }
`;

const Logo = styled.div`
  height: 40px;
  /* identical to box height */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFF;
  cursor: pointer;
  img {
    height: 60%;
  }
  @media (min-width: 1023px) {
    width: 100%;
    margin: 40px auto;
    img {
      height: 100%;
    }
  }
`;

const SideBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  @media (max-width: 320px) {
  /* display: none; */
}
@media (min-width: 321px) and (max-width: 768px) {
  width: 60%;
}
`;

const Info = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #fff;
  span {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    margin: 2px 0;
  }
  span.UserNick {
    font-size: 15px;
    font-weight: 700;
  }
  span.Welcome {
    font-size: 12px;
  }
`;

const Profile = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 14px;
  background-color: #ddd;
  transition: 0.4s;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
    transition: 0.4s;
  }
`;

const Menu = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 16px;
  margin-top: 40px;
`;

const MenuWrap = styled.div`
  width: 260px;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 6px 0;
  padding-left: 70px;
  box-sizing: border-box;
  cursor: pointer;
  ${({checkMenu}) => {
    return css`
      background-color: ${checkMenu ? "#F6EAE0" : "transparent"};
      color: ${checkMenu ? "#FE7770" : "white" };
    `
  }};
  span {
    margin: 0;
    margin-right: 14px;
  }
  p {
    margin: 0;
  }
`

const Button = styled.div`
    width: 100%;
    position: absolute;
    bottom: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
  button {
    width: 200px;
    height: 50px;
    margin-bottom: 40px;
    border: none;
    border-radius: 30px;
    color: #FE7770;
    font-size: 16px;
    font-weight: 900;
    font-family: 'GmarketM', 'sans-serif';
    cursor: pointer;
    background-color: white;
  }
`

const LogOutBtn = styled.button`
    background-color: #FE7770;
`

const LogInBtn = styled.button`
    background-color: #FE7770;
`

// export default Sidebar;
export const MemoizedSidebar = React.memo(Sidebar)