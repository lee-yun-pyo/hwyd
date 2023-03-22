import styled from "styled-components";
import Table from "./components/Table";
import TableForm from "./components/TableForm";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
`;

function App() {
  return (
    <Container>
      <Table />
      <TableForm />
    </Container>
  );
}

export default App;
