import { configureStore } from '@reduxjs/toolkit';
import featureListener from './listeners/featureListener';
import productDetailsReducer from '../pages/ProductDetailsPage/redux/productDetailsSlice';
import productsReducer from '../pages/ProductsPage/redux/productsSlice';
import favoritesReducer from '../pages/FavoritesPage/redux/favoritesSlice';
import cartReducer from '../pages/CartPage/redux/cartSlice';
import authReducer from '../pages/LoginPage/redux/authSlice';
import userReducer from '../pages/RegisterPage/redux/userSlice';

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
    return getDefaultMiddleware({ serializableCheck: false }).prepend(
      featureListener.middleware
    );
  },
});

store.subscribe(() => {
  saveCart(store.getState());
});

import './listeners/registerListeners';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
