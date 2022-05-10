import axios from "axios";
import { apiConfig } from "../helpers/utils";

export const SignUpAPI = async (userInfo) => {
  const body = {
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        password: userInfo.password,
        confirm_password: userInfo.confirm_password,
        wallet_id: userInfo.wallet_id,
        email: userInfo.email

   };
  return await axios.post(
    `https://nftdepot-api.azurewebsites.net/signup`,
    body,
    apiConfig
  );
};

export const LoginAPI = async (userInfo) => {
    const body = {
          password: userInfo.password,
          email: userInfo.email
  
     };
    return await axios.post(
      `https://nftdepot-api.azurewebsites.net/login`,
      body,
      apiConfig
    );
};

export const ForgotPasswordAPI = async (userInfo) => {
  const body = {
        email: userInfo.email

   };
  return await axios.post(
    `https://nftdepot-api.azurewebsites.net/reset_password_request`,
    body,
    apiConfig
  );
};




export const VerifyUserAPI = async () => {
  return await axios({
    headers: {
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    method: "GET",
    url: `https://nftdepot-api.azurewebsites.net/me`,
  });
};

export const VerifyUser = async () => {
  try {
    const { data } = await VerifyUserAPI();
    return data?.body;
  } catch (err) {
    return err;
  }
};
