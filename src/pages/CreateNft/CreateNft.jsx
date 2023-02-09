import React, { useEffect, useState } from 'react';
import PAGE_HEADER from '../../images/PageHeader.png';
import RightArrow from '../../images/rightIcon.svg';
import { create as IPFSHTTPClient } from 'ipfs-http-client';
import { Buffer } from 'buffer';
import './CreateNft.scss';
import { openNotification } from '../../components/Smart/Notification';
import web3Modal from 'web3modal';
import { ethers } from 'ethers';
import {NFTMarketplaceAddress, NFTMarketplaceABI} from "../../contracts/constant";

const ID = '2L5BTgzxk6H4D4rKwCN00eLpWyM';
const Secret_key = '79eb5f374c780c6f08ca113f56754e7a';
const auth = 'Basic ' + Buffer.from(ID + ':' + Secret_key).toString('base64');
const fetchContract = (signerOrProvider ) => new ethers.Contract(NFTMarketplaceAddress,NFTMarketplaceABI,signerOrProvider);

const client = IPFSHTTPClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth,
  },
});

const CreateNft = () => {
  const [currentAccount, setcurrentAccount] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    desp: '',
    price: '',
    image: null,
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
    let reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
if(!currentAccount){

  connectWallet();
}else{

     
   
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    uploadToIPFS();
    createNFT(formData, imagePreviewUrl);
}


  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) return console.log('install metamask ');

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setcurrentAccount(accounts[0]);
    } catch (error) {
      console.log('error while connecting to the wallet');
    }
  };
  const uploadToIPFS = async () => {
    try {
      console.log("welcome to ipfs")
      const details = formData.toString();
      const added = await client.add(details);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      console.log('details', details);
      openNotification('Mint NFT added successfully');
      console.log('uploaded image url is :', url);
      console.log('your nft has been created successfully  THANK YOU');
      return url;
    } catch (error) {
      console.log('error uploading to IPFS');
    }
  };



  // conecting with smart contract 
  
  const connectingWithSmartContract = async () => {
      try {
          const web3modal = new web3Modal();
          const connection = await web3modal.connect();
          const provider = new ethers.providers.Web3Provider(connection);
          const signer = provider.getSigner()
         
         const contract = fetchContract(signer);
         return contract;
  
      } catch(error){
          console.log ("something went wrong while connecting with contract ")
      };
  }

  const createNFT = async (formInput, fileUrl) =>{

 const nftid = 1;
 const nftcollectionaddress = "0xcF708576626e92AadC37b4Cccf3Bd9c60a306Dc3";
  try {
      const price = ethers.utils.parseUnits(formInput?.price,"ether");
      const contract = await connectingWithSmartContract();
      // const listing = await contract.getListingFee();
     const transaction = await contract.listItem(nftcollectionaddress, nftid, price)
    console.log("Your fucntion of smart contract has been triggerd")
    await transaction.wait();

  }catch (error){
      
    console.log("error while creating sale")
  }











  

 };

 useEffect(() => {
    connectWallet();
  }, []);

  return (
    <>
      <div className='CreateNftWrapper'>
        <div className='CreateNftHeader'>
          <img src={PAGE_HEADER} alt={'PAGE_HEADER'} />
          <div className='CreateNftHeadingSection'>
            <span className='CreateNftText'>Become an NFT artist with NFTdepot</span>
            <span className='CreateNftHeading'>Create your NFT</span>
          </div>
        </div>

        <div>
          <div className='MintNftContainer'>
            <div className='MintNftMainDiv'>
              <form className='MintNftFormDiv' >
                <div className='MintNftLeftForm'>
                  <div className='MintNftImageDiv'>
                    <img
                      className='MintNftImage'
                      src={
                        imagePreviewUrl ||
                        'https://png.pngtree.com/background/20210711/original/pngtree-gray-minimalist-light-headphones-psd-layered-main-picture-picture-image_1120970.jpg'
                      }
                      alt='Preview'
                      onClick={() => document.querySelector('input[type="file"]').click()}
                    />
                    <div
                      className='MintNftUploadText'
                      style={{
                        opacity: imagePreviewUrl ? 0 : 1,
                      }}
                      onClick={() => document.querySelector('input[type="file"]').click()}
                    >
                      Upload NFT
                    </div>
                    <input
                      className='MintNftChooseFile'
                      style={{ display: 'none' }}
                      type='file'
                      name='image'
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <div className='MintNftRightForm'>
                  <div className='MintNftInputDiv'>
                    <label>
                      <span style={{ color: 'red' }}>*</span> Name
                    </label>
                    <input
                      name='name'
                      type='text'
                      placeholder='Enter Name'
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='MintNftInputDiv'>
                    <label>
                      <span style={{ color: 'red' }}>*</span> Description
                    </label>
                    <input
                      name='desp'
                      type='text'
                      placeholder='Enter Description'
                      value={formData.desp}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='MintNftInputDiv'>
                    <label>
                      <span style={{ color: 'red' }}>*</span> Price
                    </label>
                    <input
                      name='price'
                      type='number'
                      placeholder='Enter Price'
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='MintNftButtonDiv'>
                    <div className='MintNftButton' onClick={handleSubmit} >
                      <button type='submit' >Create</button>
                      <img src={RightArrow} alt={'RightArrow'} />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateNft;