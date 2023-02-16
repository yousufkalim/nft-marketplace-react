import React, { useEffect, useState } from 'react';
import PAGE_HEADER from '../../images/PageHeader.png';
import RightArrow from '../../images/rightIcon.svg';
import './CreateNft.scss';
// import { openNotification } from '../../components/Smart/Notification';
import { ethers } from 'ethers';

import { uploadFileToIPFS, connectingWithSmartContract } from '../../pinata.js';

const CreateNft = () => {
  const [currentAccount, setcurrentAccount] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    desp: '',
    price: '',
    image: null,
  });
  const resetForm = () => {
    setFormData({
      name: '',
      desp: '',
      price: '',
      image: null,
    });
  };

  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [ResultUrl, setResultUrl] = useState();
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

    if (!currentAccount) {
      connectWallet();
    } else {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });
      uploadToIPFS(formData?.image);
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

  const uploadToIPFS = async (file) => {
    console.log(file);
    try {
      const response = await uploadFileToIPFS(file);

      if (response.success === true) {
        console.log('Uploaded image to Pinata: ', response.pinataURL);

        setFormData({
          ...formData,
          image: response.pinataURL,
        });

        setResultUrl(response.pinataURL);

        let _countuser = 0;

        resetForm();
        setImagePreviewUrl(null);
        console.log('eleven');

        // setFormVal.fileUrl(response.pinataURL);
      }
    } catch (e) {
      alert('Error during file upload', e);
    }
  };
  // conecting with smart contract

  const createNFT = async (formInput, fileUrl) => {
    const nftid = 1;
    const nftcollectionaddress = '0xcF708576626e92AadC37b4Cccf3Bd9c60a306Dc3';
    try {
      const price = ethers.utils.parseUnits(formInput?.price, 'ether');
      const contract = await connectingWithSmartContract();
      // const listing = await contract.getListingFee();
      const transaction = await contract.listItem(
        nftcollectionaddress,
        nftid,
        price
      );
      console.log('Your fucntion of smart contract has been triggerd');
      await transaction.wait();
    } catch (error) {
      console.log('error while creating sale');
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  return (
    <>
      <div className="CreateNftWrapper">
        <div className="CreateNftHeader">
          <img
            src={PAGE_HEADER}
            alt={'PAGE_HEADER'}
          />
          <div className="CreateNftHeadingSection">
            <span className="CreateNftText">
              Become an NFT artist with NFTdepot
            </span>
            <span className="CreateNftHeading">Create your NFT</span>
          </div>
        </div>

        <div>
          <div className="MintNftContainer">
            <div className="MintNftMainDiv">
              <form className="MintNftFormDiv">
                <div className="MintNftLeftForm">
                  <div className="MintNftImageDiv">
                    <img
                      className="MintNftImage"
                      src={
                        imagePreviewUrl ||
                        'https://png.pngtree.com/background/20210711/original/pngtree-gray-minimalist-light-headphones-psd-layered-main-picture-picture-image_1120970.jpg'
                      }
                      alt="Preview"
                      onClick={() =>
                        document.querySelector('input[type="file"]').click()
                      }
                    />
                    <div
                      className="MintNftUploadText"
                      style={{
                        opacity: imagePreviewUrl ? 0 : 1,
                      }}
                      onClick={() =>
                        document.querySelector('input[type="file"]').click()
                      }>
                      Upload NFT
                    </div>
                    <input
                      className="MintNftChooseFile"
                      style={{ display: 'none' }}
                      type="file"
                      name="image"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <div className="MintNftRightForm">
                  <div className="MintNftInputDiv">
                    <label>
                      <span style={{ color: 'red' }}>*</span> Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Enter Name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="MintNftInputDiv">
                    <label>
                      <span style={{ color: 'red' }}>*</span> Description
                    </label>
                    <input
                      name="desp"
                      type="text"
                      placeholder="Enter Description"
                      value={formData.desp}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="MintNftInputDiv">
                    <label>
                      <span style={{ color: 'red' }}>*</span> Price
                    </label>
                    <input
                      name="price"
                      type="number"
                      placeholder="Enter Price"
                      value={formData.price}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="MintNftButtonDiv">
                    <div
                      className="MintNftButton"
                      onClick={handleSubmit}>
                      <button type="submit">Create</button>
                      <img
                        src={RightArrow}
                        alt={'RightArrow'}
                      />
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
