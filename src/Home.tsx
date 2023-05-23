import styled from "styled-components";
import Navigation from "./components/Navigation";
import Table from "./components/Table";
import SelectedDate from "./components/SelectedDate";
import { useRecoilValue } from "recoil";
import { selectedState } from "./atom";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 35px 0;
`;

const Main = styled.div`
  padding: 45px 20px 0 20px;
  display: grid;
  grid-template-columns: 1.2fr 2fr;
`;

const Info = styled.div`
  background-color: aliceblue;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 20px;
  width: 100%;
  height: 100%;
`;

function Home() {
  const selectedId = useRecoilValue(selectedState);
  return (
    <Wrapper>
      <Navigation />
      <Main>
        <Info>{selectedId && <SelectedDate selectedId={selectedId} />}</Info>
        <Table />
      </Main>
    </Wrapper>
  );
}

export default Home;
