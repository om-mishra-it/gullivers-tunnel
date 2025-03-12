import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/userviewset`;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request OTP
export const requestOtp = async (email) => {
  return api.post("/request_otp/", { email });
};

// Verify OTP & Login
export const verifyOtp = async (email, otp) => {
  return api.post("/verify_otp/", { email, otp });
};
