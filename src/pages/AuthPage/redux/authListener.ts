import {
  login,
  loginStart,
  loginFailure,
  loginSuccess,
  logout,
} from '../../LoginPage/redux/authSlice';
import { loginUser } from '../../../api/auth';
import featureListener from '../../../redux/listeners/featureListener';

featureListener.startListening({
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

featureListener.startListening({
  actionCreator: logout,
  effect: async (_, listenerApi) => {
    localStorage.removeItem('token');
    listenerApi.dispatch(logout());
  },
});
