import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  setError,
  setLoading as setLoadingProducts,
  setProducts,
} from './slices/productsSlice';
import { setLoading as setLoadingProductDetails, setProduct } from './slices/productDetailsSlice';

const API_URL = 'https://fakestoreapi.com/products';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(setLoadingProducts, setLoadingProductDetails),
  effect: async (action, listenerApi) => {
    if (action.type === setLoadingProducts.type) {
      try {
        const response = await axios.get(API_URL);
        listenerApi.dispatch(setProducts(response.data));
      } catch {
        listenerApi.dispatch(setError('Failed to fetch products'));
      }
    }

    if (action.type === setLoadingProductDetails.type) {
      try {
        const response = await axios.get(`${API_URL}/${action.payload}`);
        listenerApi.dispatch(setProduct(response.data));
      } catch {
        listenerApi.dispatch(setError('Failed to fetch product details'));
      }
    }
  },
});
