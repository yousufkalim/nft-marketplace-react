import axios from "axios";
import { apiConfig } from "../helpers/utils";

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
