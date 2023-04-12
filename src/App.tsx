import styled from "styled-components";
import Router from "./Router";
import { auth } from "./fbase";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { userIdState } from "./atom";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: rgba(0, 0, 0, 0.8);
  min-height: 100vh;
`;

function App() {
  const [init, setInit] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const setUserId = useSetRecoilState(userIdState);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
        setUserId(user.uid);
      } else {
        setLoggedIn(false);
        setUserId(null);
      }
      setInit(true);
    });
  }, []);
  return (
    <Container>{init ? <Router isLoggedIn={loggedIn} /> : "Loading"}</Container>
  );
}

export default App;
