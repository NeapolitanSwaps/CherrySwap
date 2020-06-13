import { useWeb3React } from "@web3-react/core";
import React from "react";
import MetaMaskIcon from "../../assets/metamask.png";
import WalletConnectIcon from "../../assets/svg/wallet-connect.svg";
import { AvailableConnectors, injected, walletConnect } from "../../connectors";
import { useModalContext } from "../../context/ModalContext";
import * as S from "./styles";

const ModalConnect: React.FC = () => {

  const { activate } = useWeb3React();
  const [_, setModalType] = useModalContext();

  const activateConnector = (connector: AvailableConnectors) => {
    activate(connector)
    setModalType(undefined);
  }

  const handleInjectedPress = () => activateConnector(injected);

  const handleWalletConnectPress = () => activateConnector(walletConnect);

  const connectors = [
    {
      title: "Metamask",
      image: MetaMaskIcon,
      onClick: handleInjectedPress,
      id: "connector-0"
    },
    {
      title: "WalletConnect",
      image: WalletConnectIcon,
      onClick: handleWalletConnectPress,
      id: "connector-1"
    },
  ]

  return (
    <S.ModalConnect>
      {
        connectors.map(({ title, image, onClick, id }) => (
          <S.Button key={id} style={{ cursor: "pointer" }} onClick={onClick}>
            <img src={image} />
            <p>{title}</p>
          </S.Button>
        ))
      }
    </S.ModalConnect>
  )
}

export default ModalConnect;