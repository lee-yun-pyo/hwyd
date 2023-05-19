import styled from "styled-components";
import { auth } from "../fbase";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 30px;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #703eff;
  h1 {
    color: #fff;
    font-size: 20px;
    font-weight: 600;
  }
`;

const UserInfo = styled.div`
  position: relative;
`;

const Text = styled.span`
  color: rgba(255, 255, 255, 0.7);
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: rgb(255, 255, 255);
  }
`;

const Menu = styled.div`
  position: absolute;
  right: -10px;
  margin-top: 10px;
  z-index: 99;
  display: block;
  width: 140px;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  padding: 8px;
  border-radius: 5px;
`;

const SpanDiv = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.5);
  span {
    cursor: pointer;
    display: block;
    font-size: 17px;
    font-weight: 600;
    padding: 10px;
    text-align: center;
  }
  &:last-child {
    border-bottom: none;
  }
`;

function Navigation() {
  const [menu, setMenu] = useState(true);
  const user = auth.currentUser;
  const onLogout = async () => {
    await signOut(auth);
  };
  const showMenu = () => {
    setMenu((prev) => !prev);
  };
  return (
    <Container>
      <h1>How was your day?</h1>
      <UserInfo>
        <Text onClick={showMenu}>{user?.displayName || "사용자"}</Text>
        {menu && (
          <Menu>
            <SpanDiv>
              <Link to="/update-profile">
                <span>프로필 수정</span>
              </Link>
            </SpanDiv>
            <SpanDiv>
              <span onClick={onLogout}>로그아웃</span>
            </SpanDiv>
          </Menu>
        )}
      </UserInfo>
    </Container>
  );
}

export default Navigation;
