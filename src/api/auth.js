import apiClient from "./axios";

/** AUTH APIs */
export const login = (payload) =>
  apiClient.post("/api/auth/login", payload);

export const verifyOtp = (payload) =>
  apiClient.post("/api/auth/verify-otp", payload);

export const sendOtp = (payload) =>
  apiClient.post("/api/auth/send-otp", payload);

export const changePassword = (payload) =>
  apiClient.post("/api/auth/change-password", payload);

const authApi = {
  login,
  verifyOtp,
  sendOtp,
  changePassword,
};

export default authApi;
