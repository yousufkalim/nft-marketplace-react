import { ethers } from 'ethers';
import {
  NFTMarketplaceAddress,
  NFTMarketplaceABI,
  collectionFactoryaddress,
  collectionfactoryABI,
} from './contracts/constant';
import web3Modal from 'web3modal';
// import React, { useEffect, useState } from 'react';

const key = '92e1e4c867572f2216b3';
const secret =
  '8b6edd618f851eafa765a08807a8e520da3f2ef6f0e7178942b4b691d56dd0d2';
const fetchContract = (signerOrProvider) =>
  new ethers.Contract(
    NFTMarketplaceAddress,
    NFTMarketplaceABI,
    signerOrProvider
  );

const axios = require('axios');
const FormData = require('form-data');

export const uploadFileToIPFS = async (file) => {
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
  //making axios POST request to Pinata :arrow_down:
  let data = new FormData();
  data.append('file', file);
  const metadata = JSON.stringify({
    name: 'Upload Media',
    keyvalues: {
      exampleKey: 'exampleValue',
    },
  });
  data.append('pinataMetadata', metadata);
  //pinataOptions are optional
  const pinataOptions = JSON.stringify({
    cidVersion: 0,

    customPinPolicy: {
      regions: [
        {
          id: 'FRA1',
          desiredReplicationCount: 1,
        },
        {
          id: 'NYC1',
          desiredReplicationCount: 2,
        },
      ],
    },
  });
  data.append('pinataOptions', pinataOptions);
  return axios
    .post(url, data, {
      maxBodyLength: 'Infinity',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      console.log('image uploaded', response.data.IpfsHash);

      return {
        success: true,
        pinataURL:
          'https://gateway.pinata.cloud/ipfs/' + response.data.IpfsHash,
      };
    })
    .catch(function (error) {
      console.log(error);

      return {
        success: false,
        message: error.message,
      };
    });
};
export const connectingWithSmartContract = async () => {
  try {
    const web3modal = new web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const contract = fetchContract(signer);
    return contract;
  } catch (error) {
    console.log('something went wrong while connecting with contract ');
  }
};

const fetchCollectionContract = (signerOrProvider) =>
  new ethers.Contract(
    collectionFactoryaddress,
    collectionfactoryABI,
    signerOrProvider
  );

export const connectingWithCollection = async () => {
  try {
    const web3modal = new web3Modal.connect();
    const connecting = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connecting);
    const signer = provider.getSigner();

    const contract = fetchCollectionContract(signer);
    return contract;
  } catch (error) {
    console.log('somthing went wrong while connecting with collection ');
  }
};
export const createcollection = async () => {
  try {
    const price = ethers.utils.parseUnits('ethers');
    const contract = await connectingWithCollection();
    const transaction = await contract.createCollection(
      _name,
      _symbol,
      _uri,
      _totalSupply,
      _mintPrice,
      _startDate,
      _expirationDate
    );
    await transaction.wait();
  } catch (error) {
    console.log('some went wrong while minting ');
  }
};
