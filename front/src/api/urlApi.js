import axiosInstance from "./axiosConfig";

export const shortenUrl = async (url) => {
  try {
    const response = await axiosInstance.post("/shorten", { url });
    return response.data;
  } catch (e) {
    console.error("Error while shortening URL", e);
    throw e;
  }
};

export const getOriginalUrl = async (shortCode) => {
  try {
    const response = await axiosInstance.get(`/${shortCode}`);
    return response.data;
  } catch (e) {
    console.error("Error while getting original URL", e);
    throw e;
  }
};
