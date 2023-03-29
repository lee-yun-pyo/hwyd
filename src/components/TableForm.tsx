import styled from "styled-components";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { formState } from "../atom";
import { useHistory } from "react-router-dom";

const Form = styled.form`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px 25px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Title = styled.h6`
  font-size: 25px;
  font-weight: 600;
`;

const ScoreDiv = styled.div`
  display: flex;
  width: 100%;
  margin: 15px 0;
  align-items: center;
  justify-content: space-between;
`;

const InnerDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
  width: 100%;
`;

const Text = styled.label`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
`;

const Button = styled(motion.button)`
  padding: 15px;
  text-align: start;
  border-radius: 10px;
  border: none;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
`;

const Lists = styled(motion.select)`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 6px;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 24px;
  font-weight: 600;
  outline: none;
  &::-webkit-scrollbar-track {
    border-radius: 100px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
    background-color: azure;
  }
  &::-webkit-scrollbar {
    width: 8px;
    border-radius: 100px;
    background-color: azure;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 100px;
    background-color: #000000;
  }
`;

const List = styled(motion.option)`
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
  border: ${(props) => (props.error ? "1px solid tomato" : "none")};
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
  border: none;
  outline: none;
  resize: none;
`;

const Checkboxes = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
`;

const Checkbox = styled.div`
  display: flex;
  align-items: center;
`;

const CheckLabel = styled.label`
  font-size: 18px;
  font-weight: 600;
  margin-left: 3px;
  cursor: pointer;
`;

const XBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 25px;
  top: 15px;
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();
  const [isEtc, setIsEtc] = useState(false);
  const onSubmit = (data: any) => {
    console.log(data);
    // string 값들 trim()화 필요
    // etc선택후 다른 걸 선택했을 때 etcText 값이 나타나지 않도록
    // radio 선택하지 않고 submit 했을 때 에러처리
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
          <XBtn onClick={hideTableForm}>
            <i className="fa-solid fa-xmark fa-3x"></i>
          </XBtn>
          <ScoreDiv style={{ flexDirection: "row" }}>
            <Text htmlFor="score">What score today?</Text>
            <AnimatePresence>
              <Lists
                whileTap={{ scale: 0.97 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                }}
                exit={{ opacity: 0 }}
                {...register("score", { required: true })}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                  <List
                    whileHover={{ backgroundColor: "#e7edfe" }}
                    key={item}
                    value={item}
                  >
                    {item}
                  </List>
                ))}
              </Lists>
            </AnimatePresence>
          </ScoreDiv>
          <InnerDiv>
            <Text>Who with?</Text>
            <Checkboxes>
              <Checkbox>
                <RadioInput
                  type="radio"
                  id="alone"
                  {...register("with", { required: true })}
                  value="alone"
                  onChange={hideEtcForm}
                />
                <CheckLabel htmlFor="alone">Alone</CheckLabel>
              </Checkbox>
              <Checkbox>
                <RadioInput
                  type="radio"
                  id="family"
                  {...register("with", { required: true })}
                  value="family"
                  onChange={hideEtcForm}
                />
                <CheckLabel htmlFor="family">Family</CheckLabel>
              </Checkbox>
              <Checkbox>
                <RadioInput
                  type="radio"
                  id="friends"
                  {...register("with", { required: true })}
                  value="friends"
                  onChange={hideEtcForm}
                />
                <CheckLabel htmlFor="friends">Friends</CheckLabel>
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
                <CheckLabel htmlFor="etc">etc.</CheckLabel>
              </Checkbox>
            </Checkboxes>
            {isEtc && (
              <Input
                style={{ marginTop: 15 }}
                error={errors.etcText?.message}
                {...register("etcText", {
                  required: isEtc ? "누구랑 함께했나요?" : false,
                })}
                placeholder="Who with?"
              />
            )}
          </InnerDiv>
          <InnerDiv>
            <Text htmlFor="done">What do?</Text>
            <Input
              id="done"
              error={errors.done?.message}
              {...register("done", {
                required: "오늘 기억남는 일을 적어주세요",
              })}
              placeholder="What did you do today?"
            />
          </InnerDiv>
          <InnerDiv>
            <Text htmlFor="memo">Memo</Text>
            <TextArea
              id="memo"
              rows={5}
              cols={35}
              {...register("memo", { maxLength: 100 })}
              placeholder="Write Anything"
              maxLength={100}
            />
          </InnerDiv>
        </>
        <Button
          style={{ textAlign: "center", marginTop: 7, width: "fit-content" }}
        >
          Submit
        </Button>
      </Form>
    </>
  );
}

export default TableForm;
