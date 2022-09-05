import { ethers } from "ethers";
import axios from "axios";
import { restrictedConfig } from "../helpers/utils";
import store from "../store/index";
import { openNotification } from "../components/Smart/Notification";
import { ready } from "jquery";


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
    const factoryAddress = "0x42aCb9bf3A751b9fFAbBB18897fB4480F7A32ee7";
    const contract = await getContract(factoryAddress, factoryAbi);
    // debugger;
/* Checking if the contract is null. If it is null, it will log "No contract found" and return null. */
    if (!contract) {
        console.log("No contract found");
        return null;
    }
    try {
        const tx = await contract.deployNFT(0, name, symbol, localGuid);
        return tx;
    }
    catch (e) {
        console.log(e);
        if(e.reason){
            openNotification("error", "Error "+e.reason);
        }else{

            let error = e.toString()

            let start_str = '(reason=';
            let end_str = ', method=';

            let start = error.indexOf(start_str) + start_str.length;
            let end = error.indexOf(end_str) - start

            let err = error.substr(start, end);

            openNotification("error", "Error "+err);
        }
    }

    return null;
}

export const isConnected = () => {
    return store.getState()?.web3?.connected;
}

export const mintNft = async (nft_id, buyer, collectionAddress) => {
    try {
        const collectionAbi = require("../contracts/collection.json");
        const voucherDetails = await getNFTVoucher(nft_id, buyer)
        if(!voucherDetails?.data?.body?.voucher){
            openNotification(voucherDetails?.data?.message)
            return;
        }
        const data = voucherDetails?.data?.body;
        const contract = await getContract(data?.contract, collectionAbi);
        if (!contract) {
            console.log("No contract found, please try again");
            return null;
        }
    
        const voucher = [data.token_id, data.price, data.uri, data.buyer, data.signature]
        console.log("voucher", voucher)
        let val = ethers.utils.parseEther(data?.price.toString())
        let tx = await contract.safeMint(voucher, {value: val});
        console.log("tx", tx)
        tx.wait().then(async (receipt) => {
            console.log("receipt", receipt)
            if(receipt?.status === 1){
                openNotification("success", "NFT Minted Successfully")
                await publishToIpfs(nft_id);
            }else{
                openNotification("error", "NFT Minting Failed")
            }
        })
    }
    catch (e) {
        console.log(e);
        
        if(e.reason){
            openNotification("error", "Error "+e.reason);
        }else{

            let error = e.toString()

            let start_str = '(reason=';
            let end_str = ', method=';

            let start = error.indexOf(start_str) + start_str.length;
            let end = error.indexOf(end_str) - start

            let err = error.substr(start, end);
            console.log("err", err)

            openNotification("error", "Error "+err);
        }
    }
}

export const publishIpfs = async (nft_id) => {
    try {
        const collectionAbi = require("../contracts/collection.json");
        const response = await publishToIpfs(nft_id)
        if(!response?.data?.body?.published){
            openNotification(response?.data?.message)
            return;
        }
        const data = response?.data?.body;
        const contract = await getContract(data?.contract, collectionAbi);
        if (!contract) {
            console.log("No contract found, please try again");
            return null;
        }
        
        // const voucher = [data.token_id, data.uri]
        // console.log("voucher", voucher)
        // let val = ethers.utils.parseEther(data?.price.toString())
        contract.updateURI(data.token_id, data.uri).then((tx)=>{
            tx.wait().then(async (receipt) => {
                console.log("receipt", receipt)
                if(receipt?.status === 1){
                    openNotification("success", "URI Updated Successfully")
                }else{
                    openNotification("error", "URI Update Failed")
                }
            })
        })
        
    }
    catch (e) {
        console.log(e);
        if(e.reason){
            openNotification("error", "Error "+e.reason);
        }else{

            let error = e.toString()

            let start_str = '(reason=';
            let end_str = ', method=';

            let start = error.indexOf(start_str) + start_str.length;
            let end = error.indexOf(end_str) - start

            let err = error.substr(start, end);

            openNotification("error", "Error "+err);
        }
    }
}

const getNFTVoucher = async (nft_id, address) => {
    return await axios.get(
        `http://nftdepot-api.azurewebsites.net/nft/${nft_id}/voucher/${address}`,
        restrictedConfig
    );
};

const publishToIpfs = async (nft_id) => {
    return await axios.get(
        `http://nftdepot-api.azurewebsites.net/nft/${nft_id}/publish_ipfs`,
        restrictedConfig
    );
}