import axios from "axios";
import { apiConfig, restrictedConfig } from "../helpers/utils";

export const uploadAPI = async (selectedImage) => {
  const data = new FormData();
  data.append("file", selectedImage);
  const res = await fetch(
    `https://nftdepot-api.azurewebsites.net/collection/upload_image?folder=${"first"}`,
    {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      maxRedirects: 0,
    }
  );
  const resKey = await res.json();
  return resKey;
};

export const createCollectionAPI = async (collectionInfo) => {
  const body = collectionInfo;
  return await axios.post(
    `https://nftdepot-api.azurewebsites.net/collections/create`,
    body,
    restrictedConfig,
  );
};

export const codesAPI = async (codes) => {
  return await axios.get(
    `https://nftdepot-api.azurewebsites.net/codes/${codes}`,
    apiConfig
  );
};

export const getImageUrl = async (url) => {
  return await axios.get(`${url}`);
};

export const checkStroeNameAvailability = async (storeName) => {
  return await axios.get(
    `https://nftdepot-api.azurewebsites.net/collections/collection_name_availability?collection_name=${storeName}`,
    apiConfig
  );
};