import axios from "axios";

export const ChangePasswordAPI = async (userInfo) => {
  const header = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
  };
  const body = {
    email: userInfo.email,
    token: userInfo?.token,
    new_password: userInfo?.new_password,
    confirm_password: userInfo?.confirm_password,
  };
  return await axios.post(
    `https://nftdepot-api.azurewebsites.net/reset_password`,
    body,
    header
  );
};
