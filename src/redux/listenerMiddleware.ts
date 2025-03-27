import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  setError,
  setLoading as setLoadingProducts,
  setProducts,
  fetchProducts,
} from './slices/productsSlice';
import {
  fetchProduct,
  setLoading as setLoadingProductDetails,
  setProduct,
} from './slices/productDetailsSlice';

const API_URL = 'https://fakestoreapi.com/products';

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(fetchProducts, fetchProduct),
  effect: async (action, listenerApi) => {
    if (action.type === fetchProducts.type) {
      listenerApi.dispatch(setLoadingProducts(true));

      try {
        const response = await axios.get(API_URL);
        listenerApi.dispatch(setProducts(response.data));
      } catch {
        listenerApi.dispatch(setError('Failed to fetch products'));
      }
    }

    if (action.type === fetchProduct.type) {
      listenerApi.dispatch(setLoadingProductDetails(true));
      console.log(action.type, action.payload);

      try {
        const response = await axios.get(`${API_URL}/${action.payload}`);
        listenerApi.dispatch(setProduct(response.data));
      } catch {
        listenerApi.dispatch(setError('Failed to fetch product details'));
      }
    }
  },
});
