import React from "react";
import styled from "styled-components";
import axios from "axios";

import SidebarItem from "../elements/SidebarItem";

import { Link } from "react-router-dom";
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
    const [isLogin, setIsLogin] = React.useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = {
        authorization: sessionStorage.getItem("accessToken"),
        refresh_token: sessionStorage.getItem("refreshToken")
      };

    const menus = [
        { name: "식단게시판", path: "/" },
        { name: "식단가이드", path: "/" },
        { name: "기록하기", path: "/" }
    ];

  React.useEffect(() => {
    const Token = {
        authorization: sessionStorage.getItem("accessToken"),
        refresh_token: sessionStorage.getItem("refreshToken")
    }
    if (Token.authorization !== "" && Token.refresh_token !== "" ) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, []);
  console.log(isLogin)
  

    //  닉네임과 프사는 어디서 받아오죵?
    const nickname = sessionStorage.getItem("nickname")
    // console.log("닉네임 있어?", nickname);

    const ProfileImage = sessionStorage.getItem("ProfileImage")
    // console.log("프사 있어?", profile);

    const onClickLogin = () => {
        navigate("/user/login");
    }

    const onhandleLogOut = async (e) => {
        e.preventDefault()

        sessionStorage.clear()
        window.alert("로그아웃!")
        navigate("/");
          }

    return (
        <SideBar>
            <Logo onClick={() => {
          navigate("/")
          }} style={{cursor: "pointer"}}>
                밀핏LOGO
            </Logo>

            <SideBox>
            {!isLogin ? (
            <Info>
                    <Profile src={"https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"}></Profile>
                    <span style={{ color: "white" }}>로그인 해주세요</span>
                </Info>
                ) : (
                    <Info>
                    <Profile src={ProfileImage}></Profile>
                    <span style={{ color: "white" }}>{nickname} 님, 환영합니다!</span>
                </Info>
                )}
                
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

                {!isLogin ? (
                <Button>
                    <LogInBtn onClick={onClickLogin}>로그인</LogInBtn>
                </Button>
                ) : (
                <Button>
                    <LogOutBtn onClick={onhandleLogOut}>로그아웃</LogOutBtn>
                </Button>
                )}

            </SideBox>
        </SideBar>
    );
}

const SideBar = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    width: 260px;
    height: 100%;
    background-color: #FE7770;
`;

const Info = styled.div`
    margin: 20px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
`;

const SideBox = styled.div`
    margin-top: 100px;
`;

const Profile = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-right: 20px;
    background-color: #dddddd;
`
const Menu = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
    margin-top: 50px;
    margin-left: 20px;
    width: 200px;
    height: 60px;
    left: 0px;
    top: 250px;
    font-size: 16px;
    line-height: 2.5;
`;

const Logo = styled.div`
    position: absolute;
    width: 200px;
    height: 44px;
    top: 35px;
    // left: 100px;

    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 800;
    font-size: 36px;
    line-height: 44px;
    /* identical to box height */

    display: flex;
    align-items: center;

    color: #FFFFFF;
`;

const Button = styled.div`
    width: 460px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  button {
    width: 200px;
    height: 50px;
    margin-bottom: 40px;
    bottom: 0px;
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
    position: absolute;
`

const LogInBtn = styled.button`
    background-color: #FE7770;
    position: absolute;
`

export default Sidebar;