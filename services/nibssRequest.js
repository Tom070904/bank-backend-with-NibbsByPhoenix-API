import { nibssClient } from "./nibssService.js";
import { getNibssCredentials } from "../utils/nibssAuth.js";

export const nibssRequest = async (method, url, data = null) => {
  const { token } = getNibssCredentials();

  if (!token) {
    throw new Error("NIBSS token not set in .env");
  }

  const res = await nibssClient({
    method,
    url,
    data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};