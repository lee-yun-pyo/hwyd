import styled from "styled-components";
import { auth } from "../fbase";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px 50px;
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
  z-index: 99;
  border-bottom: 1px solid #ebebeb;
  box-shadow: 0 1px 10px rgba(0, 0, 0, 0.05);
  h1 {
    color: #000;
    font-size: 24px;
    font-weight: 600;
  }
`;

const UserInfo = styled.div`
  position: relative;
`;

const Text = styled.span`
  color: rgba(0, 0, 0, 0.7);
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    color: rgb(0, 0, 0);
  }
`;

function Navigation() {
  const user = auth.currentUser;
  return (
    <Container>
      <h1>How was your day?</h1>
      <UserInfo>
        <Text>
          <Link to="/profile">{user?.displayName || "사용자"}</Link>
        </Text>
      </UserInfo>
    </Container>
  );
}

export default Navigation;
