import styled from "styled-components";
import Router from "./Router";
import { auth } from "./fbase";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
`;

function App() {
  const [loggedIn, setLoggedIn] = useState(Boolean(auth.currentUser));
  return (
    <Container>
      <Router isLoggedIn={loggedIn} />
    </Container>
  );
}

export default App;
