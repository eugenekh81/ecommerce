import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  user: { email: string; token: string } | null;
  isLoggedIn: boolean;
  error: string | null;
  isLoading: boolean;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
  error: null,
  isLoading: false,
};

const { actions, reducer } = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
    },
    setUser: (
      state,
      action: PayloadAction<{ email: string; token: string }>
    ) => {
      state.user = action.payload;
      state.error = null;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.error = null;
      state.isLoading = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { setLoading, setUser, logoutUser, setError } = actions;
export { setLoading, setUser, logoutUser, setError, reducer };
