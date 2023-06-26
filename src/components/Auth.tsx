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
import { motion } from "framer-motion";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

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
  margin: 30px 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

interface IInput {
  $showpwinput: boolean;
  $pwinput: boolean;
}

const Input = styled(motion.input)<IInput>`
  outline: none;
  padding: 20px;
  width: 100%;
  border: 1px solid #d6d6d6;
  padding: 25px 12px 5px 12px;
  text-align: left;
  font-size: 20px;
  border-radius: ${(props) =>
    props.$pwinput
      ? "0 0 10px 10px"
      : props.$showpwinput
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

const ErrorMessage = styled.span`
  color: #de071c;
  margin-top: 12px;
`;

const GoogleBtnDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
`;

const GoogleBtn = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 16px 14px;
  margin-top: 10px;
  border-radius: 50px;
  outline: none;
  font-size: 14px;
  background-color: #0077ed;
  border: none;
  color: #fff;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 119, 237, 0.8);
  }
  i {
    font-size: 18px;
    margin-right: 7px;
  }
`;

const DivisionDiv = styled.div`
  width: 100%;
  height: 1px;
  margin: 30px 0;
  background-color: rgba(0, 0, 0, 0.2);
`;

const SignUpDiv = styled.div``;

const SignUpLink = styled(Link)`
  font-size: 15px;
  color: rgba(52, 152, 219);
  span {
    margin-right: 10px;
    &:hover {
      text-decoration: underline;
    }
  }
`;

interface IFormInput {
  email: string;
  password: string;
}

function Auth() {
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>();
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
            message: "ID 또는 비밀번호가 일치하지 않습니다.",
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
      <MainTextDiv>
        <h1>HWYD ID</h1>
      </MainTextDiv>
      <FormDiv>
        <Form onSubmit={handleSubmit(onLogin)}>
          <InputWrapper>
            <Input
              {...register("email", { required: true })}
              $showpwinput={pwInput}
              $pwinput={false}
              type="text"
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
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ type: "tween" }}
                $showpwinput={pwInput}
                $pwinput={true}
                type="password"
                placeholder="password"
                required
              />
              <InputSubText className="input__label">Password</InputSubText>
              <InputArrowBtn
                className="iconBtn"
                type="submit"
                onClick={showPwInputByClick}
              >
                <i className="fa-solid fa-arrow-right"></i>
              </InputArrowBtn>
            </InputWrapper>
          )}
        </Form>
        {errors.email?.message && (
          <ErrorMessage>{errors.email.message}</ErrorMessage>
        )}
      </FormDiv>
      <GoogleBtnDiv>
        <span>구글로 로그인하기</span>
        <GoogleBtn onClick={googleLogin}>
          <i className="fa-brands fa-google"></i>
          <span> Sign in with Google</span>
        </GoogleBtn>
      </GoogleBtnDiv>
      <DivisionDiv />
      <SignUpDiv>
        <SignUpLink to="/signup">
          <span>계정이 없으신가요?</span>
          <i className="fa-solid fa-arrow-right"></i>
        </SignUpLink>
      </SignUpDiv>
    </Container>
  );
}

export default Auth;
