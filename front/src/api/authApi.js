import axiosInstance from "./axiosConfig";

export const login = async (username, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      username,
      password,
    });
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : e.message;
  }
};

export const register = async (username, password) => {
  try {
    const response = await axiosInstance.post("/auth/register", {
      username,
      password,
    });
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : e.message;
  }
};

export const logout = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  } catch (e) {
    throw e.response ? e.response.data : e.message;
  }
};

export const checkAuth = async () => {
  try {
    const response = await axiosInstance.get("/auth/checkAuth");
    return response.data;
  } catch (e) {
    console.error("Error checking authentication:", e);
    return { isAuthenticated: false, user: null };
  }
};
