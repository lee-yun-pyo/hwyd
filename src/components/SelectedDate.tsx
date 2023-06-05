import styled from "styled-components";
import TableForm from "./TableForm";
import { useRecoilState, useRecoilValue } from "recoil";
import { formState, userIdState } from "../atom";
import {
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { fbApp } from "../fbase";
import { useEffect, useState } from "react";

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    font-size: 25px;
    font-weight: 600;
  }
`;

const BtnDiv = styled.div`
  button {
    background-color: #fff;
    color: rgba(0, 0, 0, 0.5);
    font-size: 18px;
    border: none;
    padding: 13px;
    cursor: pointer;
    border-radius: 15px;
    margin-left: 15px;
    transition: all 0.1s ease-in-out;
    &:hover {
      color: #000;
      transform: translateY(-3px);
      box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);
    }
  }
`;

const ContentDiv = styled.div`
  margin-bottom: 45px;
  display: flex;
  align-items: center;
`;

const SubTitle = styled.span`
  display: block;
  text-align: center;
  width: 100px;
  font-size: 20px;
  font-weight: 600;
  background-color: #fff;
  padding: 7px 0;
  border-radius: 20px;
  margin-right: 20px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3);
`;

const Text = styled.span`
  font-size: 20px;
`;

const Division = styled.div`
  margin: 34px 0;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 1px;
`;

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
  const deletePost = async () => {
    if (userId) {
      await deleteDoc(doc(db, selectedId, userId));
      const docRef = doc(db, userId, selectedId.slice(0, 6));
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data().dates;
        let days: number[] = [];
        data.forEach((item: any) => days.push(item.date));
        const index = days.indexOf(Number(selectedId.slice(6, 8)));
        data.splice(index, 1);
        await updateDoc(docRef, { dates: data });
      }
    }
  };
  return (
    <>
      {form ? (
        <TableForm dateId={selectedId} />
      ) : formData ? (
        <Content>
          <Head>
            <span>{dateText}</span>
            <BtnDiv>
              <button onClick={deletePost}>
                <i className="fa-solid fa-trash"></i>
              </button>
            </BtnDiv>
          </Head>
          <Division />
          <ContentDiv>
            <SubTitle>Score</SubTitle>
            <Text style={{ fontWeight: "600" }}>{formData.score}</Text>
          </ContentDiv>
          <ContentDiv>
            <SubTitle>With</SubTitle>
            <Text>
              {formData.with === "etc" ? formData.etc : formData.with}
            </Text>
          </ContentDiv>
          <ContentDiv>
            <SubTitle>What</SubTitle>
            <Text>{formData.done}</Text>
          </ContentDiv>
          <ContentDiv>
            <SubTitle>Memo</SubTitle>
            <Text>{formData.memo}</Text>
          </ContentDiv>
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
