import React from "react";
import { ModalType, useModalContext } from "../../context/ModalContext";
import ModalConnect from "../ModalConnect";
import * as S from "./styles";

const Modal: React.FC = (props) => {

  const [modalType, setModalType] = useModalContext();

  const handleClosePress = () => setModalType(undefined);

  if (!modalType) return null;

  const child = () => {
    switch (modalType) {
      case ModalType.ConnectWallet:
        return <ModalConnect />
      default:
        return null;
    }
  }

  return (
    <S.Modal>
      <S.Container>
        <S.Header>
          {modalType && <p>{modalType}</p>}
          <button onClick={handleClosePress}>close</button>
        </S.Header>
        <S.Body>
          {child()}
        </S.Body>
      </S.Container>
    </S.Modal>
  );
};

export default Modal;