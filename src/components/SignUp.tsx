import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../fbase";
import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import { useHistory } from "react-router-dom";

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input<{ isCheck: string | undefined }>`
  background-color: ${(props) => (props.isCheck ? "tomato" : "none")};
  border: none;
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
            message: "이메일 형식을 지켜주세요.",
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
    <Form onSubmit={handleSubmit(onSignUp)}>
      <Input
        {...register("newEmail", { required: true })}
        type="email"
        placeholder="Email 입력"
        isCheck={errors.newEmail?.message}
      />
      <Input
        {...register("newPassword", { required: true })}
        type="password"
        isCheck={errors.newPassword?.message}
        placeholder="password 입력"
      />
      <Input
        {...register("newPassword2", { required: true })}
        type="password"
        isCheck={errors.newPassword2?.message}
        placeholder="password 확인"
      />
      <Input type="submit" isCheck={undefined} />
    </Form>
  );
}

export default SignUp;
