import styled from "styled-components";
import Navigation from "./components/Navigation";
import Table from "./components/Table";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 35px 0;
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 2fr;
`;

const Info = styled.div`
  background-color: aliceblue;
  width: 100%;
  height: 100%;
`;

function Home() {
  return (
    <Wrapper>
      <Navigation />
      <Main>
        <Info></Info>
        <Table />
      </Main>
    </Wrapper>
  );
}

export default Home;
