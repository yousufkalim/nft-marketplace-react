import axios from "axios";
import { apiConfig } from "../helpers/utils";

export const nftDetailsApi = async (id) => {
  const res = await fetch(
    `https://nftdepot-api.azurewebsites.net/nfts/${id}`,
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
