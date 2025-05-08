import { createListenerMiddleware } from '@reduxjs/toolkit';
import {
  login,
  loginStart,
  loginFailure,
  loginSuccess,
  logout,
} from '../../LoginPage/redux/authSlice';
import { loginUser } from '../../../api/auth';

const loginListener = createListenerMiddleware();

loginListener.startListening({
  actionCreator: login,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(loginStart());

    const { username, password } = action.payload;
    const response = await loginUser({ username, password });

    if (response) {
      localStorage.setItem('token', JSON.stringify(response.token));
      listenerApi.dispatch(loginSuccess(response));
    } else {
      listenerApi.dispatch(loginFailure('Failed to login user'));
    }
  },
});

const logoutListener = createListenerMiddleware();
logoutListener.startListening({
  actionCreator: logout,
  effect: async (_, listenerApi) => {
    localStorage.removeItem('token');
    listenerApi.dispatch(logout());
  },
});

export { loginListener, logoutListener };
