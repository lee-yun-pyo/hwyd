import styled from "styled-components";
import Table from "./components/Table";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
`;

function App() {
  return (
    <Container>
      <Table />
    </Container>
  );
}

export default App;
