import { useWeb3React } from "@web3-react/core";
import React from "react";
import { injected } from "../../connectors";
import { useModalContext } from "../../context/ModalContext";

const ModalConnect: React.FC = () => {

  const { activate } = useWeb3React();
  const [_, setModalType] = useModalContext();

  const handleInjectedPress = () => {
    activate(injected)
    setModalType(undefined);
  }

  return (
    <button style={{ cursor: "pointer" }} onClick={handleInjectedPress}>Connect injected</button>
  )
}

export default ModalConnect;