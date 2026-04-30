import { nibssRequest } from "./nibssRequest.js";

export const nameEnquiry = async (accountNumber) => {
  return await nibssRequest(
    "GET",
    `/api/account/name-enquiry/${accountNumber}`
  );
};

export const transferFunds = async (data) => {
  return await nibssRequest("POST", "/api/transfer", data);
};

export const getTransactionStatus = async (transactionId) => {
  return await nibssRequest(
    "GET",
    `/api/transaction/${transactionId}`
  );
};