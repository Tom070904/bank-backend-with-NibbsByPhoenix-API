import { nibssRequest } from "./nibssRequest.js";

export const createAccountNIBSS = async (data) => {
  return await nibssRequest("POST", "/api/account/create", data);
};
export const getBalanceNIBSS = async (accountNumber) => {
  return await nibssRequest(
    "GET",
    `/api/account/balance/${accountNumber}`
  );
};