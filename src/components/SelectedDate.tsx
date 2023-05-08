import styled from "styled-components";
import TableForm from "./TableForm";
import { useRecoilState, useRecoilValue } from "recoil";
import { formState, userIdState } from "../atom";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { fbApp } from "../fbase";
import { useEffect, useState } from "react";

const Content = styled.div``;

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

interface ISelectedDate {
  selectedId: string;
}

function SelectedDate({ selectedId }: ISelectedDate) {
  const [form, setForm] = useRecoilState(formState);
  const userId = useRecoilValue(userIdState);
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
    if (selectedId) getData(selectedId);
  }, [selectedId]);
  const toggleShowForm = () => {
    setForm((prev) => !prev);
  };
  return (
    <>
      {form ? (
        <TableForm dateId={selectedId} />
      ) : formData ? (
        <Content>
          <Head>{selectedId}</Head>
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
