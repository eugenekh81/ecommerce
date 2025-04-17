import { createListenerMiddleware } from '@reduxjs/toolkit';
import {
  setProduct,
  setProductError,
  fetchProduct as fetchProductAction,
} from '../redux/productDetailsSlice';
import { fetchProduct } from '../../../api/products';

const listener = createListenerMiddleware();

listener.startListening({
  actionCreator: fetchProductAction,
  effect: async (action, listenerApi) => {
    const id = action.payload;
    const response = await fetchProduct({ url: `/products/${id}` });

    if (response) {
      listenerApi.dispatch(setProduct(response));
    } else {
      listenerApi.dispatch(setProductError('Failed to fetch product'));
    }
  },
});

export default listener;
