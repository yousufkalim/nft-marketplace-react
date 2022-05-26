import axios from "axios";
import { apiConfig, restrictedConfig } from "../helpers/utils";

export const collectionDetailsApi = async (id) => {
  return await axios.get(
    `https://nftdepot-api.azurewebsites.net/collections/${id}`,
    apiConfig
  );
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
  return res;
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
  return res;
};


export const likeCollectionOrNft = async (id) => {
  const res = await fetch(
    `https://nftdepot-api.azurewebsites.net/nft/${id}/like`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res;
};

export const unLikeCollectionOrNft = async (id) => {
  const res = await fetch(
    `https://nftdepot-api.azurewebsites.net/nft/${id}/unlike`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  return res;
};