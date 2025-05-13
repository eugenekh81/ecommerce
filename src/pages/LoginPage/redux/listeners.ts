import { loginUser } from '../../../api/auth';
import featureListener from '../../../redux/listeners/featureListener';
import { loginFailure, loginStart, loginSuccess } from './authSlice';

featureListener.startListening({
  actionCreator: loginStart,
  effect: async (action, listenerApi) => {
    const { token } = await loginUser(action.payload);

    if (token) {
      listenerApi.dispatch(loginSuccess(token));

    } else {
      listenerApi.dispatch(loginFailure('Failed to login user'));
    }
  },
});
