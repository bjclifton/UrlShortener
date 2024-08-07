import axiosInstance from "./axiosConfig";

export const createLink = async (link) => {
  try {
    const response = await axiosInstance.post("/link", { link });
    return response.data;
  } catch (e) {
    console.error("Error while creating link", e);
    throw e;
  }
};

export const getLinks = async () => {
  try {
    const response = await axiosInstance.get("/link");
    return response.data;
  } catch (e) {
    console.error("Error while fetching links", e);
    throw e;
  }
};

export const deleteLink = async (linkId) => {
  try {
    const response = await axiosInstance.delete(`/link/${linkId}`);
    return response.data;
  } catch (e) {
    console.error("Error while deleting link", e);
    throw e;
  }
};
