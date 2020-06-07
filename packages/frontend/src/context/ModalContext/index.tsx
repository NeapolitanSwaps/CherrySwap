import React, { Dispatch, useContext, useState } from "react";

type ContextType = [boolean, Dispatch<boolean>];

export const ModalContext = React.createContext<ContextType>([false, () => { }]);

export default function ModalProvider({ children }: any) {
  const [state, setState] = useState<boolean>(false);

  return (
    <ModalContext.Provider value={[state, setState]} >
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  return useContext(ModalContext);
}