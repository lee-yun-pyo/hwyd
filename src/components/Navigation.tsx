import styled from "styled-components";
import { auth } from "../fbase";
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
