import { nibssRequest } from "./nibssRequest.js";

export const validateBVN = async (bvn) => {
  return await nibssRequest("POST", "/api/validateBvn", { bvn });
};

export const validateNIN = async (nin) => {
  return await nibssRequest("POST", "/api/validateNin", { nin });
};