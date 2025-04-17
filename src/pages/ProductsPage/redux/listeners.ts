import { createListenerMiddleware } from '@reduxjs/toolkit';
import {
  fetchProducts as fetchProductsAction,
  setProductsError,
  setProductsLoading,
  setProducts,
} from './productsSlice';
import { fetchProducts } from '../../../api/products';
import { ProductIS } from '../../../types/ProductIS';

const productsMW = createListenerMiddleware();

productsMW.startListening({
  actionCreator: fetchProductsAction,
  effect: async (_, listenerApi) => {
    listenerApi.dispatch(setProductsLoading(true));
    const response: ProductIS[] = await fetchProducts({ url: '/products' });

    if (response) {
      listenerApi.dispatch(setProducts(response));
    } else {
      listenerApi.dispatch(setProductsError('Failed to fetch products'));
    }
  },
});

export default productsMW;
