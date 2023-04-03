import styled from "styled-components";
import Navigation from "./components/Navigation";
import Table from "./components/Table";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

function Home() {
  return (
    <Wrapper>
      <Navigation />
      <Table />
    </Wrapper>
  );
}

export default Home;
