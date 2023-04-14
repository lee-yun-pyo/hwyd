import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import TableForm from "./TableForm";
import { useRecoilState, useRecoilValue } from "recoil";
import { formState, userIdState } from "../atom";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { fbApp } from "../fbase";
import { useEffect, useState } from "react";

const Content = styled.div`
  color: rgba(255, 255, 255, 0.8);
`;

const Head = styled.div``;

const StartDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    background-color: rgba(255, 255, 255, 0.8);
    width: 100%;
    height: 1px;
  }
  span {
    font-size: 25px;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 600;
    margin: 25px 0;
  }
  button {
    border: none;
    padding: 12px 14px;
    font-size: 20px;
    border-radius: 8px;
    cursor: pointer;
  }
`;

interface IFormData {
  score: number;
  with: string;
  etc?: string;
  done: string;
  memo?: string;
}

function SelectedDate() {
  const [form, setForm] = useRecoilState(formState);
  const userId = useRecoilValue(userIdState);
  let match = useRouteMatch<{ dateId: string }>("/:dateId");
  const dateId = match?.params.dateId;
  const [formData, setFormData] = useState<IFormData | null>(null);
  const db = getFirestore(fbApp);
  useEffect(() => {
    async function getData(id: string) {
      if (id && userId) {
        const docRef = doc(db, id, userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data() as IFormData;
          setFormData(data);
        } else {
          setFormData(null);
        }
      }
    }
    if (dateId) getData(dateId);
  }, [dateId]);
  const toggleShowForm = () => {
    setForm((prev) => !prev);
  };
  return (
    <>
      {form ? (
        <TableForm dateId={dateId} />
      ) : formData ? (
        <Content>
          <Head>{dateId}</Head>
          <span>Score: {formData.score}</span>
          <br />
          <span>
            With: {formData.with === "etc" ? formData.etc : formData.with}
          </span>
          <br />
          <span>Done: {formData.done}</span>
          <br />
          <p>Memo: {formData.memo}</p>
        </Content>
      ) : (
        <StartDiv>
          <div></div>
          <span>오늘 하루를 기록하세요</span>
          <button onClick={toggleShowForm}>기록하기</button>
        </StartDiv>
      )}
    </>
  );
}

export default SelectedDate;
