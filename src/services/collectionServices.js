import axios from "axios";
import { apiConfig } from "../helpers/utils";

export const collectionDetailsApi = async (id) => {
  return await axios.get(
    `https://nftdepot-api.azurewebsites.net/collections/${id}`,
    apiConfig
  );
};
