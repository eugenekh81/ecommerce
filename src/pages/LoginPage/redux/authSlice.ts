import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

export const login = createAction<{ username: string; password: string }>(
  'auth/login'
);

type AuthState = {
  token: string | null;
  isLoggedIn: boolean;
  loginLoading: boolean;
  loginError: string | null;
};

const initialState: AuthState = {
  token: JSON.parse(localStorage.getItem('token') || 'null'),
  isLoggedIn: false,
  loginLoading: false,
  loginError: null,
};

const { actions, reducer } = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loginLoading = true;
      state.loginError = null;
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.loginLoading = false;
      state.isLoggedIn = true;
      state.token = action.payload;
      // TODO: move saving token to API call
      localStorage.setItem('token', JSON.stringify(action.payload));
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loginLoading = false;
      state.loginError = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = actions;
export default reducer;
