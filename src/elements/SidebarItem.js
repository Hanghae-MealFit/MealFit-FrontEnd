import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function SidebarItem({ menu, isLogin }) {
  // console.log(menu.icon)
  const navigate = useNavigate();

  const MenuClick = () => {
    if(!isLogin) {
      sessionStorage.clear()
    }
  }

  return (
    <MenuWrap className="sidebar-item" onClick={MenuClick}>
      <span>{menu.icon}</span>
      <p>{menu.name}</p>
    </MenuWrap>
  );
}

const MenuWrap = styled.div`
  width: 260px;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 6px 0;
  padding-left: 70px;
  box-sizing: border-box;
  span {
    margin: 0;
    margin-right: 14px;
  }
  p {
    margin: 0;
  }
`

export default SidebarItem;