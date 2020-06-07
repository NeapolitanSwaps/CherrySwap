import React from "react";
import { useModalContext } from "../../context/ModalContext";
import * as S from "./styles";

const Modal: React.FC = (props) => {

  const [isModalVisibile, setModalVisibility] = useModalContext();

  const handleClosePress = () => setModalVisibility(false);

  if (!isModalVisibile) return null;

  return (
    <S.Modal>
      <S.Container>
        <S.Header>
          <p>Hello world</p>
          <button onClick={handleClosePress}>close</button>
        </S.Header>
        <S.Body>
          <p>content</p>
        </S.Body>
      </S.Container>
    </S.Modal>
  );
};

export default Modal;