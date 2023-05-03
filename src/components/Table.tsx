import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { Link, useHistory } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { formState, userIdState } from "../atom";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { fbApp } from "../fbase";

const Calendar = styled.div`
  width: 500px;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40px 0;
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

interface IDay {
  istoday: number;
  isnextdays: string | undefined;
  scoreday: number;
}

const DayLink = styled(Link)<{ isnextdays: string | undefined }>`
  pointer-events: ${(props) => (props.isnextdays ? "none" : "unset")};
  cursor: ${(props) => (props.isnextdays ? "default" : "pointer")};
`;

const Day = styled(motion.div)<IDay>`
  background-color: ${(props) => (props.istoday ? "tomato" : "aliceblue")};
  background-color: ${(props) =>
    props.scoreday === 0
      ? "aliceblue"
      : `rgba(52, 152, 219, ${props.scoreday * 0.1})`};
  border-radius: ${(props) => (props.istoday ? "50%" : "7px")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  height: 70px;
  pointer-events: none;
  opacity: ${(props) => (props.isnextdays ? "0.5" : "1")};
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

interface IScoreObj {
  date: number;
  score: number;
}

function Table() {
  let history = useHistory();
  const [year, setYear] = useState<number>(2023);
  const [[month, engMonth], setMonth] = useState<[number, string]>([1, "Jan"]);
  const [date, setDate] = useState<number[]>([]);
  const [direction, setDirection] = useState<number>(0);
  const [scoreObj, setScoreObj] = useState<IScoreObj[]>([]);
  const [scoreDays, setScoreDays] = useState<number[]>([]);
  const userId = useRecoilValue(userIdState);
  const db = getFirestore(fbApp);
  const setForm = useSetRecoilState(formState);
  const today = new Date();
  const today1 =
    String(today.getFullYear()) +
    String(
      today.getMonth() + 1 < 10
        ? "0" + String(today.getMonth() + 1)
        : today.getMonth() + 1
    ) +
    String(
      today.getDate() < 10 ? "0" + String(today.getDate()) : today.getDate()
    );
  useEffect(() => {
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
  useEffect(() => {
    setScoreDays([]);
    setScoreObj([]);
    async function getScores(month: string) {
      if (userId && month) {
        const docRef = doc(db, userId, String(year) + month);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          let days: number[] = [];
          const data = docSnap.data().dates;
          data.forEach((item: any) => days.push(item.date));
          setScoreObj(data);
          setScoreDays(days);
        }
      }
    }
    if (month < 10) getScores("0" + String(month));
    else getScores(String(month));
  }, [userId, year, month]);
  const goPreviousMonth = (newDirection: number) => {
    const thisMonth = new Date(`${year}-${month - 1}`);
    setMonth((prev) =>
      prev[0] === 1
        ? [12, "Dec"]
        : [prev[0] - 1, thisMonth.toString().slice(4, 7)]
    );
    setYear((prev) => (month === 1 ? prev - 1 : prev));
    setDirection(newDirection);
    setForm(false);
    history.push("/");
  };
  const goNextMonth = (newDirection: number) => {
    const thisMonth = new Date(`${year}-${month + 1}`);
    setMonth((prev) =>
      prev[0] === 12
        ? [1, "Jan"]
        : [prev[0] + 1, thisMonth.toString().slice(4, 7)]
    );
    setYear((prev) => (month === 12 ? prev + 1 : prev));
    setDirection(newDirection);
    setForm(false);
    history.push("/");
  };
  const toggleShowForm = () => {
    setForm(false);
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
                <Day
                  istoday={false ? 1 : 0}
                  isnextdays={undefined}
                  scoreday={0}
                  key={item}
                  style={{ visibility: "hidden" }}
                ></Day>
              ) : (
                <DayLink
                  key={item}
                  to={`/${
                    year +
                    "" +
                    (month < 10 ? "0" + month : month) +
                    (item < 10 ? "0" + item : item)
                  }`}
                  isnextdays={
                    +String(
                      year +
                        "" +
                        (month < 10 ? "0" + month : month) +
                        (item < 10 ? "0" + item : item)
                    ) > +today1
                      ? "1"
                      : undefined
                  }
                >
                  <Day
                    onClick={toggleShowForm}
                    id={
                      year +
                      "" +
                      (month < 10 ? "0" + month : month) +
                      (item < 10 ? "0" + item : item)
                    }
                    istoday={
                      String(
                        year +
                          "" +
                          (month < 10 ? "0" + month : month) +
                          (item < 10 ? "0" + item : item)
                      ) === today1
                        ? 1
                        : 0
                    }
                    isnextdays={
                      +String(
                        year +
                          "" +
                          (month < 10 ? "0" + month : month) +
                          (item < 10 ? "0" + item : item)
                      ) > +today1
                        ? "1"
                        : undefined
                    }
                    scoreday={
                      scoreDays.indexOf(item) < 0
                        ? 0
                        : scoreObj[scoreDays.indexOf(item)].score
                    }
                  >
                    {item}
                  </Day>
                </DayLink>
              )
            )}
          </AnimatePresence>
        </Week>
      </Month>
    </Calendar>
  );
}

export default Table;
