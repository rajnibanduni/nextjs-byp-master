import axios from "axios";

export const extApi = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

extApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      message: error.response?.data?.message || "An error occurred",
      status: error.response?.status || 500,
      errorCode: error.code || null,
    };
    return Promise.reject(customError);
  }
);

export const intApi = axios.create({
  baseURL: "/api",
});
