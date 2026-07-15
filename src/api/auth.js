import apiClient from "./axios";

/** AUTH APIs */
export const login = (payload) =>
  apiClient.post("/api/auth/login", payload);

export const verifyOtp = (payload) =>
  apiClient.post("/api/auth/verify-otp", payload);

export const sendOtp = (payload) =>
  apiClient.post("/api/auth/send-otp", payload);

const authApi = {
  login,
  verifyOtp,
  sendOtp,
};

export default authApi;
