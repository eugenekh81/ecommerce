import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserType } from '../../../types/UserType';

type UserState = {
  user: UserType | null;
  isLoggedIn: boolean;
  registerError: string | null;
  registerLoading: boolean;
};

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  registerError: null,
  registerLoading: false,
};

const { actions, reducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register: (
      state,
      _action: PayloadAction<{
        email: string;
        username: string;
        password: string;
      }>
    ) => {
      state.registerLoading = true;
    },
    setUser: (
      state,
      action: PayloadAction<{
        id: number;
        username: string;
        email: string;
        password: string;
      }>
    ) => {
      state.user = action.payload;
      state.registerError = null;
      state.isLoggedIn = true;
      state.registerLoading = false;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.registerError = null;
      state.registerLoading = false;
    },
    registerError: (state, action: PayloadAction<string>) => {
      state.registerError = action.payload;
      state.registerLoading = false;
    },
  },
});

export const { register, setUser, logoutUser, registerError } = actions;
export default reducer;
