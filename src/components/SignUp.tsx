import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../fbase";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router-dom";

const Container = styled.div`
  width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: aliceblue;
  padding: 50px 30px 40px;
  border-radius: 10px;
`;

const IntroText = styled.div`
  text-align: center;
  h1 {
    font-size: 35px;
    font-weight: 600;
  }
  div {
    font-size: 15px;
    padding-top: 20px;
    a {
      color: skyblue;
      cursor: pointer;
    }
    a:hover {
      text-decoration: underline;
      font-weight: 600;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding-top: 30px;
  width: 100%;
`;

const EmailInput = styled.div`
  position: relative;
`;

const EmailInfoText = styled.span`
  display: block;
  text-align: left;
  font-size: 12px;
  font-weight: 400;
  color: #666;
  margin-top: 3px;
`;

const InputSubText = styled.span`
  font-size: 20px;
  display: block;
  position: absolute;
  left: 12px;
  top: 14px;
  pointer-events: none;
  color: rgba(0, 0, 0, 0.5);
  transform-origin: left;
  transition: transform 0.25s;
`;

const Input = styled.input<{ isCheck: string | undefined }>`
  width: 100%;
  background-color: rgba(112, 62, 255, 0.1);
  border: 1px solid #d6d6d6;
  padding: 25px 12px 5px 12px;
  border-radius: 6px;
  text-align: left;
  outline: none;
  font-size: 20px;
  margin-bottom: 10px;
  &:focus {
    border-color: #0070c9;
    box-shadow: 0 0 0 3px rgba(131, 192, 253, 0.5);
  }
  &::placeholder {
    opacity: 0;
  }
  &:focus ~ .input__label,
  &:valid ~ .input__label,
  &:not(:placeholder-shown) ~ .input__label {
    transform: translate(0, -13px) scale(0.6);
  }
  &:last-child {
    color: #f9f9f9;
    background-color: #703eff;
    cursor: pointer;
    text-align: center;
    font-weight: 600;
    border: none;
    padding: 10px;
    font-size: 1rem;
  }
`;

const ErrorMessage = styled.div`
  margin-bottom: 10px;
  font-size: 11px;
  text-align: left;
  color: #de071c;
`;

const PwInputs = styled.div`
  margin: 13px 0;
  input {
    margin-bottom: 10px;
  }
`;

interface IFormInput {
  newEmail: string;
  newPassword: string;
  newPassword2: string;
}

function SignUp() {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSignUp: SubmitHandler<IFormInput> = async (data) => {
    if (data.newPassword !== data.newPassword2) {
      setError(
        "newPassword2",
        {
          type: "manual",
          message: "비밀번호가 일치하지 않습니다.",
        },
        { shouldFocus: true }
      );
      return;
    }
    try {
      await createUserWithEmailAndPassword(
        auth,
        data.newEmail,
        data.newPassword
      );
      history.push("/");
    } catch (error: any) {
      if (error.message.includes("invalid-email")) {
        setError(
          "newEmail",
          {
            type: "manual",
            message: "유효한 이메일 주소를 입력하세요",
          },
          { shouldFocus: true }
        );
      } else if (error.message.includes("weak-password")) {
        setError(
          "newPassword",
          {
            type: "manual",
            message: "비밀번호 최소 6자리 입력하세요.",
          },
          { shouldFocus: true }
        );
      }
    }
  };
  return (
    <>
      <Container>
        <IntroText>
          <h1>Sign Up</h1>
          <div>
            이미 계정이 있으신가요? <a href="/">로그인</a>
          </div>
        </IntroText>
        <Form onSubmit={handleSubmit(onSignUp)}>
          <div>
            <EmailInput>
              <Input
                {...register("newEmail", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
                type="email"
                isCheck={errors.newEmail?.message}
                placeholder="email"
                required
              />
              <InputSubText className="input__label">
                name@example.com
              </InputSubText>
              {errors.newEmail?.message && (
                <ErrorMessage>{errors.newEmail?.message}</ErrorMessage>
              )}
              <EmailInfoText>새 ID로 사용될 주소입니다.</EmailInfoText>
            </EmailInput>
          </div>
          <PwInputs>
            <EmailInput>
              <Input
                {...register("newPassword", { required: true })}
                type="password"
                isCheck={errors.newPassword?.message}
                placeholder="password"
                required
              />
              <InputSubText className="input__label">
                password 입력
              </InputSubText>
              {errors.newPassword?.message && (
                <ErrorMessage>{errors.newPassword?.message}</ErrorMessage>
              )}
            </EmailInput>
            <EmailInput>
              <Input
                {...register("newPassword2", { required: true })}
                type="password"
                isCheck={errors.newPassword2?.message}
                placeholder="password confirm"
                required
              />
              <InputSubText className="input__label">
                password 확인
              </InputSubText>
              {errors.newPassword2?.message && (
                <ErrorMessage>{errors.newPassword2?.message}</ErrorMessage>
              )}
            </EmailInput>
          </PwInputs>
          <Input type="submit" isCheck={undefined} value="SIGN UP" />
        </Form>
      </Container>
    </>
  );
}

export default SignUp;
