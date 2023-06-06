import styled from "styled-components";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { formState, userIdState } from "../atom";
import { useHistory } from "react-router-dom";
import {
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { fbApp } from "../fbase";

const Form = styled.form`
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Title = styled.h6`
  font-size: 25px;
  font-weight: 600;
  margin-bottom: 30px;
`;

const ScoreDiv = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 30px;
  align-items: center;
  justify-content: space-between;
`;

const InnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  width: 100%;
`;

const Text = styled.label`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;
`;

const Button = styled.button`
  background-color: #0077ed;
  color: rgba(255, 255, 255, 0.9);
  border: none;
  padding: 13px 12px;
  font-size: 17px;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 119, 237, 0.8);
    color: rgb(255, 255, 255);
  }
`;

const Lists = styled.select`
  border-radius: 6px;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 24px;
  font-weight: 600;
  outline: none;
  transition: all 0.1s ease-in-out;
  box-shadow: -1px -1px 3px rgba(0, 0, 0, 0.2);
  &:hover {
    color: #000;
    transform: translateY(-3px);
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  }
`;

const List = styled.option`
  padding: 15px;
  font-size: 30px;
  font-weight: 600;
  border-radius: 10px;
  margin-bottom: 5px;
  cursor: pointer;
`;

const Input = styled.input<{ error: string | undefined }>`
  background-color: ${(props) =>
    props.error ? "rgba(255, 99, 71, 0.4)" : "none"};
  padding: 10px;
  font-size: 20px;
  border-radius: 8px;
  border: ${(props) =>
    props.error ? "2px solid tomato" : "1px solid rgba(0, 0, 0, 0.2)"};
  outline: none;
`;

const RadioInput = styled.input`
  width: 18px;
  height: 18px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  font-size: 20px;
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  outline: none;
  resize: none;
`;

const Checkboxes = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
`;

const ErrorMessage = styled.span`
  color: #de071c;
  font-size: 16px;
  font-weight: 500;
`;

const Checkbox = styled.div`
  display: flex;
  align-items: center;
`;

const CheckLabel = styled.label`
  font-size: 17px;
  font-weight: 600;
  margin-left: 3px;
  cursor: pointer;
`;

const XBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  right: -10px;
  top: -5px;
  color: rgba(0, 0, 0, 0.3);
  transition: color 0.1s ease-in-out;
  &:hover {
    color: rgba(0, 0, 0, 0.9);
  }
`;

interface ITableForm {
  dateId?: string;
}

interface IForm {
  score: string;
  with: string;
  etcText?: string;
  done: string;
  memo?: string;
}

function TableForm({ dateId }: ITableForm) {
  let history = useHistory();
  const setForm = useSetRecoilState(formState);
  const userId = useRecoilValue(userIdState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const [isEtc, setIsEtc] = useState(false);
  const db = getFirestore(fbApp);
  const onSubmit: SubmitHandler<IForm> = async (data) => {
    if (userId) {
      const datesRef = doc(db, userId, String(dateId).slice(0, 6));
      const docSnap = await getDoc(datesRef);
      await setDoc(doc(db, String(dateId), userId), {
        score: +data.score,
        with: data.with,
        done: data.done.trim(),
        memo: data.memo?.trim(),
        etc: data.etcText?.trim() || "",
      });
      if (!docSnap.exists()) {
        await setDoc(datesRef, {
          dates: [{ date: +String(dateId).slice(6), score: +data.score }],
        });
      } else {
        await updateDoc(datesRef, {
          dates: arrayUnion({
            date: +String(dateId).slice(6),
            score: +data.score,
          }),
        });
      }
      setForm(false);
    }
  };
  const hideTableForm = () => {
    setForm(false);
    history.push("/");
  };
  const hideEtcForm = () => {
    setIsEtc(false);
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <>
          <Title>
            {dateId && dateId.slice(4, 6) + "월 " + dateId.slice(6) + "일"}
          </Title>
          <XBtn type="button" onClick={hideTableForm}>
            <i className="fa-solid fa-xmark fa-3x"></i>
          </XBtn>
          <ScoreDiv style={{ flexDirection: "row" }}>
            <Text htmlFor="score">오늘 하루를 점수로 매긴다면?</Text>
            <Lists {...register("score", { required: true })}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                <List key={item} value={item}>
                  {item}
                </List>
              ))}
            </Lists>
          </ScoreDiv>
          <InnerDiv>
            <Text>
              누구랑 함께 했나요?{" "}
              {errors.with && <ErrorMessage>하나를 선택하세요</ErrorMessage>}
            </Text>
            <Checkboxes>
              <Checkbox>
                <RadioInput
                  type="radio"
                  id="alone"
                  {...register("with", { required: true })}
                  value="혼자"
                  onChange={hideEtcForm}
                />
                <CheckLabel htmlFor="alone">혼자</CheckLabel>
              </Checkbox>
              <Checkbox>
                <RadioInput
                  type="radio"
                  id="family"
                  {...register("with", { required: true })}
                  value="가족"
                  onChange={hideEtcForm}
                />
                <CheckLabel htmlFor="family">가족</CheckLabel>
              </Checkbox>
              <Checkbox>
                <RadioInput
                  type="radio"
                  id="friends"
                  {...register("with", { required: true })}
                  value="친구"
                  onChange={hideEtcForm}
                />
                <CheckLabel htmlFor="friends">친구</CheckLabel>
              </Checkbox>
              <Checkbox>
                <RadioInput
                  type="radio"
                  id="etc"
                  {...register("with", { required: true })}
                  value="etc"
                  onChange={() => {
                    setIsEtc((prev) => !prev);
                  }}
                />
                <CheckLabel htmlFor="etc">기타</CheckLabel>
              </Checkbox>
            </Checkboxes>
            {isEtc && (
              <Input
                style={{ marginTop: 15 }}
                error={errors.etcText?.message}
                {...register("etcText", {
                  required: isEtc ? "누구랑 함께했나요?" : false,
                })}
                placeholder="누구랑 함께 했나요?"
              />
            )}
          </InnerDiv>
          <InnerDiv>
            <Text htmlFor="done">오늘 무엇을 했나요?</Text>
            <Input
              id="done"
              error={errors.done?.message}
              {...register("done", {
                required: "오늘 기억남는 일을 적어주세요",
              })}
              placeholder="오늘 기억남는 일을 적어주세요"
            />
          </InnerDiv>
          <InnerDiv>
            <Text htmlFor="memo">메모</Text>
            <TextArea
              id="memo"
              rows={5}
              cols={35}
              {...register("memo", { maxLength: 100 })}
              placeholder="메모"
              maxLength={100}
            />
          </InnerDiv>
        </>
        <Button type="submit">기록하기</Button>
      </Form>
    </>
  );
}

export default TableForm;
