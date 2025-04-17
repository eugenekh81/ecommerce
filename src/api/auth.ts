import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_URL = `${BASE_URL}/auth`;

export const registerUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      email,
      password,
    });

    return response.data;
  } catch {
    throw new Error('Failed to register user');
  }
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });

    return response.data;
  } catch {
    throw new Error('Failed to login user');
  }
};
