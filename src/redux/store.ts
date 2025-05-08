import { configureStore } from '@reduxjs/toolkit';
import productDetailsReducer from '../pages/ProductDetailsPage/redux/productDetailsSlice';
import productsReducer from '../pages/ProductsPage/redux/productsSlice';
import favoritesReducer from '../pages/FavoritesPage/redux/favoritesSlice';
import cartReducer from '../pages/CartPage/redux/cartSlice';
import authReducer from '../pages/LoginPage/redux/authSlice';
import userReducer from '../pages/RegisterPage/redux/userSlice';
import productsListener from '../pages/ProductsPage/redux/listeners';
import productDetailsListener from '../pages/ProductDetailsPage/redux/listeners';
import registerMiddleware from '../pages/RegisterPage/redux/listeners';

const saveCart = (state: RootState) => {
  localStorage.setItem('cart', JSON.stringify(state.cart));
};

const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      productsListener.middleware,
      productDetailsListener.middleware,
      registerMiddleware.middleware
    );
  },
});

store.subscribe(() => {
  saveCart(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
