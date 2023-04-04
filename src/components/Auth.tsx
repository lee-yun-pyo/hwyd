import { useForm, SubmitHandler } from "react-hook-form";
import { auth } from "../fbase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

interface IFormInput {
  email: string;
  password: string;
}

function Auth() {
  const { register, handleSubmit, setError } = useForm<IFormInput>();
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
  return (
    <Container>
      <form onSubmit={handleSubmit(onLogin)}>
        <input
          {...register("email", { required: true })}
          type="email"
          placeholder="Email 입력"
        />
        <input
          {...register("password", { required: true })}
          type="password"
          placeholder="password 입력"
        />
        <input type="submit" />
      </form>
      <div>
        <button onClick={googleLogin}>LogIn with Google</button>
      </div>
      <div>
        <button>회원가입</button>
      </div>
    </Container>
  );
}

export default Auth;
