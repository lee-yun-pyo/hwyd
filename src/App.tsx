import styled from "styled-components";
import Router from "./Router";
import { firebase } from "./fbase";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
`;

function App() {
  console.log(firebase);
  return (
    <Container>
      <Router />
    </Container>
  );
}

export default App;
