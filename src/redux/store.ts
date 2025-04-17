import { configureStore } from '@reduxjs/toolkit';
import { reducer as productDetailsReducer } from '../pages/ProductDetailsPage/redux/productDetailsSlice';
import { reducer as productsReducer } from '../pages/ProductsPage/redux/productsSlice';
import { reducer as favoritesReducer } from '../pages/FavoritesPage/redux/favoritesSlice';
import cartReducer from '../pages/CartPage/redux/cartSlice';
import productsListener from '../pages/ProductsPage/redux/listeners';
import productDetailsListener from '../pages/ProductDetailsPage/redux/listeners';

const saveCart = (state: RootState) => {
  localStorage.setItem('cart', JSON.stringify(state.cart));
};

const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      productsListener.middleware,
      productDetailsListener.middleware
    );
  },
});

store.subscribe(() => {
  saveCart(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
