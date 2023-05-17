import { useForm, SubmitHandler } from "react-hook-form";
import { auth } from "../fbase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import styled from "styled-components";
import { InputSubText, InputWrapper } from "./SignUp";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoDiv = styled.div``;

const MainTextDiv = styled.div`
  margin-bottom: 20px;
  h1 {
    font-size: 30px;
    font-weight: 600;
  }
`;

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

interface IInput {
  displayPwInput: boolean;
  isPwInput: boolean;
}

const Input = styled.input<IInput>`
  outline: none;
  padding: 20px;
  width: 100%;
  border: 1px solid #d6d6d6;
  padding: 25px 12px 5px 12px;
  text-align: left;
  font-size: 20px;
  border-radius: ${(props) =>
    props.isPwInput
      ? "0 0 10px 10px"
      : props.displayPwInput
      ? "10px 10px 0 0"
      : "10px"};
  &:focus {
    box-shadow: 0px 0px 0px 4px rgba(52, 152, 219, 0.8);
    border-color: #2980b9;
  }
  &:focus ~ .input__label,
  &:valid ~ .input__label,
  &:not(:placeholder-shown) ~ .input__label {
    transform: translate(0, -13px) scale(0.6);
  }
  &:focus ~ .iconBtn,
  &:valid ~ .iconBtn,
  &:not(:placeholder-shown) ~ .iconBtn {
    transform: translate(0, 7px);
    border-color: #494949;
    i {
      color: #494949;
    }
  }
  &::placeholder {
    opacity: 0;
  }
`;

const InputArrowBtn = styled.button`
  position: absolute;
  right: 8px;
  top: 13px;
  padding: 5px;
  border: 3px;
  background-color: transparent;
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, 0.4);
  transform-origin: right;
  transition: transform 0.25s;
  i {
    display: block;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.4);
  }
`;
const GoogleBtn = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const DivisionDiv = styled.div`
  width: 100%;
  height: 1px;
  margin: 30px 0;
  background-color: #fff;
`;

const SignUpDiv = styled.div``;

const SignUpLink = styled(Link)``;

interface IFormInput {
  email: string;
  password: string;
}

function Auth() {
  const { register, handleSubmit, setError, setFocus, setValue } =
    useForm<IFormInput>();
  const [pwInput, setPwInput] = useState(false);
  useEffect(() => {
    setFocus("password");
    setValue("password", "");
  }, [pwInput]);
  const onLogin: SubmitHandler<IFormInput> = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
    } catch (error: any) {
      if (error) {
        setError(
          "email",
          {
            type: "manual",
            message: "이메일 또는 비밀번호가 일치하지 않습니다.",
          },
          { shouldFocus: true }
        );
      }
    }
  };
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };
  const showPwInputByEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.currentTarget.value !== "") {
      setPwInput(false);
      if (event.key === "Enter") setPwInput(true);
    }
  };
  const showPwInputByClick = () => {
    setPwInput(true);
  };
  return (
    <Container>
      <LogoDiv></LogoDiv>
      <MainTextDiv>
        <h1>HWYD ID</h1>
      </MainTextDiv>
      <FormDiv>
        <Form onSubmit={handleSubmit(onLogin)}>
          <InputWrapper>
            <Input
              {...register("email", { required: true })}
              displayPwInput={pwInput}
              isPwInput={false}
              type="email"
              placeholder="ID"
              required
              onKeyDown={(e) => showPwInputByEnter(e)}
            />
            <InputSubText className="input__label">hwyd ID</InputSubText>
            {!pwInput && (
              <InputArrowBtn
                className="iconBtn"
                type="button"
                onClick={showPwInputByClick}
                disabled
              >
                <i className="fa-solid fa-arrow-right"></i>
              </InputArrowBtn>
            )}
          </InputWrapper>
          {pwInput && (
            <InputWrapper>
              <Input
                {...register("password", { required: true })}
                displayPwInput={pwInput}
                isPwInput={true}
                type="password"
                placeholder="password"
                required
              />
              <InputSubText className="input__label">Password</InputSubText>
            </InputWrapper>
          )}
        </Form>
        <div>
          <GoogleBtn onClick={googleLogin}>Sign in with Google</GoogleBtn>
        </div>
      </FormDiv>
      <DivisionDiv />
      <SignUpDiv>
        <SignUpLink to="/signup">Sign Up</SignUpLink>
      </SignUpDiv>
    </Container>
  );
}

export default Auth;
