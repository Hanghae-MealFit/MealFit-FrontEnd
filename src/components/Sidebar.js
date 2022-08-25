import React from "react";
import styled from "styled-components";
import axios from "axios";
// FontAwesom Icon 사용
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList, faBullhorn, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

import SidebarItem from "../elements/SidebarItem";
import { loadMainUserDB } from "../redux/modules/userinfo";

import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

const Sidebar = () => {

  const user = useSelector((state) => state.userinfo.user.userProfile)
  // console.log("userProfile", user)

  const [isLogin, setIsLogin] = React.useState(false);
  const sessionStorage = window.sessionStorage;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Token = {
    authorization: sessionStorage.getItem("accessToken"),
    refresh_token: sessionStorage.getItem("refreshToken")
  }
  console.log(Token)
  
  const LoginCheck = () => {
    // console.log(Token)
    if (Token.authorization !== null && Token.refresh_token !== null) {
      setIsLogin(true)
    }
  }

  React.useEffect(() => {
    dispatch(loadMainUserDB())
    LoginCheck()
  }, []);
  // console.log(isLogin);

  const menus = [
    { 
      icon: <FontAwesomeIcon icon={faClipboardList} />,
      name: "식단게시판",
      path: "/post/all"
    },
    // 임시로 만든 url
    { 
      icon: <FontAwesomeIcon icon={faBullhorn} />,
      name: "식단가이드",
      path: "/" 
    },
    { 
      icon: <FontAwesomeIcon icon={faPenToSquare} />,
      name: "기록하기",
      path: "/record" 
    }
  ];

  const onClickLogin = () => {
    navigate("/user/login");
  }

  const temp_img = "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"

  const onhandleLogOut = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post("http://13.125.227.9:8080/user/logout",
        {
          headers: {
            Authorization: `Bearer ${Token.authorization}`,
            refresh_token: `Bearer ${Token.refresh_token}`
          }
        })
      if (response) {
        // console.log("반응", response)
        sessionStorage.clear();
        setIsLogin(false);
        window.alert("로그아웃 하셨습니다. 밀핏을 찾아주셔서 감사합니다.");
        navigate("/")
        window.location.reload();
      }
    } catch (error) {
      console.log("에러", error)
      console.log(Token)
      window.alert("로그아웃에 실패하였습니다. 다시 한번 시도해주십시오.");
    }
  };

  return (
    <SideBar>
      <Logo onClick={() => { navigate("/") }} style={{ cursor: "pointer" }}>
        밀핏
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
          {menus.map((menu, index) => {
            return (
              <Link style={{ color: "white", textDecoration: "none" }}
                to={menu.path} key={index}>
                <SidebarItem
                  menu={menu}
                />
              </Link>
            );
          })}
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
  );
}

const SideBar = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    width: 260px;
    height: 100vh;
    background-color: #FE7770;
`;

const Logo = styled.div`
    width: 100%;
    height: 44px;
    font-family: 'Montserrat';
    font-weight: 900;
    font-size: 36px;
    /* identical to box height */
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 40px auto;
    color: #FFF;
    cursor: pointer;
`;

const SideBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
`;

const Info = styled.div`
  width: 100%;
  height: 100%;
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
      /* background: #808080; */
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