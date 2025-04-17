import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { setUser, logoutUser, setError } from '../slices/userSlice';
import { registerUser, loginUser } from '../../api/auth';

const authListener = createListenerMiddleware();

authListener.startListening({
  matcher: isAnyOf(registerUser),
  effect: async (action, listenerApi) => {
    try {
      const { email, password } = action.payload;
      const response = await registerUser({ email, password });
      listenerApi.dispatch(setUser(response));
    } catch {
      listenerApi.dispatch(setError('Failed to register user'));
    }
  },
})