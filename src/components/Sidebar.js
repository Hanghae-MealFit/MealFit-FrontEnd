import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import SidebarItem from "../elements/SidebarItem";

const Sidebar = () => {
    const menus = [
        { name: "식단게시판", path: "/" },
        { name: "식단가이드", path: "/" },
        { name: "기록하기", path: "/" }
    ];

    const onhandleSignOut = async (e) => {
        e.preventDefault()
      }

    return (
        <SideBar>
            <Logo>
                밀핏
            </Logo>

            <SideBox>
                <Info>
                    <Profile src={"https://images.unsplash.com/photo-1535473895227-bdecb20fb157?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDUxfF9oYi1kbDRRLTRVfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"}></Profile>
                    <span>로그인 해주세요</span>
                </Info>

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
            </SideBox>

            <Button>
                    <SignOutBtn onClick={onhandleSignOut}>로그아웃</SignOutBtn>
            </Button>

        </SideBar>
    );
}

const SideBar = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    position: absolute;
    width: 260px;
    height: 100%;
    left: 0px;
    top: 0px;
    background-color: #FE7770;
`;

const Info = styled.div`
    margin: 20px auto;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    // background-color: green;
`;

const SideBox = styled.div`
    margin-top: 100px;
    // background-color: red;
`;

const Profile = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-right: 20px;

`
const Menu = styled.div`
    margin-top: 50px;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 18px;
    // background-color: pink;
`;

const Logo = styled.div`
    position: absolute;
    width: 70x;
    height: 44px;
    left: 90px;
    top: 22px;

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
//   margin: 0 auto;
//   display: flex;
//   justify-content: center;
//   align-items: center;
  button {
    width: 140px;
    height: 40px;
    margin: 0 10px;
    margin-bottom: 40px;
    left: 50px;
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

const SignOutBtn = styled.button`
    background-color: #FE7770;
    position: absolute;
    left: 50px;
`

export default Sidebar;