import styled from "styled-components";
import { auth } from "../fbase";

const Container = styled.div``;

const Text = styled.span`
  color: #fff;
`;

function Navigation() {
  const user = auth.currentUser;
  return (
    <Container>
      <Text>{user?.email}</Text>
    </Container>
  );
}

export default Navigation;
