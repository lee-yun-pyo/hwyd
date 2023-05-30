import styled from "styled-components";
import Navigation from "./components/Navigation";
import Table from "./components/Table";
import SelectedDate from "./components/SelectedDate";
import { useRecoilState } from "recoil";
import { selectedState } from "./atom";
import { useEffect } from "react";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 40px;
`;

const Main = styled.div`
  display: flex;
  justify-content: center;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Info = styled.div`
  background-color: aliceblue;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 35px 30px;
  width: 520px;
  height: 100%;
`;

const TableWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

function Home() {
  const [selectedId, setSelectedId] = useRecoilState(selectedState);
  useEffect(() => {
    const today = new Date();
    const todayId =
      String(today.getFullYear()) +
      String(
        today.getMonth() + 1 < 10
          ? "0" + String(today.getMonth() + 1)
          : today.getMonth() + 1
      ) +
      String(
        today.getDate() < 10 ? "0" + String(today.getDate()) : today.getDate()
      );
    setSelectedId(todayId);
  }, []);
  return (
    <Wrapper>
      <Navigation />
      <Main>
        <InfoWrapper>
          <Info>{selectedId && <SelectedDate selectedId={selectedId} />}</Info>
        </InfoWrapper>
        <TableWrapper>
          <Table />
        </TableWrapper>
      </Main>
    </Wrapper>
  );
}

export default Home;
