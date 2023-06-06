import styled from "styled-components";
import Navigation from "./Navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { auth } from "../fbase";
import { useEffect, useState } from "react";
import { deleteUser, signOut, updateProfile } from "firebase/auth";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  padding: 0 20px;
  h1 {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 40px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  span {
    font-size: 17px;
    width: 100%;
    display: block;
    margin-bottom: 8px;
  }
`;

const Input = styled.input`
  padding: 10px;
  font-size: 20px;
  border: 1px solid #d6d6d6;
  padding: 12px;
  border-radius: 6px;
  text-align: left;
  margin-bottom: 20px;
  outline: none;
  &:last-child {
    color: #f9f9f9;
    border-radius: 30px;
    background-color: #0077ed;
    margin: 0;
    cursor: pointer;
    text-align: center;
    font-weight: 600;
    border: none;
    padding: 14px;
    font-size: 1rem;
    &:hover {
      background-color: rgba(0, 119, 237, 0.8);
    }
  }
`;

const Division = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
`;

const BtnDiv = styled.button`
  background-color: rgba(0, 119, 237, 0.3);
  padding: 15px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  width: 90%;
  margin-bottom: 10px;
  cursor: pointer;
  span {
    margin-right: 10px;
    font-weight: 600;
    font-size: 19px;
  }
  &:hover {
    background-color: rgba(0, 119, 237, 0.8);
    color: #fff;
  }
`;

interface IForm {
  name: string;
}

function Profile() {
  let history = useHistory();
  const { handleSubmit, register } = useForm<IForm>();
  const [name, setName] = useState<string>("");
  const user = auth.currentUser;
  useEffect(() => {
    if (user) setName(user.displayName || "사용자");
  }, []);
  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.currentTarget.value);
  };
  const updateName: SubmitHandler<IForm> = async (data) => {
    const { name } = data;
    if (user) {
      await updateProfile(user, {
        displayName: name,
      });
    }
  };
  const onLogout = async () => {
    await signOut(auth);
    history.replace("/");
  };
  const onDeleteUser = async () => {
    if (user) await deleteUser(user);
    history.replace("/");
  };
  return (
    <>
      <Navigation />
      <Container>
        <Wrapper>
          <h1>{user?.displayName || "사용자"}님의 프로필</h1>
          <div>
            <Form onSubmit={handleSubmit(updateName)}>
              <span>이름</span>
              <Input
                {...register("name", { required: true })}
                onChange={changeName}
                type="text"
                value={name}
                placeholder="이름"
              />
              <Input type="submit" value="수정 완료" />
            </Form>
          </div>
          <Division />
          <BtnDiv onClick={onLogout}>
            <span>로그아웃</span>
            <i className="fa-solid fa-right-from-bracket fa-lg"></i>
          </BtnDiv>
          <BtnDiv onClick={onDeleteUser}>
            <span>계정 삭제</span>
            <i className="fa-solid fa-user-minus fa-lg"></i>
          </BtnDiv>
        </Wrapper>
      </Container>
    </>
  );
}

export default Profile;
