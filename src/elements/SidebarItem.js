import React, { useEffect } from "react";
import styled, {css} from "styled-components";
import { useNavigate } from "react-router-dom";

function SidebarItem({ menu, isLogin }) {
  const navigate = useNavigate();
  const checkItem_name_ref = React.useRef(null);

  const MenuClick = () => {
    if(!isLogin) {
      sessionStorage.clear()
    }
    console.log("OnClick", checkItem_name_ref.current.innerText)
    if(checkItem_name_ref.current.innerText === menu.name) {
      checkItem_name_ref.current.style.backgroundColor = "black"
      navigate(`${menu.path}`)
    } else {
      checkItem_name_ref.current.style.backgroundColor = "transparent"
    }
  }

  let code = new URL(window.location.href);
  const data = code.href
  console.log(data)

  useEffect(() => {
    console.log("UseEffect", checkItem_name_ref.current.innerText)
  }, [])

  return (
    <MenuWrap className="sidebar-item" onClick={MenuClick} ref={checkItem_name_ref}>
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
  ${({checkMenu}) => {
    return css`
      color: ${checkMenu ? "green" : "white"}
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

export default SidebarItem;