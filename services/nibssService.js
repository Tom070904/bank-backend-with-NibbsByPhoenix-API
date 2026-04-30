import axios from "axios";

export const nibssClient = axios.create({
  baseURL: process.env.NIBSS_BASE_URL || "https://nibssbyphoenix.onrender.com",
});