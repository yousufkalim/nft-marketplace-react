import axios from "axios";
import { apiConfig } from "../helpers/utils";

export const searchApi = async (query) => {
  return await axios.get(
    `https://nftdepot-api.azurewebsites.net/collections/search?query=${query}`,
    apiConfig
  );
};
