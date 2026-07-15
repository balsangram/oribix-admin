import axios from "axios";

const baseAuth = import.meta.env.VITE_BASE_AUTH || "http://localhost:5000";

const apiClient = axios.create({
  baseURL: baseAuth,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";
    return Promise.reject({
      ...error,
      message,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

export default apiClient;
export { baseAuth };
