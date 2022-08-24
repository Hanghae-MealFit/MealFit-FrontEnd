import React from "react";
import styled from "styled-components";

function SidebarItem({ menu }) {
  // console.log(menu.icon)
  return (
    <MenuWrap className="sidebar-item">
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