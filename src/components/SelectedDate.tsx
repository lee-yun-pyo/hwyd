import styled from "styled-components";
import TableForm from "./TableForm";
import { useRecoilState, useRecoilValue } from "recoil";
import { formState, userIdState } from "../atom";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { fbApp } from "../fbase";
import { useEffect, useState } from "react";

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

const Head = styled.div``;

const StartDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    font-size: 18px;
    font-weight: 500;
    text-align: left;
    width: 100%;
    letter-spacing: -0.3px;
  }
  span {
    font-size: 25px;
    font-weight: 600;
    margin: 25px 0;
  }
  button {
    background-color: rgba(112, 62, 255, 0.9);
    color: rgba(255, 255, 255, 0.9);
    border: none;
    padding: 11px 12px;
    font-size: 17px;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      background-color: rgb(112, 62, 255);
      color: rgb(255, 255, 255);
    }
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
  const dateText = `${selectedId.slice(4, 6)}월 ${selectedId.slice(6, 8)}일`;
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
          <div>{dateText}</div>
          <span>오늘 하루를 기록하세요</span>
          <button onClick={toggleShowForm}>기록하기</button>
        </StartDiv>
      )}
    </>
  );
}

export default SelectedDate;
