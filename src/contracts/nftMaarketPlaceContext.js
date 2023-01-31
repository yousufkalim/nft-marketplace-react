import React,{useState,useEffect,useContext} from 'react'
import web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { router } from 'react-router-dom/cjs/react-router-dom.min';
import axios from "axios";
import {create as ipfsHttpClient} from "ipfs-http-client";

//creating client 
const client = ipfsHttpClient ("https://goerli.infura.io/v3/4613b9244a77458fac5250b39f574b5f");
// import {NFTMarketplaceABI,NFTMarketplaceAddress} from "./constant";


import {NFTMarketplaceAddress, NFTMarketplaceABI} from "./constant";
import { type } from '@testing-library/user-event/dist/type';
const fetchContract = (signerOrProvider ) => new ethers.Contract(NFTMarketplaceABI,NFTMarketplaceAddress, signerOrProvider);

// conecting with smart contract 

const connectingWithSmartContract = async () => {
    try {
        const web3Modal = new web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner()
       const contract = fetchContract(signer);
       return contract;

    } catch(error){
        console.log ("something went wrong while connecting with contract ")
    };
}

export const  NFTMarketplacecontext = React.createContext();
export const NFTMarketplaceProvider = ({children}) => {
    //usestates
    const [currentAccount, setcurrentAccount] = useState("");

const checkIfWalletConnected = async() => {
    try {
        if (!window.ethereum) return console.log("install Metamsk");

    } catch (error){
        console.log("somthing wrong while connecting to wallet");
        const accounts = await window.ethereum.request({
            method: "eth_account",
        });
        if (accounts.length){
            setcurrentAccount(accounts[0])
        } else {
            console.log("no account found");
        }
    }
}
    useEffect(() => {
        checkIfWalletConnected()
    },  []);
   //--- connect wallet function
   const connectWallet = async () =>{
    try{
        if (!window.ethereum) return console,log("indtall metamask ");

        const accounts = await window.ethereum.request({
            method:"eth_requestAccount",
        });
        setcurrentAccount(accounts[0])
        window.location.reload();

    }catch (error){
        console.log("error while connecting to the wallet")
    }
   }
   // upload to ipfs function 
   const uploadToIPFS = async () => {
    try{        
        const added = await client.add({content: file});
        const url = `https://ipfs.infura.io/ipfs/${added.path}`;
        return url;


    }catch (error){
        console.log("error uploading to IPFS")
    }  
}
   // create nft function 
   const createNFT = async (formInput, fileUrl, router) =>{
        const { name , description, price} = formInput;
        if (!name || !description||!price||!fileUrl) return console.log("Data is missing ");
        const data = JSON.stringify({name,description,image:fileUrl})
        try{
            const added = await client.add(data);
            const url =`http:ipfs.infura.io./ipfs${added.path}`;
            // pass the  url and the price
            await createSale(url,price)
  

    } catch (error){
        console.log (" something went wrong wile creating nft ")
    }
// create sale function

    const createSale = async (url, formInputPrice, isReselling, id) => {
        try {
            const price = ethers.utils.parseUnits(formInputPrice,"ether");
            const contract = await connectingWithSmartContract();

            const listing = await contract.getListingFee();

            const transaction = ! isReselling ? await contract.listItem(url, price ,{
            value : listing.toString()
        }): await contract.UpdateListing(url,price,{
            value: getListingFee.toString(),
        });

         await transaction.wait();


        }catch (error){
            console.log("error while creating sale")
        }

    }

   };
  // fetching nft function

  const fetchNFTs = async () => {
    try{
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);
        const data = await contract.getAllListings()
        //console.log(data)
       const items = await Promise.all(
        data.map(async({tokenId, seller, owner, price: unformattedPrice}) =>  {

            const tokenURI = await contract.tokenURI(tokenId);

            const {
                data: {image,name, description},
            } = await axios.get(tokenURI);
            const price = ethers.utils.formatUnits(
                unformattedPrice.toString(),
                "ether"
            );
            return {
                price,
                tokenId: tokenId.toNumber(),
                seller,
                owner,
                image,
                name,
                description,
                tokenURI,
            }

        })
       );
         return items;

    }catch(error){
        console.log("Error while fetching NFTS");
    }

  };

  // fetch listed nft or my nft 

  const fetchMyNFTsOrListedNFTs = async (type) =>{
    try{
        const contract = await connectingWithSmartContract();
    
        const data= type == "fetchItemListed" ? await contract.fetchItemListed () 
        : await contract.ListingsRecord();
        const items = await Promise.all(
            data.map(
                async ({tokenId,seller,owner,price: unformattedPrice}) => {
                    const tokenURI = await contract.tokenURI(tokenId)
                    const{
                        data: { image, name, description},
                    } = await axios.get(tokenURI);
                    const price = ethers.utils.fornatUnits(
                        unformattedPrice.toString(),
                        "ether"
                    );

                    return{
                        price,
                        tokenId: tokenId.toNumber(),
                        seller,
                        owner,
                        image,
                        name,
                        description,
                        tokenURI,

                    }
                    
                }
            )
        );
        return items;

    
   } catch (error){
        console.log ("error while fetching listed NFTs")
    }
  };

// buy nfts function 
   const buyNFT = async (nft) => {
    try {
        const contract = await connectingWithSmartContract();
        const price = ethers.utils.parseUnits(nft.price.toString(), "ethers");

        const transaction = await contract.createAuction(nft.tokenId,{
            value: price,

        });
        await transaction.wait();
    } catch (error){
        console.log("error while buying nft ")
    }
   }
    

    return (
        <NFTMarketplacecontext.Provider value ={{connectWallet,uploadToIPFS,createNFT,fetchNFTs,fetchMyNFTsOrListedNFTs,buyNFT,currentAccount}}>
            {children}
        </NFTMarketplacecontext.Provider>
    );
};
