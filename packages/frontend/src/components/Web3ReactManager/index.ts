import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { NoEthereumProviderError } from "@web3-react/injected-connector";
import { useEffect, useState } from "react";

const getErrorMessage = (error: Error) => {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  } else {
    console.error(error);
    return "An unknown error occurred. Check the console for more details.";
  }
}

const Web3ReactManager = ({ children }: any) => {
  const { error, active } = useWeb3React();

  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  useEffect(() => {
    if (!active && error) {
      setErrorMessage("No web3");
    }
  }, [active, error]);

  return errorMessage ? errorMessage : children;
}

export default Web3ReactManager;