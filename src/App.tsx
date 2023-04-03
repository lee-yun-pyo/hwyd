import styled from "styled-components";
import Router from "./Router";
import { auth } from "./fbase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
`;

function App() {
  const [init, setInit] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <Container>{init ? <Router isLoggedIn={loggedIn} /> : "Loading"}</Container>
  );
}

export default App;
