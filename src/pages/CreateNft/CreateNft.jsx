import React, { useState, useEffect } from 'react';
import DropZone from '../../components/Smart/DropZone/DropZone';
import PAGE_HEADER from '../../images/PageHeader.png';
import RightArrow from '../../images/rightIcon.svg';
import {create as IPFSHTTPClient} from "ipfs-http-client";
import {Buffer} from 'buffer';
const  ID = "2L5BTgzxk6H4D4rKwCN00eLpWyM";
const Secret_key = "79eb5f374c780c6f08ca113f56754e7a";
const auth = 'Basic ' + Buffer.from(ID + ":" + Secret_key).toString('base64')
const client = IPFSHTTPClient ({
    host:'ipfs.infura.io',
    port:5001,
    protocol: 'https',
    headers: {
        authorization: auth,
      }
    })
const CreateNft = () => {
  const [addImage, setAddImage] = useState('');
  const [formState, setFormState] = useState({
    name: '',
    description: '',
     price: '',
  });
  const [fname , setFname] = useState ('faisal') 

  console.log('formState', formState);

  const handleChange = (event) => {
    setFormState((formState) => ({
      ...formState,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    connectWallet();
    uploadToIPFS();
  };

  useEffect(() => {
    connectWallet()
  },  []);
  
  const [currentAccount, setcurrentAccount] = useState("");
  console.log("currentAccount",currentAccount)

const connectWallet = async () =>{
try{
    if (!window.ethereum) return console.log("install metamask ");

    const accounts = await window.ethereum.request({
        method:"eth_requestAccounts",
    });
    setcurrentAccount(accounts[0])

}catch (error){
    console.log("error while connecting to the wallet")
}
}


const uploadToIPFS = async () => {
  try{        
      const details = formState.toString();
      const added = await client.add(details);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      console.log("uploaded image url is :",url);
      console.log("your nft has been created successfully  THANK YOU")
      return url;
      
  }catch (error){
      console.log("error uploading to IPFS")
  }  
}
 

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
              <form className='MintNftFormDiv'>
                <div className='MintNftLeftForm'>
                  <DropZone
                    selectedImage={addImage}
                    setSelectedImage={setAddImage}
                    imageType='large'
                  />
                </div>
                <div className='MintNftRightForm'>
                  <div className='MintNftInputDiv'>
                    <label>
                      <span style={{ color: 'red' }}>*</span> Name
                    </label>
                    <input onChange={handleChange} type='text' placeholder='Enter Name' name='name'/>
                  </div>
                  <div className='MintNftInputDiv'>
                    <label>
                      <span style={{ color: 'red' }}>*</span> Description
                    </label>
                    <input onChange={handleChange} type='text' placeholder='Enter Description'  name ='description'/>
                  </div>
                  <div className='MintNftInputDiv'>
                    <label>
                      <span style={{ color: 'red' }}>*</span> Price
                    </label>
                    <input onChange={handleChange} type='number' placeholder='Enter Price' name = 'price' />
                  </div>
                  <div className='MintNftButtonDiv'>
                    <div onClick={handleSubmit} className='MintNftButton'>
                      Create
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