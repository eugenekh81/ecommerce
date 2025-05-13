import {
  getProducts,
  setProductsError,
  setProducts,
} from './productsSlice';
import { fetchProducts } from '../../../api/products';
import { ProductIS } from '../../../types/ProductType';
import featureListener from '../../../redux/listeners/featureListener';

featureListener.startListening({
  actionCreator: getProducts,
  effect: async (_, listenerApi) => {
    const response: ProductIS[] = await fetchProducts({ url: '/products' });

    if (response) {
      listenerApi.dispatch(setProducts(response));
    } else {
      listenerApi.dispatch(setProductsError('Failed to fetch products'));
    }
  },
});
