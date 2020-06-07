import React, { Dispatch, useContext, useState } from "react";

// Will need improvements when complexity increases

export enum ModalType {
  ConnectWallet = "connectWallet",
  Help = "help"
}

type ModalProps = ModalType | undefined;

type ContextType = [ModalProps, Dispatch<ModalProps>];

export const ModalContext = React.createContext<ContextType>([undefined, () => { }]);

export default function ModalProvider({ children }: any) {
  const [state, setState] = useState<ModalProps>(undefined);

  return (
    <ModalContext.Provider value={[state, setState]} >
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  return useContext(ModalContext);
}