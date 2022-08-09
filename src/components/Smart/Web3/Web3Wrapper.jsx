import { useEffect, useState } from "react";
import { Button, Popover } from "antd";
import { useDispatch } from "react-redux";

import { networkParams } from "./networks";
import { toHex, truncateAddress } from "../../../helpers/utils";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "./providerOptions";
import {
  walletConnectionSuccess,
  walletConnectionFailure,
} from "../../../store/web3/web3Actions";

import "./Web3Wrapper.scss";

const web3Modal = new Web3Modal({
  cacheProvider: true, // optional
  providerOptions, // required
});

const Web3Connector = ({}) => {
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();

  const dispatch = useDispatch();

  const connectWallet = async () => {
    // debugger
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const signer = await library.getSigner();
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) {
        setAccount(accounts[0]);
        dispatch(walletConnectionSuccess({ provider, library, "account":accounts[0], signer }));
      }
      setChainId(network.chainId);

    } catch (error) {
      setError(error);
      dispatch(walletConnectionFailure(null));
    }
  };

  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(network) }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [networkParams[toHex(network)]],
          });
        } catch (error) {
          setError(error);
        }
      }
    }
  };

  const signMessage = async () => {
    if (!library) return;
    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [message, account],
      });
      setSignedMessage(message);
      setSignature(signature);
    } catch (error) {
      setError(error);
    }
  };

  const verifyMessage = async () => {
    if (!library) return;
    try {
      const verify = await library.provider.request({
        method: "personal_ecRecover",
        params: [signedMessage, signature],
      });
      setVerified(verify === account.toLowerCase());
    } catch (error) {
      setError(error);
    }
  };

  // contract interaction functions (later we may move them to a separate component)
  const getContract = async (address, abi) => {
    if (!library) {
      console.log("no library");
      return;
    };
    try {
      const contract = new ethers.Contract(address, abi, library);
      return contract;
    } catch (error) {
      console.log(error);
        
    }
  }
      

  const refreshState = () => {
    setAccount();
    setChainId();
    setNetwork("");
    setMessage("");
    setSignature("");
    setVerified(undefined);
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
    dispatch(walletConnectionFailure(null));
  };

  useEffect(async () => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }

  }, []);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) {
          setAccount(accounts[0]);
          dispatch(walletConnectionSuccess({ provider, library, account }));
        }
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  return (
    <div style={{ color: "white" }}>
      {!account ? (
        <Button
          onClick={connectWallet}
          type={"primary"}
          className="connectButton"
        >
          Connect Wallet
        </Button>
      ) : (
        <Popover
          placement="bottomRight"
          content={
              <Button onClick={disconnect} type={"dashed"}>
                Disconnect
              </Button>
          }
          trigger="click"
        >
          <div className="walletBtn">Connected: {truncateAddress(account)}</div>
        </Popover>
      )}
      {/* <div>
        <span>{error ? error.message : null}</span>
      </div> */}
    </div>
  );
};

export { Web3Connector };
