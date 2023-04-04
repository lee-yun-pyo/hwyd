import styled from "styled-components";
import { auth } from "../fbase";
import { signOut } from "firebase/auth";

const Container = styled.div``;

const Text = styled.span`
  color: #fff;
`;

function Navigation() {
  const user = auth.currentUser;
  const onLogout = async () => {
    await signOut(auth);
  };
  return (
    <Container>
      <Text>{user?.email}</Text>
      <button onClick={onLogout}>Logout</button>
    </Container>
  );
}

export default Navigation;
