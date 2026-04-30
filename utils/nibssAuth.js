export const getNibssCredentials = () => {
  return {
    apiKey: process.env.NIBSS_API_KEY,
    apiSecret: process.env.NIBSS_API_SECRET,
    token: process.env.NIBSS_TOKEN,
  };
};