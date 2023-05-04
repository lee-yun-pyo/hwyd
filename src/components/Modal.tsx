import { useRecoilState } from "recoil";
import styled from "styled-components";
import { modalState } from "../atom";

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  position: fixed;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 550px;
`;

function Modal() {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const hideModal = () => {
    setShowModal(null);
  };
  return (
    <Container>
      <Overlay onClick={hideModal}></Overlay>
      <Content>
        <h1>Modal</h1>
      </Content>
    </Container>
  );
}

export default Modal;
