import {
  loginStart,
  loginFailure,
  loginSuccess,
  logout,
} from '../../LoginPage/redux/authSlice';
import { loginUser } from '../../../api/auth';
import featureListener from '../../../redux/listeners/featureListener';

featureListener.startListening({
  actionCreator: loginStart,
  effect: async (action, listenerApi) => {
    const { username, password } = action.payload;
    listenerApi.dispatch(loginStart({ username, password }));

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
