import { createListenerMiddleware } from '@reduxjs/toolkit';
import {
  register,
  setUserLoading,
  setUser,
  // logoutUser,
  registerError,
} from './userSlice';
import { registerUser } from '../../../api/auth';
import { UserType } from '../../../types/UserType';

const registerMiddleware = createListenerMiddleware();

registerMiddleware.startListening({
  actionCreator: register,
  effect: async (action, listenerApi) => {
    const { email, username, password } = action.payload;
    listenerApi.dispatch(setUserLoading());

    const response: UserType = await registerUser({
      email,
      username,
      password,
    });

    console.log(response);

    if (response) {
      listenerApi.dispatch(setUser(response));
    } else {
      listenerApi.dispatch(registerError('Failed to fetch products'));
    }
  },
});

export default registerMiddleware;
