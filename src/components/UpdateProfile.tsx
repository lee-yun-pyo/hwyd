import styled from "styled-components";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import { auth } from "../fbase";
import { useHistory } from "react-router-dom";

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
  background-color: rgba(255, 255, 255, 0.1);
`;

const Content = styled.div`
  background-color: #fff;
  border-radius: 15px;
  padding: 35px;
  z-index: 999;
`;

const Form = styled.form``;

const Input = styled.input`
  padding: 10px;
  font-size: 20px;
  border: 2px solid tomato;
  outline: none;
`;

interface IForm {
  name: string;
}

function UpdateProfile() {
  const histroy = useHistory();
  const { register, handleSubmit } = useForm<IForm>();
  const user = auth.currentUser;
  const onSubmit: SubmitHandler<IForm> = async (data) => {
    const { name } = data;
    if (user) {
      await updateProfile(user, {
        displayName: name,
      });
    }
    histroy.push("/");
  };
  return (
    <Wrapper>
      <Overlay></Overlay>
      <Content>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input {...register("name", { required: true })} type="text" />
          <Input type="submit" />
        </Form>
      </Content>
    </Wrapper>
  );
}

export default UpdateProfile;
