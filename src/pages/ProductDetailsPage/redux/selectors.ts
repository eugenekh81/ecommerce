import { RootState } from '../../../redux/store';

export const productDetailsSelector = (state: RootState) =>
  state.productDetails;
