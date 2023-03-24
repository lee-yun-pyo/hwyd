import styled from "styled-components";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, Variants, AnimatePresence } from "framer-motion";

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

const Lists = styled(motion.ul)`
  background-color: azure;
  border-radius: 6px;
  position: absolute;
  top: 60px;
  padding: 10px;
  overflow-y: scroll;
  max-height: 200px;
  width: 100%;
  cursor: pointer;
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

const List = styled(motion.li)`
  padding: 10px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 10px;
  margin-bottom: 5px;
  cursor: pointer;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 20px;
  border-radius: 8px;
  border: none;
  outline: none;
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
`;

const XBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 25px;
  top: 15px;
`;

const arrowVariants: Variants = {
  start: (showSelect: boolean) => {
    return {
      rotate: showSelect ? 180 : 0,
    };
  },
  move: (showSelect: boolean) => {
    return {
      rotate: showSelect ? 0 : 180,
      transition: {
        duration: 0.2,
      },
    };
  },
};

function TableForm() {
  const { register, handleSubmit } = useForm();
  const [showSelect, setShowSelect] = useState(false);
  const [score, setScore] = useState<number>(0);
  const [showForm, setShowForm] = useState(true);
  const [etc, setEtc] = useState(false);
  const toggleShowSelect = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setShowSelect((prev) => !prev);
  };
  const clickScore = (score: number) => {
    setScore(score);
    setShowSelect((prev) => !prev);
  };
  const hideForm = () => {
    setShowForm((prev) => !prev);
    // url도 변경
  };
  return (
    <>
      {showForm && (
        <Form>
          <>
            <Title>2023.03.23</Title>
            <XBtn onClick={hideForm}>
              <i className="fa-solid fa-xmark fa-3x"></i>
            </XBtn>
            <ScoreDiv style={{ flexDirection: "row" }}>
              <Text htmlFor="score">What score today?</Text>
              <div style={{ position: "relative" }}>
                <Button whileTap={{ scale: 0.97 }} onClick={toggleShowSelect}>
                  Score {score}
                  <motion.i
                    variants={arrowVariants}
                    custom={showSelect}
                    initial="start"
                    animate="move"
                    style={{ originY: 0.55, marginLeft: "10px" }}
                    className="fa-solid fa-caret-up fa-lg"
                  ></motion.i>
                </Button>
                <AnimatePresence>
                  {showSelect && (
                    <Lists
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                      }}
                      exit={{ opacity: 0 }}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                        <List
                          onClick={() => clickScore(item)}
                          whileHover={{ backgroundColor: "#e7edfe" }}
                          key={item}
                        >
                          {item}
                        </List>
                      ))}
                    </Lists>
                  )}
                </AnimatePresence>
              </div>
            </ScoreDiv>
            <InnerDiv>
              <Text>Who with?</Text>
              <Checkboxes>
                <Checkbox>
                  <Input
                    type="checkbox"
                    style={{ width: 18, height: 18 }}
                    id="alone"
                    {...register("done", { required: true })}
                  />
                  <CheckLabel htmlFor="alone">Alone</CheckLabel>
                </Checkbox>
                <Checkbox>
                  <Input
                    type="checkbox"
                    id="family"
                    style={{ width: 18, height: 18 }}
                    {...register("done", { required: true })}
                  />
                  <CheckLabel htmlFor="family">Family</CheckLabel>
                </Checkbox>
                <Checkbox>
                  <Input
                    type="checkbox"
                    id="friends"
                    style={{ width: 18, height: 18 }}
                    {...register("done", { required: true })}
                  />
                  <CheckLabel htmlFor="friends">Friends</CheckLabel>
                </Checkbox>
                <Checkbox>
                  <Input
                    type="checkbox"
                    id="etc"
                    style={{ width: 18, height: 18 }}
                    {...register("done", { required: true })}
                    onChange={() => {
                      setEtc((prev) => !prev);
                    }}
                  />
                  <CheckLabel htmlFor="etc">etc.</CheckLabel>
                </Checkbox>
              </Checkboxes>
              {etc && (
                <Input
                  style={{ marginTop: 15 }}
                  {...register("etc")}
                  placeholder="Who with?"
                />
              )}
            </InnerDiv>
            <InnerDiv>
              <Text htmlFor="done">What do?</Text>
              <Input
                id="done"
                {...register("done", { required: true })}
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
      )}
    </>
  );
}

export default TableForm;
