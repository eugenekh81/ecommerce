import { RootState } from '../../../redux/store';

const userSelector = (state: RootState) => state.user;
const isLoggedInSelector = (state: RootState) => state.user.isLoggedIn;

export { userSelector, isLoggedInSelector };
