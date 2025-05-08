import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_URL = `${BASE_URL}`;

export const registerUser = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/users`, {
      email,
      password,
      username,
    });

    return response.data;
  } catch {
    throw new Error('Failed to register user');
  }
};

export const loginUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email: username,
      password,
    });

    return response.data;
  } catch {
    throw new Error('Failed to login user');
  }
};
