import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import { auth } from "../fbase";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  border-radius: 15px;
  padding: 40px 35px;
  z-index: 999;
  h4 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 20px;
  background-color: rgba(112, 62, 255, 0.1);
  border: 1px solid #d6d6d6;
  padding: 12px;
  border-radius: 6px;
  text-align: left;
  margin-bottom: 20px;
  outline: none;
  &:last-child {
    color: #f9f9f9;
    background-color: #703eff;
    margin: 0;
    cursor: pointer;
    text-align: center;
    font-weight: 600;
    border: none;
    padding: 10px;
    font-size: 1rem;
    &:hover {
      background-color: rgba(112, 62, 255, 0.9);
    }
  }
`;

interface IForm {
  name: string;
}

function UpdateProfile() {
  const histroy = useHistory();
  const { register, handleSubmit, setFocus } = useForm<IForm>();
  const [value, setValue] = useState<string>("");
  const user = auth.currentUser;
  useEffect(() => {
    setFocus("name");
    if (user) setValue(user.displayName || "사용자");
  }, []);
  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };
  const onSubmit: SubmitHandler<IForm> = async (data) => {
    const { name } = data;
    if (user) {
      await updateProfile(user, {
        displayName: name,
      });
    }
    histroy.replace("/");
    histroy.go(0);
  };
  const hideModal = () => histroy.replace("/");
  return (
    <Wrapper>
      <Overlay onClick={hideModal}></Overlay>
      <Content>
        <h4>프로필 이름 변경</h4>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("name", { required: true })}
            onChange={changeValue}
            value={value}
            type="text"
            required
          />
          <Input type="submit" value={"변경"} />
        </Form>
      </Content>
    </Wrapper>
  );
}

export default UpdateProfile;
