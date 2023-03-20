import { useEffect, useState } from "react";
import styled from "styled-components";

const Calendar = styled.div`
  width: 50%;
`;

const Name = styled.h4`
  font-size: 45px;
  font-weight: 600;
  margin-bottom: 20px;
  color: rgba(255, 255, 255, 0.8);
`;

const Month = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DayOfNames = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 10px;
`;

const DayOfName = styled.span`
  font-weight: 600;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.8);
`;

const Week = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

const Day = styled.div`
  background-color: aliceblue;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  height: 70px;
`;

function Table() {
  const [year, setYear] = useState<number>(2023);
  const [month, setMonth] = useState<number>(1);
  const [date, setDate] = useState<number[]>([]);
  useEffect(() => {
    setYear(new Date().getFullYear());
    setMonth(new Date().getMonth() + 1);
  }, []);
  useEffect(() => {
    let dates = [];
    const lastDay = new Date(year, month, 0);
    const dayOfFirst = new Date(year, month - 1).getDay();
    console.log("dayOfFirst", dayOfFirst);
    for (let i = 0; i < dayOfFirst; i++) {
      dates.push(0);
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      dates.push(i);
    }
    setDate(dates);
  }, [month, year]);
  return (
    <Calendar>
      <Name>3 March</Name>
      <Month>
        <DayOfNames>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((item) => (
            <DayOfName key={item}>{item}</DayOfName>
          ))}
        </DayOfNames>
        <Week>
          {date.map((item) =>
            item === 0 ? (
              <Day style={{ visibility: "hidden" }}></Day>
            ) : (
              <Day key={item}>{item}</Day>
            )
          )}
        </Week>
      </Month>
    </Calendar>
  );
}

export default Table;
