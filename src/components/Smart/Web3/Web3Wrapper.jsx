import { useEffect, useState } from "react";
import { Button, Popover, Space } from "antd";
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
import { confirm } from "../../Smart/Modal"

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
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();



  const dispatch = useDispatch();
  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) {
        setAccount(accounts[0]);
        dispatch(walletConnectionSuccess(accounts[0]));
        
      }
      setChainId(network.chainId);
      // ask
    } catch (error) {
      setError(error);
      dispatch(walletConnectionFailure(null));
    }
  };

  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  // const handleInput = (e) => {
  //   const msg = e.target.value;
  //   setMessage(msg);
  // };

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
    console.log(account);
    if (!library) return;
    let message = `Welcome to NFTDepot.Art!
    Click “Sign” to connect your wallet and accept the NFTDepot.Art Terms of Service:  https://nftdepot.art/tos This request will not trigger a blockchain transaction or cost any gas fees. Your authentication status will reset after 24 hours. Wallet address: ${account}
    Nonce: <METAMASK GUID>`
    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [message, account],
      });
      setSignedMessage(message);
      setSignature(signature);
      window.localStorage.setItem("signature", signature);
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

  const refreshState = () => {
    setAccount();
    setChainId();
    setNetwork("");
    // setMessage("");
    setSignature("");
    setVerified(undefined);
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
    dispatch(walletConnectionFailure(null));
  };

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
      
  }, []);
  useEffect(() => {
    console.log(window.localStorage.getItem("signature"), account);
    if (!window.localStorage.getItem("signature") && account){
      confirm("Welcome to NFTDepot", "By connecting your wallet and using NFTDepot, you agree to our Terms of Service and Privacy Policy.", "Agree & Sign", "Cancel", signMessage, disconnect)
    }
      
  }, [account]);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) {
          setAccount(accounts[0]);
          dispatch(walletConnectionSuccess(accounts[0]));
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
