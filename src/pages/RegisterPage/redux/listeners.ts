import {
  register,
  setUser,
  // logoutUser,
  registerError,
} from './userSlice';
import { registerUser } from '../../../api/auth';
import { UserType } from '../../../types/UserType';
import featureListener from '../../../redux/listeners/featureListener';

featureListener.startListening({
  actionCreator: register,
  effect: async (action, listenerApi) => {
    const { email, username, password } = action.payload;

    const response: UserType = await registerUser({
      email,
      username,
      password,
    });

    if (response) {
      listenerApi.dispatch(setUser(response));
    } else {
      listenerApi.dispatch(registerError('Failed to fetch products'));
    }
  },
});
