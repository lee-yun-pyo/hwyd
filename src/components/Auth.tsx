import { useForm } from "react-hook-form";
import { auth } from "../fbase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

function Auth() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
    createUserWithEmailAndPassword(auth, data.email, data.password).then(
      (userCredential) => {
        // Signed in
        const user = userCredential.user;
      }
    );
  };
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email", { required: true })} type="email" />
        <input {...register("password", { required: true })} type="password" />
        <input type="submit" />
      </form>
      <div>
        <button>LogIn with Google</button>
      </div>
      <div>
        <button>회원가입</button>
      </div>
    </Container>
  );
}

export default Auth;
