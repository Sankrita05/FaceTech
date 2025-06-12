import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Register User (initiate registration & send OTP)
export const initiateRegistration = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}/register/`, userData);
  return response.data;
};

// Verify Registration OTP
export const verifyRegistrationOtp = async (email, otp) => {
  const response = await axios.post(`${API_BASE_URL}/verify-email/`, {
    email,
    otp_code: otp,
  });
  return response.data;
};

// Send Email OTP for password reset
export const sendPasswordResetOtp = async (email) => {
  const response = await axios.post(`${API_BASE_URL}/send-email-otp/`, { email });
  return response.data;
};

// Reset Password with OTP and new password
export const resetPassword = async (email, otp, newPassword) => {
  const response = await axios.post(`${API_BASE_URL}/reset-password/`, {
    email,
    otp_code: otp,
    new_password: newPassword,
  });
  return response.data;
};

// Login User
export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_BASE_URL}/login/`, { email, password });
  return response.data;
};
