import axios from 'axios';
import { AppDispatch } from '../redux/store';
import { loginSuccess } from '../pages/LoginPage/redux/authSlice';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_URL = `${BASE_URL}`;

const registerUser = async ({
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

const loginUser = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });

    localStorage.setItem('token', JSON.stringify(response.data.token));
    console.log(response.data);

    return response.data;
  } catch {
    throw new Error('Failed to login user');
  }
};

const restoreAuth = (dispatch: AppDispatch) => {
  const token = localStorage.getItem('token');

  if (token) {
    dispatch(loginSuccess(JSON.parse(token)));
  }
};

export { registerUser, loginUser, restoreAuth };
