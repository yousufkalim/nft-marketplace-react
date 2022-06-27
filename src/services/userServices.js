import axios from "axios";
import { apiConfig, restrictedConfig } from "../helpers/utils";

export const ChangePasswordAPI = async (userInfo) => {
  const body = {
    email: userInfo.email,
    token: userInfo?.token,
    new_password: userInfo?.new_password,
    confirm_password: userInfo?.confirm_password,
  };
  return await axios.post(
    `https://nftdepot-api.azurewebsites.net/reset_password`,
    body,
    apiConfig
  );
};

export const myCollectionsAPI = async (pageNumber) => {
  const res = await fetch(
    `https://nftdepot-api.azurewebsites.net/collections/my_collections/${pageNumber}`,
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

export const myCollectedNfts = async (pageNumber) => {
  return await axios.get(
    `https://nftdepot-api.azurewebsites.net/nfts/21/collected/${pageNumber}`,
    apiConfig
  );
};

export const myFollowingCollectionsAPI = async (pageNumber) => {
  const res = await fetch(
    `https://nftdepot-api.azurewebsites.net/collections/following/${pageNumber}`,
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
