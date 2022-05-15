import axios from "axios";
import { apiConfig, restrictedConfig } from "../helpers/utils";

export const allCollectionsAPI = async (pageNumber) => {
    return await axios.get(
      `https://nftdepot-api.azurewebsites.net/collections/all/${pageNumber}`,
      apiConfig
    );
  };