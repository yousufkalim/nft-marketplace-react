import { ethers } from "ethers";
// import { useDispatch, useSelector } from "react-redux";

import store from "../store/index";


export const getContract = async (address, abi) => {
    if(!isConnected()) {
        alert("Please connect to a wallet");
        return null;
    }
    let library = store.getState()?.web3?.library; //useSelector(state=>state?.web3?.library);
    if (!library) {
        console.log("No library found");
        return null;
    }
    try {
        const contract = new ethers.Contract(address, abi, library);
        return contract.connect(library.getSigner());
    } catch (error) {
        console.log(error);

    }
}

export const deployNFT = async (name, symbol, localGuid) =>{
    // read the factory contract abi from the json file
    const factoryAbi = require("../contracts/factory.json");
    const factoryAddress = "0x80400D92F81d1f69AB46aBaD6880ca9C1F6895Ce";
    const contract = await getContract(factoryAddress, factoryAbi);
    // debugger;
    if (!contract) {
        console.log("No contract found");
        return null;
    }
    try {
        const tx = await contract.deployNFT(0, name, symbol, localGuid);
        return tx;
    }
    catch (error) {
        console.log(error);
    }

    return null;
}

export const isConnected = () => {
    return store.getState()?.web3?.connected;
}
