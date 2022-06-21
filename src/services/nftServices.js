import axios from "axios";
import { apiConfig } from "../helpers/utils";

export const nftDetailsApi = async (id) => {
  return await axios.get(
    `https://nftdepot-api.azurewebsites.net/nfts/${id}`,
    apiConfig
  );
};
