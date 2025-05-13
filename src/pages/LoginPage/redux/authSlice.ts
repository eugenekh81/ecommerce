import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    loginStart: (state, _action) => {
      state.loginLoading = true;
      state.loginError = null;
    },
    loginSuccess: (state, action: PayloadAction<string>) => {
      state.loginLoading = false;
      state.isLoggedIn = true;
      state.token = action.payload;
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
