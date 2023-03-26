import { useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import TableForm from "./TableForm";
import { useRecoilState } from "recoil";
import { formState } from "../atom";

const StartDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    background-color: rgba(255, 255, 255, 0.8);
    width: 100%;
    height: 1px;
  }
  span {
    font-size: 25px;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 600;
    margin: 25px 0;
  }
  button {
    border: none;
    padding: 12px 14px;
    font-size: 20px;
    border-radius: 8px;
    cursor: pointer;
  }
`;

function SelectedDate() {
  const [form, setForm] = useRecoilState(formState);
  // let match = useRouteMatch<{ dateId: string }>("/:dateId");
  // DB에서 dateId와 같은 데이터 찾아서 화면에 출력
  // 없으면 '추가하기' 버튼 생성
  const toggleShowForm = () => {
    setForm((prev) => !prev);
  };
  return (
    <>
      {form ? (
        <TableForm />
      ) : (
        <StartDiv>
          <div></div>
          <span>오늘 하루를 기록하세요</span>
          <button onClick={toggleShowForm}>기록하기</button>
        </StartDiv>
      )}
    </>
  );
}

export default SelectedDate;
