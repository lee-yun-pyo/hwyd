import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Switch, Route, Link } from "react-router-dom";
import SelectedDate from "./SelectedDate";

const Calendar = styled.div`
  width: 500px;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
  position: relative;
`;

const Name = styled(motion.h4)`
  font-size: 45px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  position: absolute;
`;

const Btns = styled.div`
  position: absolute;
  right: 0;
`;

const Btn = styled.button`
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  color: rgba(0, 0, 0, 0.7);
  padding: 5px;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  &:last-child {
    margin-left: 10px;
  }
`;

const Month = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 40px;
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

const Week = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
`;

const Day = styled(motion.div)`
  background-color: aliceblue;
  border-radius: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  height: 70px;
  cursor: pointer;
`;

const nameVariant: Variants = {
  start: (direction: number) => {
    return {
      y: direction > 0 ? 50 : -50,
      opacity: 0,
    };
  },
  move: {
    y: 0,
    opacity: 1,
  },
  end: (direction: number) => {
    return {
      y: direction < 0 ? 50 : -50,
      opacity: 0,
    };
  },
};

const weekVariant: Variants = {
  initial: (direction: number) => {
    return {
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    };
  },
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return { x: direction < 0 ? 300 : -300, opacity: 0 };
  },
};

function Table() {
  const [year, setYear] = useState<number>(2023);
  const [[month, engMonth], setMonth] = useState<[number, string]>([1, "Jan"]);
  const [date, setDate] = useState<number[]>([]);
  const [direction, setDirection] = useState<number>(0);
  useEffect(() => {
    const today = new Date();
    setYear(today.getFullYear());
    setMonth([today.getMonth() + 1, today.toString().slice(4, 7)]);
  }, []);
  useEffect(() => {
    let dates = [];
    const lastDay = new Date(year, month, 0);
    const dayOfFirst = new Date(year, month - 1).getDay();
    for (let i = 0, j = 0; i < dayOfFirst; i++, j--) {
      dates.push(j);
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      dates.push(i);
    }
    setDate(dates);
  }, [month, year]);
  const goPreviousMonth = (newDirection: number) => {
    const today = new Date(`${year}-${month - 1}`);
    setMonth((prev) =>
      prev[0] === 1 ? [12, "Dec"] : [prev[0] - 1, today.toString().slice(4, 7)]
    );
    setYear((prev) => (month === 1 ? prev - 1 : prev));
    setDirection(newDirection);
  };
  const goNextMonth = (newDirection: number) => {
    const today = new Date(`${year}-${month + 1}`);
    setMonth((prev) =>
      prev[0] === 12 ? [1, "Jan"] : [prev[0] + 1, today.toString().slice(4, 7)]
    );
    setYear((prev) => (month === 12 ? prev + 1 : prev));
    setDirection(newDirection);
  };
  return (
    <Calendar>
      <Head>
        <AnimatePresence initial={false} custom={direction}>
          <Name
            key={year + "1" + month}
            custom={direction}
            variants={nameVariant}
            initial="start"
            animate="move"
            exit="end"
          >
            {month} {engMonth} {year}
          </Name>
        </AnimatePresence>
        <Btns>
          <Btn onClick={() => goPreviousMonth(-1)}>{"◀"}</Btn>
          <Btn onClick={() => goNextMonth(1)}>{"▶"}</Btn>
        </Btns>
      </Head>
      <Month>
        <DayOfNames>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((item) => (
            <DayOfName key={item}>{item}</DayOfName>
          ))}
        </DayOfNames>
        <Week
          key={year + "2" + month}
          custom={direction}
          variants={weekVariant}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        >
          <AnimatePresence initial={false} custom={direction}>
            {date.map((item) =>
              item <= 0 ? (
                <Day key={item} style={{ visibility: "hidden" }}></Day>
              ) : (
                <Link
                  key={item}
                  to={`/${
                    year +
                    "" +
                    (month < 10 ? "0" + month : month) +
                    (item < 10 ? "0" + item : item)
                  }`}
                >
                  <Day
                    id={
                      year +
                      "" +
                      (month < 10 ? "0" + month : month) +
                      (item < 10 ? "0" + item : item)
                    }
                  >
                    {item}
                  </Day>
                </Link>
              )
            )}
          </AnimatePresence>
        </Week>
      </Month>
      <Switch>
        <Route path="/:dateId">
          <SelectedDate />
        </Route>
      </Switch>
    </Calendar>
  );
}

export default Table;
