import axios from "axios";
import { apiConfig, restrictedConfig } from "../helpers/utils";

export const collectionDetailsApi = async (id) => {
  const res = await fetch(
    `https://nftdepot-api.azurewebsites.net/collections/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const resKey = await res.json();
  return resKey;
};

export const followCollection = async (collectionId) => {
  const res = await fetch(
    `https://nftdepot-api.azurewebsites.net/collections/${collectionId}/follow`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const resKey = await res.json();
  return resKey;
};

export const unFollowCollection = async (collectionId) => {
  const res = await fetch(
    `https://nftdepot-api.azurewebsites.net/collections/${collectionId}/unfollow`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const resKey = await res.json();
  return resKey;
};

export const likeNfts = async (id) => {
  const res = await fetch(
    `https://nftdepot-api.azurewebsites.net/nft/${id}/like`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const resKey = await res.json();
  return resKey;
};

export const unLikeNfts = async (id) => {
  const res = await fetch(
    `https://nftdepot-api.azurewebsites.net/nft/${id}/unlike`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const resKey = await res.json();
  return resKey;
};
export const getCollectionNft = async (id, pageNumber) => {
  const res = await fetch(
    `https://nftdepot-api.azurewebsites.net/collections/${id}/nfts/${pageNumber}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  const resKey = await res.json();
  return resKey;
};
export const collectionView = async (id) => {
  return await axios.post(
    `https://nftdepot-api.azurewebsites.net/collections/${id}/view`,
    apiConfig
  );
};
export const getCollectionFollowers = async (id,pageNumber) => {
  return await axios.get(
    `https://nftdepot-api.azurewebsites.net/collections/${id}/followers/${pageNumber}`,
    apiConfig
  );
};
export const getCollectionByCategory = async (category,pageNumber) => {
  return await axios.get(
    `https://nftdepot-api.azurewebsites.net/collections/category/${category}/${pageNumber}`,
    apiConfig
  );
};